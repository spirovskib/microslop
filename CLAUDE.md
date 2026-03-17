# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Slopit Parrot** (microslop.me) is a satirical static web app that parodies AI assistants by generating confident but completely fabricated technical responses. It's a single-page app deployed to GitHub Pages at slopit.me.

## Development

No build system or package manager. To develop locally, serve the static files:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Deploy by pushing to `main` — GitHub Pages auto-deploys.

## Architecture

The app is entirely client-side with no dependencies:

- **`index.html`** — Single-page app with all CSS inline and `<script>` references to JS modules
- **`js/app.js`** — Core engine: boots with fake loading sequence, handles user input, orchestrates response generation with probabilistic branching
- **`js/textgen.js`** — Generates long-form fake technical paragraphs from word/phrase arrays
- **`js/codegen.js`** — Generates fake but syntactically plausible JavaScript code blocks
- **`data/*.json`** — Content pools: `assertions`, `bridges`, `corporate`, `interrupts`, `sources`, `strippers`, `suggestions`

### Response Generation Flow

`app.js:generateResponse()` orchestrates everything:
1. Strips common question phrases from input (via `strippers.json`)
2. 55% → long-form via `TextGen.generate()`, 45% → short template response
3. Probabilistic additions: code block (40-50%), fake source (30%), system interrupt (15%), follow-up suggestions (35%)

The `previousSubject` variable enables context linking between responses using `bridges.json`.

### Daily Hallucination

`generateDaily()` uses a Mulberry32 seeded RNG initialized with the current date, so all users see the same "Hallucination of the Day" on a given calendar day.

### Content Theme

The parody targets AI hallucination patterns using fictional tech companies: Slopit (Splunk), Gatherings (Slack/meetings), Nimbus (cloud), Bwrong (Google), Doors (Windows), Fringe (Edge). Adding new content means editing the appropriate JSON file in `data/`.
