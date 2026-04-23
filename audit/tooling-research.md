# 2026 Tooling Research: AI-Assisted Reverse Engineering of Premium Interactions

**Date:** 2026-04-18
**Focus:** Capturing + reproducing complex MOTION/INTERACTION (not static layout). Target: hellomonday.com-style liquid/jelly card warp on hover.
**Stack baseline:** Claude Code (orchestrator) + Codex CLI (worker) + Chrome MCP (backgrounded, animation-throttled).

---

## Top 5 Tools

### 1. Chrome DevTools MCP (official Google)

**What it is.** The official MCP server from the Chrome DevTools team, exposing 29 tools in a headed Chromium. Categories: input (click/drag/hover/type), navigation, **performance tracing** (`performance_start_trace`, `performance_stop_trace`, `performance_analyze_insight`), network (`list_network_requests`, `get_network_request`), debugging (`evaluate_script`, console), emulation, and screenshots. Repo: `ChromeDevTools/chrome-devtools-mcp`.

**Advantage over our setup.** Runs a **foreground-visible Chromium** (`--headless=false` is the default), so `requestAnimationFrame` runs at 60 fps — no power-saver throttling. It also exposes native DevTools performance traces: we can start a trace, hover a card, stop, and get the actual animation/paint timeline + long-task data. Our `mcp__Claude_in_Chrome` has no `performance_start_trace` and no trace analysis. Bonus: `evaluate_script` lets us monkey-patch `requestAnimationFrame` / `performance.now` to dump per-frame transform matrices of the target card — something we cannot reliably do with a throttled background tab.

**Install.**
```bash
# Claude Code plugin (preferred - gets MCP + skills)
/plugin marketplace add ChromeDevTools/chrome-devtools-mcp
/plugin install chrome-devtools-mcp

# Or MCP-only
claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest
```

**Demo / docs.** https://developer.chrome.com/blog/chrome-devtools-mcp
**Repo.** https://github.com/ChromeDevTools/chrome-devtools-mcp
**Limitation.** No first-class "Animations panel" tool — you get the raw trace, not the DevTools Animations inspector. No WebGL-specific tool either.
**Claude Max + Codex Pro?** Yes for Claude. For Codex, use `codex mcp add` or run it as an MCP server from Codex's MCP list.

**Recommendation: ADOPT NOW.** Directly fixes the "background tab throttle" bottleneck.

---

### 2. Playwright MCP (`@playwright/mcp`) + Trace Viewer

**What it is.** Microsoft's official Playwright MCP, now distributed as the `Playwright` Claude plugin (claude.com/plugins/playwright, 150K+ installs). Drives a real headed browser via the accessibility tree (token-efficient vs screenshots). Paired with Playwright's native **Trace Viewer** and v1.59's `page.screencast`, you get per-frame DOM snapshots, screencasts, and a full interaction timeline.

**Advantage over our setup.** Three things:
(a) **Real interaction capture.** `page.hover()` + `page.mouse.move()` run in a foreground browser — no throttling. v1.59 added on-demand video (`--save-video=800x600`) so the agent gets an actual MP4 of the jelly effect, not a stop-motion of screenshots.
(b) **Trace Viewer = frame-by-frame replay** with DOM snapshots at each action. You can scrub the hover animation and read the exact transform string mid-animation.
(c) **Codegen** — Playwright's recorder translates human interaction into code, which Codex can then run programmatically to loop, scrub, and diff.

**Install.**
```bash
# Claude plugin
/plugin install playwright            # or via claude.com/plugins/playwright

# Codex CLI MCP (more token-efficient)
npm i -g @playwright/mcp @playwright/cli
codex mcp add playwright npx @playwright/mcp@latest --caps=devtools
```

**Demo.** https://trace.playwright.dev/ (public Trace Viewer)
**Docs.** https://playwright.dev/docs/trace-viewer · https://claude.com/plugins/playwright
**Claude Max + Codex Pro?** Yes to both. Codex has explicit Playwright examples in its subagent guide.

**Recommendation: ADOPT NOW.** This is the primary capture tool for motion.

---

### 3. Perfect-Web-Clone (Eric Shang) — multi-agent SDK clone

**What it is.** Open-source agent (MIT) built on Claude Agent SDK with 40+ tools and a coordinator-worker pattern. Explicitly clones from **CSS + structured DOM blocks**, not screenshots, and has self-healing loops, Playwright preview, DOM inspection, and diagnostics. ~295 GH stars.

**Advantage over our setup.** It's essentially the reference implementation of what we're building ad-hoc. Instead of a flat Codex-worker loop, it dispatches specialized sub-agents (extractor, cloner, QA) in parallel with a self-correction loop. For our use case, the QA sub-agent can diff our clone against the Playwright-recorded MP4 of hellomonday.

