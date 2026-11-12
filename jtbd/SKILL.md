---
name: jtbd
description: Create or review a Jobs to Be Done (JTBD) analysis for a product, feature, or market. In create mode it identifies the job performer and core functional job, maps the job step by step, writes solution-agnostic desired outcome statements, captures emotional and social jobs, the forces of progress (push, pull, anxiety, habit), and the current solutions being "hired", then turns it into job stories and product implications. It works from the PM's knowledge or from raw research (interviews, tickets, reviews, survey verbatims), or produces a JTBD interview guide. In review mode it checks an existing JTBD analysis, job statements, job stories, outcome statements, or interview guide against JTBD quality rules and returns a verdict with concrete rewrites. Use when a PM mentions "JTBD", "jobs to be done", "what job are customers hiring us for", "job stories", "job map", "outcome statements", "why do customers switch", "review my job stories", "are these good JTBD statements", or wants to reframe a product around customer needs instead of features.
disable-model-invocation: true
---

# Jobs to Be Done

Help the PM understand **the progress a customer is trying to make**, independent of any product, and use it to decide what to build, what to cut, and how to position it. Do this by creating a JTBD analysis, or by reviewing one the PM already has.

This skill combines two JTBD schools:

- **Outcome-Driven Innovation (Ulwick)** treats the job as a stable process, described by a job statement, a job map, and desired outcome statements. It is best for finding **what to improve**.
- **Jobs theory / Switch (Christensen, Moesta)** treats the job as a struggle in a specific circumstance, described by the forces of progress and by hiring and firing solutions. It is best for understanding **why people change** and what to say to them.

References:

- [references/jtbd-framework.md](references/jtbd-framework.md): formulas, the universal job map, worked examples, quality checks.
- [references/jtbd-template.md](references/jtbd-template.md): the full output template, for strategy, segment, and roadmap decisions.
- [references/jtbd-feature-template.md](references/jtbd-feature-template.md): the lighter Feature template, for a JTBD that sits next to a PRD or prototype for one feature.
- [references/interview-guide.md](references/interview-guide.md): the switch and job-map interview script.

## 1. Set up

Infer as much as you can from the request and the workspace. Then confirm the setup in **one** question, with a recommendation:

