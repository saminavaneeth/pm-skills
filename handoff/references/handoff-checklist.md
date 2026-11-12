# Handoff Checklist

Cross-document checks: they compare the PM's artifacts with each other, not each one against its own standard. The PRD, eval, JTBD, and prototype skills have their own reviews for that. If a check here turns up a quality problem inside one document, name it as a Note and point to that skill's review, if available.

Run every check whose documents exist. A check that needs a missing document becomes a gap, rated with the [audience table](#audience-table).

## Finding format

Each finding has:

- the severity
- the check ID (two letters and a number, e.g. `AB3`, so it never reads like a PRD ID such as `R-03` or an eval criterion such as `C3`)
- a one-line title
- each source, by path and section, with the exact text quoted
- the change needed, in which file

```
✗ BLOCKING    AB3  Must-never item with no test case
   PRD §9 Must never #2 (docs/prds/report-scheduling.md):
     "Send a report to anyone outside the workspace."
   Eval plan (docs/evals/report-scheduling/): no criterion maps to it; 0 cases in test-cases.jsonl
   → Change: eval plan §3 adds a zero-tolerance criterion, and test-cases.jsonl adds cases for it.
```

Use `✗ BLOCKING`, `! SHOULD FIX`, and `· NOTE`.

## Severity

- **Blocking**: the receiving team would build, test, or measure the wrong thing, or can't start. It must be resolved (decided, or owned with a date) before the handoff.
- **Should fix**: the team can start, but will lose time or ask about it at kickoff. It needs an owner.
- **Note**: worth knowing; no action required.

The defaults below assume an engineering audience. The audience can raise or lower a rating, so say when it did. **The PM may downgrade a finding,** but only with a recorded reason, owner, and date (e.g. "test cases written in sprint 1, Dana, 2026-11-20"). The package shows both the original rating and the reason.

## Audience table

What each audience needs. A missing artifact is rated by this table, not by default.

| Artifact | Engineering | Design | Data science | Vendor |
|---|---|---|---|---|
| PRD | Blocking | Blocking | Blocking | Blocking |
| Eval plan (AI features only) | Blocking | Note | Blocking | Blocking if the vendor builds or runs the AI |
| Eval test cases for every must-never item | Blocking | Note | Blocking | Blocking if the vendor builds or runs the AI |
| Prototype (features with a UI) | Should fix | Should fix | Note | Should fix |
| Usability test results | Note | Should fix | Note | Note |
| JTBD analysis | Note | Should fix | Note (Should fix for AI: it seeds criteria and slices) | Note |
| Product Decision Brief | Note | Note | Note | Note; internal by default |
| AI Decision Memo (AI features only) | Note | Note | Should fix | Note; internal by default |

## SC. Scope

| # | Check | Default severity |
|---|---|---|
| SC1 | No prototype screen, flow, button, or scripted output shows something the PRD lists as a non-goal. Check the README's flows, every `data-screen`, and the visible labels in `index.html`. A link to the kit's "Not in this prototype yet" screen is fine. | Blocking |
| SC2 | When a prototype exists, every P0 requirement in the PRD is covered by a prototype screen (a `data-note="R-xx…"`, or a README flow that lists the ID), or is named in the README's known gaps or the PRD's "Prototype vs this PRD" section. | Should fix. Note if a gap list names it |
| SC3 | Every requirement ID the prototype or eval plan cites exists in the PRD and means the same thing (IDs weren't renumbered). | Should fix |
| SC4 | Nothing the PRD requires is in the JTBD's "What this feature does NOT do". A JTBD build implication that the PRD makes a non-goal has a recorded reason. | Blocking for a requirement; Should fix for an implication |
| SC5 | The PRD's scope matches the brief's MVP, deferred, and non-goals lists, or the PRD's decision log records the change. | Blocking if a P0 or non-goal flipped; Should fix otherwise |
| SC6 | The eval plan's test slices cover the PRD's in-scope inputs and don't test non-goal features. | Should fix |
| SC7 | The PRD's "Prototype vs this PRD" section agrees with the prototype README's "real vs faked" and known gaps. | Note |

## MT. Metrics

| # | Check | Default severity |
|---|---|---|
| MT1 | The primary metric is the same metric (name and definition) in the brief, the AI memo, and the PRD. | Blocking |
| MT2 | Baselines, targets, and timeframes for the same metric match across documents. | Blocking for the primary; Should fix for others |
| MT3 | Kill and stop criteria agree. The brief's kill criterion, the memo's stop criteria, and the JTBD's "what would change our mind" either appear in the PRD's kill or rethink criteria, or the PRD records why they were dropped. | Should fix |
| MT4 | Guardrails in the brief or memo appear in the PRD's guardrail metrics. | Should fix |
| MT5 | The product metric the eval plan links to (§8) is a metric in the PRD. | Should fix |

## AB. AI bar (AI features only)

The PRD states the bar; the eval plan holds the method. These checks only compare the two.

| # | Check | Default severity |
|---|---|---|
| AB1 | An AI feature has an eval plan, or the PRD has `[OPEN: eval plan — owner, due]`. | Rate by the audience table |
| AB2 | Each criterion the PRD sets a launch threshold for (AI §5) has the same threshold, severity, and slice scope ("every slice" vs "overall") in the eval plan's criteria (§3) and launch gates (§7). | Blocking |
| AB3 | Every PRD must-never item maps to a zero-tolerance eval criterion, and that criterion has at least one case in `test-cases.jsonl` (look at each case's `criteria` field). Check adversarial cases too. | Blocking |
| AB4 | The eval plan's must-never list (§1) matches the PRD's. Extra items in the eval plan go back to the PRD, which owns the list. | Should fix |
| AB5 | Every slice the PRD sets a threshold for is a test-set slice in the eval plan (§5), with cases. | Should fix |
| AB6 | Latency and cost budgets, and who signs off each criterion, match between the PRD and the eval plan. | Should fix |
| AB7 | The PRD's actions respect the memo's autonomy level. A memo at level 1–2 (a person decides) conflicts with a Commit or Message action that needs no confirmation. | Blocking |
| AB8 | The brief's AI quality bar and the memo's pass and stop criteria agree with the PRD's thresholds, or the PRD records the change. | Should fix |
| AB9 | The kill switch's "pull it at once if" includes every must-never item. | Should fix |
| AB10 | Every judge the eval plan lists (§6) has a file in `judges/`. | Should fix |
| AB11 | The eval plan's status fits how the PRD uses it. "Draft (hypotheses)" or unvalidated judges feeding a launch gate are a Note: point to the evals skill's Review mode. | Note |

## US. Users

| # | Check | Default severity |
|---|---|---|
| US1 | The primary user or segment has the same name across the brief, the memo, the JTBD's main performer, the PRD (§5), the eval plan's job (§1), and the prototype README's audience. | Blocking if they are different people; Should fix if it's only the wording |
| US2 | The roles in the PRD's roles table match the roles in the prototype and the JTBD. The prototype doesn't let a role do what the PRD says it can't. | Should fix |
| US3 | Nobody the brief marks "Not for" is a target in the PRD. | Should fix |

## OQ. Open questions

| # | Check | Default severity |
|---|---|---|
| OQ1 | A question closed in one document isn't still open in another, including inline `[OPEN: …]` markers. | Should fix; Blocking if the answers differ |
| OQ2 | Every open question has an owner. | Should fix; Blocking if the receiving team can't start without the answer |
| OQ3 | Every open question has a due date, and none is past due. | Should fix |
| OQ4 | Every inline `[OPEN: …]` in a document body also appears in that document's open questions table. | Note |

## DE. Decisions

| # | Check | Default severity |
|---|---|---|
| DE1 | Every "Eng decides" item has someone in engineering to decide it: a named eng reviewer in the PRD header, or an owner the PM names now. | Should fix |
| DE2 | No decision in the brief or memo is contradicted by the PRD without a decision log entry. | Blocking if it changes scope, the AI approach, or must-never; Should fix otherwise |
| DE3 | The memo's recommendation fits the PRD. "Build without AI", "Not yet", or "Don't build" next to a PRD with AI behavior is a contradiction. | Blocking |
| DE4 | If the PRD's status says "Build starts after <validation gate>", there's evidence the gate passed. | Blocking |
| DE5 | Where the prototype's copy or flow order differs from the PRD's acceptance criteria, the acceptance criteria win, and the difference is listed. | Note |

## LK. Links

| # | Check | Default severity |
|---|---|---|
| LK1 | Every linked file exists. | Should fix |
| LK2 | Documents that exist are linked. If the PRD says `[OPEN: eval plan …]`, the eval plan doesn't exist yet. | Should fix |

## RE. Readiness for the audience

Presence checks only: is it there? If it's there but weak, add a Note pointing to the prd skill's "Ready for eng kickoff" review.

| # | Audience | Check | Default severity |
|---|---|---|---|
| RE1 | Engineering | The PRD has an edge-case table. | Should fix |
| RE2 | Engineering | Non-functional requirements that matter have numbers, or are `[OPEN]` with an owner. | Should fix |
| RE3 | Engineering | Every metric in PRD §4 has an analytics event or a named source (§13). | Should fix; Blocking for the primary metric |
| RE4 | Engineering | Dependencies have owners and needed-by dates, including data sources marked "No" or `[NV]`. | Should fix |
| RE5 | Engineering | Rollout has stages, criteria to move on, and a rollback plan. AI or safety-critical features also have a kill switch. | Should fix; Blocking for a missing kill switch on an AI feature |
| RE6 | Engineering | An AI feature has a named owner for the eval harness (the eval plan's Eng owner). | Blocking |
| RE7 | Engineering | Platform permissions and limits are stated when the feature runs inside another product. | Should fix |
| RE8 | Design | Each P0 flow is marked as usability-tested (with results) or not yet tested. | Should fix |
| RE9 | Design | No usability result shows a flow failing that the PRD keeps unchanged without saying why. | Should fix |
| RE10 | Design | The PRD's required states (empty, loading, error, permission denied) are in the prototype or in its known gaps. | Should fix |
| RE11 | Data science | The eval plan has a test set location, judges, and a named domain expert for labels. The PRD's data-sources table has owners. | Should fix |
| RE12 | Data science | Production signals (thumbs, edits, retries) are mapped to PRD events. | Should fix |
| RE13 | Vendor | The PM has decided what can be shared. Pricing, strategy, kill criteria, real customer names, and the brief and memo are internal by default. Ask, and list the internal sections. | Blocking until decided |
| RE14 | Vendor | Every P0 has acceptance criteria, since that's what the vendor is held to. | Blocking |
| RE15 | Vendor | The data the vendor will see matches the PRD's privacy table (data sent to third parties). | Blocking |

## ST. Staleness

| # | Check | Default severity |
|---|---|---|
| ST1 | No source is older than a PRD change that touches what it covers. Read the PRD's "Last updated" note for the IDs it changed. Age alone isn't a finding. | Should fix; Blocking if the change touches scope or the AI bar |
| ST2 | No document links to or cites a superseded version (an old path, a version suffix, `Status: Superseded`, or an older PRD date). | Should fix |
| ST3 | The eval plan's "System under test" matches the model or prompt version the PRD names, if it names one. | Note |
| ST4 | Every source has a date. | Note |

## HP. The handoff doc itself (Review mode)

| # | Check | Default severity |
|---|---|---|
| HP1 | Every claim links to a source document and section, or is marked `[Unsourced]`. | Should fix; Blocking for a scope or AI bar claim |
| HP2 | Every source path exists, and the "last updated" dates match the sources. | Should fix |
| HP3 | Non-goals are copied word for word from the PRD. | Should fix |
| HP4 | The verdict follows the verdict rules below, given the findings. | Blocking |
| HP5 | Every open question has an owner, a due date, and a blocking flag. | Should fix |
| HP6 | The doc is newer than every source it summarizes. | Should fix; Blocking if a newer source changed scope or the AI bar |
| HP7 | It contains no requirements, metrics, flows, or criteria that no source contains. | Blocking |

## Which source wins by default

Use this when recommending a resolution. It's a starting point, and the PM decides.

| Concern | Default owner |
|---|---|
| The job, desired outcomes, circumstances | JTBD analysis |
| Whether to build, and whether to use AI | Brief and AI memo, unless the PRD's decision log records a later decision |
| Scope, non-goals, requirements, metrics, the AI bar (must-never, thresholds, slices, budgets) | PRD |
| Eval method: criterion definitions, test cases, graders | Eval plan |
| Look, layout, interaction detail | Prototype. It never decides scope, and exact copy lives in the PRD's acceptance criteria |
| Two versions of the same document | The newer approved one |

**Exception:** if the non-owner document is newer and the change looks deliberate (e.g. error analysis raised a threshold), recommend updating the owner document instead, and say why.

## Verdict rules

- **Ready**: no Blocking findings or Blocking open questions; every artifact the audience requires exists; every Should fix has an owner.
- **Ready with caveats**: nothing Blocking is unresolved. Each of these counts as a caveat, and each is listed:
  - a Blocking conflict decided in this session whose source changes aren't made yet
  - a Blocking gap with an owner and a due date. It keeps its Blocking label in the findings, so the receiving team sees it, but it doesn't make the verdict Not ready.
  - a downgraded finding
  - an open Should fix item with an owner
- **Not ready**: any Blocking finding or Blocking open question is undecided or has no owner, or an artifact the audience requires is missing.

Give the verdict for the named audience ("Ready with caveats for engineering"). With several audiences, give one verdict per audience.
