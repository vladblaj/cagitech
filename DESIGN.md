# Bitlads Software site design

## Intent

An English-language company portfolio that lets the work speak first. Visitors should quickly understand the range of projects, see which ones are live versus demonstrations, and find a direct route to a project conversation.

## Visual direction

- Editorial layout on warm paper (`#f5f3ed`) with deep green ink (`#232c27`).
- Newsreader gives the main statements character; DM Sans keeps navigation and detail crisp.
- Product screenshots carry the visual variety. The project layout alternates image and copy rather than repeating card tiles.
- Acid-yellow (`#e4eb67`) is reserved for a few calls to action. The capabilities section uses a deep green field.
- Roomy spacing, fine rules, restrained status badges, and direct links make the studio feel established without using fabricated client logos or scale claims.

## Content truth

- Book a Rifugio is a public demo with illustrative data and reservations.
- STARE is available on the App Store.
- Fluxa is an interactive concept with simulated sensor readings.
- CodTranslate is a live, account-gated document workflow. Its visual is an illustration, not a screenshot.
- Automation and IoT are presented as capabilities, not finished customer deployments.

## Interaction and accessibility

- The main navigation collapses to an explicit menu button on small screens.
- Every project image and text action opens the actual project; external links use a new tab.
- Images have meaningful alternative text. Focus states, a skip link, and reduced-motion handling are included.
- Contact is a dedicated page in the same palette, with a direct email option and the existing inquiry form.

## Maintenance

Homepage styles are scoped under `.bitlads-home` in `src/pages/home.css` to avoid changing legacy blog pages. Contact styles are scoped under `.contact-page`. The product facts and project URLs are in `src/pages/HomePage.tsx`.
