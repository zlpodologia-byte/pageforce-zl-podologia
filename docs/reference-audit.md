# Reference Audit — Pageforce 2.0 (hellomonday.com behavior study)

> **Purpose.** Describe what the reference site *does* so we can reimplement the same functions
> and behavior in our own codebase. **No code, assets, copy, marks or third-party integrations
> from the reference are to be used.** Only technique, structure and behavior are documented here.
> All timings and parameters are best-estimate ranges, to be refined during implementation.

---

## 1. Stack signals (observed)

- **Frontend**: TypeScript SPA, monolithic bundle (`/build/js/main-*.js`). No Next/Nuxt/Gatsby
  markers. Custom router, likely hand-rolled history API + data-boot pattern.
- **Backend**: Symfony + Twig templating, Contentful as CMS. *Not relevant for our reimpl* —
  we use Next.js 15 App Router + local typed content (mdx/json) with a swap-ready CMS adapter.
- **Motion stack**: GSAP for scroll-triggered and timeline animation; PixiJS for one specific
  effect on thumbnails; Paper.js for organic mask shapes and gooey page transitions.
- **Analytics**: Plausible (cookieless), Cloudflare insights.
- **Hosting**: Heroku + CDN. Not relevant to our reimpl (Vercel / Netlify / Cloudflare Pages).

---

## 2. Design tokens

### 2.1 Color

| Role | Value (observed) | Our token |
|---|---|---|
| Canvas | `#ffffff` | `--color-canvas` |
| Ink | `#000000` | `--color-ink` |
| Muted ink / fades | `~#9c9c9c` | `--color-muted` |
| Hairline | `~#e6e2d8` (warm off-white line) | `--color-line` |
| Accent-warm (page frame) | soft salmon/coral gradient | `--color-frame` |
| Menu canvas (inverted) | `#0a0a0a` / near-black | `--color-canvas-invert` |
| Menu ink (inverted) | `#f5efe3` (warm ivory) | `--color-ink-invert` |

The persistent viewport **coral frame** is not a border — it's a fixed-position gradient element
drawn on every screen, visible underneath page content on all four edges. Intensity is higher on
left/right edges, softer on top/bottom. It **does not scroll**.

Reference uses no visible brand accent color. Accent is delegated to project imagery.

### 2.2 Typography

| Role | Reference family | Our substitute (open-licensed) |
|---|---|---|
| Display serif | Clarendon BT (wedge-serif) | `Ibarra Real Nova` or `Roslindale Deck Text` |
| Sans | NB International Pro Light / Regular | `Söhne-like` → `Inter Tight` as fallback, or `Neue Haas Grotesk` if licensed |
| Mono | *not used* | — |

Observed computed styles:

- `body`: font-family = sans, size **22px**, color `#000`, bg `#fff`.
- `h1` (hero cycling category word): serif, size **80px** desktop, weight **300**, line-height
  **64px** (ratio ~0.80 — very tight leading, high-density editorial setting).
- Body paragraphs: serif-*free* sans, size ~**22px**, line-height ~**1.45**.

### 2.3 Scale & rhythm

- Columns on homepage grid: **3 columns × 407px wide**, fixed column positions at roughly
  `x=75 / 565 / 1055` in a 1536px viewport. **Column gap ≈ 83px**. Outer page padding ≈ 75px.
- Card aspect ratios observed (all at 407px wide): **607, 579, 326, 299, 271, 634px tall**.
  Simplified to **three canonical ratios**: `4:6` (portrait), `~4:3` (landscape), `~4:4.5` (near-square).
- Vertical rhythm: card-to-card gap within a column ≈ **150-250px**. Columns **stagger vertically**
  so each column has a different leading card offset → creates a natural waterfall rhythm.

### 2.4 Motion curves & durations

| Interaction | Duration | Easing |
|---|---|---|
| Menu open / close | 450-600ms | ease-out (Paper.js mask) |
| Case detail open | 350-600ms | ease-out (gooey) |
| Line-reveal on scroll | 500-900ms per line, 50-120ms stagger | cubic `(0.16, 1, 0.3, 1)` |
| Thumbnail hover in | 180-300ms | ease-out |
| Thumbnail hover out | 250-400ms | ease-out |
| Cursor follower lerp | `0.12-0.20` per frame (~120-220ms settle) | linear lerp |
| Scroll column parallax | continuous, multipliers `0.85 / 1.00 / 1.15` | native scroll |

---

## 3. Structural map

### 3.1 Routes observed

```
/                       Home — hero + case grid + pitch + contact
/work                   All cases (grid only, same 3-col layout)
/work/[slug]            Individual case — full-bleed editorial page
/services               Services index (not audited in depth)
/about                  About (not audited in depth)
/stories                Journal (not audited in depth)
/product                Product page (not audited in depth)
```

