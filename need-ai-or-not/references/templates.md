# Templates

Output templates for `need-ai-or-not`. Fill every field from the conversation. Where a value is unknown, write "Gap" and add it to the gaps or open questions table; never fill it with an estimate.

---

## Problem statement

> **[User]** needs to **[job]** when **[situation]**. Today they **[current workaround]**, which costs **[time, money or risk]**. We'll know we've solved it when **[metric]** moves from **[baseline]** to **[target]** by **[date]**.

---

## Triage Verdict

Produce this at the end of triage (step 4).

```markdown
# Triage Verdict: <problem name>

**Verdict:** Use a simpler option | Not enough information yet | Worth a full assessment
**Why:** <two sentences>

## Problem
<solution-free problem statement>

## Baseline
| Measure | Value | Label (Measured / Reported / Assumed) |
|---|---|---|
| Volume | | |
| Time per instance | | |
| Quality (error or rework rate) | | |
| Cost | | |
| Coverage (work not done today) | | |
| Expert agreement | | |

## Options considered
| Option | Rung | Share of problem solved | Effort | Risk | Why it is or isn't enough |
|---|---|---|---|---|---|

## AI fit score, for: <the specific step AI would do>
| Factor | Score (1–3) | Evidence | Label |
|---|---|---|---|
| Input variety | | | |
| Can you write the rules? | | | |
| Volume | | | |
| Error tolerance | | | |
| Reviewability | | | |
| Data and context | | | |
| **Total** | | | |

## Gaps
| Gap | Cheapest way to close it | Owner |
|---|---|---|

## Next step
<the simpler option to build | the gaps to close first | "Continue to the full assessment?">
```

---

## AI Decision Memo

Produce this at the end of the full assessment (step 9), only after the PM confirms the summary.

```markdown
# AI Decision Memo: <name>

**Recommendation:** Build without AI | Hybrid | AI-first | Not yet | Don't build
**Decision owner:** <PM>    **Date:** <date>    **Review date:** <date>

## Problem
<solution-free problem statement>

## Baseline
<one line, with labels>

## Options considered
<the ladder in brief, and why each lower rung was or wasn't enough>

## Where AI fits
Step AI handles: <step>
Fit score: <total>/18, any 1s: <factors>

## Error plan
| Error | Example | Who is hurt | Caught in time? | Reversible? | Severity |
|---|---|---|---|---|---|
| False alarm | | | | | |
| Miss | | | | | |
| Made-up or wrong detail | | | | | |

Worse error: <which> → tuning: <favour precision or recall, in plain words>
Autonomy level: <1–5, name> — <who decides>
How users see and fix errors: <sources shown, edit or reject, low-confidence routing, corrections captured>

## Data and constraints
- Data: <exists? quality? labelled history? context needed?>
- Permissions and privacy: <contract terms, personal or health data, model provider terms, storage>
- Customer policies and rules: <AI policies, qualified-person requirements, legal review>
- People to involve: <names or roles>

## Evidence
- Eval set: <size, mix of cases, how right answers were recorded>
- Pass criteria: <…>
- Stop criteria: <…>
- Results: <scores by case type and severity, or "not yet run">
- Failure patterns: <…>

## Cost and adoption
| Item | Value | Label |
|---|---|---|
| Value per use | | |
| Cost per use (including review time) | | |
| Uses per month | | |
| Net value per month | | |

Where it appears in the workflow: <…>
Trust and control: <sources shown, override, switch off>

## Success metrics
| Metric | Baseline | Target | By when |
|---|---|---|---|

After-launch signals: eval reruns after each change, acceptance rate, edit and override rate, cost per use, complaints.

## Risks and open questions
| Item | Owner | Due |
|---|---|---|
```
