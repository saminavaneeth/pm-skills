---
name: handoff
description: Create or review a handoff package for product work that's ready to go to the team that builds it (engineering, design, data science, or a vendor). Create mode finds the PM's artifacts itself (PRD, JTBD analysis, eval plan and test cases, prototype, Product Decision Brief, AI Decision Memo) and checks them against each other for contradictions and gaps. Examples are a non-goal the prototype shows, launch thresholds that differ between the PRD and the eval plan, a must-never item with no test case, metrics or users named differently, and open questions closed in one document but open in another. It walks the PM through each blocking conflict one at a time, then writes one entry-point document with a verdict, linked sources, a decisions log, findings, gaps for the audience, open questions with owners, and kickoff questions. Review mode checks an existing handoff package or the PM's own handoff doc against the same checks and gives a verdict. It never writes product content or edits source documents. Use when a PM says "prepare the handoff to engineering", "handover package", "hand this off to the dev team", "get this ready for the dev team", "are we ready for kickoff?", "is this ready to hand over?", "check my PRD and prototype agree", "do my PRD and eval plan match?", "check my docs are consistent", or "review my handoff doc".
disable-model-invocation: true
---

# Handoff

Get product work ready to hand to the team that builds it. That means **one entry point** that says what's decided, where each source lives, and what's still open. It also means **documents that agree with each other**. The second part is the main value: a PRD, an eval plan, and a prototype can each look fine alone and still contradict each other, and the receiving team finds out mid-build.

Two modes. Infer which one from the request, and ask only if it's unclear:

- **Create**: build the package from the artifacts you find. Follow steps 1–6.
- **Review**: check an existing handoff package, or the PM's own handoff doc, and give a verdict. Follow [Review mode](#review-mode).

Both modes use the same standard: [references/handoff-checklist.md](references/handoff-checklist.md) holds the cross-document checks, the audience table, the default precedence between sources, and the verdict rules. [references/handoff-template.md](references/handoff-template.md) is the package.

## Boundaries

- **No new product content.** Never write requirements, metrics, flows, or eval criteria. If a source document is weak or missing, say so and point to the skill that fixes it (a prd, jtbd, evals, or prototype skill, if available). Never patch the gap in the package.
- **Never edit source documents.** Report inconsistencies and list what to change where. The PM fixes them. Only the handoff package is written.
- **No duplicated method.** Don't rerun the PRD checklist or the eval method. Do cross-document checks only. Offer the deeper reviews as optional next steps, e.g. "run the prd skill's Ready for eng kickoff review" or "run the evals skill's Review mode", if available.
- **Facts vs. decisions.** Find and read the artifacts yourself. Ask the PM only about decisions: which audience, what to do about a conflict, who owns an open question.
- **No silent assumptions.** Every claim in the package links to its source document and section. Anything you can't trace is marked `[Unsourced]` or becomes an open question with an owner.

When you need a decision, ask **one question per message**, with a recommended answer marked `→` and phrased so that "yes" accepts it.

## 1. Find the artifacts

Look before asking. Check the default locations the other skills use, then follow links:

| Artifact | Where to look |
|---|---|
| PRD | `docs/prds/<name>.md` |
| JTBD analysis | `docs/jtbd/<name>.md` |
| Eval plan | `docs/evals/<feature>/eval-plan.md`, plus `test-cases.jsonl` (or `.csv`) and `judges/<criterion-id>.md` |
| Prototype | `prototypes/<name>/`: its `README.md` (flows, gaps), `index.html` (`data-screen`, `data-note="R#…"`), `test-script.md`, any test results |
| Product Decision Brief | `docs/briefs/<name>.md`. If it isn't there, search the project for the title `Product Decision Brief:` |
| AI Decision Memo | `docs/ai-decisions/<name>.md`. If it isn't there, search for `AI Decision Memo:` (and `Triage Verdict:`) |
| Existing handoff | `docs/handoff/<feature>/handoff.md` |

- **Follow links.** Read the PRD's `Links` row and every link inside the documents. A linked file that doesn't exist is a finding.
- **Last updated:** take it from the document header. If there isn't one, use the git log date, then the file date, and say which you used.
- **Read every artifact in full** before running any check.
- Ask the PM for a brief or memo only if you can't find one and the feature's history suggests it exists.

Show what you found in one compact block:

