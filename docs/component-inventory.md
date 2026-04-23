# Component Inventory — Pageforce 2.0

> For each component: purpose, props/data contract, states, motion, a11y, responsive rules,
> and which module/page uses it. Reimplementation target: Next.js 15 App Router + TS + Tailwind v4.

---

## Shell / chrome

### `PageFrame`
- **Purpose**: persistent coral gradient frame overlay on all routes.
- **Props**: none.
- **States**: default only (gradient intensity may subtly vary by scroll, optional).
- **Motion**: none (static). Optional: gradient breathes at very low frequency (6-8s loop, ≤3% opacity delta).
- **a11y**: `aria-hidden`, `pointer-events: none`.
- **Responsive**: edges proportionally narrower on mobile.
- **Used in**: root layout.

### `Logo`
- **Purpose**: monogram / wordmark linking to `/`.
- **Props**: `variant: 'light' | 'dark'` (for inverted backgrounds).
- **States**: default, hover (slight scale or underline of sub-text).
- **Motion**: on hover, 200ms ease-out.
- **a11y**: `<Link aria-label>`; visible text.
- **Responsive**: shrinks ~20% on mobile.
- **Used in**: root layout.

### `MenuButton`
- **Purpose**: toggles the full-screen menu overlay.
- **Props**: `open: boolean`, `onToggle()`.
- **States**: closed (hamburger), open (X), hover (slight rotation).
- **Motion**: burger → X morph, 300ms cubic `(0.76,0,0.24,1)`.
- **a11y**: `aria-expanded`, `aria-controls`, keyboard operable.
- **Responsive**: always visible.
- **Used in**: root layout. Lives inside `RightEdgeCurve`.

### `RightEdgeCurve`
- **Purpose**: decorative vertical curve on right edge + mount point for `MenuButton`.
- **Props**: `progress: number (0-1)` bound to scrollY; `invert: boolean` when menu open.
- **States**: top-of-page (coral fill), scrolled (ink fill), inverted (ivory fill on dark menu).
- **Motion**: fill color interpolates with scroll progress.
- **a11y**: decorative, `aria-hidden`.
- **Responsive**: narrower curve on mobile; hidden ≤ 480px.
- **Used in**: root layout.

### `MenuOverlay`
- **Purpose**: full-screen dark nav panel.
- **Props**: `open: boolean`, `items: NavLink[]`, `socials: Social[]`, `onClose()`.
- **States**: closed (hidden), opening (mask growing), open, closing (mask retracting).
- **Motion**: Paper.js-equivalent gooey mask from button position; duration 450-600ms ease-out.
  Items fade/translate-up with 50ms stagger after mask completes (150ms delay).
- **a11y**: `role="dialog"`, `aria-modal`, focus trap, first item focused on open, ESC closes,
  return focus to trigger on close.
- **Responsive**: on mobile, use a simpler clip-path circle reveal (no Paper.js) for performance.
- **Used in**: root layout.

### `PageTransition`
- **Purpose**: animates between routes with gooey wipe.
- **Props**: wraps `{children}`; keys by pathname.
- **States**: entering, entered, exiting, exited.
- **Motion**: 600-900ms gooey mask from right edge; content fade 250ms during mask peak.
- **a11y**: announces new page title to `aria-live` region.
- **Responsive**: on mobile, simple fade 300ms.

### `ScrollIndicator`
- **Purpose**: visual progress for scroll depth, bound to right-edge curve fill.
- **Behavior**: updates curve color/fill based on scrollY / scrollHeight.

### `Cursor`
- **Purpose**: custom graphic cursor.
- **Props**: none; reads from window events.
- **States**: default (hidden / native), `hover:link`, `hover:tile`, `hover:tile-enter-from-{top|right|bottom|left}`.
- **Motion**: lerp 0.15 toward pointer position.
- **a11y**: decorative; never hides native focus; disabled on `pointer: coarse` and inside form inputs.
- **Responsive**: desktop only (`hover: hover, pointer: fine`).

---

## Homepage modules

