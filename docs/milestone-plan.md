# Milestone Plan — Pageforce 2.0

> Handoff document for Codex. Claude (orchestrator) writes/maintains this file; Codex
> executes one milestone per thread. Do not merge two milestones into one thread.

## Rules for Codex threads

- Read `docs/reference-audit.md`, `docs/component-inventory.md`, `docs/flows.md`,
  `docs/acceptance-tests.md` before coding.
- One milestone per thread. Do not touch files outside the milestone's scope.
- Use **Plan mode** first, propose the file list + steps, wait for approval before coding.
- Every milestone ends with: typecheck passing, lint passing, build passing, and matching
  Playwright tests passing. If any of those fails, the thread is not done.
- Log decisions in `CHANGELOG-CLONE.md` per milestone.
- Do not reuse copy, images, video or brand marks from the reference site.
- Substitute fonts: use open-licensed families (see audit §2.2). Commit `fonts.ts`.
- Respect `prefers-reduced-motion` on every motion primitive.

---

## M0 — Reset & foundation (Claude-led)

**Scope**: rewrite of current scaffold to match the audit's palette and architecture
decisions. Most of the repo is replaced.

**Tasks** (Claude does these personally, not Codex):
- Replace `globals.css` with light palette + coral frame tokens from audit §2.
- Wire `PageFrame`, `RightEdgeCurve`, `Logo` shells at the root layout.
- Add fonts (open-licensed substitutes) via `next/font`.
- Add `Zustand` (or Context) app store for `menuOpen`, `focusedCardId`, etc.
- Remove the dark-themed components from the previous scaffold that won't be reused.
- Confirm build passes.

**Deliverable**: a light, framed empty layout that compiles and matches audit §2 tokens.

---

## M1 — Custom cursor + reveal grammar (Codex)

**Files**: `components/cursor/*`, `components/reveal/*`, `app/globals.css` (sections only).

**Tasks**:
- `Cursor` component with lerp 0.15, graphic variant on `[data-cursor-target]` elements.
- Ingress-direction animation (4 enter vectors) using `pointerenter` rect math.
- Respect `pointer: coarse` and `prefers-reduced-motion`.
- `Reveal` component with line-mask and fade-up variants; stagger API; one-shot observer.
- Playwright smoke tests for both.

**Acceptance**: items 7.1-7.6 and 12.2 in `acceptance-tests.md`.

---

## M2 — Menu overlay + right-edge curve + page transition (Codex)

**Files**: `components/menu/*`, `components/page-transition/*`, `components/right-edge-curve/*`.

