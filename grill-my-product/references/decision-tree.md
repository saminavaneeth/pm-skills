# Product Decision Tree

The branches to walk when grilling a product idea. Not every question applies — prune by **initiative type** (🆕 new product, ➕ new feature, or both) and **stage**. Each branch lists what "settled" looks like so you know when to move on.

---

## 1. Problem (root)

*Settled when:* the problem is stated in one sentence, from the user's perspective, without mentioning the solution.

- What problem are we solving? Restate it without naming the feature.
- How painful is it — hair-on-fire, annoying, or nice-to-have?
- How often does it happen? To how many users/accounts?
- What happens if we never solve it?
- ➕ Is this a problem with *our* product (gap/friction) or a new job our users want done?

## 2. Evidence

*Settled when:* the PM can name specific sources, and we've labeled each claim as observed behavior, stated preference, or belief.

- Where did this come from — customer interviews, support tickets, sales losses, data, competitor move, exec request, the PM's own intuition?
- How many independent signals? Were they unprompted?
- What does the data show (usage, drop-off, churn reasons, search queries)?
- What evidence would contradict this, and have we looked for it?

## 3. Target user / segment

*Settled when:* one primary user is named specifically enough that you could find ten of them this week.

- Who exactly has this problem? Role, company size, situation, trigger moment.
- Primary vs. secondary user — who are we optimizing for when they conflict?
- 🆕 Who buys vs. who uses? Are they the same person?
- ➕ Which existing segment/plan tier? What % of current users does it touch?
- Who is explicitly *not* the target?

## 4. Current alternatives

*Settled when:* we know what users do today and why it falls short.

- How do they solve this today (competitor, spreadsheet, workaround, ignoring it)?
- What's good about the current alternative that we must match?
- What would make them switch — and what's the switching cost?
- 🆕 Who are the direct and indirect competitors? Why haven't they solved it?

## 5. Value proposition

*Settled when:* one sentence: "For [user] who [problem], [product] lets them [outcome], unlike [alternative]."

- What outcome does the user get — in their words, not ours?
- Is the improvement 10x, 2x, or marginal over the alternative?
- 🆕 Why would someone pay for this? What would they pay?
- ➕ Does this make the core product more valuable, or just bigger?

## 6. Strategy fit

*Settled when:* the PM can link it to a stated company/product goal and say what it displaces.

- Which company or product objective does this serve?
- Why now? What changed (market, tech, customers, competition)?
- What are we *not* doing because we're doing this? (opportunity cost)
- ➕ Does it fit the product's identity, or pull it in a new direction?
- 🆕 Why are *we* the right team/company to build this? What's our unfair advantage?

## 7. Scope — MVP and non-goals

*Settled when:* there's a smallest version that tests the core value, plus an explicit list of non-goals.

- What is the smallest thing that delivers the core value?
- What's in v1, and what's deliberately deferred?
- What are the explicit non-goals?
- ➕ What existing flows, settings, or features does this touch or change? Any migration?
- ➕ What's the complexity cost to the existing product (UI clutter, support, edge cases)?
- Rough effort size? Any hard dependencies on other teams?

## 8. Success metrics

*Settled when:* there's a primary metric with a baseline, a target, a timeframe, and a kill criterion.

- What single metric tells us it's working? Leading vs. lagging indicator?
- What's the baseline today? What target, by when?
- What guardrail metrics must not get worse (retention, performance, support load, core-feature usage)?
- What result would make us roll back or kill it?
- ➕ How do we isolate impact from the rest of the product (experiment, holdout, cohort)?

## 9. Risks and riskiest assumption

*Settled when:* the single riskiest assumption is named and ranked against the others.

Walk the four classic risks:
- **Value** — will users want it / choose it?
- **Usability** — can they figure out how to use it?
- **Feasibility** — can we build it with the time, skills, and tech we have?
- **Viability** — does it work for the business (cost, legal, compliance, sales, support, brand)?

Then: Which one, if wrong, sinks the whole thing? Also consider:
- ➕ Cannibalization of existing features or plans, and backlash from changing familiar behavior.
- 🆕 Market timing, distribution and go-to-market risk.
- Ethical, privacy, security, or AI-specific risks, if relevant.

## 10. Validation plan

*Settled when:* the riskiest assumption has a cheap test with a pass/fail threshold, before full build.

- What's the cheapest test of the riskiest assumption (interviews, fake door, prototype, concierge, beta)?
- What result counts as a pass? A fail?
- How long will it take, and who runs it?

## 11. Rollout / go-to-market

*Settled when:* we know who gets it first, how they hear about it, and how we'd roll back. (Skip for early-stage ideas.)

- ➕ Feature flag? Beta cohort? Percentage rollout? Default on or opt-in?
- ➕ How will existing users discover it? What changes for sales, support, docs?
- 🆕 Launch channel, positioning, pricing and packaging, first ten customers.
- What's the rollback plan?

---

# Product Decision Brief — template

Produce this at the end of the session, only after the PM confirms shared understanding.

```markdown
# Product Decision Brief: <name>

**Type:** New product | New feature of <product>    **Stage:** <stage>    **Date:** <date>

## Problem
<one sentence, solution-free>

## Target user
Primary: <specific user>  ·  Secondary: <…>  ·  Not for: <…>

## Evidence
| Signal | Source | Type (observed / stated / belief) |
|---|---|---|

## Value proposition
For <user> who <problem>, <product> lets them <outcome>, unlike <alternative>.

## Strategy fit & why now
<objective it serves; what it displaces>

## Scope
**MVP:** …
**Deferred:** …
**Non-goals:** …

## Success metrics
| Metric | Baseline | Target | By when |
|---|---|---|---|
Guardrails: …
Kill criterion: …

## Riskiest assumption & validation
Assumption: …
Test: …   Pass if: …   Fail if: …

## Other risks
Value / Usability / Feasibility / Viability: …

## Key decisions
| Decision | Choice | Rationale |
|---|---|---|

## Open questions
| Question | Owner | Due |
|---|---|---|
```
