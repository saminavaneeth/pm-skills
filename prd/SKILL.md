---
name: prd
description: Write a new Product Requirements Document (PRD) or review an existing one, for a new product or a feature of an existing product. In write mode it gathers what already exists (briefs, research, JTBD analysis, the codebase), asks only for the missing decisions one question at a time, and sizes the PRD to the initiative (Lite, Standard, Full). In review mode it scores an existing PRD against a quality checklist and a readiness test, gives a verdict, and returns prioritized, concrete rewrites. Both modes catch vague requirements, unmeasurable metrics, missing non-goals, and untestable acceptance criteria. For AI and agent features it adds the quality bar, must-never list, actions/tools, and data sources, and links the eval plan. Use when a PM says "write a PRD", "draft a spec or requirements doc", "turn this brief into a PRD", "review my PRD", "critique this spec", "poke holes in this PRD", "spec this AI agent feature", "write the handover for engineering", or "is this PRD ready for engineering?".
disable-model-invocation: true
---

# PRD

Write or review a PRD that an engineer, a designer, and an exec can each read and act on without needing a meeting. A good PRD makes the problem, the bet, and the boundaries explicit. It says **what** and **why**, and leaves **how** to the team.

Two modes. Infer which one from the request, and ask only if it's unclear:

- **Write**: create a new PRD from an idea, brief, notes, or conversation. Follow steps 1–6.
- **Review**: the PM shares an existing PRD and wants it assessed. Follow [Review mode](#review-mode).

Both modes use the same standard: [references/prd-template.md](references/prd-template.md) defines what a complete PRD contains, and [references/prd-checklist.md](references/prd-checklist.md) defines what a good one looks like. For AI features, [references/prd-ai-sections.md](references/prd-ai-sections.md) adds the AI and agent sections.

## 1. Gather what already exists

Before asking anything, find the inputs and read them:

- A Product Decision Brief, JTBD analysis, research synthesis, or earlier spec, either in the conversation or in the workspace.
- A prototype, if one exists. Note where it is simpler than the PRD will be, and where it looks richer than the real platform allows.
- The product or codebase, if there is one: what exists today, the relevant flows, real constraints.
- **The host platform's limits,** if the feature runs inside another product (Teams, Slack, Salesforce, an app store). Look up what bots or apps can see, which permissions they need, and who must install them. Record the source and the date checked.
- Data, metrics, tickets, designs, or docs the PM points to.

**Carry over the JTBD analysis** if one exists:
- its top outcomes become success metrics
- questions it left for the PRD get answered or listed as open
- its "what would change our mind" becomes the rethink criteria
- its key circumstances become slices for metrics and AI thresholds

Play back what you found and what's missing in five bullets or fewer. **Facts are yours to find; decisions are the PM's.** Never ask the PM for something you can look up.

## 2. Size the PRD

Pick a tier, tell the PM which one and why in one line, and let them override it:

| Tier | When | Sections |
|---|---|---|
| **Lite** (1–2 pages) | Small feature, low risk, one team | Summary, Problem, Goals & non-goals, Success metrics, Requirements + acceptance criteria, Open questions |
| **Standard** (3–6 pages) | Typical feature, several teams or meaningful risk | Lite + Users, roles & jobs, User experience & edge cases, Risks & dependencies, Rollout & launch, Analytics |
| **Full** (as long as needed, nothing restated) | New product, major bet, external or regulatory exposure | Standard + Context & strategy fit, Alternatives considered, Pricing & GTM, non-functional requirements in depth, Appendix |

**Conditional sections** are added at any tier whenever they apply:
- **AI/ML behavior** (the feature uses a model). Use [references/prd-ai-sections.md](references/prd-ai-sections.md). It includes **actions and tools** (the AI calls tools or writes anything) and **data sources** (it reads from several systems).
- **Platform & integration** (it runs inside another product): permissions requested and never requested, install and admin prerequisites, platform limits.
- **Privacy, security & compliance** (personal or sensitive data).
- **Migration** (changes existing data or workflows).
- **Pricing & packaging** (affects what customers pay or which plan gets it).

For AI features, **the PRD states the bar**: the must-never list, quality criteria with thresholds per slice, who signs off, the release gate, fallbacks, and the cost and latency budget. **The eval plan holds the method** (test-set contents, test data sources, graders, judge validation) and is linked, never copied. If you find yourself writing test cases or choosing graders, move them to the eval plan. If no eval plan exists, add `[OPEN: eval plan — owner, due]` and suggest creating one (for example with an evals skill, if available).

## 3. Fill the gaps, one question at a time

Ask only for **decision-critical** information you couldn't find, meaning anything the PRD can't honestly be written without. Ask in dependency order:

1. The problem and who has it, with evidence
2. The goal: what changes for the user and for the business
3. Non-goals: what we are explicitly not doing
4. The primary success metric: baseline, target, timeframe
5. MVP scope: what's P0 and what comes later
6. Hard constraints: deadline, dependencies, what must not break
7. For AI features: what the AI must never do, and which actions need a person's confirmation before anything is saved or sent

Rules:

- **Ask one question per message.** Give a recommended answer marked `→`, phrased so that "yes" accepts it.
- **Don't interrogate.** If the PM wants a draft fast, or a gap isn't critical, draft with a labeled `[Assumption: …]` or an `[OPEN: question — owner]` instead of asking.
- **Don't polish an unvalidated idea.** If the problem itself is shaky (no evidence, no clear user), say so in one sentence. Suggest stress-testing it first (for example with a grill-my-product skill, if available) before writing requirements.

## 4. Draft

Use the structure in [references/prd-template.md](references/prd-template.md). While drafting:

- **Problem before solution.** The problem section mentions no features.
- **Every requirement traces** to a goal or a user job. If one doesn't, cut it or question it.
- **Requirements are user-observable behavior,** prioritized P0/P1/P2. Every P0 gets testable acceptance criteria in Given/When/Then form. They can be per requirement, or per flow with a **Covers** column, but every P0 must appear somewhere.
- **Say what, not how.** Prescribe implementation only for a real constraint, and say why it's a constraint. Mark build choices that belong to engineering with **Eng decides**.
- **Define loaded terms** the acceptance criteria depend on ("saved", "sent", "written") once, in the header.
- **The primary metric measures the outcome across every channel,** not only use of the new feature. Measure from the human-confirmed value, not the AI's guess.
- **Numbers over adjectives.** Replace "fast", "easy", "seamless", "intuitive", and "scalable" with a measurable bar.
- **Cover unhappy paths:** empty states, errors, permissions, limits, edge cases, and the absent person (no one there to approve or be alerted). Put them in an edge-case table with a Why column.
- **Non-goals matter as much as goals.** Name the tempting adjacent ideas you're not doing, with why.
- **Write each thing once.** Flows are one line per step; the exact copy lives in the acceptance criteria.
- **Be honest about uncertainty.** Label evidence: [Observed], [Stated], or [Hypothesis] for customer claims; [Assumption] or [Needs validation] → Confirmed for product and platform claims. Mark gaps with `[OPEN: … — owner, due]`. **Never present invented data, quotes, customers, or metrics as real.** A fictional example customer is fine, and makes acceptance criteria concrete, when the header labels it fictional. Use placeholders such as `[baseline: OPEN — owner]`.

Write the PRD to a Markdown file at `docs/prds/<kebab-name>.md` in the current project, unless the PM names another location or tool. Keep the chat reply short: where the file is, the tier, and the main gaps.

## 5. Check

Run every check in [references/prd-checklist.md](references/prd-checklist.md). Fix anything that doesn't need a PM decision, then report what's left:

```
PRD check: 38/43 passed (2 blockers)
✗ BLOCKER  [decision]  Success metrics: "increase engagement" has no baseline or target
✗ BLOCKER  [decision]  Non-goals: none listed
✗ MAJOR    [decision]  R4 "Export should be fast": not testable
✗ MAJOR    [decision]  Rollout: no rollback or kill criteria
✓ Fixed    Replaced "seamless" in R2 with "no re-login required"
✓ Fixed    Added a Covers column to the acceptance criteria

→ Next decision: the primary metric target.
  Recommend: weekly active exporters 12% → 20% within 90 days of GA. Agree?
```

Then work through the remaining open decisions **one at a time**, most important first, and update the file after each answer.

## 6. Finish

The PRD is **ready for review** when every blocker passes and every remaining open question has an owner. Say so plainly. Also tell reviewers where to focus: the riskiest assumption and the hardest trade-off.

Then offer one optional next step: a short stakeholder summary, or splitting the P0 requirements into tickets.

## Review mode

Assess someone's existing PRD honestly and usefully. The goal is a better PRD and a clear go/no-go, not a pile of nitpicks.

1. **Read the whole PRD**, plus anything it links to that you can access: research, designs, tickets, the codebase. Use the PRD's stated tier. If it doesn't state one, infer the tier from the scope and say which one you're assuming.
2. **Set the bar by purpose.** Infer what the review is for. Ask (one question, with a recommendation) only if you can't tell:
   - **Early draft feedback**: focus on problem, user, goals, non-goals, and metrics (checklist sections A–B), plus the major gaps.
   - **Ready for eng kickoff**: the full checklist and the readiness test.
   - **Exec or leadership review**: summary, strategy fit, metrics, risks, and the readiness test's exec question.
3. **Run every applicable check** in [references/prd-checklist.md](references/prd-checklist.md), then the readiness test. Also look for problems only a careful reader catches:
   - internal contradictions (a requirement that conflicts with a non-goal, a summary that doesn't match the body)
   - requirements that don't serve any goal
   - metrics that could be gamed, or that wouldn't move even if the feature worked
   - scope that doesn't fit the stated timeline or team
   - claims that the linked evidence doesn't support
   - a primary metric that counts only use of the new feature, so it rises when users switch channels even if the outcome doesn't move
   - JTBD outcomes, open questions, or "what would change our mind" items that were dropped on the way into the PRD
   - eval method (test-set contents, data sources, graders) written into the PRD instead of the linked eval plan
   - commit actions with no human confirmation, and data sources assumed to exist that nobody has checked
4. **Report, most important first.** Use the scorecard format in the checklist and lead with a verdict. Tag each failure **structural** or **decision**, and say how many are structural, so a strong PRD that misses columns and owners isn't misread from its score. The verdicts are:
   - **Ready**
   - **Ready with fixes**: blockers pass, some majors are open
   - **Not ready**: at least one blocker fails

   Name the 1–3 issues that matter most. For each failure, quote the text and give a concrete rewrite, not just "make this clearer". Show at most 5 minor items unless the PM asks for all of them. Say briefly what's strong, so the PM knows what to keep.

   ```
   Verdict: Not ready for eng kickoff (2 blockers, 4 majors · 2 of 6 failures are structural)
   What matters most:
   1. B3: no target for the primary metric, so no one can tell if this worked.
   2. C2: R3–R6 have no acceptance criteria; QA can't test them.
   Strong: clear problem statement with real evidence; good non-goals.

   ✗ BLOCKER  [decision]   B3 "Increase engagement with reports"
              → "Weekly active report viewers: 18% → 30% of seats within 90 days of GA"
   ✗ BLOCKER  [decision]   C2 R3 "Users can schedule reports"
              → Given a saved report, when the user sets a weekly schedule,
                then recipients get it by email every Monday 08:00 in their time zone.
   ...
   ```

5. **Don't rewrite the PM's document unless asked.** It's their document. After the report, offer three options and recommend one:
   - (a) apply the fixes that don't need a decision directly to the PRD
   - (b) write the review to `<prd-file-name>.review.md` next to the PRD
   - (c) work through the open decisions one at a time, as in step 5 of write mode

## Tone

Plain, specific, skimmable. Use short sentences and the active voice, with no marketing language. A PRD is a tool for making decisions, not a sales document.