**Tasks**:
- `RightEdgeCurve` bound to scroll progress; accepts `invert` prop.
- `MenuButton` burger↔X morph.
- `MenuOverlay` with Paper.js-style gooey mask (approximate with SVG + filter + goo, or
  a mask path tween — implementer's call; document trade-off in CHANGELOG).
- Focus trap, ESC close, stagger-in items.
- `PageTransition` wrapping `{children}`; keys by pathname; dispatches `aria-live` announcements.
- Reduced-motion fallback (opacity only).
- Playwright: open/close menu, navigate with transition.

**Acceptance**: items 3.1-3.7 and 4.1-4.4.

---

## M3 — Hero module + category cycle + SVG illustration (Codex)

**Files**: `components/hero/*`, `app/page.tsx` (hero section only).

**Tasks**:
- `HeroModule` with kicker, SVG illustration placeholder (two figures, simple line-drawn,
  original art — commit as `public/illustrations/hero-figures.svg`), `CategoryCycle` H1, `PaginationDots`.
- Illustration idle micro-animation via CSS transforms on grouped SVG paths.
- Cycle interval 3000ms; word translate-fade transition.
- Playwright visual for home-hero at 3 viewports + cycle test.

**Acceptance**: items 1.1-1.6.

---

## M4 — Case grid with parallax + hover dimming (Codex)

**Files**: `components/case-grid/*`, `components/case-card/*`, `lib/cases.ts`, `app/page.tsx` (grid section), `app/work/page.tsx`.

**Tasks**:
- Typed data in `lib/cases.ts` conforming to audit's `CaseItem` contract. Seed with ≥ 12 cases.
- `CaseGrid` with 3/2/1 column responsive layout + column parallax multipliers.
- `CaseCard` with aspect variants and focus-dimming behavior.
- Filter chip bar on `/work`; `?filter=` query param syncing.
- Playwright: column counts at breakpoints, parallax translation, dimming on hover.

**Acceptance**: items 2.1-2.8 and 6.1-6.4.

---

## M5 — WebGL hover overlay (Codex)

**Files**: `components/thumbnail-webgl/*`, shader in `components/thumbnail-webgl/frag.glsl.ts`.

**Tasks**:
- `ThumbnailWebGL` using OGL (already installed) with displacement + RGB split + mild scale.
- Hover tween 0→1 driven from parent `CaseCard`.
- Fallback `<img>` when WebGL unavailable.
- Shared canvas or per-card canvas — implementer's call; justify in CHANGELOG.
- Pause via IntersectionObserver when off-screen.

**Acceptance**: items 2.4, 2.5, 10.3.

---

## M6 — Case detail page (Codex)

**Files**: `app/work/[slug]/page.tsx`, `components/case-header/*`, `components/case-content/*`.

**Tasks**:
- Route with `generateStaticParams` over cases.
- `CaseHeader` (bold sans title, close-X, metadata row).
- `CaseContentBlock` variants: image, video, two-col, centered-copy, headline, grid.
- `NextCase` component at bottom.
- Reveal grammar applied to content blocks.

**Acceptance**: items 5.1-5.5.

---

## M7 — Deep-dive splash + contact grid + footer (Codex)

**Files**: `components/deep-dive-splash/*`, `components/contact-grid/*`, `components/footer/*`.

**Tasks**:
- Build the remaining home sections per audit §4.3-4.4.
- Illustration asset for contact area (SVG, original).
- Footer with offices, contacts, social, copyright.

**Acceptance**: visual-regression snapshots of full home scroll.

---

## M8 — Internal pages (Services / About / Stories / Product) (Codex)

**Files**: `app/services/page.tsx`, `app/about/page.tsx`, `app/stories/page.tsx`, `app/product/page.tsx`, supporting components.

**Tasks**:
- Editorial stacks per audit.
- Keep scope tight: list-based layouts. No bespoke heavy motion.

**Acceptance**: items 11.1, 12.1.

---

## M9 — Contact form + API route + honeypot (Codex)

**Files**: `app/contact/page.tsx`, `components/contact-form/*`, `app/api/contact/route.ts`.

**Tasks**:
- Re-implement `ContactForm` and `/api/contact` within the new design language.
- Replace Resend stub with a real adapter if env var present, else log and 200.

**Acceptance**: items 8.1-8.7.

---

## M10 — Responsive polish + reduced motion + a11y audit (Codex)

**Tasks**:
- Implement every `prefers-reduced-motion` branch.
- Ship the responsive table from audit §7 and verify visually.
- Run `axe-core` via Playwright on every route; fix serious/critical.

**Acceptance**: items 8.1-9.4, 11.1-11.7.

---

## M11 — Visual regression + performance budgets + release (Codex)

**Tasks**:
- Playwright visual baselines for section 13.
- Lighthouse CI budget gate: LCP/CLS/INP thresholds.
- `sitemap.xml`, `robots.txt`, OG images, JSON-LD.
- Production build; deploy to Vercel preview; final QA.

**Acceptance**: items 10.1-10.5, 12.1-12.4, 13.

---

## Dispatch prompt templates for Codex

### Opening any milestone (Plan mode)

```
/plan

Read:
- docs/reference-audit.md
- docs/component-inventory.md
- docs/flows.md
- docs/acceptance-tests.md
- docs/milestone-plan.md (focus on milestone M{N})

Objective:
Implement milestone M{N} per its scope. Do not touch files outside the scope.

Deliver:
1. A list of files you will create/modify.
2. A step-by-step sequence with bite-sized steps.
3. The Playwright tests you will add for the acceptance criteria named in the milestone.
4. Open questions (if any) before I approve.

Do not write any code yet.
```

### Execute after Plan approval

```
Proceed with the approved plan for M{N}. Rules:
- TypeScript strict; no any.
- Respect prefers-reduced-motion on every motion primitive.
- Ship Playwright tests alongside the code.
- Run lint, typecheck, build and tests before declaring done.
- Log a short note in CHANGELOG-CLONE.md with decisions and trade-offs.
```

### After milestone

```
Produce a short summary:
- Files touched
- Trade-offs taken (especially shader/mask implementation choices)
- Test coverage added
- Anything you believe the orchestrator should review
```
