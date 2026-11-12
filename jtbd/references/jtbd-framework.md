# JTBD Framework Reference

Formulas, rules, and examples for each layer of the analysis. A single running example is used throughout: a **finance manager closing the books at month end**.

## 1. Job performer

The person who executes the core job. They are often different from:

- the **buyer** (who pays),
- the **approver** (who signs off),
- the **beneficiary** (who receives the result).

Record each of these separately, because they hire for different reasons.

> Example: Job performer = finance manager at a 50–500 person company. Buyer = CFO. Beneficiary = leadership team and auditors.

## 2. Core functional job

**Formula:** `verb` + `object of the verb` + `contextual clarifier (optional)`

> **Close** + **the company's financial books** + **at month end**

### Laddering to find the right altitude

| Direction | Ask | Example |
|---|---|---|
| Up (more strategic) | "Why do you do that?" | Give leadership an accurate view of financial performance |
| **Core job** | | **Close the company's financial books at month end** |
| Down (more tactical, usually a job step) | "How do you do that?" | Reconcile bank transactions with invoices |

Choose the altitude that matches the decision. A feature team usually works at the core-job level or one level below it. A new-product or strategy decision may work one level above.

## 3. Circumstances

Circumstances are the context that triggers the job or changes what "done well" means. **Segment by circumstance, not by demographics.**

| Circumstance | How it changes the job |
|---|---|
| Quarter-end or year-end close | Audit scrutiny is higher; accuracy outweighs speed |
| First close after an acquisition | New entities and charts of accounts; mapping is the bottleneck |
| A key team member is on leave | Knowledge sits in one person's head; handover becomes critical |

## 4. The universal job map

These 8 steps (Ulwick and Bettencourt) are a scaffold, not a straitjacket. Merge or drop steps that don't exist for the job, and describe each step **without naming a solution**.

| Step | The performer is trying to… | Month-end close example |
|---|---|---|
| 1. **Define** | Plan, set goals, determine what's needed | Determine which accounts must be reconciled this period |
| 2. **Locate** | Gather the inputs and information needed | Gather statements and transaction data from every account |
| 3. **Prepare** | Set up the inputs and environment | Organize transactions so they can be matched |
| 4. **Confirm** | Verify they're ready to execute | Verify every source is complete for the period |
| 5. **Execute** | Do the core of the job | Match transactions to invoices and records |
| 6. **Monitor** | Check whether execution is going well | Track open discrepancies against the close deadline |
| 7. **Modify** | Make adjustments when something's off | Resolve discrepancies and post adjusting entries |
| 8. **Conclude** | Finish the job and wrap up | Finalize the books and report results to leadership |

Many jobs also include **troubleshoot**, **maintain/update**, or **share** steps. Add them when they're real.

## 5. Desired outcome statements

These are the metrics the performer uses, often without saying so, to judge success at each step.

**Formula:** `direction` + `metric` + `object of control` + `contextual clarifier`

- **Direction:** almost always **Minimize**. Use **Increase** only when "minimize" would be unnatural.
- **Metric:** usually *the time it takes to…* or *the likelihood of / that…*, sometimes *the number of…*
- **Object of control:** the thing that varies.
- **Clarifier:** the context that makes the statement precise.

| Step | Outcome statement |
|---|---|
| Locate | Minimize the time it takes to gather statements from all accounts |
| Confirm | Minimize the likelihood of starting reconciliation with an incomplete data set |
| Execute | Minimize the likelihood of missing a transaction when matching |
| Monitor | Minimize the time it takes to see which discrepancies put the deadline at risk |
| Modify | Minimize the time it takes to find the cause of a discrepancy |
| Conclude | Minimize the likelihood that an error is found after the books are closed |

A full outcome-driven study often has 50–150 outcomes. For most PM decisions, 15–30 well-chosen outcomes on the steps with the most struggle are enough.

## 6. Emotional and social jobs

- **Emotional (personal):** how the performer wants to feel, or avoid feeling. Format: *Feel* / *Avoid feeling* + state + context.
  > Feel confident the numbers are right before sending them to the CFO. Avoid feeling panicked in the last two days of close.
- **Social:** how the performer wants to be perceived. Format: *Be seen as* / *Avoid being seen as* + perception + by whom.
  > Be seen by the CFO as someone who closes on time without surprises.

Emotional and social jobs often decide **which** solution gets hired, even when the functional job is identical.

## 7. Current solutions and forces of progress

**Current solutions** include anything hired for the job: competing products, spreadsheets, an agency, an intern, a manual process, and **non-consumption** (not doing the job at all). For each one, capture:

- **why it's hired**: what it does well,
- **why it gets fired**: what makes people leave it.

**The forces of progress** (Moesta and Spiek): a switch happens only when **push + pull > anxiety + habit**.

| Promoting change | Blocking change |
|---|---|
| **Push** of the current situation: what's wrong now, and the trigger event that makes it urgent. *"Close took 9 days; the new CFO wants 4."* | **Anxiety** about the new solution: will it work, what will it cost, what could go wrong. *"Will auditors accept auto-matched entries?"* |
| **Pull** of the new solution: the better life they imagine. *"Matching that just happens overnight."* | **Habit** of the present: comfort, sunk cost, existing skills. *"The team knows the spreadsheet by heart."* |

Implications: product and marketing can **increase push** (make the cost of the status quo visible), **increase pull**, **reduce anxiety** (trials, migration help, proof), and **reduce habit** (imports, familiar patterns). Teams usually over-invest in pull and under-invest in reducing anxiety.

