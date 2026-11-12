# Eval Method Reference

How to define, build, validate, and maintain evals for an AI feature. A single running example is used throughout: an **AI meeting summary** that produces a summary, the decisions made, and action items with owners from a meeting transcript.

## 1. Who owns what

| PM (with a domain expert) | Engineering |
|---|---|
| What the AI must and must never do | The eval harness, CI, and tooling |
| Quality criteria and their pass/fail definitions | Running evals at scale, dashboards |
| Failure taxonomy from error analysis | Logging and trace capture |
| Test set composition: which slices and cases matter | Test set storage, versioning, pipelines |
| Thresholds, launch gates, go/no-go call | Implementing code checks and judge calls |
| Labeling (or appointing the expert labeler) | Model, prompt, and retrieval changes |

Name **one domain expert** as the final word on labels, so the definition of "good" doesn't drift between labelers.

## 2. Task types and typical failure modes

Use this table to seed failure-mode hypotheses in Define mode. Real error analysis replaces them later.

| Task type | Typical failure modes |
|---|---|
| **Generation** (summaries, drafts, rewrites) | Omits key information · states facts not in the source (hallucination) · wrong emphasis · wrong tone or length · ignores instructions or format |
| **Extraction / classification** | Misses an item · wrong field or label · invents a value · format or schema errors · inconsistent on near-identical inputs |
| **Retrieval-augmented answers** (RAG) | Answer not supported by the retrieved sources · retrieves wrong or irrelevant sources · missing or wrong citation · answers when it should say "I don't know" · uses stale information |
| **Conversational assistant** | Loses context across turns · doesn't ask a needed clarifying question · refuses valid requests (over-refusal) · complies with requests it should refuse · breaks persona or policy |
| **Agent / tool use** | Wrong tool or wrong arguments · loops or stalls · doesn't finish the task · takes an irreversible action without confirmation · too many steps (cost, latency) |
| **Cross-cutting** | Harmful or unsafe content · leaks personal or confidential data · follows instructions injected via inputs (prompt injection) · quality differs across user groups or languages · too slow · too expensive per use |

## 3. From user outcomes to criteria

Good criteria come from two sources:

- **User outcomes.** JTBD desired outcome statements and PRD goals say what "done well" means.
- **Observed failures.** Error analysis shows what actually goes wrong.

| JTBD outcome / observed failure | Criterion | Pass if… | Fail if… |
|---|---|---|---|
| Minimize the likelihood that the summary omits a decision made in the meeting | **C1 Captures all decisions** | Every decision a reviewer finds in the transcript appears in the Decisions list | Any decision is missing |
| Minimize the time it takes to know what I personally must do next | **C2 Action items have owners** | Every action item names an owner stated or clearly implied in the transcript | Any action item lacks an owner |
| Observed: summary assigns tasks to people who weren't in the meeting | **C5 Never invents an owner** (zero-tolerance) | Every named owner was a participant and was assigned in the transcript | Any owner is not supported by the transcript |
| Minimize the likelihood of acting on something that wasn't said | **C3 Faithful to transcript** | Every claim is supported by the transcript | Any claim is unsupported or contradicted |

**Criterion spec:** ID · name · pass definition · fail definition · one pass example · one fail example · severity (zero-tolerance / high / medium / low) · grader · threshold · source (outcome or failure).

**Rules for criteria:**

- **One thing per criterion.** "Accurate and concise" is two criteria.
- **Binary.** If people argue about whether something passes, sharpen the definition and add examples. Don't add a scale.
- **Written in product terms** that an engineer, a PM, and the domain expert would all apply the same way.

## 4. Error analysis

The most reliable way to find out what to evaluate. Don't start from a generic list of metrics.

1. **Sample** 50–100 real traces across slices: different inputs, users, and lengths, including some that got thumbs-down or were edited. Sample more if failures are rare.
2. **Open coding.** For each trace, read the whole thing (input, retrieval, tool calls, output). Mark it pass or fail, and write a one-line note on the **first** thing that went wrong. Upstream errors cause downstream symptoms. For example, bad retrieval causes a hallucinated answer, so fix and evaluate the upstream cause.
3. **Axial coding.** Group the notes into 5–10 failure categories, each with a name, a definition, and an example.
4. **Count and rank.**

   | Failure category | Count / 100 | Severity | Action |
   |---|---|---|---|
   | Misses decisions phrased as questions ("so we're going with B?") | 14 | High | Fix prompt + eval C1 |
   | Action item has no owner | 9 | Medium | Eval C2 |
   | Invents an owner | 3 | Zero-tolerance | Fix + eval C5 + online monitor |
   | Summary too long for meetings < 15 min | 7 | Low | Code check on length |

