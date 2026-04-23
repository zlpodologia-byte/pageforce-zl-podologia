# Changelog Clone

## M1 — Cursor + Reveal

- Files touched:
  - `app/globals.css`
  - `app/layout.tsx`
  - `app/page.tsx`
  - `components/cursor/Cursor.tsx`
  - `components/reveal/Reveal.tsx`
  - `CHANGELOG-CLONE.md`
- Implementation choices:
  - Ingress direction is resolved by comparing the pointer entry coordinates against the target rect's four edges and selecting the smallest distance, which gives a stable top/right/bottom/left result even on corner entries.
  - Cursor follow uses a `0.15` per-frame lerp in a `requestAnimationFrame` loop, with reduced motion switching to direct pointer coordinates instead of interpolation.
  - Reveal uses inline `style` objects for both hidden and visible states so the final `opacity` and `translateY` targets are owned by component state instead of Tailwind layer ordering.
- Any ambiguity encountered:
  - `CHANGELOG-CLONE.md` did not exist in this workspace, so this file was created before adding the M1 section.
  - The baseline home page did not yet include the `See work`, `Services`, and `Contact` links called out in the handoff, so they are being introduced as part of the M1 touchpoint.

# M2 — Menu Overlay + Page Transition

## What changed

- Rewrote `components/shell/MenuOverlay.tsx` from the M0 clip-path stub into a state-driven fullscreen overlay with:
  - SVG goo mask on larger viewports
  - mobile `<=480px` circle reveal fallback
  - reduced-motion opacity fallback
  - focus trap, ESC close, body scroll lock, and trigger focus restoration
  - delayed stagger for nav items and socials
- Rewrote `components/shell/PageTransition.tsx` into a portal-mounted route wipe controller that:
  - intercepts internal anchor clicks at the document level
  - animates a gooey cover before `router.push`
  - retracts from the opposite edge after the new pathname renders
  - updates the `aria-live` route announcer
  - focuses the first page heading after transition completion
  - shows a centered loading indicator if navigation stalls under the mask
- Updated `components/shell/RightEdgeCurve.tsx` so the decorative curve stays below the overlay while the `MenuButton` remains visible and clickable above it.
- Updated `components/shell/MenuButton.tsx` with a stable `data-menu-button` marker so the menu/page transitions can seed from and restore focus to the real trigger.
- Added shared shell-local helpers:
  - `components/shell/motion.ts`
  - `components/shell/GooeyMaskLayer.tsx`

## Trade-offs

- Used an SVG mask plus `feGaussianBlur`/`feColorMatrix` goo filter instead of Paper.js. This keeps the bundle lean and makes the transition geometry easy to reason about in React.
- The route transition is exact for intercepted internal link clicks. For pathname changes that are not interceptable in advance, the component falls back to a reveal-on-render sequence instead of a pre-navigation cover.
- Menu content is not itself clipped by the blob during the opening phase; instead, the background blob finishes first and the content fades/staggers in afterward. This keeps the implementation simple while matching the intended sequence.

## Verification

- Required typecheck: `cmd /c npx tsc --noEmit` — exit `0`
- `next build` intentionally not run per milestone instructions.

## How to verify visually

1. Desktop menu:
   Open the menu from the top-right trigger. Confirm the dark overlay grows from the button, the first nav item receives focus, Tab/Shift+Tab stay trapped inside, ESC closes, and focus returns to the trigger.
2. Desktop route transitions:
   Click internal links from the home quick links and from the menu overlay. Confirm the viewport is covered before navigation, the new page heading receives focus after reveal, and the route announcer updates with the new document title.
3. Reduced motion:
   Enable `prefers-reduced-motion: reduce` in devtools. Confirm both menu and route transitions switch to opacity fades with no blob growth.
4. Mobile:
   Test at `390px` wide. Confirm the curve is hidden, the menu trigger remains top-right as a simple pill button, and the menu uses the simpler circle reveal.