## 8. Job stories

**Formula:** `When` [situation: trigger + context] `I want to` [motivation: what they want to do] `so I can` [expected outcome: the progress]

> When a bank transaction doesn't match any invoice during close, I want to see the most likely matches and why, so I can resolve it without digging through email threads.

Job stories replace "As a [persona]…" user stories when **the situation matters more than who the person is**. Use them for feature framing and design briefs.

## 9. Prioritizing outcomes: the opportunity score

Survey job performers on each outcome: **importance** ("How important is it to you that…") and **satisfaction** ("How satisfied are you with your current solution's ability to…"). Use the percentage of respondents rating 4–5 on a 5-point scale, divided by 10, so each score falls on 0–10.

**Opportunity = Importance + max(Importance − Satisfaction, 0)**

| Score | Meaning | Implication |
|---|---|---|
| > 15 | Extremely underserved | Strong opportunity; candidate for a differentiator |
| 10–15 | Underserved | Opportunity worth pursuing |
| 6–10 | Appropriately served | Table stakes; maintain |
| < 6, or satisfaction > importance | Overserved | Simplify, de-prioritize, or undercut on price |

Without survey data, rank by **frequency × severity × strength of evidence**, and label the result **unquantified**.

## Quality checks

Run these checks on every statement. Rewrite anything that fails.

### Job statement

| # | Check | Failing example → fix |
|---|---|---|
| J1 | Starts with a verb, has an object, and the clarifier (if any) adds precision. | "Financial reporting" → "Report financial results to leadership" |
| J2 | **Solution-agnostic**: no product, brand, technology, or feature. | "Use a dashboard to track sales" → "Monitor sales performance against target" |
| J3 | **Stable over time**: the job existed 20 years ago and will exist in 10. | "Reconcile accounts in the cloud" → "Reconcile accounts" |
| J4 | The **right altitude**: not a single step ("why?" moves up), not an aspiration ("how?" moves down). | "Export a CSV" → "Share financial results with stakeholders"; "Be a great CFO" → "Close the books at month end" |
| J5 | **One job** per statement, with no "and". | "Track and report expenses" → two jobs |
| J6 | No adjectives, adverbs of quality, or **numeric targets**, since those belong in outcomes. | "Quickly and easily book travel" → "Book travel for a business trip"; "Report a hazard in under a minute" → "Get a hazard fixed without stopping work" |
| J7 | Written from the performer's perspective, in their words. | "Leverage synergies in AP" → "Pay suppliers on time" |
| J8 | Functional job kept separate from emotional and social jobs. | "Close the books without stress" → functional job + "Avoid feeling stressed at close" |

### Desired outcome statement

| # | Check | Failing example → fix |
|---|---|---|
| O1 | Follows direction + metric + object + clarifier. | "Faster matching" → "Minimize the time it takes to match transactions to invoices" |
| O2 | **Measurable and controllable**: you could survey or measure it, and a solution could move it. | "Minimize stress" → move to emotional jobs |
| O3 | **Solution-free**, including the product's own vocabulary (button labels, feature names, its states). | "Minimize the time it takes to use auto-match" → "…to match transactions to invoices"; "…from the event to a confirmed report" → "…from the event to a complete, saved report" |
| O4 | No ambiguous words (easy, fast, accurate, reliable, efficient); the metric does that work. | "Minimize errors to make reconciliation accurate" → "Minimize the likelihood of matching a transaction to the wrong invoice" |
| O5 | One outcome per statement. | "…time and errors when…" → split |
| O6 | Tied to a specific job step. | Unassigned outcome → place it on the map or drop it |

### Job story

| # | Check | Failing example → fix |
|---|---|---|
| S1 | The **situation** is concrete (trigger + context), not a persona. | "As an admin, …" → "When a team is reorganized and members change roles, …" |
| S2 | The **motivation** is what they want to do, not a feature. | "I want a bulk-edit button" → "I want to change everyone's permissions in one pass" |
| S3 | The **expected outcome** is real progress, not "save time". | "so I save time" → "so no one loses access to tools they need on day one" |
| S4 | It implies something a designer could act on and test. | Too generic to design for → add the specific trigger |

### Forces and solutions

| # | Check |
|---|---|
| F1 | All four forces are present, and each is specific (a trigger event, a named fear), not generic. |
| F2 | Current solutions include non-consumption and workarounds, not only direct competitors. |
| F3 | Each solution has both a "hired because" and a "fired because". People count as solutions ("tell my manager"); they aren't only a habit. |
| F4 | Forces cover every role whose behavior decides adoption, and name any **conflicting incentive**: a stakeholder who loses something when the job goes well (e.g. a supervisor judged on incident counts). |
| F5 | A trigger event is named: what makes this time the time they act. |

### Whole analysis

| # | Check |
|---|---|
| W1 | Every finding carries an evidence label ([Observed], [Stated], or [Hypothesis]) and, in Synthesize mode, a source and count. Product, platform, and business claims are labeled [Assumption] or [Needs validation] instead, with who confirms them. |
| W2 | No fabricated quotes, participants, or numbers. |
| W3 | The implications follow from the evidence and answer the decision the analysis was meant to inform. |
| W4 | Hypotheses come with a concrete plan to validate them (who, how many, which method), weighted toward the main performer, and a "what would change our mind" signal. |
| W5 | The map covers the whole job, not only the steps the product touches, and the analysis says what the solution does NOT do for the job. |
| W6 | Circumstances that reorder the job (an emergency, a missing role) are shown as branches. |
