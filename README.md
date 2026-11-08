# PM Skills

[Claude Code](https://claude.com/claude-code) skills for product managers.

## Skills

### `grill-my-product`

A relentless, structured interview that stress-tests a **new product** or a **new feature of an existing product** before you write a PRD or take it to review.

- Asks questions in rounds, following a decision tree: problem → evidence → target user → alternatives → value → strategy fit → scope → success metrics → risks → validation → rollout.
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

It runs when you call it, or when you ask Claude whether a specific problem needs AI:

```
/need-ai-or-not Customers want AI to classify incident reports from frontline workers
```

Pairs well with `grill-my-product`: decide whether AI fits first, then stress-test the wider product decision.

## Install

Copy a skill folder into your global skills directory:

```bash
git clone https://github.com/saminavaneeth/pm-skills.git
cp -r pm-skills/grill-my-product ~/.claude/skills/
cp -r pm-skills/need-ai-or-not ~/.claude/skills/
```

Or into a single project's `.claude/skills/` folder to use it only there. Start a new Claude Code session after installing.

## Credits

`grill-my-product` is inspired by Matt Pocock's [grill-me / grilling](https://github.com/mattpocock/skills/tree/main/skills/productivity) skills.