5. Slow route:
   Throttle network, click an internal link, and confirm the loading indicator appears while the route waits under the transition overlay and disappears once the next page is ready.

## M3 — Hero module

- Added `components/hero/HeroModule.tsx`, `CategoryCycle.tsx`, `PaginationDots.tsx`, and `IllustrationTwoFigures.tsx`.
- Replaced the M0 home placeholder in `app/page.tsx` with the new hero module only, leaving the route ready for M4/M7 sections below it.
- Inlined `public/illustrations/hero-figures.svg` manually instead of changing `next.config.ts`; the illustration still inherits `currentColor` and exposes the named groups needed for idle animation.
- Implemented the category cycle as a small client-side state machine so reduced-motion can use the required slower opacity-only swap instead of being short-circuited by the global reduced-motion CSS reset.
- Dots are keyboard-clickable, synchronized with the active word, and opt out of the custom cursor so they can show a native crosshair hover.

### Manual verification notes

- Hero section fills the first viewport, centers the illustration and H1, and reveals in the required kicker → illustration → H1 → dots order with 200ms staggering.
- `CategoryCycle` keeps a fixed slot height to avoid layout shift and switches to a >= 4000ms opacity-only cycle under `prefers-reduced-motion: reduce`.
- `IllustrationTwoFigures` animates `figure-1` `arm-right`, `figure-2` `arm-pointing`, and both `head` groups; `paused` and reduced-motion both stop the idle loop.
- Required verification run for this milestone: `npx tsc --noEmit`.

# M4 - Case Grid + Work Index

## What changed

- Added `components/case-grid/CaseGrid.tsx`, `FilterBar.tsx`, `WorkIndexPage.tsx`, and `useGridParallax.ts`.
- Added `components/case-card/CaseCard.tsx` and `CategoryLinks.tsx`.
- Extended `lib/cases.ts` with category slug helpers so `/work?filter=` stays typed.
- Replaced the `/work` placeholder with a real filtered index page backed by `useSearchParams()` and `router.replace()`.
- Extended `app/page.tsx` with a featured-work section under the hero plus a CTA to `/work`.

## Trade-offs

- `CaseGrid` renders dedicated 3-column, 2-column, and 1-column wrappers and switches them via CSS breakpoints. This keeps the responsive waterfall layout correct without relying on viewport-specific server markup, while still allowing per-column parallax on the active desktop/tablet layout.
- The primary case navigation is handled by an absolute overlay link instead of literally nesting all card content inside one anchor. This keeps the full-card click target while preserving valid separate category controls under each card.
- Filter chips on `/work` are buttons, not links, so search-param updates avoid the global page-transition interceptor. The page still has a no-JS fallback through the server-rendered Suspense fallback.

## Verification

- Required typecheck: `cmd /c npx tsc --noEmit` - exit `0`
- `next build` not run per milestone instructions.
- No Playwright suite was added in this workspace because there is no repo-level Playwright config or test directory yet.

## How to verify visually

1. Home page:
   Load `/` at desktop width. Confirm the hero remains intact, the new "Featured work" section appears directly below it, the first six cases render in a staggered 3-column waterfall, and the CTA under the grid links to `/work`.
2. Work index:
   Load `/work`. Confirm the filter chips appear above the grid, all seeded cases render by default, and clicking each chip updates the URL with `?filter=` without a full page wipe.
3. Filter restoration:
   Open `/work?filter=branding` directly, then use the browser back/forward buttons between different filters. Confirm the active chip and visible cards stay synchronized with the URL.
4. Hover behavior:
   On a desktop fine-pointer device, hover a case card. Confirm the hovered thumbnail scales subtly, sibling cards fade to about `0.18`, and the state clears on pointer leave.
5. Reduced motion:
   Enable `prefers-reduced-motion: reduce`. Confirm parallax stops, sibling dimming is disabled, and cards use border-only hover feedback with no thumbnail scaling.
6. Responsive:
   Check `1440px`, `1100px`, and `390px` widths. Confirm the grid resolves to 3 / 2 / 1 columns respectively and there is no horizontal scrolling.