**Honest limitation the author admits.** "Complex animations are still hard to extract perfectly — that's a crawler problem, not an agent problem." So it won't magically decode the jelly shader — but its orchestration is better than ours, and dropping our captured frames + bundle analysis into its cloner sub-agent should improve fidelity.

**Install.** Python 3.8+, Node 18+, Anthropic API key; clone repo; run shell/batch scripts.
**Repo.** https://github.com/ericshang98/perfect-web-clone
**Skill version.** https://skillsllm.com/skill/perfect-web-clone (drop-in Claude Code skill, no self-host)
**Claude Max + Codex Pro?** Yes via skill version. Codex can subagent-dispatch into it.

**Recommendation: ADOPT IF** we want multi-agent orchestration as a library instead of rolling our own. Otherwise borrow its sub-agent topology into our own Codex dispatch.

---

### 4. Anthropic `frontend-design` skill + Wakaru (bundle decompile)

**Two complementary tools, one workflow slot.**

**Frontend-design skill** (Anthropic official, 277K+ installs). Ships as a plugin at `anthropics/claude-code/plugins/frontend-design`. Forces deliberate aesthetic commitment (bans Inter/Roboto/etc.), pushes "high-impact animations and visual details," and activates automatically on frontend tasks.
```bash
npx skills add anthropics/claude-code --skill frontend-design
```
Repo: https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design

**Wakaru** (`@wakaru/cli`). JS decompiler for modern frontend — unpacks webpack/Browserify and unminifies Terser/Babel/SWC/TS output back into readable modules with heuristic identifier renaming.
```bash
npm i -D @wakaru/unpacker @wakaru/unminify
npx @wakaru/cli all dist/main.*.js   # interactive mode by default
```
Repo: https://github.com/pionxzh/wakaru

**Pairing with SingleFile.** SingleFile captures the fully-rendered page (HTML + inlined assets + bundle blobs) into one `.html`. Extract the JS out of that file and feed it to Wakaru. This is the cleanest way to get hellomonday's shader/GSAP code into a form Codex can actually read.

**Advantage over our setup.** We currently read the minified bundle as-is. Wakaru gives us back actual named identifiers and module boundaries — orders of magnitude easier for Codex to identify `animate`/`gsap.to`/`uniform` calls, particularly for GSAP + custom shader code that's heavily tree-shaken.

**Claude Max + Codex Pro?** Yes. Both are CLI tools Codex can invoke directly.

**Recommendation: ADOPT NOW.** Wakaru is a no-regret add to the pipeline. Frontend-design skill is low-cost and nudges the clone toward intentional motion rather than generic defaults.

---

### 5. designer-mcp (`aresbotv1-beep/designer-mcp`)

**What it is.** "Cursor-style designer pen for Claude Code." In a headed Chromium, you click/marquee the element; Claude gets back the **CSS selector, React `_debugSource` file:line, and a screenshot**. MIT, Playwright-based.

**Advantage over our setup.** Solves the "which element in the minified bundle is this card?" problem. When reverse-engineering hellomonday, we can point at the jelly card, get the exact selector chain + class names, then grep the Wakaru output for that class to locate the handler. It also works on our local Next.js clone during iteration ("click the card that isn't warping" → file:line).

**Install.**
```bash
git clone https://github.com/aresbotv1-beep/designer-mcp.git
cd designer-mcp && npm install && npx playwright install chromium
claude mcp add --scope user designer-mcp node "$(pwd)/index.js"
mkdir -p ~/.claude/skills/designer && cp SKILL.md ~/.claude/skills/designer/SKILL.md
```

**Docs / repo.** https://glama.ai/mcp/servers/aresbotv1-beep/designer-mcp · https://github.com/aresbotv1-beep/designer-mcp
**Claude Max + Codex Pro?** Claude yes natively. Codex via MCP server registration.

**Recommendation: ADOPT IF** we iterate heavily on the local clone (dev mode). Less useful against hellomonday itself since we don't have their React source maps.

---

## Honorable mentions (not top 5, worth knowing)

- **Awwwards GSAP recreation repos.** `Fullstack-Empire/GSAP-Awwwards-Website` and George Francis' "Liquid Hover Effect with GSAP & SVG" are direct reference implementations of exactly the warp-on-hover we need. Use as ground-truth examples for Codex to match against. Cite: https://www.awwwards.com/inspiration/create-a-liquid-hover-effect-with-gsap-svg
- **Codex subagents (GA 2026).** `developers.openai.com/codex/subagents` — spawn parallel specialists (bundle-reader, frame-scrubber, physics-tuner). We're underusing this today.
- **Needle Inspector** (WebGL / three.js Chrome extension with MCP) — only relevant if the target uses WebGL shaders. Hellomonday cards look SVG-filter-based, so probably skip.
- **mcpmarket's `pixel-perfect-website-cloner`** — similar to Perfect-Web-Clone but screenshot-first; less useful for motion. Skip.