- **Mode**
  - **Define**: the PM has knowledge and hypotheses, and you build the analysis together. The output is a set of hypotheses to validate.
  - **Synthesize**: the PM has research (transcripts, notes, tickets, reviews, survey verbatims), and you extract jobs from the evidence.
  - **Plan research**: produce a tailored recruit screener and interview guide to discover or validate jobs.
  - **Review**: the PM shares an existing JTBD artifact (a full analysis, job statements, job stories, outcome statements, a job map, or an interview guide) and wants it critiqued. Follow [Review mode](#review-mode).
- **Subject**: the product, feature, or market, and whether the product is new or existing.
- **The decision this should inform**, such as what to build next, which segment to serve, positioning, or a roadmap trade-off. **The decision sets the depth.** A PM who needs one job story for a feature doesn't need a 60-outcome job map. Do only the layers the decision needs, and say which ones you're skipping.
- **Format**, which follows from the decision:
  - **Full**: strategy, segment, positioning, or roadmap decisions. Uses the full template and stays solution-agnostic throughout.
  - **Feature**: a JTBD written for one feature or use case, usually next to a PRD or prototype, read by the team that builds it. Uses the Feature template, which adds what the solution changes at each step and what it does not do for the job. Recommend this when a PRD, prototype, or named feature already exists.

If research files exist in the workspace, read them yourself rather than asking the PM to summarize them.

## 2. Work through the layers in order

Each layer depends on the one before it. When you need the PM, ask **one question per message** with a recommended answer marked `→`, phrased so that "yes" accepts it. When you have evidence, derive the layer from it and show your reasoning briefly.

1. **Job performer**: who is trying to get the job done. This is not necessarily the buyer, so record the buyer, approver, installer, and beneficiary separately.
   - **Several performers:** when more than one role does a job here (e.g. a worker reports, a supervisor responds, a safety manager decides), pick one **main performer** and give them the full map. Give each other role one row: main job, emotional and social jobs, and their top 2–3 outcomes. Stop at about three roles; handle the rest as variants of an existing role.
2. **Core functional job**: verb + object + contextual clarifier, with no product or solution in it. Find the right altitude by **laddering**: ask "why?" to move up and "how?" to move down. Propose 2–3 candidates at different altitudes and recommend one. If the feature only touches one step (e.g. "report an incident"), name the job above it too ("get an unsafe condition fixed"), because competing solutions are judged on the whole job.
3. **Circumstances**: the situations that trigger the job or change what "done well" means (when, where, under what constraints, with whom).
   - **Branches:** when a circumstance changes the order or priority of the steps (e.g. someone is hurt, so getting help comes before reporting), show it as a branch under the job map, not only as a table row.
4. **Job map**: the steps of the core job. Use the universal 8 steps as scaffolding: Define, Locate, Prepare, Confirm, Execute, Monitor, Modify, Conclude. Not every job uses all 8. Name the steps in the performer's language.
   - **Feature format only:** add a last column, "What the solution changes", kept separate from the job columns so the job itself stays solution-agnostic. Write "Nothing" where the solution doesn't touch a step. Those steps are where the job can still fail.
5. **Desired outcomes**: how the performer measures success at each step, e.g. "Minimize the time it takes to…" or "Minimize the likelihood of…". Write 2–5 per step that matters, concentrating on the steps where the struggle is. Tie each outcome to a step, and give each a **"How we'd measure it"**: the metric or observation that would show it moving. That column feeds the PRD's success metrics.
6. **Emotional and social jobs**: how the performer wants to feel, and how they want to be seen.
7. **Current solutions and forces of progress**: what they "hire" today. That includes spreadsheets, **people** (telling a colleague or a manager), workarounds, and doing nothing. Don't file a current solution under habit: habit is attachment to it, the solution itself goes in the current-solutions table with why it's hired and why it's fired. Then capture the four forces: the **push** of the current situation, the **pull** of a new solution, **anxiety** about the new, and the **habit** of the present.
   - Name the **trigger event**: what turns this time into the time they act.
   - Capture forces for every role whose behavior decides adoption, not only the main performer. Look for **conflicting incentives**: a stakeholder who loses something when the job goes well (e.g. a supervisor judged on incident counts when reporting goes up).
8. **Job stories**: "When [circumstance], I want to [motivation], so I can [expected outcome]." Write them for the most important struggles.
9. **Implications**: underserved outcomes (opportunities), overserved outcomes (where to simplify or undercut), what to build, test, or stop, messaging angles, and segments defined by circumstance rather than demographics.
   - **If the solution will use AI**, two more implications follow. The top desired outcome statements are candidate **eval criteria**: "Minimize the likelihood the summary omits a decision" becomes the criterion "captures all decisions". The circumstances become **test-set slices**. List both, so they can seed an eval plan (for example with an evals skill, if available). The analysis itself stays solution-agnostic.

## 3. Evidence discipline

Label every job, outcome, and force. Claims about the **customer** take one of three labels:

- **[Observed]**: specific behavior that was seen, or described with real detail ("last Tuesday I…").
- **[Stated]**: something the customer said in general terms ("I always…", "I'd like…").
- **[Hypothesis]**: an inference by the PM or by you. Customer research tests it.

Claims about the **product, platform, or business** take different labels, because someone else confirms them, by another method:

- **[Assumption]**: something taken as given about the product, platform, or business ("the crew uses Teams on shift", "the vendor's form filling works"). Engineering, the vendor, or the business confirms it. Name who.
- **[Needs validation]**: a specific checkable fact the analysis relies on. Mark it **Confirmed**, with the source, once it's checked.

When nearly everything carries the same label (common in Define mode), say so once in the header ("Everything is [Hypothesis] unless marked") and label only the exceptions.

```
Reporting is one line in a chat app they already have open. [Assumption: the crew uses Teams on shift; site ops confirms]
Workers stop reporting when nothing seems to happen. [Hypothesis]
Teams bots in group chats only receive messages that @mention them. Confirmed (Microsoft docs)
```

In Synthesize mode, cite sources (participant ID, ticket number, review link) and count how many sources support each finding. **Never fabricate quotes, participants, or counts.** A Define-mode analysis is mostly hypotheses, so say so plainly and end with the research plan to validate them.

## 4. Prioritize opportunities

- **With data** (importance and satisfaction ratings from a survey), compute the opportunity score for each outcome: `Importance + max(Importance − Satisfaction, 0)`, on 0–10 scales. Above 10 is underserved, above 15 is extremely underserved, and below 6 is overserved. See the framework reference.
- **Without data**, rank qualitatively by how often the struggle happens × how severe it is × how much evidence supports it. Label the ranking **unquantified**. If the decision is high stakes, recommend an outcome survey.

## 5. Check every statement

Run the quality checks in [references/jtbd-framework.md](references/jtbd-framework.md#quality-checks) on every job statement, outcome statement, job story, and force. Rewrite the ones that fail. For the notable fixes, show a one-line before/after so the PM learns the pattern.

Common failures to catch:

- A solution in the job ("use a dashboard to…").
- A feature disguised as a job.
- Too abstract ("be successful"), or too narrow (a single step rather than the whole job).
- Two jobs in one statement.
- Adjectives where a measure belongs ("quickly", "easily").
- A persona standing in for a situation in job stories ("As an admin…").
- A target inside a job statement ("report it in under a minute"). Targets belong in outcomes, after a baseline exists.
- The product's own words in an outcome ("…to a confirmed report", "…using the draft").
- A current solution, especially a person ("tell the supervisor"), filed only under habit.

## 6. Deliver

Write the analysis to `docs/jtbd/<kebab-name>.md` in the current project, unless the PM names another location or tool. Use the template that matches the format: [the full template](references/jtbd-template.md) or [the Feature template](references/jtbd-feature-template.md).

- **Use one running example throughout**: one concrete, named situation (a site, a person, an event) that the map, outcomes, and forces all refer back to. It makes the analysis readable for people who weren't in the room. Mark it as illustrative if it's invented.
- **Say what the solution does NOT do for the job**: steps it leaves to the performer, decisions it doesn't make, and platforms it doesn't cover. Otherwise readers assume the job map is fully covered.
- **Give every hypothesis a "what would change our mind" signal**: the result that would mean this feature helps less than we think, and what we'd do then.

In chat, keep it short:

- the core job statement
- the top 3 opportunities
- the biggest untested hypothesis
- the recommended next step

Then offer what comes next: an interview guide to validate the hypotheses, or turning the top opportunity into a PRD (for example with a prd skill, if available).

## Review mode

Assess an existing JTBD artifact so the PM can trust it for a decision, and learn the patterns while you do it.

1. **Read the artifact**, plus any research it cites that you can access. Identify:
   - what it contains (which layers, or which kind of statements)
   - which mode it was produced in (hypotheses or evidence)
   - which decision it's meant to inform. If that's unclear, ask (one question, with a recommendation), because the decision sets which gaps matter.
2. **Check every statement** against the [quality checks](references/jtbd-framework.md#quality-checks): J for job statements, O for outcomes, S for job stories, F for forces and solutions, W for the whole analysis. For an interview guide, check it against the interviewer rules and recruiting criteria in [references/interview-guide.md](references/interview-guide.md): it asks about past behavior, has no hypotheticals or leading questions, never pitches, and recruits recent switchers.
3. **Check the analysis as a whole**, beyond individual statements:
   - Is the core job at the right altitude for the decision?
   - Is it the **customer's** job, or the company's goal in disguise ("increase adoption of X")?
   - Are performer, buyer, and beneficiary kept separate? If several roles perform jobs, does each have a main job, and does one main performer have the full map?
   - Does the job map cover the real job, or only the part the product touches today? Does it say what the solution does NOT do?
   - Are customer hypotheses kept apart from product and platform assumptions, each with who confirms it?
   - Does any stakeholder have an incentive that works against the job, and is it in the forces?
   - Are segments defined by circumstance?
   - Do the claims match the cited evidence? Spot-check sources where you can, and flag hypotheses presented as findings.
   - Are layers missing that the decision needs (e.g. forces of progress for a positioning decision)?
   - Do the implications follow from the evidence?
4. **Report, most important first.** Lead with a verdict:
   - **Decision-ready**: sound, and backed by evidence for the stated decision.
   - **Usable as hypotheses**: well formed, but needs validation before it carries a decision.
   - **Needs rework**: core job or structure is wrong.

   Name the 1–3 issues that matter most. Then give a before/after rewrite for every failing statement, grouped by check so the PM can see the pattern. Say briefly what's strong.

   ```
   Verdict: Usable as hypotheses, not yet evidence for the H1 roadmap decision
   Checked: 1 core job, 8 job steps, 22 outcomes, 5 job stories; 11 need work
   What matters most:
   1. The core job names the product (J2), so the map only covers what we do today.
   2. W1: 14 of 22 outcomes have no source; they read as findings but are hypotheses.
   3. Missing: forces of progress, which the positioning decision needs.
   Strong: job stories use real situations; circumstances are well chosen.

   ✗ J2  "Use Acme to track team spending"
         → "Keep team spending within budget during the quarter"
   ✗ O4 ×3  "Minimize the effort to easily approve expenses"
         → "Minimize the time it takes to approve an expense report"
   ✗ S1  "As a manager, I want alerts…"
         → "When a team member's spend passes 80% of budget mid-quarter, I want…"
   ```

5. **Don't rewrite the PM's document unless asked.** After the report, offer three options and recommend one:
   - (a) apply the statement rewrites directly
   - (b) write the review to `<file-name>.review.md` next to the artifact
   - (c) fill the missing layers by switching to Define or Synthesize mode, or produce an interview guide to validate the hypotheses

## Tone

Curious and precise. Keep pulling the PM back from features to the customer's progress, without being pedantic about terminology. Being right about the job matters more than using the right JTBD vocabulary.
