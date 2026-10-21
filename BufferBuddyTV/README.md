# BufferBuddy TV

A multi-page prototype for a Fire TV concept: when playback is interrupted, a short animated buddy takes over the screen. The goal is to entertain, not to fix errors.

## Run it
Open this folder in VS Code, open a terminal, and run:
```
python -m http.server 8000
```
Then visit http://localhost:8000

## Pages
- index.html: home with a live looping demo
- player.html: trigger interruptions, auto-demo, real offline detection, session feed
- characters.html: buddy gallery and per-event assignment
- analytics.html: totals, charts, recent log, sample data, CSV export
- settings.html: theme, speed, captions, auto-demo timing
- about.html: architecture and Fire TV feasibility

## Code map
- js/utils.js: DOM helpers
- js/store.js: localStorage, settings, log
- js/characters.js: buddy art and captions
- js/engine.js: state machine and renderer
- js/nav.js: shared navigation
- js/remote.js: arrow-key navigation (player page only)
- js/home.js, player.js, gallery.js, analytics.js, settings.js: one script per page
- css/styles.css: app shell, TV and animations