# M5 Changelog

- Added a standalone `ThumbnailWebGL` component in `components/thumbnail-webgl/ThumbnailWebGL.tsx`.
- Added `useThumbnailHover` in `components/thumbnail-webgl/useThumbnailHover.ts` so M4 can drive hover and pointer state without coupling to the WebGL internals.
- Added `components/thumbnail-webgl/Example.tsx` as a review-only integration sample on a `16:9` tile.
- Chosen rendering model: one OGL canvas per thumbnail.
  This keeps M5 isolated from `CaseCard` and the grid layout, makes `IntersectionObserver` pause/resume straightforward, and avoids a shared-scene coordination layer before the M4 integration pass.
  Trade-off: higher overhead if many thumbnails are simultaneously visible; that can be revisited later if the grid moves beyond the current visible-card count.
- Reduced motion behavior:
  Shader hover is forced to `0`, the canvas still renders the plain texture, and the fallback image uses a capped CSS scale of `1.02`.
- WebGL fallback behavior:
  If WebGL cannot be created, the component skips mounting the canvas and leaves the image visible with CSS-only hover scale.

## How to verify visually

1. Render `ThumbnailWebGLExample` somewhere temporary or import `ThumbnailWebGL` into a local scratch component.
2. Hover on desktop with a fine pointer and confirm:
   subtle displacement,
   low-amplitude RGB split,
   and video takeover only while hover is active if `videoSrc` is provided.
3. Scroll the thumbnail off-screen and confirm the effect stops animating; scroll it back and confirm it resumes cleanly.
4. Enable `prefers-reduced-motion` and confirm the texture stays plain while the fallback image only scales very slightly.

## Verification

- Required command: `npx tsc --noEmit`
- Explicitly not run: `next build`

# M6 Changelog

## Notes

- Replaced the `/work/[slug]` placeholder with a real case detail composition using `CaseHeader`, `CaseContentBlock`, and `NextCase`.
- Added original seeded editorial content for `north-star-observatory`, `meridian-coffee`, and `atlas-mobility`.
- Kept `components/shell/**` untouched per milestone constraints. The case header hides the layout-level logo on case routes and renders its own `Logo` instance locally instead of expanding the shell API with a new `variant` prop.

## How to verify visually

1. Open `/work/north-star-observatory`, `/work/meridian-coffee`, and `/work/atlas-mobility`.
2. Confirm the hero fills the viewport with the case accent color, the title reveals line-by-line, and the close tab returns to a same-origin referrer when available or `/work` otherwise.
3. Scroll each page and confirm content blocks fade in once, full-width media bleeds edge-to-edge, centered copy bands change tone correctly, and the `NextCase` link appears at the bottom with a right-shift hover on non-reduced-motion setups.
4. Open any case without seeded content and confirm the interim "Case detail coming soon" note renders above the next-case link.

# M7 Changelog

## Shipped
- Added `DeepDiveSplash` with a dark editorial pitch block, staggered reveal order, and reduced-motion fade-only behavior.
- Added `ContactGrid` with a hand-authored `desk-person.svg` illustration and the four requested contact quadrants.
- Added a global `Footer` with offices, navigation, social links, and a non-posting newsletter form.
- Wired the new sections into `app/page.tsx` and mounted the footer in `app/layout.tsx`.

## How To Verify Visually
1. Run `npm run dev` and open `/`.
2. Confirm the home page ends with `DeepDiveSplash`, then `ContactGrid`, then the global footer.
3. Check `/` at desktop, tablet, and mobile widths. The contact block should be 3-column on large screens, 2-column on medium, and 1-column on small screens without horizontal scroll.
4. Enable `prefers-reduced-motion`, reload `/`, and confirm the deep-dive kicker, headline, and body use fade-only reveals with no vertical slide.
5. Tab through the contact links, footer links, newsletter input, and submit button to confirm visible focus states and usable tap targets.
