# Acceptance Tests — Pageforce 2.0

> Testable criteria per screen/component. Each item is phrased so a reviewer can mark
> ✅ / ❌ at review time. Aligns with `reference-audit.md` (tokens & behavior) and
> `flows.md` (interaction sequences).

Convention:
- **Given** / **When** / **Then** form where applicable.
- Playwright / visual regression notes where helpful.

---

## 1. Hero (home)

1.1 **Given** first load of `/`, **Then** kicker, illustration and cycling H1 are visible within 1.2s (LCP).
1.2 **Given** hero is mounted, **When** 2.5-3.5s elapses, **Then** H1 category word swaps to next in cycle with animated transition.
1.3 **Given** cycling active, **Then** `PaginationDots` active dot matches current index.
1.4 **Given** `prefers-reduced-motion: reduce`, **Then** cycling uses opacity swap only (no translate) and interval extends to ≥4s.
1.5 **Given** H1 slot has variable-width words, **Then** slot height never reflows (CLS = 0).
1.6 **Accessibility**: screen reader receives each cycled word via `aria-live="polite"`.

Playwright:
- `toHaveScreenshot()` for initial hero at `1440×900` and `390×844`.
- Wait 3.5s, assert H1 `textContent` changed.

---

## 2. Case grid (home & `/work`)

2.1 **Given** viewport ≥ 1280px, **Then** exactly 3 columns visible at x ≈ `75 / 565 / 1055`.
2.2 **Given** 960-1280px, **Then** 2 columns; **Given** < 960px, **Then** 1 column; all without horizontal scroll.
2.3 **Given** desktop scroll, **Then** columns translate at multipliers `0.85 / 1.00 / 1.15` (tolerance ±5%) relative to scrollY.
2.4 **Given** pointer:fine, **When** hovering a card, **Then** sibling opacity tweens to 0.18 within 300ms, hovered scales to 1.03-1.06, and WebGL overlay reaches `hover=1` within 300ms.
2.5 **Given** WebGL unsupported, **Then** thumbnail falls back to plain `<img>` with CSS scale hover only.
2.6 **Given** user clicks a card, **Then** `F2` page transition fires and URL becomes `/work/[slug]`.
2.7 **Given** `/work?filter=branding`, **Then** grid shows only cases whose `categories` includes `Branding`.
2.8 **Given** `prefers-reduced-motion`, **Then** parallax multipliers are all 1.00 and hover uses border-only.

Playwright:
- Screenshot grid at three viewports.
- `page.mouse.wheel(0, 800)` then assert column transforms via `getBoundingClientRect`.
- Hover a card; assert sibling opacity < 0.25 within 400ms.

---

## 3. Menu overlay

3.1 **Given** click on `MenuButton`, **Then** overlay reaches full coverage within 600ms.
3.2 **Given** overlay open, **Then** body scroll is locked and focus is on first nav item.
3.3 **Given** overlay open, **When** user presses ESC, **Then** overlay closes and focus returns to `MenuButton`.
3.4 **Given** overlay open, **When** user clicks any nav link, **Then** F2 route transition runs and overlay closes.
3.5 **Given** reduced motion, **Then** overlay uses opacity crossfade (no mask animation).
3.6 **Accessibility**: overlay has `role="dialog"` + `aria-modal="true"`; tab order is trapped.
3.7 **Given** ≤ 480px viewport, **Then** `RightEdgeCurve` is hidden and menu trigger sits as a simple button top-right.

Playwright:
- Open menu; assert `role=dialog` visible, focus on first item, `bodyOverflow === 'hidden'`.
- Press ESC; assert dialog gone, focus back on button.

---

## 4. Page transition

4.1 **Given** any `<Link>` click, **Then** gooey mask reaches peak ≤ 500ms.
4.2 **Given** transition complete, **Then** new route's first heading has focus (tabIndex=-1).
4.3 **Given** reduced motion, **Then** transition is 250ms opacity crossfade.
4.4 **Given** slow network, **Then** loading indicator appears under mask at peak and fades on content ready.

Playwright:
- Navigate via link click; assert URL changed and mask element removed from DOM within 1100ms.

---

## 5. Case detail page