### `HeroModule`
- **Purpose**: big editorial opener.
- **Props**: `kicker: string`, `categories: string[]`, `illustration: ReactNode`.
- **States**: initial (letters masked), entered, cycling.
- **Motion**: on mount, kicker fades up 500ms; illustration draws/fades in 800ms; h1 slides up
  600ms then starts cycling at 2.5s interval. Dots under animate with cycle.
- **a11y**: `h1` contains live text for SR (announces each cycle via polite live region).
- **Responsive**: illustration scales fluid; h1 size `clamp(44px, 9vw, 120px)` on mobile.

### `IllustrationTwoFigures`
- **Purpose**: SVG illustration of two idle figures (our original drawing — not a copy).
- **Props**: `idle: boolean` to toggle micro-animation.
- **Motion**: loop of subtle arm/head movements, 4-6s cycle, desynced between figures.
- **a11y**: decorative.

### `CategoryCycle`
- **Purpose**: cycle through an array of words.
- **Props**: `words: string[]`, `interval: number = 3000`, `as: 'h1' | 'h2' = 'h1'`.
- **States**: `i` current index.
- **Motion**: out: translate-up + fade (300ms); in: translate-up + fade (400ms); overlap by 80ms.
- **a11y**: live region `polite`.

### `PaginationDots`
- **Purpose**: horizontal dots showing cycle index.
- **Props**: `count: number`, `active: number`.
- **States**: active dot filled; others hollow with low opacity.
- **Motion**: 300ms ease-out when switching.

### `CaseGrid`
- **Purpose**: parallax 3-column grid.
- **Props**: `cases: CaseItem[]`, `columns?: number = 3`, `parallax?: [number, number, number] = [0.85, 1, 1.15]`.
- **States**: default; `focus-card: id | null` (for hover-focus dimming).
- **Motion**: each column transformed by scrollY × multiplier on rAF.
- **a11y**: underlying DOM order is semantic (cards linear); visual parallax is decorative only.
- **Responsive**: 3 → 2 → 1 column. Parallax off < 960px.

### `CaseCard`
- **Purpose**: thumbnail + title + category links.
- **Props**: `item: CaseItem`, `aspect: 'portrait' | 'landscape' | 'square'`, `onHover(id|null)`.
- **States**: default, hovered (focus), dimmed (not hovered when a sibling is hovered), pressed.
- **Motion**: on hover-in, subtle scale `1.03-1.06` over 200ms + WebGL overlay fade-in 200ms;
  on hover-out, scale back + overlay fade-out 300ms. Sibling dim: opacity to 0.18 over 250ms.
- **a11y**: `<Link>` wraps the entire card; `aria-label` summarizes.

### `ThumbnailWebGL`
- **Purpose**: WebGL overlay that applies subtle displacement + RGB split on hover.
- **Props**: `src: string`, `videoSrc?: string`, `hover: number (0-1)`, `pointer: {x,y}`.
- **Behavior**: renders image/video texture. On hover > 0, applies noise-based displacement
  scaled by `hover`, channel offset `5-12px`, mild vignette, optional scale `1.03-1.06`.
- **Fallback**: plain `<img>`/`<video>` if WebGL unsupported.
- **Perf**: one shared WebGL context across the grid using a DOM→WebGL sync pattern, OR per-card
  canvas with IntersectionObserver pause. Pick the cheaper option at implementation time.

### `CategoryLinks`
- **Purpose**: inline underlined links per card; also filter control on `/work`.
- **Props**: `categories: Category[]`, `active?: Category`, `onSelect?(c)`.
- **States**: default, active (bolder), hover (fully underlined).

### `DeepDiveSplash`
- **Purpose**: dark pitch block.
- **Props**: `title`, `body`, `ctaLabel`, `ctaHref`, `image?`.
- **States**: default, hover on CTA.
- **Motion**: on enter viewport, background translate-up 12px to 0 over 800ms.