### 3.2 Root DOM architecture

```
<body>
  <div class="app">
    <div class="container sizeBlock" aria-hidden="true" />   ← grid overlay (dev)
    <div class="logo" />                                     ← abs top-left, z:5
    <nav class="MainMenu" />                                 ← abs top-right, z:5
    <nav class="items" hidden />                             ← fixed overlay, z:667 (full menu)
    <div class="overlayContainer">
      <div class="dim" />                                    ← fixed dim overlay
    </div>
    <div class="template {PageTemplate}">
      <div class="moduleContainer">
        <section class="HeroModule" />
        <section class="CaseGridModule" />
        <section class="DeepDiveSplashModule" />
        <section class="ContactGridModule" />
      </div>
    </div>
    <div class="scrollIndicator" />                          ← absolute curve on right edge
    <footer />
  </div>
</body>
```

### 3.3 Module types (re-implementable)

| Module | Purpose | Rules |
|---|---|---|
| `HeroModule` | Opening statement with cycling category word and animated SVG | See §4.1 |
| `CaseGridModule` | Parallax 3-column waterfall grid of case cards | See §4.2 |
| `DeepDiveSplashModule` | Big dark call-out section for product/service pitch | See §4.3 |
| `ContactGridModule` | 4-quadrant contact grid with illustration | See §4.4 |
| `CaseHeaderModule` | Full-bleed hero on case detail | See §4.5 |
| `CaseContentModule` | Editorial content blocks (video, image, copy) | See §4.6 |

---

## 4. Module specifications

### 4.1 HeroModule

**Purpose.** One-screen opener that communicates the studio and cycles through service pillars.

**Structure.**
- Small kicker copy above.
- Hand-drawn SVG illustration, centered.
- Large serif `<h1>` under illustration, content cycles through a fixed list of words.
- Pagination dots under the word indicating which category is showing.

**Behavior.**
- Word cycles every ~2.5-3.5s. Outgoing word fades/slides up and out; incoming word fades/slides
  up and in. Height of slot does not jump between words of different widths — slot is a fixed
  max-height.
- Dots below reflect position in the cycle (1 of N active).
- SVG illustration has a **continuous idle micro-animation** (small sway, blink, gesture). Two
  characters animate independently. Paths animated via transform-origin on grouped elements,
  not full re-path morph.
- Category list for cycle (our content): `Products / Platforms / Branding / Experiences / E-commerce`.

**Acceptance refs.** §Acceptance 1.1–1.4.

### 4.2 CaseGridModule

**Purpose.** Long, scroll-parallax showcase grid of case cards.

**Structure.**
- Three vertical columns, each an absolutely-positioned stack of card cells.
- Columns are painted from the same card pool but each column has its own Y offset and
  parallax multiplier.
- Each card: thumbnail (image or muted video) + title (serif) + inline category links (sans, underlined).

**Behavior.**
- Columns scroll at different speeds relative to native scroll (`0.85 / 1.00 / 1.15x`) to create
  vertical parallax. Implement by translating each column's transform proportional to scrollY.
- On card hover (desktop, pointer:fine):
  - Hovered card: stays at full opacity, a subtle PixiJS-equivalent displacement + scale shader
    overlays the thumbnail (scale `1.03-1.06`, channel drift `~5-12px`, duration `180-300ms`).
  - All other cards: fade to `~15-20% opacity`, no shader. Crossfade duration `200-300ms`.
  - Cursor changes to a **graphic marker** (small drawn face/icon). See §6.
- On card click: navigate to `/work/[slug]` via page transition (§5.2).
- Categories below each card are links; clicking one filters the grid (or routes to `/work?filter=X`).

**Responsive.** Three cols → two cols at ≤ 960px → one col at ≤ 640px. Parallax disabled at mobile.

**Acceptance refs.** §Acceptance 2.1–2.6.

### 4.3 DeepDiveSplashModule

Full-bleed dark rectangular block spanning content width. Serif title, body copy, single CTA underline link ("Discover more"). Used to pitch an internal product or service offering.

### 4.4 ContactGridModule

Four-quadrant grid:

```
[ illustration ] [ Q1: collaborate ] [ Q2: say hi ]
                 [ Q3: join us      ] [ Q4: learn  ]
```

Each quadrant: small sans label (italicized, muted), bold sans sub-heading, large serif email/CTA.

### 4.5 CaseHeaderModule

Full-bleed case hero:
- **Background**: brand color takeover OR textured dark image, always full width.
- Close-X affordance top-left (tabbed shape, returns to origin route).
- Logo top-left under the X.
- Center: massive bold **sans-serif display** title (NB International Bold equivalent) — note
  this is different from the home hero which uses the serif. Case titles break character on purpose.
