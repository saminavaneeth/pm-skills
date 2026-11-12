---
name: evals
description: Create or review evals (evaluations) for an AI product or AI-enabled feature. This is the PM's side of knowing whether the AI is good enough to ship and stays good after launch. Define mode turns a PRD, JTBD analysis, or idea into an eval plan, with quality criteria tied to user outcomes, a "must never do" list, a test set design with seed cases, a grader per criterion (code check, LLM judge, or human), and launch gates. Analyze mode runs error analysis on real outputs or traces: it reads them, notes failures, groups them into a failure taxonomy, ranks them, then writes and validates the evaluators. Review mode critiques an existing eval plan, rubric, LLM-judge prompt, test set, or eval results and gives a verdict or go/no-go. Output works with any tool (Markdown plan, JSONL/CSV test cases, judge prompts). Use when a PM says "evals", "how do we know the AI is good enough", "quality bar for the AI feature", "golden dataset", "LLM as a judge", "error analysis", "we're switching models or changing the prompt, what could break", "users say the AI answers are bad", "review our eval rubric", or "is the AI feature ready to launch?".
disable-model-invocation: true
---

# Evals

Help the PM answer, with evidence: **does the AI do the user's job well enough to ship, and will we know when it stops?**

Evals are the AI feature's quality spec in a form that can actually be run. Responsibility splits like this:

- **The PM owns** what "good" means, which failures matter, the bar, and the go/no-go call.
- **Engineering owns** the harness, the pipelines, and the tooling.

This skill produces the PM's part, in a form engineers can run in whatever eval tool they use.

Three modes. Infer which one from the request, and ask only if it's unclear:

- **Define**: before or early in the build, when there are few or no real outputs. Produces an eval plan and a seed test set, with failure modes as hypotheses.
- **Analyze**: real outputs exist (traces, logs, a spreadsheet of inputs and outputs, or a prototype you can run). Runs error analysis, builds a failure taxonomy, then writes the evaluators. **This is the highest-value mode, so steer toward it as soon as any real outputs exist.**
- **Review**: critique an existing eval plan, rubric, judge prompt, test set, or set of eval results, and give a verdict.

References:

- [references/eval-method.md](references/eval-method.md): failure modes by task type, criteria, error analysis, graders, judge validation, test sets, thresholds, monitoring.
- [references/eval-plan-template.md](references/eval-plan-template.md): eval plan, test case format, judge prompt, and results report templates.
- [references/eval-checklist.md](references/eval-checklist.md): quality checks and the launch go/no-go rules.

## Principles (every mode)

1. **Start from the user's job, not generic metrics.** "Helpfulness", "coherence", an undefined "accuracy", and ROUGE/BLEU say nothing about whether the user's job got done. Criteria come from user outcomes (JTBD outcome statements, PRD goals) and from observed failures.
2. **Look at the data.** Read real outputs before writing a single evaluator. Real failures beat imagined ones.
3. **Use binary pass/fail per criterion,** with a written definition plus a pass and a fail example. Avoid 1–5 scores: they hide disagreement and you can't set a bar on them.
4. **Pick the cheapest reliable grader.** In order:
   - a code check (format, schema, length, contains, exact match)
   - an LLM judge (judgment calls, one criterion per judge)
   - a human (high stakes, calibration, new failure types)
5. **Trust an LLM judge only after validating it** against a domain expert's labels. Report agreement on passes and on fails separately. Prefer a judge model from a different family than the system it grades, because models tend to favor their own outputs.
6. **Severity beats averages.** Some failures are zero-tolerance: harmful content, leaked data, a wrong money, medical, or legal fact, an irreversible action taken without confirmation. A 95% average can hide them.
7. **Slice by circumstance.** Report results for each slice (input type, segment, language, length, edge cases), not just overall.
8. **Offline evals predict; online signals confirm.** Tie every eval plan to a product metric and to production signals such as thumbs, edits, retries, and escalations.
9. **Evals are living.** Every production failure becomes a test case. Rerun the evals on every prompt, model, retrieval, or tool change.
10. **Never fabricate** results, pass rates, labels, or production data. Mark any test case you write as synthetic.

When you need a decision from the PM, ask **one question per message**, with a recommended answer marked `→` and phrased so that "yes" accepts it. Look up facts yourself. That includes reading the PRD, the code, prompts, logs, and output files.

## Define mode

1. **Gather and read** the inputs yourself:
   - the PRD (especially its AI section)
   - the JTBD analysis (outcome statements, circumstances)
   - the system: what the model does, its inputs, outputs, prompts, tools, and retrieval
   - any sample outputs
2. **Classify the AI task:** generation, extraction or classification, retrieval-augmented answers, conversation, or agent and tool use. The task type determines the likely failure modes and graders (see the method reference).
3. **Settle the decisions** in this order:
   1. What the AI must do for the user, and what it must **never** do.
   2. The cost of a wrong output, and whether the user can tell it's wrong. Together these set how strict the bar is.
   3. The top failure modes, as hypotheses. Propose them from the task-type list and recommend which matter most.
   4. A bar for each criterion, and the zero-tolerance list.
