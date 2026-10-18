# Hidden illustrated philosophy storybook

English: https://www.bitladssoftware.com/vault-fcc6197d2484a7a0dae35a63/arcana/
Romanian: https://www.bitladssoftware.com/vault-fcc6197d2484a7a0dae35a63/arcana/ro

Only the Vault index links to the storybook. Public navigation and the sitemap exclude it.
Both HTML pages have a `noindex, nofollow, noarchive` meta tag and inherit the existing Vault
X-Robots-Tag header. The pages are unlisted and accessible to anyone with the link.

The illustrated chapters, experiments, debates, atlas and timeline are included in both languages.
The card collection, portrait sheet, card PDFs and proposed game rules are no longer published.
Old card and PDF URLs redirect to the storybook in the corresponding language.

Authoring sources live in the street-view workspace under `outputs/philosophy-storybook/`.
Run `node outputs/philosophy-storybook/build.mjs` and the same command with `ro` to rebuild.
Copy only `index.html` and `ro.html` to this public folder, preserving the robots meta tag.
