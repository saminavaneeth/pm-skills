# PM Skills

[Claude Code](https://claude.com/claude-code) skills for product managers.

## Skills

### `grill-my-product`

A relentless, structured interview that stress-tests a **new product** or a **new feature of an existing product** before you write a PRD or take it to review.

- Asks one question at a time, following a decision tree: problem → evidence → target user → alternatives → value → strategy fit → scope → success metrics → risks → validation → rollout.
- Every question comes with a recommended answer, so you can move fast by saying "yes".
- Adapts to whether it's a new product or a feature, and to how far along the idea is.
- Looks up facts itself (your codebase, docs, data); leaves the decisions to you.
- Ends with a one-page **Product Decision Brief**: decisions and rationale, riskiest assumption and how to test it, success metrics and kill criteria, non-goals, and open questions with owners.

It only runs when you call it:

```
/grill-my-product We're thinking of adding AI-generated weekly summaries to our analytics dashboard
```

### `need-ai-or-not`

Decides whether AI is really the best solution for a specific customer problem, or whether a simpler fix wins.

- Starts with a quick **triage**: frame the problem without AI → measure the baseline → climb the solution ladder from process change to AI agent → score the AI fit.
- Triage ends in a verdict: use a simpler option, not enough information yet, or worth a full assessment.
- If AI still looks like a fit and you agree, runs the **full assessment**: error costs and autonomy level, data and constraints, a validation plan with pass and stop criteria, and cost and adoption.
- Asks for evidence and labels every claim as measured, reported or assumed. Anything unknown becomes a gap with an owner, never a plausible guess.
- Recommends an answer on judgment calls so you can move fast; the decisions stay yours.
- Ends with an **AI Decision Memo**: build without AI, hybrid, AI-first, not yet, or don't build, with success metrics and stop criteria.

It only runs when you call it:

```
/need-ai-or-not Customers want AI to classify incident reports from frontline workers
```

Pairs well with `grill-my-product`: decide whether AI fits first, then stress-test the wider product decision.

### `jtbd`

Creates or reviews a **Jobs to Be Done** analysis for a product, feature, or market, so you decide what to build from the customer's progress rather than from a feature list.

- Four modes: **Define** (build hypotheses from what you know), **Synthesize** (extract jobs from interviews, tickets, reviews), **Plan research** (tailored screener + switch / job-map interview guide), **Review** (critique an existing analysis, job stories, outcome statements, or interview guide, with a verdict and before/after rewrites).
- Works layer by layer: job performer → core functional job (with laddering) → circumstances → job map (universal 8 steps) → desired outcome statements → emotional & social jobs → current solutions & forces of progress → job stories → implications.
- Two formats: **Full** for strategy and roadmap decisions, and a lighter **Feature** format for a JTBD next to a PRD or prototype. The Feature format adds what the solution changes at each job step, what it does NOT do for the job, and up to three roles in one table.
- Each outcome comes with how you'd measure it. Opportunities are scored when you have survey data, or ranked qualitatively and labeled when you don't.
- Checks every statement against JTBD quality rules (solution-agnostic, stable, right altitude, no targets in jobs, measurable outcomes, situations not personas, conflicting incentives in the forces).
- Labels customer evidence as observed, stated, or hypothesis, and product or platform claims as assumptions or facts that need checking, each with who confirms it. Ends with a validation plan that says what would change your mind.

It only runs when you call it:

```
/jtbd Synthesize the interview notes in research/ for our expense-reporting product
/jtbd Write a feature JTBD for the incident-reporting chat bot in docs/prds/uc1.md
/jtbd Review the job stories in docs/jtbd/expenses.md
```

### `prd`

Writes a decision-ready **PRD**, or reviews one you already have.

- **Review mode** gives a verdict (Ready / Ready with fixes / Not ready) against the bar for the review's purpose (early draft, eng kickoff, exec review), the 1–3 issues that matter most, and a quoted rewrite for every failure. It edits your document only if you ask.
- **Write mode** reads what already exists first (decision brief, JTBD analysis, prototype, research, codebase, the host platform's limits), then asks only for missing decisions, one question at a time with a recommended answer. The JTBD's top outcomes become success metrics, and its "what would change our mind" becomes the rethink criteria.
- Sizes the PRD to the work: **Lite**, **Standard**, or **Full**, plus conditional sections for AI/ML behavior, platform & integration (permissions, install prerequisites), privacy & compliance, migration, and pricing.
- **AI and agent features** get a must-never list, a quality bar with thresholds per slice and a release gate, hard vs. judgment rules, a refusal table, an actions/tools table (risk level, who it acts as, what needs confirmation), and a data-sources table. The PRD sets the bar and links the eval plan; it doesn't copy eval method.
- Template covers problem & evidence (labeled hypothesis vs. assumption), goals & non-goals, success metrics with baselines, targets and guardrails, roles & permissions, prioritized requirements with Given/When/Then acceptance criteria (per requirement or per flow), edge cases, risks & dependencies, staged rollout with a kill switch, and instrumentation.
- Runs a 45-item quality checklist (blockers, majors, minors, each tagged structural or decision) plus a readiness test: could eng estimate it, QA test it, design find every state, and an exec state the bet?

It only runs when you call it:

```
/prd Turn the decision brief in docs/ai-summaries-brief.md into a PRD
/prd Review docs/prds/report-scheduling.md — is it ready for eng kickoff?
```

### `evals`

Creates or reviews **evals** for AI products and AI-enabled features: the PM's side of knowing whether the AI is good enough to ship, and noticing when it stops being good.

- **Define** (before or early in the build): an eval plan from your PRD and JTBD analysis, with quality criteria tied to user outcomes, a "must never do" list, test-set slices with seed cases, a grader for each criterion, and launch gates.
- **Analyze** (real outputs exist): error analysis on traces. It reads the outputs, notes the first thing that went wrong, groups failures into a taxonomy, and ranks them by frequency × severity. Then it writes code checks and LLM-judge prompts and validates the judges against expert labels.
- **Review**: critiques an eval plan, rubric, judge prompt, test set, or results. Results reviews end with a **Go / Go with conditions / No-go** call.
- Opinionated defaults: binary pass/fail over 1–5 scores, zero-tolerance criteria over averages, results by slice rather than only overall, no trusting an unvalidated judge, and judges from a different model family than the AI they grade.
- Works with any eval tool. Outputs are a Markdown plan, JSONL or CSV test cases, and judge prompts engineers can use in whatever they run.

It only runs when you call it:

```
/evals Define an eval plan for the AI summaries in docs/prds/ai-summaries.md
/evals Run error analysis on the 120 traces in exports/summaries-beta.jsonl
/evals Review the results in docs/evals/ai-summaries/results-v3.md — can we go to GA?
```

### `prototype`

Builds or reviews a **clickable HTML prototype** for usability tests, stakeholder demos, or exploring design options, without starting from scratch each time.

- **Reusable kit:** components (app shell, tables, forms, dialogs, tabs, toasts, empty states, AI output blocks) and mechanics configured with `data-` attributes. These cover screens and navigation, state that carries through a flow, realistic fake data, simulated latency, variants, requirement notes, a built-in link and label check, and a mobile frame. Plain HTML/CSS/JS that opens with a double-click.
- **Swappable look, so reuse is optional.** Everything is styled through one `tokens.css` file:
  - **Company brand:** imports your design system from **Figma variables** (Figma MCP or a JSON export) or **CSS variables**, previews the mapping with a contrast check, and saves it as a named brand that later prototypes reuse.
  - **New look:** 2–3 directions from a short brief, which you can switch between inside the prototype.
  - **Default** neutral, or **wireframe** for early concept tests.
- Built from the PRD's P0 flows and the JTBD job stories. It covers the empty, error, and loading states and tags screens with requirement IDs.
- For user tests: `?present` mode, a test script built from the job stories, and a reset between participants. **Review mode** checks an existing prototype against its PRD and purpose.

It only runs when you call it:

```
/prototype Make the P0 flows in docs/prds/report-scheduling.md clickable for a user test, using our Acme brand
/prototype Import our design tokens from the Figma variables export in design/tokens.json
/prototype Explore three visual directions for the new onboarding concept
```

### `handoff`

Gets product work ready to hand to the team that builds it (engineering, design, data science, or a vendor), and checks that your documents agree with each other before they find out mid-build.

- **Finds your artifacts itself:** PRD, JTBD analysis, eval plan and test cases, prototype, Product Decision Brief, and AI Decision Memo. It works with just a PRD and lists the rest as gaps, rated by what the receiving team needs.
- **Cross-document checks**, the part no other skill does: a non-goal the prototype shows, a P0 no screen covers, launch thresholds that differ between the PRD and the eval plan, a must-never item with no test case, metrics or users named differently, open questions closed in one document but open in another, decisions the PRD contradicts, and stale or superseded sources. Each finding quotes both sources and is rated Blocking, Should fix, or Note.
- Walks you through each blocking conflict one at a time, with a recommended resolution. It never edits your source documents; it lists what to change where.
- **Create** writes one entry-point **handoff package**: verdict (Ready / Ready with caveats / Not ready), what we're building and why, source documents, decisions log, findings, gaps for the audience, open questions with owners, kickoff questions, and non-goals copied word for word. Every line links to its source.
- **Review** checks an existing package, or a handoff doc you wrote yourself, against the same checks. It adds no product content: weak documents get pointed to the skill that fixes them.

It only runs when you call it:

```
/handoff Prepare the report-scheduling handoff to engineering
/handoff Check my PRD, eval plan and prototype agree before Thursday's kickoff
/handoff Review docs/handoff/ai-summaries/handoff.md
```

### Suggested flow

`/grill-my-product` (is this worth building?) → `/jtbd` (what job does it do, and what's underserved?) → `/prd` (what exactly are we building?) → `/prototype` (can users actually do it?) → `/handoff` (do the documents agree, and is it ready for the team that builds it?). For AI ideas, start with `/need-ai-or-not` (does this need AI at all?), and add `/evals` (how will we know it's good enough?). Each skill works on its own, and picks up the previous one's output if it finds it.

For AI features, `/evals` isn't a one-off step. Rerun it after launch: error analysis on production samples, and regression checks whenever the prompt or model changes.

## Install

Copy the skill folders you want into your global skills directory:

```bash
git clone https://github.com/saminavaneeth/pm-skills.git
cp -r pm-skills/grill-my-product pm-skills/need-ai-or-not pm-skills/jtbd pm-skills/prd pm-skills/evals pm-skills/prototype pm-skills/handoff ~/.claude/skills/
```

Or into a single project's `.claude/skills/` folder to use it only there. Start a new Claude Code session after installing.

Saved prototype brands live in `~/.claude/prototype-brands/<brand>/`. To share one with your team, put it in a project's `.claude/prototype-brands/` folder and commit it.

## Credits

`grill-my-product` is inspired by Matt Pocock's [grill-me / grilling](https://github.com/mattpocock/skills/tree/main/skills/productivity) skills.

`jtbd` draws on Tony Ulwick's Outcome-Driven Innovation (job map, desired outcome statements, opportunity score), Clayton Christensen's jobs theory, and Bob Moesta and Chris Spiek's switch interview and forces of progress.

`evals` follows the error-analysis-first approach to LLM evals taught by Hamel Husain and Shreya Shankar: look at the data, build a failure taxonomy, prefer binary judges, and validate them against human labels.