4. **Draft** the plan in this order:
   1. criteria (each traced to an outcome or a failure)
   2. test set design: slices, plus 20–50 seed cases across typical, edge, adversarial, and out-of-scope inputs
   3. a grader for each criterion
   4. launch gates
   5. a regression and monitoring plan
5. **Write the files** in the current project, unless the PM names another location:
   - the plan: `docs/evals/<feature>/eval-plan.md`
   - the seed cases: `docs/evals/<feature>/test-cases.jsonl` (or `.csv` if the PM prefers)
   - the judge prompts: `docs/evals/<feature>/judges/<criterion-id>.md`
6. **Label it honestly.** It is a hypothesis-driven plan, and every judge prompt in it is unvalidated until a domain expert labels cases for it. Recommend switching to Analyze mode once about 50–100 real outputs exist.

## Analyze mode (error analysis)

1. **Get real outputs**: traces, logs, a CSV, or a prototype you can run against the test set if the PM gives you a way to run it. Sample 50–100 diverse cases across slices. Sample more if failures are rare.
2. **Open coding.** Read each trace end to end. Mark it pass or fail, and write one short note on the **first thing that went wrong**: the upstream error, not its downstream symptoms. Don't categorize yet. When a call needs domain judgment, propose a label and ask the PM or domain expert to confirm, a few cases at a time.
3. **Axial coding.** Group the notes into a **failure taxonomy** of 5–10 categories, named in product terms. Define each category with one example that fails and one that passes.
4. **Count and rank** the categories by frequency × severity, and show the table. The PM decides which categories to fix, which to evaluate, and which to accept.
5. **Fix or evaluate.** Some failures just need fixing, like an obvious prompt bug or a missing instruction, so say so. For each failure mode that will recur, choose a grader and write it: a code-check spec or a judge prompt.
6. **Validate every LLM judge.** Pick the judge model first: a different model family from the system under test if possible, with a pinned version. Split the expert-labeled cases into a set for tuning the judge and a set for testing it, with at least 20 expert PASSes and 20 expert FAILs in the test set. Report two numbers:
   - **TPR**: how often the judge passes outputs the expert passed.
   - **TNR**: how often the judge fails outputs the expert failed.

   Iterate on the judge prompt until both are acceptable (typically ≥ 90%). If they won't get there, fall back to human review for that criterion.
7. **Update the plan**, and add the failing cases to the test set.

Stop when new traces stop revealing new failure categories (saturation). Then offer to set up a recurring error-analysis pass on production samples.

## Review mode

1. **Read the artifact**: plan, rubric, judge prompt, test set, or results. Also read the PRD and the system it evaluates, if you can access them. Work out which decision it's meant to inform, and ask if that's unclear.
2. **Run every applicable check** in [references/eval-checklist.md](references/eval-checklist.md).
3. **Give a verdict**:
   - For a plan, rubric, judge, or test set: **Decision-ready**, **Usable with fixes**, or **Needs rework**.
   - For eval results, i.e. a launch decision: **Go**, **Go with conditions**, or **No-go**, using the go/no-go rules in the checklist.
4. **Report, most important first.** Name the 1–3 issues that matter most. For every failure, quote the problem and give a concrete fix. Say briefly what's strong.

   ```
   Verdict: No-go for GA (Go with conditions for the 10% beta)
   What matters most:
   1. Zero-tolerance C5 "never invents an action item owner": 3 failures in 240 cases.
   2. The "faithfulness" judge was never validated against expert labels (GR3),
      so its 96% pass rate can't be trusted yet.
   3. Results are overall only; the long-meeting slice (> 60 min) isn't broken out (TH3).
   Strong: criteria trace to JTBD outcomes; test set drawn from real transcripts.

   ✗ BLOCKER  TH2  C5 has 3/240 failures → fix the prompt, add the 3 cases, rerun
   ✗ BLOCKER  GR3  faithfulness judge (C3) unvalidated → label 100+ cases (≥ 20 FAILs held out), report TPR/TNR
   ✗ MAJOR    TH3  no per-slice results → break out by meeting length and language
   ```

5. **Don't edit the PM's files unless asked.** Offer three options and recommend one:
   - (a) apply the fixes
   - (b) write the review to `<file-name>.review.md` next to the artifact
   - (c) switch to Analyze mode to close the gaps with real data

## Finish

In chat, keep it short:

- where the files are
- the criteria and the zero-tolerance list
- the launch gates
- the biggest unknown
- the next step, usually "run error analysis on the first 100 real outputs"

Offer to update the PRD's AI section so it links to the eval plan and states the launch gates (for example with a prd skill, if available).

## Tone

Plain and concrete. Explain any ML term in one line the first time it appears, because both PMs and engineers read the output. Be firm about evidence: a pass rate without a validated grader and a representative test set is a guess, so say so.
