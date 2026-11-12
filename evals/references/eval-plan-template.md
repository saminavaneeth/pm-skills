# Eval Templates

This file has four templates:

1. the eval plan
2. the test case format
3. the LLM judge prompt
4. the results report

Remove the `<!-- -->` guidance from the finished files.

## 1. Eval plan — `docs/evals/<feature>/eval-plan.md`

```markdown
# Eval plan: <feature>

| | |
|---|---|
| **PM owner** | <name> |
| **Eng owner** | <name> |
| **Domain expert (final word on labels)** | <name> |
| **Status** | Draft (hypotheses) · Grounded in error analysis · Launch-gating |
| **System under test** | <model, prompt version, retrieval/tools version> |
| **Last updated** | <YYYY-MM-DD> |
| **Links** | PRD · JTBD · traces/logs · eval dashboard |

## 1. What the AI does for the user
- **Job:** <the user's job this AI supports, from JTBD/PRD>
- **Input → output:** <what goes in, what comes out>
- **Task type:** generation · extraction/classification · RAG · conversational · agent/tool use
- **Must never:** <the things the AI must never do>

## 2. Cost of failure
| Who is affected | Can they tell it's wrong? | Cost of a wrong output | Strictness |
|---|---|---|---|
| | Yes / Sometimes / No | | High · Medium · Low |

## 3. Quality criteria
| ID | Criterion | Pass if… | Fail if… | Severity | Grader | Threshold | Source |
|---|---|---|---|---|---|---|---|
| C1 | | | | Zero-tol · High · Med · Low | Code · Judge · Human | | JTBD outcome / failure #… |

<!-- For each criterion, add one pass and one fail example below the table,
ideally real ones from error analysis. -->

## 4. Failure taxonomy
<!-- From error analysis. In Define mode, list the hypothesized failure
modes and label them [Hypothesis]. -->
| Failure mode | Definition | Count / n | Severity | Action (fix · eval · accept) | Criterion |
|---|---|---|---|---|---|

## 5. Test set
- **Location / version:** <path, version>
- **Sources:** <x% production, y% expert-written, z% synthetic>
- **Size:** <n cases>; held-out: <n>

| Slice | Why it matters | # cases |
|---|---|---|
| Typical | | |
| Edge: <…> | | |
| Adversarial / out-of-scope | | |

- **Refresh:** <how often, from which production signals>

## 6. Graders
| Criterion | Grader | Spec / judge prompt | Judge model (pinned) | Validation |
|---|---|---|---|---|
| C1 | LLM judge | judges/C1.md | <model + version>; different family from system under test? Y/N | TPR <x>% · TNR <y>% on <n> expert labels (<n> FAILs) (<date>) |
| C4 | Code check | <rule> | — | Deterministic |

## 7. Launch gates
| Gate | Requirement | Result | Pass? |
|---|---|---|---|
| Zero-tolerance | 0 failures on full set + adversarial; human sample review | | |
| High-severity | ≥ <x>% in every key slice | | |
| Baseline | No regression vs <baseline> beyond noise | | |
| Graders | All gating judges validated | | |
| Cost / latency | <budget> | | |

## 8. Regression and monitoring
- **Rerun:** smoke set on every prompt/model/retrieval/tool change; full set before each release.
- **Production signals:** <thumbs, edits, retries, escalations> → linked to product metric <metric from PRD>.
- **Online guardrails:** <checks running on live traffic, alert owner>.
- **Error-analysis cadence:** <weekly/monthly>, owner <name>.

## 9. Open questions
| # | Question | Owner | Due |
|---|---|---|---|
```

## 2. Test cases — `docs/evals/<feature>/test-cases.jsonl`

One JSON object per line. Engineers can load this format into most eval tools.

```json
{"id": "tc-001", "slice": "decision-meeting/15-60min", "input": {"transcript": "..."}, "reference": {"decisions": ["Go with vendor B"], "action_items": [{"task": "Send contract", "owner": "Dana"}]}, "criteria": ["C1", "C2", "C5"], "source": "production", "notes": "Decision phrased as a question"}
{"id": "tc-002", "slice": "adversarial/out-of-scope", "input": {"transcript": "<empty>"}, "reference": {"expected_behavior": "Says there is nothing to summarize; no invented content"}, "criteria": ["C3", "C5"], "source": "synthetic", "notes": ""}
```

The `reference` field is optional. It holds expected key facts or behavior, not necessarily a full expected output. Mark every case you write yourself `"source": "synthetic"`.

CSV alternative, with the same columns: `id, slice, input, reference, criteria, source, notes`.

## 3. LLM judge prompt — `docs/evals/<feature>/judges/<criterion-id>.md`

```
You are evaluating ONE quality criterion of an AI output for <product/feature>.

## Criterion: <ID> <name>
PASS if: <precise pass definition>
FAIL if: <precise fail definition>
<Clarifications for borderline cases.>

## Examples
<Example 1 — input excerpt, output excerpt>
Reasoning: <why it passes>
Verdict: PASS

<Example 2 — input excerpt, output excerpt>
Reasoning: <why it fails>
Verdict: FAIL

## Case to evaluate
Input:
{{input}}

Reference (if provided):
{{reference}}

Output:
{{output}}

Judge only this criterion. Ignore other qualities of the output.
First give your reasoning in 1–3 sentences, then the verdict.
Respond with JSON only: {"reasoning": "...", "verdict": "PASS" | "FAIL"}
```

Record the judge's validation below the prompt: the date, the number of expert labels (and how many were FAILs), TPR, TNR, the judge model and pinned version, and whether it's from a different model family than the system under test.

## 4. Results report

```markdown
# Eval results: <feature> — <system version> — <YYYY-MM-DD>

**Verdict:** Go · Go with conditions · No-go — <one line why>
**Test set:** <version, n cases>   **Compared to:** <baseline version>

| Criterion | Severity | Overall | Worst slice (n) | Threshold | Baseline | Status |
|---|---|---|---|---|---|---|
| C5 Never invents an owner | Zero-tol | 237/240 | long meetings 2/40 fail | 0 failures | 1 failure | ✗ |
| C1 Captures all decisions | High | 94% | crosstalk 86% (35) | ≥ 95% per slice | 89% | ✗ |

**Grader validity:** <which judges are validated, TPR/TNR, judge model + version, same or different family from the system under test>
**Cost / latency:** <p95, cost per use vs budget>
**Notable failures:** <2–3 examples with trace IDs>
**Conditions / next steps:** <what must change, owner, date>
```
