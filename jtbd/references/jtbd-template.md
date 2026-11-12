# JTBD Analysis Template

Remove the `<!-- -->` guidance from the finished document. Skip any layers the decision doesn't need, but list them under "Not covered" so readers know they were left out on purpose.

```markdown
# JTBD Analysis: <product / feature / market>

| | |
|---|---|
| **Author** | <PM name> |
| **Date** | <YYYY-MM-DD> |
| **Mode** | Define (hypotheses) · Synthesize (evidence) |
| **Evidence base** | <e.g. 12 interviews (P1–P12), 240 support tickets, 1 survey n=310> |
| **Evidence labels** | Customer: [Observed] · [Stated] · [Hypothesis]. Product/platform: [Assumption] (who confirms) · [Needs validation] / Confirmed |
| **Running example** | <one concrete situation used throughout; mark it illustrative if invented> |
| **Decision this informs** | <e.g. what to build in H1 for the reconciliation module> |
| **Not covered** | <layers skipped and why> |

## Summary
<!-- 4–6 lines: the core job, who performs it, the most underserved
outcomes, the key switching insight, and the recommended next step. -->

## Job performer
- **Performer:** <who executes the job>
- **Buyer / approver / installer / beneficiary:** <if different>
- **Not the target:** <who we're explicitly not serving>

<!-- If other roles also perform jobs here, one row each (about three
roles at most). The main performer gets the full map below. -->
| Role | Main job | Emotional / social | Top outcomes | Evidence |
|---|---|---|---|---|

## Core functional job
> **<Verb> <object> <clarifier>** [Observed / Stated / Hypothesis]

| Level | Statement |
|---|---|
| Above (why?) | |
| **Core** | |
| Below (how?) | |

## Circumstances
| Circumstance | How it changes the job | Evidence |
|---|---|---|

## Job map
| # | Step | The performer is trying to… | Key struggles | Evidence |
|---|---|---|---|---|
| 1 | Define | | | |
| 2 | Locate | | | |
| 3 | Prepare | | | |
| 4 | Confirm | | | |
| 5 | Execute | | | |
| 6 | Monitor | | | |
| 7 | Modify | | | |
| 8 | Conclude | | | |

**Branches:** <!-- circumstances that reorder the steps, e.g. "If someone
is hurt, getting help comes first and the rest waits." -->

## Desired outcomes
<!-- Opportunity = Importance + max(Importance − Satisfaction, 0).
Imp/Sat are optional: without survey data, drop those columns and fill in
Rank, labeled "unquantified". -->
| Step | Outcome statement | How we'd measure it | Imp | Sat | Opp. / Rank | Evidence |
|---|---|---|---|---|---|---|
| | Minimize the time it takes to … | | | | | |

## Emotional and social jobs
| Type | Statement | Evidence |
|---|---|---|
| Emotional | Feel / avoid feeling … | |
| Social | Be seen as / avoid being seen as … by … | |

## Current solutions
| Solution (incl. workarounds and doing nothing) | Hired because | Fired because | Evidence |
|---|---|---|---|

## Forces of progress
| Push (current situation) | Pull (new solution) |
|---|---|
| | |
| **Anxiety (about the new)** | **Habit (of the present)** |
| | |

**Typical trigger event:** <!-- what turns passive dissatisfaction into
active looking -->

**Other roles and conflicting incentives:** <!-- forces for each role
whose behavior decides adoption; anyone who loses when the job goes well -->

## Assumptions about the product and platform
| Assumption | Who confirms | Status |
|---|---|---|
| | | Needs validation / Confirmed (source) |

## Job stories
1. When <situation>, I want to <motivation>, so I can <expected outcome>. [evidence]

## Implications
- **Underserved outcomes (opportunities):** <top 3–5, with scores or rank>
- **Overserved outcomes (simplify or undercut):**
- **Build / test / stop:**
- **Messaging and positioning:** <the push to name, the pull to promise,
  the anxieties to defuse>
- **Segments by circumstance:**
- **If the solution uses AI:** candidate eval criteria (from the top
  outcome statements) and test-set slices (from circumstances)
- **What the solution does NOT do for the job:** <steps left to the
  performer, decisions it doesn't make, platforms not covered>


## Hypotheses to validate
| Hypothesis | Riskiness | How to test | Who / how many | What would change our mind | Owner |
|---|---|---|---|---|---|

## Quality check
<!-- e.g. "38 statements checked; 6 rewritten (J2 ×3, O4 ×2, S1 ×1).
Open: W4 — no survey planned yet." -->
```