```
Handoff inputs for "report-scheduling"
✓ PRD         docs/prds/report-scheduling.md                Standard · Approved · 2026-10-30
✓ Eval plan   docs/evals/report-scheduling/eval-plan.md     Draft (hypotheses) · 2026-10-02 · 24 cases · 3 judges
✓ Prototype   prototypes/report-scheduling/                 3 flows · 2 known gaps · no test results
✗ JTBD        not found in docs/jtbd/
✗ Brief/memo  no "Product Decision Brief" or "AI Decision Memo" in the project
? Ambiguous   docs/specs/scheduling.md is also a PRD for this feature (2026-08-14, no status)
```

**Resolve ambiguity first.** If two documents cover the same thing (two PRDs, two eval plans), check status and dates. Ask which one is current only if they don't settle it. Recommend the newer approved one.

**Only a PRD is fine.** Missing artifacts become gaps, not failures, unless the audience needs them (see the audience table in the checklist). An AI feature with no eval plan is the common case where a gap is Blocking.

## 2. Choose the audience

Ask who receives the handoff, because it decides which gaps matter:

```
### Who receives this handoff?

- (a) Engineering: edge cases, non-functional requirements, analytics,
      dependencies, rollout, and an owner for the eval harness matter most
- (b) Design: unvalidated flows and usability results matter most
- (c) Data science: the eval plan, test set, judges, and data sources
- (d) A vendor: plus what can and can't be shared outside the company
- (e) Several of these

→ Recommend (a) engineering. The PRD is Approved and the eval plan
  names an eng owner, so the build team is next. Agree?
```

Base the recommendation on what you found. If the PM names the audience in the request, skip this question.

## 3. Run the cross-document checks

Run every applicable check in [references/handoff-checklist.md](references/handoff-checklist.md): scope, metrics, AI bar, users, open questions, decisions, links, readiness for the audience, and staleness.

- **Quote both sides.** Every finding names each source by path and section and quotes the exact text. A conflict you can't quote is not a finding.
- **Rate each finding** Blocking, Should fix, or Note, using the severity rules in the checklist. The audience changes the rating.
- **Check traceability, not quality.** "The PRD's threshold differs from the eval plan's" is a handoff finding. "The PRD's threshold is too low" is not. If you see a quality problem, point to the skill that reviews it.

Report the findings, most important first, in this format:

```
Handoff check: 3 blocking · 2 should fix · 2 notes (audience: engineering)

✗ BLOCKING    SC1  Non-goal shown in the prototype
   PRD §3 Non-goals (docs/prds/report-scheduling.md):
     "CSV export of scheduled reports | Needs a storage decision; v2"
   Prototype screen `export` (prototypes/report-scheduling/index.html):
     button "Export as CSV" → data-go="export-done"
   → Change: remove the screen from the prototype, or move CSV export into scope in the PRD.

✗ BLOCKING    AB2  Launch threshold doesn't match
   PRD §9 Quality bar: "Recipients correct | Zero-tolerance | 100% | every slice"
   Eval plan §3 C2: "Recipients correct … Threshold: ≥ 95%"
   → Change: one bar in both. The PRD owns the bar, so the eval plan changes by default.

✗ BLOCKING    AB3  Must-never item with no test case
   PRD §9 Must never #2: "Send a report to anyone outside the workspace."
   Eval plan: no criterion covers it; no case in test-cases.jsonl
   → Change: add a zero-tolerance criterion and cases to the eval plan (evals skill, if available).

! SHOULD FIX  RE4  No analytics events for the secondary metric
   PRD §4: "Schedules created per workspace | Secondary"; PRD §13 lists no event for it.

· NOTE        ST1  Eval plan is 4 weeks older than the PRD's last change (2026-10-02 vs 2026-10-30, R-07 added)
```

## 4. Walk through the blocking conflicts

Take the Blocking findings **one at a time**, most important first. For each one:

1. State the conflict and quote both sources.
2. Recommend a resolution, using the default precedence in the checklist (for example, the PRD owns the bar and the eval plan owns the method).
3. Record the PM's decision in the decisions log, dated, with "decided in handoff review" as the source.
4. List the change needed: which file, which section, what it should say, and who changes it. The default owner is the owner named in that document's header.

