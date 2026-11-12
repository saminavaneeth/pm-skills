# Handoff Package Template

Write the package to `docs/handoff/<feature>/handoff.md` unless the PM names another location. Remove the `<!-- -->` guidance from the finished file.

- **Everything links to a source section.** Use relative links from the package's folder: `../../prds/<name>.md#<section>`, `../../evals/<feature>/eval-plan.md#<section>`, `../../../prototypes/<name>/README.md`.
- **Nothing new.** The package points to and quotes the sources. It adds no requirements, metrics, flows, or criteria. Anything you can't trace is `[Unsourced]` or an open question.
- **Never leave a heading empty.** Write `None found` or `N/A — <reason>`.
- Keep the check IDs (SC1, AB3, …) and the source IDs (R-03, C2, Q4) so people can refer to them in tickets and comments.

```markdown
# Handoff: <feature>

| | |
|---|---|
| **For** | <Engineering · Design · Data science · Vendor: name> |
| **From** | <PM name> |
| **Prepared** | <YYYY-MM-DD> |
| **Kickoff** | <date, or [OPEN: kickoff date — PM]> |
| **How to read this** | Start here. Each section links to the source document, which stays the source of truth. If this page and a source disagree, the source wins; tell the PM. |

## 1. Verdict

**<Ready · Ready with caveats · Not ready> for <audience>:** <one-line reason>.

<!-- Caveats, one line each: what, owner, by when. With several audiences,
one verdict line per audience. -->
- <caveat> — <owner>, <date>

## 2. What we're building and why
<!-- 3–5 lines. Each quotes or closely paraphrases ONE source line and
links to its section. No new claims. -->
- **Problem:** <…> ([PRD §2](../../prds/<name>.md#2-problem))
- **For:** <primary user> ([PRD §5](../../prds/<name>.md#5-users-roles-and-jobs))
- **We'll build:** <…> ([PRD §1](../../prds/<name>.md#1-summary))
- **Success means:** <primary metric, baseline → target, by when> ([PRD §4](../../prds/<name>.md#4-success-metrics))
- **Riskiest assumption:** <…> ([PRD §11](../../prds/<name>.md#11-risks-assumptions-and-dependencies))

## 3. Source documents

| Artifact | Path | Last updated | Status | Notes |
|---|---|---|---|---|
| PRD | [docs/prds/<name>.md](../../prds/<name>.md) | <date (header · git · file date)> | <Approved> | <tier> |
| Eval plan | | | <Draft (hypotheses) · Launch-gating> | <n cases, n judges> |
| Prototype | | | | <flows covered; usability tested? Y/N> |
| JTBD | | | | |
| Decision brief | | | | <internal only?> |
| AI Decision Memo | | | | <recommendation> |
| <missing artifact> | — | — | **Missing** | <gap rating for this audience> |

## 4. Decisions log
<!-- Decisions already in the sources (brief, memo, PRD decision log),
plus those made in this handoff review. Keep entries from earlier versions
of this package. -->
| # | Decision | Rationale | Source | Date |
|---|---|---|---|---|
| D1 | <decision> | <why> | [Brief: Key decisions](<link>) | <date> |
| D2 | <decision> | <why> | Decided in handoff review | <date> |

## 5. Consistency findings
<!-- By severity. Same format as the checklist: both sources quoted, then
the change needed. Decided conflicts say what was decided (D#). -->

### Blocking

✗ **<ID> <title>**
- <Source A §x> ([link](<link>)): "<exact quote>"
- <Source B §y> ([link](<link>)): "<exact quote>"
- **Decided:** <D#, or "Undecided — see Q#">
- **Change needed:** <file § → what it should say> — <owner>, <date> — <Not done yet · Done>

### Should fix

! **<ID> <title>** — <sources quoted, change needed, owner>

### Notes

· **<ID> <title>** — <one line>

<!-- Downgraded findings: "<ID> downgraded from Blocking: <reason> —
<owner>, <date>". -->

### Changes needed in the source documents
<!-- The checklist for the PM, grouped by file. This skill never makes
these edits. -->
| File | Section | Change | Owner | Due | Done |
|---|---|---|---|---|---|
| | | | | | ☐ |

## 6. Gaps for this audience
<!-- Missing artifacts and missing sections the audience needs, rated by
the audience table. Each gap points to what fixes it; never fill it here. -->
| Gap | Rating | Why it matters for <audience> | How to close it | Owner |
|---|---|---|---|---|
| <e.g. No test cases for must-never #2> | Blocking | <…> | Eval plan update (evals skill, if available) | |

## 7. Open questions
<!-- Every open question from every source, deduplicated, plus new ones
from this review. Keep source IDs. -->
| # | Question | Source | Owner | Due | Blocking? |
|---|---|---|---|---|---|
| Q1 | | [PRD Q3](<link>) | | | Yes · No |

## 8. Kickoff questions
<!-- 5–10 questions the receiving team should push on: the riskiest
assumption, Eng decides items, [NV] data sources and platform limits,
unvalidated flows, decided-but-unapplied conflicts, thin areas from the
findings. Questions only — no answers invented here. -->
1. <question> — <why it matters, with a link to the source>

## 9. Out of scope / non-goals
<!-- Copied word for word from the PRD (and the brief, if it adds any),
with links. Don't reword or merge. -->
From [PRD §3 Non-goals](../../prds/<name>.md#non-goals):

| Not in this release | Why |
|---|---|
| <copied exactly> | <copied exactly> |

<!-- Vendor audience: add "## 10. Not shared" listing the internal
sections withheld and who decided (RE13). -->
```
