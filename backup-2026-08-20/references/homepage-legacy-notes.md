# The China Academy — Homepage Redesign Concept

## Concept
A lower-density editorial homepage inspired by magazine pacing: one dominant cover story per section, followed by a horizontal gallery of supporting stories.

## Typography
The current demo system uses **EB Garamond** for body copy, decks and quotations; **Libre Baskerville** for article headlines; and **Inter** for navigation, labels, metadata and explanatory text.

Optional accent: **LXGW WenKai / 霞鹜文楷** for very short quotes, cultural labels, or occasional Chinese display text; do not use it for long English body copy.

## Layout decisions
- Larger masthead and more whitespace on the opening fold.
- Each major channel gets a large two-column feature: image left, introduction right.
- Supporting stories live in a horizontal scroll-snap gallery below the feature.
- Longer section gaps and thin editorial rules reduce the feeling of a feed.
- Newsletter is treated as an editorial pause rather than a popup-style conversion block.

## Alternate highlights version
- `homepage-highlights.html` keeps the same editorial system but adds a dedicated, always-visible highlights spread after the cover story.
- The spread surfaces one leading idea from the cover and three highlights from the issue instead of requiring hover to discover them.

## Navigation study
- `navigation-concepts.html` presents ten brand-consistent navigation directions in one comparison document.
- The implemented site navigation now follows concept 03, the centered Split Desk with subject sections on the left and editorial formats on the right.

## Motion
- Sticky masthead condenses after scrolling.
- Reading progress line at top.
- Scroll reveal / clip reveal transitions.
- Very subtle image parallax.
- Gallery arrow controls + native swipe/trackpad scrolling.
- Hover microinteractions on images and read-more buttons.
- `prefers-reduced-motion` is supported.

## Production notes
- Demo article imagery is illustrative. Replace any third-party editorial placeholders with licensed/owned final imagery before production release.
- The homepage cover currently uses the local `tca_demo_mao.png` editorial montage.
- On WordPress this structure can be implemented as a reusable section component driven by category + featured-post fields.
- Best practice: editors select one feature story per channel; the next 4–8 stories can populate the gallery automatically.
