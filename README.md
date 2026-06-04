# DigiMaster — Digital Marketing Learning Platform

A premium, fully interactive React platform to master digital marketing in 30 days and ace interviews. Dark-mode-first, animated, mobile-responsive, and 100% static (no backend).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Tech stack
- **React 18** + **React Router 6** (multi-page)
- **Tailwind CSS** (dark/light theme via `class`)
- **Framer Motion** (page transitions, micro-animations, confetti)
- **Recharts** (simulator bar charts, analytics pie)
- **Lucide React** (icons)
- **localStorage** for all progress (no API calls)

## What's inside

### Part 1 — Theory Library (`/theory`)
- 14 chapters, each in the signature **3-layer format**: Industry Standard → Real Brand Example → Hinglish chai-time analogy (☕/💡 callouts).
- Sticky collapsible chapter sidebar with read-checkmarks, cross-chapter search, per-chapter scroll progress bar.
- CSS/SVG diagrams (no images): Google crawl→index→rank, on-page anatomy, backlinks, TOFU/MOFU/BOFU funnel, Google Ads auction & hierarchy, Quality Score, Meta Ads Manager, Core/Custom/Lookalike audience circles, Pixel flow, A/B test, GA4 dashboard, AIDA, cart recovery, tools map, and more.
- Interactive widgets: persona builder, UTM link builder, key-metrics cards, traffic pie chart, tabbed interfaces (Google campaign types, Meta formats, social platforms), searchable A–Z glossary.
- Per chapter: Key Takeaway card, **Interview Question Alert** + **Interview Mode** (type an answer, get scored coaching), flip cards, flashcard revision deck, Connected Topics, mark-complete, completion **certificate** with confetti.

### Part 2 — The Neuro Map (`/map`)
A living, neural-network visualisation of **every** digital-marketing concept (~60 "cells" across 13 colour-coded domains) wired together by ~120 cause-and-effect links. Built on a custom force-directed layout (no graph library):
- **Tap any cell** → a visual detail panel: big icon, domain, one-line definition, fact chips, a "Read the full chapter" deep-link, and **every connection with a plain-English reason** (e.g. *Influencer → Search Ads: "buzz sparks branded searches that branded Search Ads capture cheaply"*, *UI/UX → Conversion: "clean UI removes friction so more visitors convert"*). Click a connection to fly to that concept.
- Pan (drag background), **zoom** (scroll / buttons), **drag cells** to rearrange, animated synapse signals fire along the selected node's links, neighbours highlight while the rest dim.
- Search any concept, filter by domain via the legend, and an "explored X/N" progress counter.

### Part 3 — Campaign Simulator (`/simulator`)
A 10-step ads-platform wizard: business → goal → budget → channel → audience → ad (live preview) → landing page → animated results dashboard (you-vs-benchmark bar charts, Quality Score ring) → optimisation suggestions → optimise & relaunch with before/after comparison and a final score. Uses realistic Indian-market benchmarks (Google CTR 2–5%, Meta CTR 0.9–1.5%, CPCs, CVRs).

### Site-wide
- Sticky blur navbar with pulse logo + overall-progress bar.
- Floating **Metrics Calculator** (CPC, CPM, CTR, CPA, ROAS, CAC, LTV, ROI with live formulas).
- **Term tooltip system** — glossary terms across all body text are underlined with hover definitions.
- Dark/Light toggle, smooth scroll, page-transition animations, sticky Daily Goal reminder.

## Project structure
```
src/
  context/ProgressContext.jsx   localStorage-backed progress (theory/journey/sim/theme/goal)
  data/                         chapters, glossary, metrics, conceptMap (nodes + reasoned edges)
  lib/                          icons.jsx, simEngine.js (benchmarks & scoring)
  components/                   Navbar, Diagrams, ChapterWidgets, ChapterRenderer, ConceptGraph,
                                Learning (flip/flash/interview), TermText, MetricsCalculator, Confetti
  pages/                        Home, Theory, NeuralMap, Simulator
```