5. **Stop at saturation**, when another 20 traces add no new category.
6. **Repeat regularly** on fresh production samples. Weekly early on, monthly once things are stable.

## 5. Graders

Choose the **cheapest grader that's reliable** for each criterion.

| Grader | Use for | Examples |
|---|---|---|
| **Code check** (deterministic) | Anything objectively checkable | Valid JSON/schema · length limits · required sections present · contains/doesn't contain · exact match on extracted fields · named owner appears in participant list · latency and cost |
| **LLM judge** | Judgment calls that can be written down | Faithfulness to source · captures all decisions · appropriate refusal · tone |
| **Human review** | High stakes, new failure types, calibrating judges, final launch sign-off | Expert review of a sample, plus every zero-tolerance flag |
| **Pairwise comparison** (judge or human) | Choosing between two versions (prompt or model change) | "Which summary captures the decisions better, A or B?", with order randomized |

**Writing an LLM judge:**

- One criterion per judge, with a binary PASS/FAIL verdict.
- Include the written definition and at least one pass and one fail example, preferably real ones from error analysis.
- Ask for brief reasoning **before** the verdict. Return structured output: `{"reasoning": "...", "verdict": "PASS"|"FAIL"}`.
- Give it the source or reference it needs (the transcript, the retrieved documents, key facts).
- Never use the cases you test the judge on as examples inside the judge prompt.
- Make it repeatable: temperature 0 (or the lowest the tool allows) and a pinned model version, so the same output gets the same verdict next week.

**Choosing the judge model:**

- **Prefer a different model family from the system under test,** and at least as capable. A model tends to rate its own outputs, and outputs in its own style, higher than people do (self-preference bias). It also shares its own blind spots: if it didn't notice a fact was wrong while writing the answer, it often won't notice while judging it.
- **If you must use the same model** (cost, data residency, only one approved vendor), keep each judge to one narrow binary criterion, give it the source material, and look hardest at **TNR** during validation. Self-preference shows up as failures the judge lets through.
- **Validation decides, not the vendor.** No judge model is trusted by default, whatever its family. Record which model and version each judge uses next to its TPR and TNR.

**Known judge biases to design around:**

| Bias | What happens | Counter |
|---|---|---|
| Self-preference | Rates its own family's outputs higher | Different-family judge; check TNR |
| Position | In pairwise comparisons, favors whichever output comes first (or second) | Randomize order, or run both orders and count a win only if it holds both ways |
| Length | Rates longer, more detailed-looking answers higher | Binary criteria that don't reward length; a separate code check on length |
| Leniency | Passes borderline cases, especially with vague criteria | Sharper pass/fail definitions and borderline fail examples |

## 6. Validating an LLM judge

A judge is a model, and it makes mistakes too. Before its numbers inform a decision:

