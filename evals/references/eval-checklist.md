# Eval Quality Checklist

Run every check that applies to the artifact under review (plan, rubric, judge, test set, or results). For each failure, report:

- the severity
- the check ID (two letters + number, e.g. `GR3`, so it never reads like a criterion ID such as `C3`)
- the quoted problem
- a concrete fix

Mark fixes that need no PM decision as "no decision needed". Apply them only if the PM asks you to edit the files.

**Severity**
- **Blocker**: must pass before evals inform a launch decision.
- **Major**: should pass.
- **Minor**: polish.

## PG. Grounded in the product

| # | Check | Severity |
|---|---|---|
| PG1 | Criteria trace to user outcomes (JTBD, PRD goals) or observed failures, not generic metrics like "helpfulness" or ROUGE. | Blocker |
| PG2 | A "must never" / zero-tolerance list exists. | Blocker |
| PG3 | The cost of a wrong output and whether users can detect it are stated, and the strictness matches. | Major |
| PG4 | The plan links to a product metric and to production signals. | Major |

## CR. Criteria

| # | Check | Severity |
|---|---|---|
| CR1 | Every criterion is binary, with written pass and fail definitions. | Blocker |
| CR2 | Every criterion has at least one pass and one fail example. | Major |
| CR3 | One thing per criterion: no "accurate and concise". | Major |
| CR4 | No undefined vague words: helpful, good, relevant, high quality, natural, appropriate, accurate. | Major |
| CR5 | Every criterion has a severity. | Major |

## EA. Error analysis

| # | Check | Severity |
|---|---|---|
| EA1 | Failure modes come from reading real outputs. If none exist yet, they're labeled [Hypothesis] and a date for the first error analysis is set. | Blocker if real outputs exist |
| EA2 | Failure categories are distinct, defined, and counted. | Major |
| EA3 | Notes capture the first upstream error, not downstream symptoms. | Minor |

## TS. Test set

| # | Check | Severity |
|---|---|---|
| TS1 | Covers the slices that matter: typical, edge, adversarial, out-of-scope, and each key segment or circumstance. | Blocker |
| TS2 | Representative of production: drawn from or checked against real inputs, with synthetic cases labeled. | Major |
| TS3 | Big enough for the decision, and small differences on small sets aren't over-read. | Major |
| TS4 | Includes cases where the right behavior is to refuse, ask, or say "I don't know". | Major |
| TS5 | No leakage: test cases aren't used as examples in the prompt or judge being evaluated. | Major |
| TS6 | Versioned, with a held-out portion and a refresh plan. | Minor |

## GR. Graders

| # | Check | Severity |
|---|---|---|
| GR1 | Deterministic code checks are used wherever the criterion is objectively checkable. | Major |
| GR2 | Each LLM judge covers one criterion, is binary, includes the definition and examples, gives reasoning before the verdict, and returns structured output. | Major |
| GR3 | Every LLM judge that feeds a decision is validated against expert labels, with TPR and TNR reported separately. | Blocker |
| GR4 | Each judge's model version is pinned, and judges are re-validated when their model or prompt changes. | Minor |
| GR5 | Human graders have written guidelines, a named expert with the final word, and a calibration step. | Major if humans grade |
| GR6 | Gating judges use a different model family from the system under test. If they share a family, the reason is stated and TNR meets the bar under GR7. | Major |
| GR7 | Judge validation has enough of each label to measure both rates: ≥ 20 expert PASSes and ≥ 20 expert FAILs in the held-out set. | Major |
| GR8 | Zero-tolerance criteria don't rely on a judge alone: a code check where possible, plus human review of judge flags and a sample. | Major |
| GR9 | Pairwise judges randomize or swap output order. | Minor |

## TH. Thresholds and decisions

| # | Check | Severity |
|---|---|---|
| TH1 | Every criterion has a threshold with a rationale (cost of error, baseline). | Blocker |
| TH2 | Zero-tolerance criteria require 0 failures, plus a human sample review. | Blocker |
| TH3 | Results are reported per slice, not only overall. | Major |
| TH4 | Results are compared to a baseline (previous version, current solution, or human performance). | Major |
| TH5 | Cost and latency are measured alongside quality. | Major |

## LV. Living system

| # | Check | Severity |
|---|---|---|
| LV1 | Rerun triggers are defined: every prompt, model, retrieval, or tool change, and every release. | Major |
| LV2 | Production failures feed back into the test set. | Major |
| LV3 | Owners and cadence are set for running the evals and for recurring error analysis. | Major |

## HN. Honesty

| # | Check | Severity |
|---|---|---|
| HN1 | No fabricated results, pass rates, labels, or production data; synthetic cases are marked. | Blocker |
| HN2 | Unknowns are marked open, with an owner. | Major |

## Go / no-go for eval results

- **Go** requires all of the following:
  - every zero-tolerance criterion has 0 failures, checked as GR8 requires (not by a judge alone)
  - every high-severity criterion meets its threshold **in every key slice**
  - every gating judge is validated (GR3, GR7)
  - the test set is representative (TS1, TS2)
  - there is no regression against the baseline beyond noise
  - cost and latency are within budget
- **Go with conditions**: every zero-tolerance and high-severity gate passes, and only medium/low-severity, baseline, or cost/latency gates miss, by a small margin. There must be explicit mitigations (limited audience, human review, feedback control), each with an owner and a re-check date.
- **No-go**: any zero-tolerance failure, any unvalidated gating judge, or a missed high-severity threshold in a key slice.

## Scorecard format

```
Verdict: <Decision-ready | Usable with fixes | Needs rework>  or  <Go | Go with conditions | No-go> for <purpose>
Eval check: <passed>/<applicable> passed (<n> blockers)
What matters most:
1. ...
✗ BLOCKER  <ID>: <issue> → <fix>
✗ MAJOR    <ID>: <issue> → <fix>
⚠ MINOR    <ID>: <issue> → <fix>
✓ No decision needed  <fix you can apply if the PM asks>
Strong: <what to keep>
```
