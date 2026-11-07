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

## Install

Copy a skill folder into your global skills directory:

```bash
git clone https://github.com/saminavaneeth/pm-skills.git
cp -r pm-skills/grill-my-product ~/.claude/skills/
```

Or into a single project's `.claude/skills/` folder to use it only there. Start a new Claude Code session after installing.

## Credits

`grill-my-product` is inspired by Matt Pocock's [grill-me / grilling](https://github.com/mattpocock/skills/tree/main/skills/productivity) skills.
