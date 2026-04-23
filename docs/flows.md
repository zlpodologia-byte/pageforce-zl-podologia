# Flows — Pageforce 2.0

> Observable flows to replicate. Each flow lists the trigger, the sequence of system
> responses, timing, and exit/reset conditions. Behavior only — no reference assets.

---

## F1 — Landing (`/`) first view

**Trigger**: direct navigation or hard refresh.

1. App shell mounts: PageFrame, Logo, MenuButton, RightEdgeCurve painted in idle state.
2. HeroModule mounts with kicker and illustration visible first.
3. `CategoryCycle` h1 starts at index 0 (first word hidden → slides up over 600ms).
4. Illustration's idle micro-animation begins after 400ms.
5. Cycling begins at T+2500ms: word i swaps to word i+1.
6. User scrolls → `ScrollIndicator` updates curve fill; `CaseGrid` activates parallax.

**Exit**: any route change, or user returns to idle after scrolling.

---

## F2 — Route navigation (any → any)

**Trigger**: `<Link>` click, browser back/forward, programmatic push.

1. `PageTransition` captures click; prevents default paint.
2. Origin mask seed = pointer position (or right-edge curve if keyboard).
3. Gooey mask grows from seed, covering viewport in `~400ms`.
4. Router navigates; new page renders offscreen.
5. New page crossfades in under mask (200ms at mask peak).
6. Mask retracts toward opposite edge in `~350ms`.
7. `aria-live` announces new route title.

**Exit**: mask fully collapsed, focus moved to new page's first focusable element.

**Reduced motion**: replaces mask with 250ms opacity crossfade.

---

## F3 — Menu open / close

**Trigger open**: click `MenuButton`, or press Enter/Space on its focused state.

1. `menuOpen = true`.
2. Gooey mask grows from button position, inverting page to near-black (duration 500ms).
3. Body locks scroll; focus moves to first menu item after mask completes.
4. Nav items stagger-in (50ms each, 80ms after mask, translate-up 24→0 + opacity).
5. Social links appear last (80ms stagger).
6. Right-edge curve invert color (coral → ivory).

**Trigger close**: click X (same position as hamburger), press ESC, click a nav link, navigate.

7. Mask retracts back to button position (450ms).
8. Body scroll unlocks.
9. Focus returns to `MenuButton`.

**Reduced motion**: replaces gooey mask with 200ms opacity crossfade; items appear at once.

---

## F4 — Case card hover (desktop, pointer:fine)

**Trigger**: pointer enters a `CaseCard`.

1. `focusedCardId = card.id`.
2. Sibling cards fade to opacity 0.18 (300ms).
3. Hovered card scales to 1.03 (250ms).
4. `ThumbnailWebGL.hover` tweens 0 → 1 over 250ms; shader applies displacement + RGB split.
5. `Cursor` swaps to graphic variant; slides in from the edge closest to pointer entry.
6. If card has `video`, start playback from 0, looped, muted.

**Exit**: pointer leaves card.

7. `focusedCardId = null`.
8. Shader fades out over 350ms.
9. Siblings fade back to opacity 1 over 300ms.
10. Scale returns to 1.0.
11. Video pauses after 400ms if still out of view.

**Reduced motion**: no shader, no scale, no dim. Border only to indicate hover.

---

## F5 — Case detail open (`/work/[slug]`)

**Trigger**: click on `CaseCard` or navigate directly.

1. F2 page transition plays.
2. New route is `CaseDetailPage`. Hero applies brand `accent` as full-bleed background.
3. Close-X tab top-left; if user has browser history, it links to origin (`document.referrer` if same-origin, else `/work`).
4. Title enters with line-by-line reveal (600ms, 80ms stagger); subtitle 200ms after.
5. Metadata strip fades in at bottom.
6. Scrolling reveals CaseContentBlocks with line-reveal grammar.
7. End of page: `NextCase` link.

**Exit**: click X (close), click NextCase, or browser back.

---

## F6 — Work index filter (`/work`)

**Trigger**: click a category chip in `FilterBar`, or click a category link under a `CaseCard`.

1. `active = category | 'All'`.
2. URL updates to `/work?filter=<slug>` via `router.replace` (no transition).
3. `CaseGrid` filters its input list and remounts items with staggered fade-in (30ms stagger).
4. Cards not in the new filter fade out first (200ms) before new cards fade in.
5. If 0 results, empty state appears with "Try another lens" copy.

**Exit**: select 'All' or another chip.

---

## F7 — Contact form submit (`/contact` or home `ContactGrid` → link)

**Trigger**: user submits `ContactForm`.

1. Client validation runs; invalid fields highlight with inline error.
2. If valid, `status = 'submitting'`, button label changes to "Sending…", button disabled.
3. POST `/api/contact` with JSON payload.
4. **Success** (200): form replaced by success panel; focus moved to panel heading.
5. **Validation error** (422): server errors merged into field state; focus first invalid.
6. **Server error** (5xx / network): inline error message below button; button re-enabled.

**Retry**: success panel offers "Send another message" to reset.

**Spam trap**: honeypot field `hp`; if filled, server silently returns 200 without sending.

---

## F8 — Reduced motion

**Trigger**: `matchMedia('(prefers-reduced-motion: reduce)').matches === true`.

- Smooth scroll inertia off (native scroll only).
- Parallax multipliers forced to 1.00.
- Shader hover effects replaced with 200ms opacity/scale crossfade.
- Cursor lerp replaced with instant follow.
- Page transitions replaced with 250ms fade.
- Menu transition replaced with 200ms fade.
- Cycling hero text still cycles but without translate — simple opacity swap, slower interval (4s).

---

## F9 — Mobile viewport (≤ 640px)

- Grid collapses to 1 column.
- No parallax.
- No custom cursor.
- Menu uses slide-in drawer (not gooey mask).
- Hero type scales fluid; illustration hides or shrinks to small decorative size.
- Case cards use native `<img>` / `<video>`; no WebGL overlay.

---

## F10 — Loading state during route change

**Trigger**: slow network during F2 route transition.

1. Mask reaches peak coverage.
2. Content not yet ready → show tiny centered loading indicator (blue ring, 16-20px) centered in viewport.
3. On content ready, indicator fades (150ms); mask retracts.

If content takes > 5s, show "Still working…" text with dismiss option.

---

## F11 — 404 / not found

Route `/[anything-unknown]` → NotFound page.

- Same shell (frame, logo, menu curve).
- Content: small kicker "404", big serif headline "Nothing here.", short copy, three quick links.
- Inherits F2 transition.

---

## F12 — Scroll-driven reveals

Any section with `data-reveal` enters the viewport:

1. IntersectionObserver fires at 15% visibility.
2. Text blocks apply line-clip reveal: each `.line span` translates from `translateY(110%)` to `0` with 50-120ms stagger.
3. Blocks without text lines use opacity+translate12px fade.
4. Reveal plays once per section (no re-reveal on scroll back up).

Under reduced motion: reveal is skipped; elements are visible by default.