- Bottom strip: metadata row `• Launch project | Type: … | Client: … | Deliverables: …`

### 4.6 CaseContentModule

Stacked editorial blocks: full-width video, full-width image, two-column text+image, centered copy band (often on warm cream background), headline-only section (on dark, with kinetic strikethrough).

---

## 5. Site-wide behaviors

### 5.1 Persistent UI

- **Page frame** (coral gradient): fixed, always visible, never interactive.
- **Logo** (top-left): always visible, links to `/`. Changes to white on dark backgrounds (menu open, case takeover).
- **Menu button** (top-right): hamburger → X on open. Lives inside the right-edge scroll curve.
- **Right-edge curve + scroll indicator**: persistent decorative curve. Its *fill* morphs with
  scroll progress (starts coral at top, transitions to solid ink as you scroll through the page).
  Contains the menu toggle.

### 5.2 Page transitions

All route changes go through a **gooey blob wipe** masked by an SVG/canvas path from Paper.js
(or ported to CSS clip-path + SVG filter in our reimpl):

1. Outgoing page: content fades to opacity 0 under the mask.
2. Mask grows from pointer position (or from right-edge curve) as an organic blob.
3. New route content renders underneath and mask retracts in opposite direction.
4. Total duration: **~600-900ms**. During transition a loading spinner may appear if content isn't ready.

### 5.3 Menu overlay

- Trigger: click hamburger button.
- Opens as a **fullscreen dark overlay** with the same gooey paper mask (circle grows from button).
- Nav items (Work / Services / About / Stories / Product) stacked, **very large serif** (white
  ink on dark), right-of-center positioned (~55% from left).
- Social links at bottom: small sans, muted.
- Close: X button inside right-edge curve (same place hamburger was), or ESC key.
- Gooey animation reversed on close.

### 5.4 Smooth scroll

- **Native scroll**, not hijacked. Scroll feel is standard OS scroll.
- GSAP is used only to transform elements DURING native scroll (parallax multipliers), not to
  override scroll itself.
- Anchor-link scrolls use smooth scroll behavior.
- Respect `prefers-reduced-motion` — disable parallax, mask-wipes, and cursor lerp.

---

## 6. Cursor

- **Default**: native arrow.
- **On interactive** (links, card tiles): swaps to a **custom graphic cursor** — a small
  hand-drawn face/doodle SVG that floats with pointer.
- **Ingress direction**: when the pointer enters a card tile from a specific edge, the face
  slides in from that edge rather than just fading — this is a clear ingestion-direction cue.
- **No text labels** ("View project" etc.) observed on the reference cursor — it's graphic-first.
- **Lerp**: `~0.15` per frame on rAF. Don't stiffen past `0.25` — the soft lag is part of the
  character.
- **Hide on**: focus-within form fields, inside scrollable inner regions, and on touch devices.

---

## 7. Responsive breakpoints

| Width | Behavior |
|---|---|
| ≥ 1280px | 3-col grid, full parallax, custom cursor, all motion. |
| 960-1280px | 3-col grid, parallax reduced (multipliers closer to 1.00), cursor still active. |
| 640-960px | 2-col grid, parallax disabled, cursor still active if pointer:fine. |
| ≤ 640px | 1-col grid, no parallax, native cursor, simpler menu (slide-in drawer instead of gooey). |

Illustrations scale to viewport width with `vw` clamps. Typography uses `clamp()` for fluid display type.

---

## 8. Accessibility requirements

- All interactive elements have keyboard focus styles (visible ring).
- Menu opens on Enter/Space, closes on Esc.
- Route transitions announce new page title via `aria-live` region.
- Custom cursor is purely decorative and does not replace native focus indication.
- Parallax and mask-wipes fully disabled under `prefers-reduced-motion: reduce`.
- All text meets WCAG 2.1 AA contrast (black on white, white on near-black — both well above ratio).
- Illustrations are decorative (`aria-hidden`).

---

## 9. Performance budgets

- **Hero LCP**: under 1.2s on cable, under 2.5s on 4G.
- **Grid thumbnails**: lazy-load past fold. Videos: `preload="metadata"`, autoplay only on in-view.
- **JS initial bundle**: ≤ 120KB gz (scaffolded project already measures 102-125KB — within budget).
- **CLS**: 0 on hero. Reserve space for cycling word via fixed-height slot.
- **Fonts**: subset display serif to Latin basic + punctuation; `font-display: swap`.

---

## 10. Out-of-scope (for reimplementation)

- Any reference content (copy, images, video, brand marks, case studies).
- Reference fonts (Clarendon BT / NB International are licensed — we use open substitutes).
- Reference analytics, CMS, or backend.
- Reference hostnames, URLs, SEO metadata.
