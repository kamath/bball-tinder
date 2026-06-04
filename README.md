# 🏀 Hardwood Draft

A single-page, zero-dependency basketball drafting game. You're shown two random NBA players; pick the one you think is better. Do it five times (with three skips on the clock) to assemble a starting five, then see how your squad stacks up — its overall rating, where it lands against the entire universe of possible lineups, and the rival teams that would beat you.

**Stats & ratings courtesy of [Dunks & Threes](https://dunksandthrees.com/).** All player metrics — RAPM impact, box-score rates, and the z-scores the OVR is built from — come from their public data for the 2026 season.

> Built as a self-contained `index.html` — no server, no build step to *run* it. Just open the file.

---

## Table of contents

- [How a player's OVR is computed](#how-a-players-ovr-is-computed)
- [The five pillars (Squad Ratings)](#the-five-pillars-squad-ratings)
- [The matchup draw — skill-weighted randomness](#the-matchup-draw--skill-weighted-randomness)
- [Where your lineup ranks (Monte Carlo)](#where-your-lineup-ranks-monte-carlo)
- [Who beats you — the rival engine](#who-beats-you--the-rival-engine)
  - [Slight edges](#1-slight-edges-the-squeakers)
  - [KL-divergence weakness exploiters](#2-kl-divergence-weakness-exploiters)
- [Mario-Kart-style rating bars](#mario-kart-style-rating-bars)
- [Build pipeline](#build-pipeline)
- [Running it](#running-it)
- [Credits](#credits)

---

## How a player's OVR is computed

Each player's single **OVR** number (30–99 in theory, ~65–100 in this dataset) is distilled from five weighted "pillars," themselves built from z-scored performance metrics:

| Pillar | What it measures | Built from | Weight |
|--------|------------------|-----------|--------|
| **Impact** | Holistic on/off value | `tot_z` (normalized RAPM) | **0.40** |
| **Scoring** | Volume + efficiency | points + true shooting | **0.18** |
| **Defense** | Disruption + rim protection | steals + blocks + defensive RAPM | **0.16** |
| **Playmaking** | Creation net of turnovers | assists − ½·turnovers | **0.14** |
| **Rebounding** | Glass control | offensive + defensive rebounds | **0.12** |

The weighted blend is standardized across the league into a z-score `z`, then mapped to a rating:

```
OVR = clamp( round(58 + 11·z), 30, 99 )
```

So a league-average player sits around **58**, and the very best (Jokić, Wembanyama, Giannis) peg the top of the scale. RAPM impact dominates the formula by design — a player who quietly makes their team better outranks an empty-stats scorer.

## The five pillars (Squad Ratings)

Every player also carries a 0–100 score in each pillar — **Scoring, Playmaking, Size (rebounding), Defense, Impact**. These are what you see on the cards and in your team's **Squad Ratings**. A team's pillar value is just the average of its five players' values in that pillar. They power both the live ratings panel while you draft and the rival engine's weakness detection.

## The matchup draw — skill-weighted randomness

A naïve game would show two *uniformly* random players, but with 602 players and a median OVR of 75, you'd mostly stare at forgettable rotation guys. Instead, each card is drawn with probability proportional to a power of the player's rating:

```
weight(player) ∝ (OVR − 58)³
```

Sampling is done by precomputing cumulative weights once and binary-searching a uniform random point into them — O(log n) per draw. The cubic exponent was tuned to hit a specific feel:

| Outcome | Uniform | **This game (exp = 3)** |
|---------|---------|--------------------------|
| Average drawn OVR | 75.9 | **≈ 81.6** (a top rotation player) |
| Chance of a star (90+) | 4.0% | **≈ 12%** |
| Chance of a bum (≤70) | 8.1% | **≈ 2.3%** |

Net effect: the typical matchup is between two genuinely good players, stars show up often enough to be exciting, and every so often a Bismack Biyombo (OVR 65) wanders in to keep you honest.

> Note: this weighting **only** affects the cards you're dealt. The "where you rank" baseline below deliberately stays uniform, because it represents the full space of *possible* lineups, not the ones you're likely to be offered.

## Where your lineup ranks (Monte Carlo)

When your five is set, the game runs a **Monte Carlo simulation of 160,000 randomly drafted five-man lineups** (uniform over all 602 players, distinct players per lineup). Your team OVR is the average of your five players' OVRs. From the simulated distribution we report:

- **Percentile** — share of random lineups you beat.
- **Rank** — your approximate position out of 160,000.
- A **histogram** of the whole field with your team marked.

## Who beats you — the rival engine

The headline feature. Instead of a static "best possible team," the game dynamically constructs **realistic rival lineups that would beat you**, in two distinct flavors, ordered closest-margin first.

Every rival is a **real positional five** — it fills C / PF / SF / SG / PG from position-eligible players — so you never get five centers. Teams are sampled fresh each game (weighted random within each slot), so results differ every playthrough.

### 1. Slight edges (the squeakers)

Up to two **attainable** rivals drawn from players *near your own level* (an OVR band around your team), kept only if they edge past your team OVR by a small margin (≤ +4). These are the "you were one good pick away" teams.

### 2. KL-divergence weakness exploiters

Up to two rivals that **beat you by attacking your specific weaknesses** — and the weakness is found with information theory, not hand-tuning.

Each lineup's five pillars are normalized into a probability distribution (how its strength is *allocated* across Scoring / Playmaking / Size / Defense / Impact). Your team is distribution **P**, a rival is **Q**. We score every candidate rival by the **Kullback–Leibler divergence**:

```
D(Q ‖ P) = Σᵢ  Qᵢ · log( Qᵢ / Pᵢ )
```

This is large precisely when a rival concentrates its strength on the pillars where *you* are thin. The single pillar contributing most to that sum **is** the weakness being exploited — so the label ("Exploits Defense", "Exploits Size", …) falls out of the math rather than being assigned by hand.

**Important honest caveat baked into the design:** KL-divergence measures *contrast between distributions*, not *quality* — a bad team and a great team can have identical shapes. So KL alone can't find "better" lineups. The engine therefore separates the two questions:

- **Is it actually better?** → a hard gate: the rival's team OVR must exceed yours.
- **Does it attack *me*?** → the KL score, used to rank and label the gated candidates.

To keep the rivals identifiable, candidates are generated with a spread of "tilts" toward each pillar, then KL ranks which ones genuinely diverge from *your* profile, and the top three with **distinct dominant weaknesses** are shown. Each card displays the `D·KL` value, the exploited pillar, and a `You → Them (+gap)` comparison.

## Mario-Kart-style rating bars

Ratings everywhere are drawn as segmented, color-graded bars — like a kart-racer's stat screen. One shared `segBar()` renderer powers all of them:

- **Player cards** (10 segments) while you're picking.
- **Your live Squad Ratings** (14 segments) on the draft board, recomputed on every pick so you watch your team's identity take shape.
- **The final results card** (14 segments), where the segments stagger-pop in as a reveal moment.

Bars are color-coded by tier (hot orange for elite → muted for replacement-level) and the fill is `round(value / 100 · segments)`.

## Build pipeline

The app is generated, not hand-written:

```
clean.json  ──▶  players.json  ──▶  index.html
 (raw data)      (trimmed, via      (self-contained app,
                  compute_ovr.js)    via build_html.js)
```

- **`clean.json`** — 602 players, 2026 season. Note: it's JS-object notation, *not* strict JSON (unquoted keys, leading-dot number literals like `.94`), so it's parsed with `new Function("return (" + raw + ")")()`, not `JSON.parse`. Each player already carries z-scored metrics (`*_z`) and RAPM (`off` / `def` / `tot`).
- **`compute_ovr.js`** — applies the pillar formula above and writes the trimmed **`players.json`** (just the fields the app needs).
- **`build_html.js`** — embeds `players.json` and team colors directly into a single **`index.html`**: all styles, all game logic, no external JS. Run it to regenerate the page after any change.

## Running it

```bash
# Regenerate the page (after editing build_html.js or the data)
node build_html.js

# Open it — no server needed
open index.html
```

The only runtime dependency is a browser with internet access for the Google Fonts (Anton, Archivo, DM Mono). Everything else — all 602 players, the OVR math, the Monte Carlo, the KL rival engine — runs locally in the page.

## Credits

- **Data, stats & player ratings:** [Dunks & Threes](https://dunksandthrees.com/) — RAPM, impact metrics, and box-score data for the 2026 season.
- **Game, OVR formula, rival engine & design:** this repo.

If you enjoyed it, ⭐ **[star it on GitHub](https://github.com/kamath/bball-tinder)**.
