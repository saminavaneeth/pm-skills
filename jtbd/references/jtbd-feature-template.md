# JTBD Feature Template

Use this when the JTBD serves one feature or use case, usually next to a PRD or prototype, and the readers are the team that builds it. It keeps the job solution-agnostic but adds a column for what the solution changes, so every design choice traces back to a step where the job breaks.

Remove the `<!-- -->` guidance from the finished document. Aim for something a new team member reads in 10 minutes.

```markdown
# Jobs to be done: <feature or use case, in plain words>

**Feature:** <one or two lines: what it is, where it runs, what it doesn't use>
**Problem it serves:** <the problem statement, with its ID if the PRD has one>
**Part of:** <links to the PRD, prototype, eval plan>
**Example used throughout:** <one concrete situation; say if it's invented>
**Decision this informs:** <e.g. scope of v1, whether to build it at all>

**Evidence labels.** <!-- Say once if nearly everything shares a label. -->
- **[H] Hypothesis:** what we believe about the customer. Discovery tests it.
- **[A] Assumption:** what we take as given about the product or platform. <Who> confirms it.
- **[NV] Needs validation:** a specific fact to check before we rely on it. Marked **Confirmed** with a source once checked.

## 1. Who does the job

| Role | Main job | Related jobs (functional, emotional, social) |
|---|---|---|
| **<Main performer>** (<name>, <role>) | When <situation>, I want to <motivation>, so I can <progress>. [H] | |
| <Second role> | | |
| <Third role, at most> | | |

**Buyer and installer:** <who pays, who approves, who has to set it up>.
**Handled as variants, not roles:** <e.g. contractors, as a permission level>.

**The job above this feature:** <!-- Ladder up once. "Report an incident"
is a step; "get an unsafe condition fixed" is the job competing solutions
are judged on. -->

## 2. Job map: the main performer

| Step | What they do today [H] | Where it breaks [H] | What this feature changes |
|---|---|---|---|
| <Step in their words> | | | <or "Nothing" — the job can still fail here> |

**If <circumstance>, the job changes.** <!-- One branch per circumstance
that reorders the steps, e.g. "someone is hurt: getting help comes first". -->

**Other circumstances that change the job:** <!-- e.g. night shift with
no supervisor, several witnesses, phones restricted, language. Note which
the feature handles and which it leaves out. -->

## 3. Current solutions

| Solution (people, paper, apps, doing nothing) | Hired because | Fired because |
|---|---|---|
| <e.g. telling the supervisor on the floor> | | |
| Doing nothing | | |

## 4. Desired outcomes

★ marks the three that matter most. Rank is unquantified; targets are set after discovery gives a baseline.

| | Step | Outcome | How we'd measure it |
|---|---|---|---|
| ★ | | Minimize the time it takes to … | |
| | | Minimize the likelihood that … | |

<!-- Include 1–3 outcomes for each other role. If the feature uses AI, the
★ outcomes are candidate eval criteria and the circumstances are test-set
slices: link the eval plan. -->

## 5. Forces of progress

| Force | <Main performer> [H] | <Other role whose behavior decides adoption> [H] |
|---|---|---|
| **Push of today** | | |
| **Pull of the new way** | | |
| **Anxieties** | | |
| **Habits** | | |

**Trigger event:** <what makes this time the time they act>.
**Conflicting incentives:** <anyone who loses when the job goes well, e.g. a supervisor judged on incident counts>.

**How the design answers the anxieties:** <bullets>. Whether that is enough is a hypothesis. [H]
**How the design meets the habits:** <bullets>.

## 6. What this feature does NOT do for the job
- <steps left to the performer or another system>
- <decisions it doesn't make>
- <platforms or regions not in this release>

## 7. Evidence status and validation plan

**Where we stand:** <one line on what the analysis rests on>.

**Assumptions to confirm**
- [A] <assumption>. <Who confirms>. [NV]
- <fact>. **Confirmed** (<source>).

**Plan:** <days or weeks, method, who and how many; weight the main performer>.
**Go signal:** <the result that says build it>.
**What would change our mind:** <the result that says this feature helps less than we think, and what we'd do then>.
```
