# PRD Quality Checklist

Run every check that applies to the PRD's tier. For each failure, report:

- the severity
- whether the fix is **structural** (a missing column, owner, date, or format that doesn't need a decision) or needs a **decision** from the PM
- the section or ID
- the offending text, quoted
- a concrete suggested fix

In write mode, fix structural failures yourself and list them as fixed.

**Severity**
- **Blocker**: must pass before the PRD goes to review.
- **Major**: should pass. If one stays open, say why.
- **Minor**: polish.

## A. Problem and evidence

| # | Check | Severity |
|---|---|---|
| A1 | The problem is stated from the user's point of view and contains no solution or feature. | Blocker |
| A2 | A specific primary user or segment is named, not "users", "customers", or "everyone". | Blocker |
| A3 | Evidence is labeled (customer claims: [Observed], [Stated], [Hypothesis]; product and platform claims: [Assumption], [Needs validation] → Confirmed) and sourced. If there's no evidence yet, the PRD says so and names the validation gate before build. | Major |
| A4 | "Why now" is answered (not only "why this first"). | Major |
| A5 | Today's workaround or alternative is described, or linked. | Minor |

## B. Goals, non-goals, metrics

| # | Check | Severity |
|---|---|---|
| B1 | Goals are outcomes, not outputs ("cut time to first report", not "ship report builder"). | Blocker |
| B2 | At least one explicit non-goal. | Blocker |
| B3 | The primary metric is named as primary and has a baseline, target, timeframe, and data source, or each gap is `[OPEN]` with an owner and a due date. | Blocker |
| B4 | Metrics actually measure the goals: a reviewer could tell whether G1 was met from the metrics alone. The primary metric measures the outcome across every channel; it wouldn't rise just because users moved to the new feature. | Major |
| B5 | At least one guardrail metric (what must not get worse). | Major |
| B6 | Kill or rethink criteria are stated, with a number and a date or stage. | Major |
| B7 | No more than ~3 goals and one primary metric. | Minor |
| B8 | If a JTBD analysis exists: its top outcomes appear as metrics; questions it left for the PRD are answered or listed as open; its "what would change our mind" shows up in the rethink criteria; its key circumstances become slices for metrics or AI thresholds. | Major if applicable |

## C. Requirements

| # | Check | Severity |
|---|---|---|
| C1 | Every requirement has a priority, and the P0 list is the true minimum (we'd delay launch for each one). | Blocker |
| C2 | Every P0 has binary, testable acceptance criteria, including at least one unhappy path. With per-flow tables, every P0 appears in some row's Covers column. | Blocker |
| C3 | Every requirement traces to a goal or job (a "Traces to" column or equivalent), with no orphans. | Major |
| C4 | Requirements describe behavior, not implementation, unless a stated constraint requires it. | Major |
| C5 | Unhappy paths are covered: errors, empty states, permissions, limits, edge cases, and the absent person (no one to approve, alert, or answer). | Major |
| C6 | Non-functional requirements that matter have numbers (latency, availability, scale, retention, file limits, accessibility level). | Major |
| C7 | Requirements are atomic (one per row) and have unique IDs. | Minor |
| C8 | Nothing in Requirements contradicts a Non-goal, and no non-goal also appears as a low-priority requirement. | Major |

## D. Risk, rollout, measurement (Standard and Full)

| # | Check | Severity |
|---|---|---|
| D1 | The riskiest assumption is named, with how and when it will be tested and what changes if it's wrong. | Major |
| D2 | Dependencies are listed with an owner and a needed-by date or stage, including data sources that don't exist yet. | Major |
| D3 | Rollout has phases, measurable criteria between phases, and a rollback plan. AI or safety-critical features also have a kill switch: who, scope, what users see, and pull-at-once triggers. | Major |
| D4 | The instrumentation needed to measure every metric in Section 4 is listed, including events that happen in other systems. | Major |
| D5 | Support, docs, end-user communication, and customer-facing enablement are considered. | Minor |
| D6 | Alternatives, including "do nothing", are listed with reasons (Full tier). | Major |

## E. Conditional

The AI checks refer to [prd-ai-sections.md](prd-ai-sections.md).

| # | Check | Severity |
|---|---|---|
| E1a | AI: one consolidated must-never list, each item zero-tolerance (0 failures to launch) and tied to a release-gate row. | Blocker if applicable |
| E1b | AI: quality criteria with launch thresholds, set per key slice, each with who signs off. Criteria trace to user outcomes, not generic metrics like "helpfulness". Fallbacks, a user correction path, and a latency and cost budget are stated. | Blocker if applicable |
| E1c | AI: the eval plan is linked, or `[OPEN: eval plan — owner, due]`. | Blocker if applicable |
| E1d | AI: no eval method is copied into the PRD (test-set contents, where test data comes from, graders, judge prompts). | Major if applicable |
| E2 | Personal or sensitive data: a privacy, security, and compliance section with a data table (where it lives, retention, who can see it), regulatory scope, and a named reviewer. | Blocker if applicable |
| E3 | Existing users or data are affected: migration and backwards-compatibility plan. | Major if applicable |
| E4 | Any UI change: accessibility considered (target level stated). | Major |
| E5 | Pricing or plan impact is stated, or `[OPEN]` with an owner. | Major if applicable |
| E6 | The AI takes actions or calls tools: an actions table gives each one's purpose, risk level (read, decision, draft, commit, message), who it acts as, and whether it needs confirmation. Every commit names the human confirmation that triggers it. | Blocker if the AI writes, sends, or commits anything |
| E7 | Runs inside another platform: permissions requested and never requested, install and admin prerequisites with an owner, and platform limits with source and date. | Major if applicable |
| E8 | AI reads data from several systems: a data-sources table says what each source is used for, whether it exists today, its owner, and how permissions are checked. | Major if applicable |

## F. Clarity and honesty

| # | Check | Severity |
|---|---|---|
| F1 | No invented data, quotes, customers, or numbers presented as real. Unknowns are marked `[Assumption]` or `[OPEN]`. A fictional example is fine when it's labeled fictional. Prices not checked are labeled illustrative. | Blocker |
| F2 | Every open question has an owner, and ideally a due date. Answered questions are moved to decisions. | Major |
| F3 | The summary can be read in 30 seconds, includes the primary metric and timing, and matches the body. | Major |
| F4 | No vague words (see the list below) where a measurable bar is needed, including in rollout criteria. | Major |
| F5 | "Must" and "should" are used deliberately (or priorities carry the meaning) and aren't mixed loosely. | Minor |
| F6 | Terminology is consistent: the same name for the same thing throughout. Loaded terms the acceptance criteria depend on ("saved", "sent", "owner") are defined. | Minor |
| F7 | Skimmable: headings, tables, and short paragraphs. No section restates another (e.g. flows repeating the acceptance criteria), and the length fits the tier. | Minor |

**Vague words to scan for:** fast, quick, at once, a few seconds, easy, simple, intuitive, seamless, robust, scalable, flexible, user-friendly, powerful, smart, better, improve, optimize, enhance, streamline, manageable, going up, support (as a vague verb), handle, appropriate, as needed, etc., and/or, TBD (without an owner), "users" (without a segment).

## G. Readiness test

Answer these from the PRD alone. Any "no" is a blocker.

1. Could an engineer estimate the work and start without a meeting? (Open questions that could change scope by weeks make this a "no".)
2. Could QA write test cases from the acceptance criteria?
3. Could a designer find every state they need to design?
4. Could an exec say in one sentence what we're betting and how we'll know it worked?

## Scorecard format

For reviews of an existing PRD, open the scorecard with a verdict line: **Ready** · **Ready with fixes** (blockers pass, majors open) · **Not ready** (any blocker fails). Then say how many failures are structural, so a strong PRD isn't misread from its score.

```
Verdict: <Ready | Ready with fixes | Not ready> for <purpose>
PRD check: <passed>/<applicable> passed (<n> blockers) · <s> of <f> failures are structural
✗ BLOCKER  [decision]   <ID/section>: "<quote>" → <suggested fix>
✗ BLOCKER  [structural] <ID/section>: "<quote>" → <suggested fix>
✗ MAJOR    [structural] <ID/section>: "<quote>" → <suggested fix>
⚠ MINOR    <ID/section>: <issue> → <suggested fix>
✓ Fixed    <what you changed>
Readiness: Eng ✓ · QA ✗ · Design ✓ · Exec ✓
```