1. The domain expert labels cases PASS or FAIL for the criterion, until the held-out test set (step 2) has at least 20 of each. That usually means 100+ labels in total. If failures are rare, deliberately add failing cases from error analysis or adversarial inputs: a TNR measured on 5 failures is meaningless.
2. Split the labeled cases into a **dev** set (used to tune the judge prompt) and a **test** set (held out, used once you're done tuning).
3. Run the judge on the test set and report:
   - **TPR** (true positive rate): of the cases the expert passed, the share the judge passed.
   - **TNR** (true negative rate): of the cases the expert failed, the share the judge failed.

   Report both. Overall agreement hides a judge that passes everything when most cases pass.
4. Aim for both at or above about 90%. If you can't reach that, sharpen the criterion definition, add examples, or use human review instead.
5. Re-validate when the judge's model or prompt changes, or when the product's inputs shift.

**What a validated judge still can't tell you:**

- **A judge's pass rate is an estimate, not the true rate.** A judge with 95% TPR and 90% TNR on a system whose true pass rate is 90% reports about 87%. If the gap matters for the decision, correct it: true pass rate ≈ (judge pass rate + TNR − 1) / (TPR + TNR − 1).
- **"0 failures" from a judge doesn't prove there are 0 failures.** A judge with 90% TNR misses 1 in 10 real failures. For zero-tolerance criteria, use a code check where possible, and send a human sample plus every judge flag to review.

## 7. Test set design

**Sources, best first:**

1. real production or beta inputs (anonymized)
2. inputs written by domain experts
3. synthetic inputs generated along defined dimensions

Always label each case's source.

**Slices.** Define the dimensions that change difficulty or what "good" means, then cover their combinations. JTBD circumstances are a strong source of slices.

| Dimension | Values |
|---|---|
| Meeting length | < 15 min · 15–60 min · > 60 min |
| Meeting type | Standup · decision meeting · customer call · brainstorm |
| Transcript quality | Clean · crosstalk · poor ASR · mixed language |

**Mix (rule of thumb):** about 60% typical, 25% edge cases, 15% adversarial and out-of-scope. Out-of-scope includes cases where the right behavior is to refuse, ask, or say "I don't know".

**Size:**

| Purpose | Size |
|---|---|
| Smoke test (every change) | 20–50 cases |
| Launch decision | 100–300+, with ≥ 20–30 per slice that matters |
| Rare zero-tolerance failures | Targeted adversarial cases, plus production monitoring. Random sampling won't find them. |

**Mind the noise.** With 100 cases, a 90% pass rate has a margin of roughly ±6 points (95% confidence interval). A 2-point difference between two versions on a small set is noise, not progress.

**Hygiene:**

- Version the test set.
- Keep a held-out portion.
- Never put test cases into the prompt as examples, since that leaks the answers.
- Refresh the set from production failures.

## 8. Thresholds and launch gates

Set the bar per criterion, based on the **cost of a wrong output** and on **whether the user can tell it's wrong**. Errors the user can't detect need a higher bar.

| Gate | Example requirement |
|---|---|
| Zero-tolerance criteria | 0 failures on the full test set + adversarial cases, and a human review of a sample |
| High-severity criteria | ≥ 95% pass **in every key slice** |
| Medium/low criteria | ≥ 85–90% overall, no slice below 80% |
| Baseline | No worse than the current solution or previous version beyond noise. Better on the primary criterion. |
| Graders | Every LLM judge used in the gates validated (TPR and TNR ≥ 90%) |
| Cost & latency | Within the PRD budget (e.g. p95 < 4 s, < $0.02 per summary) |

For the beta, the gates can be looser, but only with mitigations: human review of outputs, a limited audience, a visible feedback control.

## 9. Regression and production monitoring

- **Rerun** the smoke set on every prompt, model, retrieval, or tool change, and the full set before every release. For model swaps, add a pairwise comparison against the current version.
- **Production signals** (online): thumbs up/down, edits to the output, copy/share rate, retries and regenerations, abandonment, escalations to a human, support tickets.
- **Online guardrails:** run cheap code checks, and validated judges for zero-tolerance criteria, on live traffic or a sample of it. Alert on any failure.
- **Running judges online:** use the same validated judge prompts and pinned models as offline, so online and offline numbers can be compared. Run them asynchronously, after the response, unless the judge has to block a harmful output. Sample traffic to control cost. Check that sending user data to the judge model is allowed by the same privacy terms as the product.
- **Close the loop:** a weekly sample of production traces goes through error analysis, and new failures become test cases.
- **Check that offline predicts online.** If eval pass rates rise but production signals don't improve, the test set or criteria don't reflect real use. Revisit them.

## 10. Glossary

- **Trace**: the full record of one AI interaction: input, intermediate steps (retrieval, tool calls), and output.
- **Golden set / test set**: a curated set of inputs (and optionally reference outputs) used to evaluate the system.
- **LLM-as-judge**: using a language model to grade outputs against a written criterion.
- **TPR / TNR**: how often a judge agrees with the expert on passes / on fails.
- **Self-preference bias**: a judge model rating outputs from its own model family higher than people would.
- **Slice**: a subset of cases sharing a property (e.g. long meetings), used to find where quality drops.
- **Hallucination / faithfulness**: stating something not supported by the source / staying within what the source supports.
- **Regression**: quality getting worse after a change.
- **Saturation**: the point in error analysis where new traces stop revealing new failure types.
