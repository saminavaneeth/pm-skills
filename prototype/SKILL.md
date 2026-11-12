---
name: prototype
description: Build or review a clickable HTML prototype from a PRD, JTBD job stories, or an idea, for usability tests, stakeholder demos, or exploring design options. Uses a reusable kit (components plus clickable mechanics such as screens, navigation, state, realistic fake data, dialogs, toasts, simulated latency, variants, requirement notes, and a link check), so prototypes aren't built from scratch. Uses a design-token layer, so the look is swappable. The PM can use the company design system imported from Figma variables or CSS variables (saved once as a named brand and reused), create a new look with 2–3 directions, or use the neutral or wireframe defaults. The output is plain HTML/CSS/JS that opens with a double-click, plus a usability test script. Use when a PM says "prototype", "clickable mock", "mockup I can click through", "make this PRD clickable", "something to test with users", "demo for stakeholders", "try a few design directions", "use our design tokens or Figma variables", or "review this prototype".
disable-model-invocation: true
---

# Prototype

Turn product thinking into something people can click. That lets the PM test **usability and value** with users, and get stakeholders aligned on what's being built before engineering starts.

These prototypes are for learning and communication, not production UI. They are throwaway by design: no backend, no real integrations, no real customer data.

Three modes. Infer which one from the request, and ask only if it's unclear:

