# CLAUDE.md

This repo is a library of reusable [Claude Code skills](https://docs.claude.com/en/docs/claude-code/skills) for product managers. Each skill is a self-contained folder that users copy into `~/.claude/skills/` (or a project's `.claude/skills/`). There is no build, no package, and no test suite. The product is mostly Markdown; the one exception is `prototype/kit/`, which is plain HTML/CSS/JS that gets copied into users' prototypes.

## Repo layout

```
<skill-name>/
  SKILL.md              # required: frontmatter + instructions Claude follows
  references/           # optional: longer material SKILL.md links to (loaded only when needed)
    <topic>.md
  kit/                  # optional: code assets copied into the user's project (only prototype/ has one)
README.md               # public catalog of skills + install instructions
CLAUDE.md               # this file
```

Existing skills:

- `grill-my-product`: a structured interview that stress-tests a new product or feature and ends in a Product Decision Brief.
- `need-ai-or-not`: decides whether AI is really the best solution for a specific customer problem, through a quick triage and, if AI still fits, a full assessment that ends in an AI Decision Memo.
- `jtbd`: creates or reviews a Jobs to Be Done analysis (job map, outcome statements, forces of progress, job stories), with quality checks and an interview guide.
- `prd`: writes a PRD sized Lite, Standard, or Full from a template, or reviews an existing one against a quality checklist and readiness test.
- `evals`: creates or reviews evals for AI features, in three modes: Define (eval plan), Analyze (error analysis on real outputs), and Review (plan or results, ending in go/no-go). It writes test cases and judge prompts that work with any eval tool.
- `prototype`: builds, iterates on, or reviews clickable HTML prototypes from a reusable kit, with a swappable design-token layer (company brand imported from Figma variables or CSS variables, a new look, or default/wireframe) and a usability test script.
- `handoff`: assembles a handoff package for the team that builds the work (engineering, design, data science, or a vendor) and checks the PM's artifacts against each other for contradictions and gaps. Create builds the package; Review checks an existing one and ends in a verdict. It writes no product content and never edits the source documents.

**Naming:** skills that both create and review an artifact are named after the artifact (`prd`, `jtbd`, `evals`, `prototype`, `handoff`), not the verb. Both modes share one standard (template + checks), live in one skill, and never edit the PM's document unless asked.

These skills are designed to chain: grill → JTBD → PRD → prototype → handoff, plus need-ai-or-not before grilling an AI idea and evals for AI features. Each one picks up the previous skill's output if it exists, but never requires it. Default output locations in a user's project are `docs/briefs/` (Product Decision Brief), `docs/ai-decisions/` (Triage Verdict and AI Decision Memo), `docs/jtbd/`, `docs/prds/`, `docs/evals/<feature>/`, `prototypes/<name>/`, and `docs/handoff/<feature>/`. `handoff` looks there first, then falls back to searching by title. When adding a skill that writes a document, give it a default location and add it to the README's "What each skill produces" table. Saved prototype brands live in `~/.claude/prototype-brands/` (user level) or `.claude/prototype-brands/` (project level, shared through the repo).

**AI features have one source of truth per concern.** Don't duplicate eval method into other skills:

- `grill-my-product` asks whether AI is the right approach and sets a rough quality bar.
- `jtbd` stays solution-agnostic; its outcome statements become candidate eval criteria.
- `prd` states the bar: the must-never list, criteria, launch thresholds, fallbacks, and budget. It links to the eval plan.
- `need-ai-or-not` decides whether AI fits at all, and at what autonomy level (AI Decision Memo).
- `evals` owns the method: error analysis, test sets, graders, judge validation, go/no-go.
- `handoff` owns nothing here: it checks that the PRD's bar and the eval plan agree (thresholds, must-never coverage by test cases) and points to the owning skill.

## Adding or changing a skill

1. **Folder name = skill name** — lowercase, kebab-case, matches the `name:` field in frontmatter. It becomes the slash command (`/grill-my-product`).
2. **Frontmatter** in `SKILL.md`:
   - `name:` — same as the folder.
   - `description:` — one paragraph: what it does, then "Use when…" with the concrete situations and trigger phrases a PM would actually say. This is what Claude uses to decide relevance, so be specific.
   - `disable-model-invocation: true` — set this for skills that take over the conversation (interviews, long workflows) so they run only when the user calls them. Omit it for lightweight skills that are fine to auto-trigger.
3. **Keep `SKILL.md` focused** (aim well under ~300 lines). Move long checklists, question banks, and output templates into `references/` and link to them with relative paths, e.g. `[references/decision-tree.md](references/decision-tree.md)`.
4. **Self-contained**: a skill must work when only its folder is copied. Don't link across skill folders or to repo-root files. If another skill could help (e.g. a write-spec skill), mention it as optional ("if available"), never as a dependency.
5. **Update `README.md`** in the same change: add/refresh the skill's section (what it does in 3–5 bullets + an example invocation) and add credits if the skill is inspired by someone else's work.
6. **Keep README and SKILL.md consistent** — when behavior changes in `SKILL.md`, check the README bullets still describe it accurately.

## How PM skills in this repo should behave

These are the design principles the skills share; follow them in new skills unless there's a good reason not to.

- **Written for PMs, not engineers.** Use product language (problem, segment, evidence, success metrics, non-goals, riskiest assumption). Don't assume a codebase exists, but use one if it does.
- **Facts vs. decisions.** Claude looks up facts itself (files, docs, data, web if available); the PM makes the decisions. Never ask the PM something Claude can find.
- **Always recommend.** When asking the PM to choose, give options and a recommended answer phrased so "yes" accepts it.
- **One question at a time** for interactive skills — no bundled questions.
- **No silent assumptions.** Anything assumed is flagged, and unknowns become open questions with owners.
- **End with a concrete artifact** (brief, spec, plan) using a template in `references/`, and only after the PM confirms the shared understanding.
- **Tone:** direct, skeptical-but-fair, no flattery. Challenge the idea, not the person.

## Writing style

- Imperative voice addressed to Claude ("Ask…", "Never…"), short sections with numbered `##` headings.
- Show, don't describe: include a short example of the exact output format (in a fenced block) when format matters.
- Bold the rule, then explain it in one line. Prefer bullets over paragraphs.
- Use LF line endings.

## Testing a skill

There's no automated test suite. To check a change:

1. Copy the skill folder into `~/.claude/skills/` (or a scratch project's `.claude/skills/`).
2. Start a new Claude Code session and invoke it with a realistic prompt (e.g. `/grill-my-product We're thinking of adding AI-generated weekly summaries to our analytics dashboard`).
3. Check it follows its own rules (format, ordering, ending conditions). The `skill-creator` skill can be used for more structured evals.

## Changing the prototype kit

- **The token contract is an API.** `kit.css` may only use the token names listed in `prototype/references/token-contract.md`. Adding a token means adding it to the contract table, to both `tokens.default.css` (light and dark) and `tokens.wireframe.css`, and to the derivation rules, because saved brands won't define it yet.
- **Never rename or remove a contract token or a `data-` attribute.** Existing prototypes and saved brands depend on them. Add new ones instead.
- **Bump the version** in the `kit.css` and `kit.js` headers on every change, and keep the `kit.js` header cheat sheet in sync with the code.
- **Keep it dependency-free:** no frameworks, no build step, no network. It must work when opened from `file://`.
- **Test it:**
  1. Copy `kit/` to a scratch folder, renaming `tokens.default.css` to `tokens.css` and `template.html` to `index.html`.
  2. Run `node --check kit.js`.
  3. Open `index.html?check`; it should report "No issues found".
  4. Also check `?tokens=tokens.wireframe.css`, the toolbar's Mobile, Dark, and Notes toggles, and `tokens-preview.html`. Headless Edge or Chrome with `--screenshot` works for this. For Mobile, use the toolbar's frame, not a narrow window: headless browsers won't lay out below about 500px.

## Git

- Remote: `https://github.com/saminavaneeth/pm-skills` (branch `main`).
- One skill (or one coherent change) per commit, with a message like `Add <skill-name> skill` or `<skill-name>: <what changed>`.