```
### Conflict 2 of 3: launch threshold for "recipients correct"

PRD §9 Quality bar: "Recipients correct | Zero-tolerance | 100% | every slice"
Eval plan §3 C2:    "Recipients correct … Threshold: ≥ 95%"

A wrong recipient leaks a report, which is why the PRD lists it as
must-never. 95% would allow 1 leak in 20.

→ Recommend: keep the PRD's 100% (zero-tolerance). The eval plan's C2
  changes to match; owner Dana (eval plan Eng owner). Agree?
```

- **Don't edit the sources,** even when the fix is obvious. The change goes in the package's "Changes needed" list.
- **A gap isn't a conflict.** For a Blocking gap (no test case, no eval plan, no rollout plan), ask who owns closing it and by when. Never fill it. Once it has an owner and a date, it keeps its Blocking label but counts as a caveat in the verdict, not as Not ready.
- **If the PM can't decide yet,** make it a Blocking open question with an owner and a due date.
- Should fix and Note findings go into the package without a walkthrough. Offer to walk through them after the blockers.

## 5. Confirm before writing

Show a short summary and wait for the PM to confirm it:

```
Ready to write docs/handoff/report-scheduling/handoff.md

Audience:  Engineering
Verdict:   Ready with caveats. 3 conflicts decided; 2 source changes not made yet.
Decided:   CSV export stays a non-goal (prototype drops the screen) · C2 bar is 100%
Caveat:    AB3 test cases for must-never #2: Dana, 2026-11-20 (blocking gap, owned)
Gaps:      no JTBD (note) · no event for "schedules created" (should fix)

Write it?
```

**Write nothing until the PM says yes.** If they correct something, update the summary and confirm again.

## 6. Write the package and finish

Write `docs/handoff/<feature>/handoff.md` from [references/handoff-template.md](references/handoff-template.md), unless the PM names another location. If a package already exists there, read it first and keep its decisions log. Replace the rest.

- **Link, don't restate.** "What we're building and why" is 3–5 lines, each quoting or closely paraphrasing one source line, with a link to its section.
- **Copy non-goals word for word** with links. Don't reword them.
- **Mark anything you can't trace** `[Unsourced]`, or move it to open questions with an owner.
- **Use relative links** from the package's folder (e.g. `../../prds/report-scheduling.md#3-goals-and-non-goals`).
- **The verdict follows the rules** in the checklist. Never round up.

Keep the chat reply short:

- the path
- the verdict and its one-line reason
- the top 1–3 blockers or caveats, each with its owner
- the next step: usually "make the source changes listed in the package, then rerun `/handoff` Review mode before kickoff"

Then offer optional deeper checks that this skill doesn't do, if those skills are available: the prd skill's "Ready for eng kickoff" review, the evals skill's Review mode for the plan, or the prototype skill's Review mode.

## Review mode

Check an existing handoff package, or a handoff doc the PM wrote in any format, so the receiving team can trust it.

1. **Read the handoff doc,** then find and read every source it references, plus any it should reference (step 1's locations). Infer the audience from the doc. Ask only if you can't tell.
2. **Check the doc itself** against the package checks (HP) in the checklist:
   - every claim traces to a source section
   - the source paths exist, and the dates match the sources
   - non-goals match the source text
   - the verdict matches the findings
   - every open question has an owner and a due date
   - the doc is newer than every source it summarizes
   - there's no product content that no source contains
3. **Run the cross-document checks** (step 3) on the sources. A conflict between the sources is still a finding when the handoff doc doesn't mention it.
4. **Report, most important first,** with a verdict: **Ready**, **Ready with caveats**, or **Not ready**. Name the 1–3 issues that matter most and say briefly what's strong. Use the finding format from step 3.

   ```
   Verdict: Not ready for eng kickoff (2 blocking · 3 should fix)
   What matters most:
   1. HP4: the doc says "Ready" but the eval plan's C2 bar (95%) contradicts the PRD (100%).
   2. HP6: the doc predates PRD change R-07 (2026-10-30), so its scope section is stale.
   Strong: every open question has an owner; sources are linked by section.
   ```

5. **Don't edit the PM's document or the sources unless asked.** Offer three options and recommend one:
   - (a) regenerate the package with Create mode, keeping its decisions log
   - (b) write the review to `<file-name>.review.md` next to the handoff doc
   - (c) walk through the blocking conflicts one at a time, as in step 4

## Tone

Plain, specific, and neutral between documents. You're the person who reads everything before kickoff so nobody else has to. Point at the conflict, not at who wrote it. Never present a guess about which document is right as a fact.