5.1 **Given** `/work/[valid-slug]`, **Then** background is the case accent color (full bleed) or configured image.
5.2 **Given** page mounted, **Then** close-X is top-left and navigates back to `document.referrer` if same-origin, else `/work`.
5.3 **Given** title is present, **Then** it renders in bold sans-serif at ≥ 64px desktop.
5.4 **Given** page scrolled to bottom, **Then** `NextCase` appears with title of the subsequent case in the order.
5.5 **Given** slug not found, **Then** `notFound()` is triggered and 404 page renders.

Playwright:
- For each of 3 fixture slugs: navigate, screenshot hero, scroll to end, click NextCase, assert route changed to the expected next slug.

---

## 6. Work index (`/work`)

6.1 **Given** direct load of `/work`, **Then** grid contains all cases.
6.2 **Given** click a filter chip, **Then** grid filters and URL updates with `?filter=` param.
6.3 **Given** zero results, **Then** empty-state component renders with message and a clear-filter CTA.
6.4 **Given** browser back after filtering, **Then** prior filter state is restored from URL.

---

## 7. Cursor

7.1 **Given** `hover:hover, pointer:fine`, **Then** custom cursor element exists in DOM.
7.2 **Given** coarse pointer (touch), **Then** custom cursor is absent.
7.3 **Given** hovering a tile, **Then** cursor graphic variant is shown.
7.4 **Given** hovering a form input, **Then** native caret is used (custom cursor hidden).
7.5 **Given** reduced motion, **Then** cursor follows pointer instantly (no lerp).
7.6 **Accessibility**: native focus ring is still visible on keyboard focus regardless of cursor.

---

## 8. Forms (`ContactForm`)

8.1 **Given** empty required field on submit, **Then** inline error appears and first invalid field is focused.
8.2 **Given** valid submission, **Then** POST `/api/contact` returns 200 and success panel appears.
8.3 **Given** server 422, **Then** field-level errors are displayed from response.
8.4 **Given** server 500 or network error, **Then** a dismissable error banner shows below the submit button.
8.5 **Given** honeypot `hp` filled, **Then** server returns 200 silently and no email is sent.
8.6 **Given** user toggles a service chip, **Then** chip aria-pressed reflects state and array updates.
8.7 **Accessibility**: every field has a programmatic label; errors linked via `aria-describedby`.

---

## 9. Responsive

9.1 Zero horizontal scrollbars across breakpoints `360 / 480 / 640 / 768 / 960 / 1280 / 1440 / 1920`.
9.2 All text remains readable (≥ 14px on mobile, line-height ≥ 1.4 on body).
9.3 Tap targets ≥ 44×44 px on mobile.
9.4 Illustration and shader effects do not produce layout shift on resize.

---

## 10. Performance

10.1 LCP ≤ 2.5s on 4G throttled (Lighthouse mobile).
10.2 CLS ≤ 0.05 on all pages.
10.3 Interaction-to-Next-Paint (INP) ≤ 200ms on hover and click.
10.4 Initial JS bundle gz ≤ 150KB; per-route JS gz ≤ 40KB.
10.5 Images: proper `next/image` with width/height; lazy past fold.

---

## 11. Accessibility (global)

11.1 All routes pass `axe-core` with zero serious/critical violations.
11.2 Keyboard: tab order visits all interactive elements in DOM order.
11.3 Focus is visible with ≥ 3:1 contrast ring against background on all states.
11.4 No component's only visual affordance is color.
11.5 All images have meaningful `alt` unless decorative (`alt=""`).
11.6 Every form field labeled; errors announced via live region.
11.7 Video auto-play is muted and pauses when out of viewport.

---

## 12. SEO / metadata

12.1 Each route sets `<title>`, `<meta name="description">`, canonical URL, Open Graph image.
12.2 `/work/[slug]` sets OG image to case cover; no generic fallback.
12.3 `sitemap.xml` and `robots.txt` present and reachable.
12.4 JSON-LD `Organization` on root; `CreativeWork` on case pages.

---

## 13. Visual regression

For each of the following viewports, commit baseline screenshots in `tests/visual/__snapshots__/`:

- `home` at `1440x900`, `768x1024`, `390x844`
- `work-index` at each
- `case-detail` (3 fixtures) at `1440x900`, `390x844`
- `menu-open` at `1440x900`, `390x844`
- `404` at `1440x900`

Diff tolerance: 0.2% pixel diff for text regions, 1.0% for shader/animated regions.

---

## 14. Non-goals (explicit)

- No pixel-identical match to the reference. Family of look + behavior only.
- No copy, assets, or brand marks from the reference.
- No reference integrations or CMS.