---

## Proposed 2026 Stack — Step by Step

Run in this order to reverse-engineer hellomonday's jelly card:

1. **Capture the page.** Use the SingleFile browser extension to save hellomonday.com → `capture.html` (inlines all JS/CSS/media). Commit to `audit/capture/`.
2. **Decompile the bundle.** Extract the main JS blob, then:
   ```bash
   npx @wakaru/cli all audit/capture/main.js -o audit/decoded/
   ```
   Grep the output for `gsap`, `MorphSVG`, `filter`, `feTurbulence`, `feDisplacementMap`, `to(`, `uniforms`, `mouseenter`.
3. **Install the MCP stack.**
   ```bash
   /plugin install chrome-devtools-mcp
   /plugin install playwright
   npx skills add anthropics/claude-code --skill frontend-design
   # optional
   claude mcp add --scope user designer-mcp node /path/to/designer-mcp/index.js
   ```
4. **Record the motion (Playwright, foreground).** Codex runs:
   ```bash
   npx playwright codegen --save-video=audit/video --save-trace=audit/trace hellomonday.com
   ```
   Hover each card type. Stop. Open `npx playwright show-trace audit/trace` → scrub frame-by-frame in Trace Viewer. Export DOM snapshots at 0/50/100/150/200 ms of the hover.
5. **Capture the transform data stream.** In Chrome DevTools MCP, Codex runs `evaluate_script` to monkey-patch and dump per-frame state:
   ```js
   const card = document.querySelector('[data-card]');
   const log = [];
   const tick = () => { log.push({t: performance.now(), m: getComputedStyle(card).transform, f: getComputedStyle(card).filter}); requestAnimationFrame(tick); };
   tick();
   card.dispatchEvent(new MouseEvent('mouseenter'));
   // later: return JSON.stringify(log)
   ```
   Start a `performance_start_trace` around the hover; `performance_analyze_insight` gives long-task + paint breakdown.
6. **Dispatch Codex sub-agents** (use Codex subagents GA feature):
   - Agent A: read Wakaru output, produce hypothesis for animation library + params.
   - Agent B: read per-frame transform log, produce numeric envelope (duration, easing, overshoot, jitter).
   - Agent C: read Playwright video + DOM snapshots, produce visual acceptance criteria.
   Orchestrator (Claude Code) merges into a spec file.
7. **Build the clone.** `frontend-design` skill is active; Claude writes the Next.js component using GSAP (or SVG `feDisplacementMap` + Pointer events) matching Agent B's numeric envelope.
8. **Iterate with designer-mcp + Playwright diff.** In the local dev server, click the card via designer-mcp → Claude gets `components/Card.tsx:L42`. Record local interaction with Playwright. Diff local video vs captured video frame-by-frame until Agent C's criteria pass.
9. **QA loop.** If adopting Perfect-Web-Clone's QA sub-agent pattern, run it as the final check (visual diff + accessibility + style conformance). Otherwise hand-verify with the two videos side by side.

---

## Sources

- [Chrome DevTools MCP (repo)](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Chrome DevTools MCP launch blog](https://developer.chrome.com/blog/chrome-devtools-mcp)
- [Playwright MCP Claude plugin](https://claude.com/plugins/playwright)
- [Playwright Trace Viewer docs](https://playwright.dev/docs/trace-viewer)
- [Simon Willison — Playwright MCP + Claude Code](https://til.simonwillison.net/claude-code/playwright-mcp-claude-code)
- [Perfect-Web-Clone (repo)](https://github.com/ericshang98/perfect-web-clone)
- [Perfect-Web-Clone as a Claude skill](https://skillsllm.com/skill/perfect-web-clone)
- [Anthropic frontend-design plugin](https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design)
- [Anthropic frontend aesthetics cookbook](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics)
- [Wakaru (repo)](https://github.com/pionxzh/wakaru)
- [designer-mcp on Glama](https://glama.ai/mcp/servers/aresbotv1-beep/designer-mcp)
- [Codex subagents GA docs](https://developers.openai.com/codex/subagents)
- [Awwwards — Liquid Hover Effect with GSAP & SVG](https://www.awwwards.com/inspiration/create-a-liquid-hover-effect-with-gsap-svg)
- [GSAP-Awwwards-Website reference repo](https://github.com/Fullstack-Empire/GSAP-Awwwards-Website)
