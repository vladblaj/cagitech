# ARCANA hidden collection

Published under the existing unlisted Vault at `/vault-fcc6197d2484a7a0dae35a63/arcana/cards.html`.

- English cards: `cards.html`; Romanian cards: `cards-ro.html`.
- English storybook and atlas: `index.html`; Romanian: `ro.html`.
- Printable collections: `arcana-cards.pdf` and `arcana-cards-ro.pdf`.
- Proposed game rules: `GAME-DESIGN.md`. The turn-based game is a design, not an implemented game.

Only the Vault index links to this collection. Public navigation and the sitemap do not link to it.
All four HTML pages have a `noindex, nofollow, noarchive` robots meta tag. Existing Netlify Vault headers
also send `X-Robots-Tag: noindex, nofollow, noarchive` for HTML, portraits and PDFs.
This is an unlisted collection available to anyone with its URL, without a login gate.

The published files are self-contained HTML plus one local portrait sheet and two PDFs.
The authoring source remains in the street-view workspace under `outputs/philosophy-storybook/`.
To refresh: build both storybook languages and run `cards-build.mjs` there; copy only the published
HTML, assets, PDFs and rulebook here; preserve the robots meta tag; build and deploy this site normally.
Do not copy authoring scripts, local configuration or credentials into the public directory.