### `ContactGrid`
- **Purpose**: 4-quadrant contact block on home footer.
- **Props**: `items: ContactBlock[]`, `illustration: ReactNode`.
- **States**: default, hover per block (underline + slight shift).

---

## Work index page

### `WorkIndexPage`
Uses `CaseGrid` with all cases and a `FilterBar` atop.

### `FilterBar`
- **Purpose**: category filter.
- **Props**: `categories: Category[]`, `active: Category | 'All'`, `onChange(c)`.
- **States**: default, active pill, hover.
- **Responsive**: wraps; horizontal-scroll on mobile.

---

## Case detail page

### `CaseHeader`
- **Purpose**: full-bleed hero of a case.
- **Props**: `title, subtitle, accent, closeHref, metadata: {type[], client, deliverables[]}`.
- **Layout**: X-tab top-left, logo below, big bold sans title center, subtitle beneath, metadata row at bottom.
- **Motion**: on mount, title slides up 600ms; metadata fades in 200ms later.

### `CaseContentBlock`
- **Purpose**: one of several content block shapes.
- **Variants**:
  - `full-image`
  - `full-video`
  - `two-col` (image + text)
  - `centered-copy` (cream band)
  - `headline` (dark, big bold sans, optional strikethrough accent)
  - `grid-images`

### `NextCase`
- **Purpose**: bottom link to next case in sequence.
- **Motion**: on hover, title nudges right 4px; click triggers `PageTransition`.

---

## Services / About / Stories / Product — light scaffolds

Each of these shares the site chrome. Their internal modules are simpler editorial stacks:

- `ServiceList` (one block per discipline)
- `TeamList` (photo + role + name)
- `JournalList` (date + kind + title + read-time)
- `ProductSplash` (big pitch for their internal product)

---

## Forms

### `ContactForm`
- Fields: `name*`, `email*`, `company`, `budget`, `services[]` (toggle pills), `message*`, honeypot `hp`.
- Client-side validation mirrors server.
- States: idle, submitting, success, error.
- Submits JSON to `/api/contact` Route Handler.

---

## Navigation / Footer

### `TopLogo`, `MenuButton`, `MenuOverlay` — see Shell.

### `Footer`
- Offices (4 cities), Contacts (new projects, press, careers, general), Social, copyright, build credit.
- Layout: 3-4 columns on desktop, stacks on mobile.

---

## Content model

```ts
type Category = 'Products' | 'Experiences' | 'Branding' | 'Platform' | 'E-commerce';

interface CaseItem {
  slug: string;
  title: string;
  client: string;
  year: number;
  categories: Category[];
  summary: string;           // 1-2 sentences
  cover: string;             // image url
  video?: string;            // optional video url for hover loop
  accent: string;            // hex, used as case brand color
  aspect: 'portrait' | 'landscape' | 'square';
  column?: 0 | 1 | 2;        // preferred column (for grid layout hinting)
  content: CaseBlock[];      // detail page blocks
  roles: string[];           // disciplines involved
  bgMode?: 'dark' | 'light' | 'accent';
}

type CaseBlock =
  | { kind: 'image'; src: string; alt: string; full?: boolean }
  | { kind: 'video'; src: string; poster?: string; full?: boolean }
  | { kind: 'copy'; heading?: string; body: string; align?: 'left'|'center'; tone?: 'cream'|'dark'|'plain' }
  | { kind: 'two-col'; left: CaseBlock; right: CaseBlock }
  | { kind: 'headline'; text: string; accent?: 'strike' | 'underline' | 'none'; tone?: 'dark'|'light' }
  | { kind: 'grid'; images: { src: string; alt: string }[]; cols?: 2 | 3 | 4 };
```

---

## Global states (app store)

- `menuOpen: boolean`
- `routeTransition: 'idle' | 'entering' | 'exiting'`
- `focusedCardId: string | null`
- `scrollProgress: number (0-1)`
- `pointer: {x, y}`, `pointerDown: boolean`
- `reducedMotion: boolean` (derived from media query)

Implementation note: small Zustand store (or plain React context) is sufficient. No Redux.