- **Build**: a new prototype (steps 1–6).
- **Iterate**: change an existing prototype (see [Iterate mode](#iterate-mode)).
- **Review**: assess an existing prototype against its purpose and PRD (see [Review mode](#review-mode)).

**What this skill provides**

- `kit/` (relative to this skill's folder) is copied into every prototype and never edited per project:
  - `template.html`: a starter page that demonstrates every pattern
  - `kit.css`: components, built only from tokens
  - `kit.js`: the mechanics; its header is the data-attribute cheat sheet
  - `tokens.default.css`: neutral look, light and dark
  - `tokens.wireframe.css`: grayscale and flat, for early concept tests
  - `tokens-preview.html`: a swatch, type, component, and contrast preview
- [references/token-contract.md](references/token-contract.md): the token names, importing from Figma variables or CSS variables, mapping rules, saving brands, creating new looks.
- [references/prototype-checklist.md](references/prototype-checklist.md): the checks and the review verdict.
- [references/test-script-template.md](references/test-script-template.md): the usability test script.

When you need a decision from the PM, ask **one question per message**, with a recommended answer marked `→` and phrased so that "yes" accepts it. Find facts yourself: read the PRD, the JTBD analysis, the codebase, and the token files.

## 1. Purpose and inputs

Read whatever exists:

- the PRD: P0 requirements, flows, required states, the AI section
- JTBD job stories
- the eval failure taxonomy (for AI features)
- screenshots or the codebase of the existing product

Then settle **purpose**, **platform** (desktop, mobile, or both), and **look** (step 2). The purpose drives everything else:

| Purpose | Fidelity | Emphasis |
|---|---|---|
| **User test** | Mid–high | Every task completable, realistic data, no hints in the UI, `?present` mode, a test script |
| **Stakeholder demo** | High on the main path | Brand look, polished happy path, requirement notes on (`R#`), README lists what's faked |
| **Explore options** | Low–mid | 2–3 variants (`data-variants`) or looks (`data-looks`) you can switch between in place; breadth over depth |
| **Early concept test** | Low | Wireframe look, so polish doesn't steer the feedback ("I like the blue") |

## 2. Choose the look

Check for saved brands first. Look in a path the PM gave, then the project's `.claude/prototype-brands/`, then `~/.claude/prototype-brands/` (on Windows, `%USERPROFILE%\.claude\prototype-brands\`). Then offer these options in one question, with a recommendation:

1. **Saved brand `<name>`**: reuse it as is.
2. **Import the company design system**, from **Figma variables** or **CSS variables**. Follow [references/token-contract.md](references/token-contract.md):
   1. get the source (Figma MCP server if connected, a JSON export, the CSS file, or the codebase)
   2. copy the source tokens verbatim and map the contract onto them, recording a confidence for each mapping
   3. derive what's missing
   4. preview the result with `tokens-preview.html` and report any contrast failures
   5. confirm the Low and Medium confidence mappings with the PM
   6. **save it as a named brand** so the next prototype skips all of this. Recommend user level, or the project folder if the team should share it.
3. **New look**: from a short brief, create 2–3 directions that differ on color, shape, density, or type. The PM switches between them in the prototype, and the chosen one can be saved as a brand.
4. **Default neutral** or **wireframe**.

How to recommend:

- An existing product with a saved brand → the brand.
- An existing product without one → import it.
- A new product or a deliberate departure → a new look.
- Early concept → wireframe.
- A quick one-off → default.

## 3. Plan the screens

Derive the flows from the PRD's P0 requirements, or from the job stories. Show a compact screen map and confirm it before building:

```
Flow 1 (R1, R2): Customers → New customer (dialog) → Customers + "added" banner
Flow 2 (R4):     Customers → Customer → Summarize (1.4 s loading) → AI summary → feedback
States: empty list (demo toggle), form validation, AI loading, AI fallback ("not enough activity")
Not built: Reports (not linked)
```

For AI features, plan scripted outputs. If the prototype tests trust, include at least one imperfect output and the fallback path; pick them from the eval failure taxonomy if one exists.

## 4. Build

1. Create `prototypes/<kebab-name>/` in the current project, unless the PM names another location. Copy into it:
   - `kit/template.html` → `index.html`
   - `kit/kit.css` and `kit/kit.js`, unchanged
   - the chosen look → `tokens.css`, plus extra direction files if there are any
2. Replace the template's example screens, dialogs, and data with the planned ones. Keep the template's structure (`.proto-root > .app`, `data-screen` sections, `#proto-data`, `kit.js` last).

Rules:

- **Never edit `kit.css` or `kit.js` inside a prototype.** If a component is missing, add a small rule to the page's `<style>` using tokens only. If it would be useful in other prototypes too, suggest adding it to the skill's kit as a separate change.
- **Tokens only.** No hex, `rgb()`, or named colors, no `px` font sizes, and no font names in screen CSS or inline styles. Layout widths are fine. This is what makes the look swappable.
- **Use the kit's mechanics** through data attributes (the cheat sheet is in the `kit.js` header; working examples are in `template.html`). Write custom JS only for something the kit can't express, and keep it in one small `<script>` before `kit.js`.
- **Realistic, fake data** goes in `#proto-data`:
  - plausible names, amounts, and dates
  - at least one long value and one messy or edge record
  - no lorem ipsum in user tests
  - **never real customer or personal data**
- **Real product copy**, written for the user.
- **Accessible basics:** `<button>` and `<a>` for anything clickable, labels on every field, alt text, `aria-label` on icon buttons.
- **Coverage notes:** add `data-note="R#: …"` to the elements that implement each PRD requirement.
- **Demo-only controls** (simulate empty, simulate error) get `class="proto-demo"`. `?present` hides them.
- **Out of scope:** don't link it. If it must appear, the kit shows "Not in this prototype yet".
- **AI features:**
  - scripted outputs in data
  - `data-delay` for realistic latency
  - an `.ai-label` disclosure
  - a feedback control
  - the fallback or error path
- **No network requests**, except a web font the PM approved.

## 5. Check

1. **Static check (do it yourself):**
   - every `data-go` and `data-submit-go` target has a matching `data-screen`
   - every `data-open` matches a dialog `id`
   - every `data-repeat` has data
   - no raw colors in screen CSS: search `index.html` for `#[0-9a-fA-F]{3,8}\b`, `rgb(`, and `hsl(` outside `#proto-data`

   Fix anything you find.
2. **Run the checklist** in [references/prototype-checklist.md](references/prototype-checklist.md) for the stated purpose.
3. **Click through it.**
   - If a browser tool is available, open `index.html?check` and walk each P0 flow.
   - If not, ask the PM to open the file and click **Check** in the toolbar. It reports dead links, unreachable screens, and missing labels.

## 6. Deliver

- **Write `prototypes/<name>/README.md`:**
  - purpose and audience
  - flows, with their requirement IDs
  - what's real and what's faked
  - the look used (brand name and import date, or direction)
  - how to open it: double-click `index.html`; `?present` for tests; `?check`
  - known gaps
- **User test:** also write `test-script.md` from the template, with tasks taken from the job stories.
- **Sharing:** if asked, bundle a single self-contained file, `prototypes/<name>/<name>.html`. Replace the `tokens.css` and `kit.css` links with `<style>` blocks containing those files, and the `kit.js` script tag with an inline `<script>`, in the same order. A bundle carries one look only. Publish or upload it only if the PM asks.
- **In chat:** the path, how to open it, the flows covered, the gaps, and the next step. That's usually running the test script with 5 participants, or reviewing it against the PRD with design and engineering.

## Iterate mode

1. Read the prototype: `index.html`, its README, and its tokens.
2. Change the screens, data, and copy only. Keep the kit files as they are.
3. To switch the look, replace `tokens.css` with another brand or direction. Nothing else should need to change; if it does, the screens used raw values, so fix those.
4. Rerun step 5 and update the README.
5. If the prototype's kit is older than the skill's (check the version in the file headers) and the PM wants a newer feature, offer to upgrade by recopying `kit.css` and `kit.js`.

## Review mode

1. Read the prototype and, if available, its PRD, job stories, and test script. Work out the purpose, and ask if that's unclear.
2. Run the static check and the checklist.
3. Give a verdict: **Ready for <purpose>**, **Ready with fixes**, or **Not ready**. Name the 1–3 issues that matter most, then list the findings with fixes, and say briefly what's strong. The format is in the checklist.
4. Don't edit unless asked. Offer three options and recommend one:
   - (a) apply the fixes
   - (b) write `<name>/review.md`
   - (c) walk through the decisions one at a time

## Tone

Practical and visual. Show the screen map before building, and keep chat replies short. The prototype and its README carry the detail.
