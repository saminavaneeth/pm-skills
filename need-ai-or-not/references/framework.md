# Framework reference

Rubrics and tables for each step of `need-ai-or-not`.

1. Solution ladder (step 3)
2. AI fit scorecard (step 4)
3. Error questions (step 5)
4. Autonomy levels (step 5)
5. Validation methods (step 7)
6. Cost and adoption (step 8)
7. Kinds of AI
8. Traps to watch for
9. Calibration examples

---

## 1. Solution ladder

Pick the lowest rung that solves the problem. Each rung up adds cost, unpredictability and upkeep. Rungs 1 to 5 need no AI.

| Rung | Option | Example |
| --- | --- | --- |
| 1 | Process or policy change | Change who does what, or when |
| 2 | Better UX | Fewer fields, pick lists, photo capture, better defaults |
| 3 | Templates and defaults | Pre-filled forms, checklists, sample text |
| 4 | Search, filters, saved views | Find similar past records by keyword |
| 5 | Rules and automation | If a date nears, notify; validate inputs; scheduled jobs |
| 6 | Predictive model | Score which accounts or sites are at higher risk, from structured history |
| 7 | AI with human review | AI drafts, extracts or classifies; a person confirms |
| 8 | AI agent acting alone | AI takes multi-step actions with no routine review |

Good reasons to move up the ladder:

- Inputs vary too much for rules: free text, photos, audio, documents in many formats.
- There are too many cases to write rules for, or the rules keep breaking.
- Experts can't explain how they decide; they "just know."

Rungs combine. A redesigned form with validation rules often removes most of the problem, leaving AI only the messy free-text step.

---

## 2. AI fit scorecard

Score the specific step AI would do, from 1 to 3 on each factor.

| Factor | 1: poor fit | 2: possible | 3: strong fit |
| --- | --- | --- | --- |
| Input variety | Structured fields, predictable | Some free text | Free text, images, audio, many formats |
| Can you write the rules? | Yes, as a clear flowchart | Partly, with many exceptions | No; experts "just know" |
| Volume | A few a week | Dozens a week | Hundreds or more, or a backlog nobody reaches |
| Error tolerance | Must be right every time | Errors are annoying but fixable | Errors are cheap or caught quickly |
| Reviewability | Hard to tell if the output is right | Checking takes some effort | A person can check it in seconds |
| Data and context | Missing or not allowed | Available but messy | Available, clean and permitted |

Reading the total (rules of thumb, not validated benchmarks):

- **15 to 18:** strong candidate; continue to the full assessment.
- **10 to 14:** possible, usually as a hybrid; find the one step where AI fits.
- **Below 10:** probably not AI; go back to the ladder.
- **Any 1 on error tolerance or data:** resolve that first, whatever the total.

Why reviewability matters: AI pays off most when checking an answer is much faster than producing it. If checking takes as long as doing the work, AI saves little.

---

## 3. Error questions

Ask these for each likely kind of error.

| Question | What to capture |
| --- | --- |
| What does a wrong output look like? | Two or three concrete examples |
| Who is affected, and how badly? | The user, their customer, a regulator, a worker's safety |
| Will someone notice before it causes harm? | Who notices, and how quickly |
| Can it be undone? | Easily, with effort, or not at all |
| What does it cost the business? | Rework, churn, legal exposure, lost trust |

The two kinds of error:

- **False positive (false alarm):** AI flags or does something it shouldn't. It wastes time and teaches users to ignore alerts.
- **False negative (miss):** AI misses something it should catch. It can mean real harm or regulatory exposure.

In plain words: **precision** is the share of AI's flags that were right; **recall** is the share of real cases AI caught. Raising one usually lowers the other. Favour recall when misses are dangerous, and precision when false alarms waste scarce time.

---

## 4. Autonomy levels

| Level | What AI does | Who decides | Example |
| --- | --- | --- | --- |
| 1. Inform | Surfaces patterns or summaries | People decide everything | Monthly trend summary of incidents |
| 2. Suggest | Proposes an answer | A person accepts, edits or rejects it | Suggested incident type on a report |
| 3. Act with approval | Prepares an action | A person approves before it happens | Drafted notice to a contractor |
| 4. Act and notify | Takes the action | People review and can undo it | Auto-tagging uploaded documents |
| 5. Act alone | Takes the action | No routine review | Spam filtering |

The higher the cost of an error and the harder it is to undo, the lower the level. Start one level lower than seems necessary. Safety, regulatory, legal, financial and employment decisions stay at level 1 or 2.

---

## 5. Validation methods

| Method | What it tests | How it works | Typical time |
| --- | --- | --- | --- |
| Prompt prototype | Can a model do the task at all? | Run real examples through an off-the-shelf model with clear instructions, then score them | Hours to days |
| Wizard of Oz | Do users want the output? | A person secretly produces the "AI" output for real users | Days to a week |
| Concierge test | Is the output valuable enough to act on? | Do the job manually, openly, for a few customers | One to two weeks |
| Shadow mode | How does it do on live data? | AI runs in the background; outputs are compared with what people did, but not shown | Two to four weeks |
| Limited beta | Does it work in real workflows? | A small group of customers uses it with close monitoring | Four weeks or more |

Eval set basics: 50 to 200 real examples, including messy and rare ones; an expert records the right answer for each; score correct, partly correct, wrong or harmful; break results down by case type and severity; read every failure. Keep the set after launch and rerun it whenever the prompt, model or data changes.

---

## 6. Cost and adoption

```
Net value per month = (value per use − cost per use) × uses per month
```

Value is measured in the customer's terms, such as hours saved, errors avoided or work that now gets done.

Cost per use includes more than model fees:

- Model usage fees, which grow with volume and with how much text is sent each time
- Human review time, if a person checks every output
- Quality monitoring: rerunning the eval set and watching live results
- Model changes: providers update and retire models, and behaviour can shift
- Support: explaining odd outputs to customers

Adoption checks:

- The output appears inside the existing workflow, at the moment it's needed.
- It isn't a chatbot by default. A pre-filled field, a suggested tag or a summary at the top of a record often works better.
- Users can see sources or reasoning where they need to trust the output.
- Users can edit, override or switch it off.
- It launches where mistakes are cheap, because trust builds slowly and drops fast.
- Pricing and packaging cover its running cost.

---

## 7. Kinds of AI

| Kind | Good at | Weak at |
| --- | --- | --- |
| Predictive machine learning | Predicting a number or category from structured history | Needs lots of clean, labelled history; struggles with new situations |
| Large language models (LLMs) | Reading, summarizing, extracting, classifying and drafting text | Exact facts and maths; can state false things confidently |
| Computer vision | Recognizing objects, text or conditions in images | Poor lighting, odd angles, rare cases |
| Speech recognition | Turning speech into text | Noise, jargon, strong accents |
| AI agents | Taking multi-step actions with tools | Reliability over many steps; errors compound |

---

## 8. Traps to watch for

Name these when you see them in the PM's reasoning:

- **Solution-first thinking:** "Where can we add AI?" instead of starting from the problem.
- **The demo trap:** impressive on five hand-picked examples, untested on messy ones.
- **Judging by feel:** "It looks pretty good" instead of scoring against an eval set.
- **The average hides the tail:** 92% overall, but the failures are the serious cases.
- **Chatbot by default:** every AI feature becomes a chat box.
- **Full autonomy too soon:** AI acts with no review on day one.
- **Ignoring running costs:** the prototype costs pennies; production at scale doesn't.
- **Launch and forget:** nobody checks quality after release.
- **Accurate but unwanted:** good output that nobody uses.
- **Trusting a confident tone:** the model states wrong facts fluently.

---

## 9. Calibration examples

Use these to calibrate verdicts. Their numbers are illustrative.

### Example A: incident report intake → hybrid

**Ask:** "Can AI fix incident reporting?" Frontline reports are incomplete and inconsistent, and safety managers spend about 20 minutes cleaning up each one.

- **Ladder:** required fields, pick lists and mobile photo capture fix missing basics like date and location. They can't turn "slipped on the oily ramp by dock 3 and twisted his knee" into a classification.
- **Fit (narrative step only):** input variety 3, rules 3, volume 3, error tolerance 2, reviewability 3, data 2. Total 16.
- **Errors:** misclassifying severity is worse than misclassifying event type; recordability decisions have regulatory consequences. Level 2: AI suggests, the safety manager confirms, and AI never decides recordability.
- **Validation:** 150 past reports with manager-verified answers. Event type and body part pass; root cause doesn't, and experts disagree on it too.
- **Outcome:** hybrid. A form redesign with no AI, plus AI pre-filling event type and body part for confirmation. Root-cause suggestions are "not yet."

### Example B: certification renewals → build without AI

**Ask:** "AI-powered predictive compliance," because customers keep missing worker certification renewals.

- **Baseline:** managers track renewals in spreadsheets, and the product sends no reminders. The cause is visibility, not prediction.
- **Ladder:** an "expiring soon" dashboard, reminders 60 days out and escalation when overdue (rungs 4 and 5) solve it.
- **Fit:** input variety 1, rules 1, volume 2, error tolerance 1, reviewability 2, data 3. Total 10, with two 1s.
- **Outcome:** build without AI. Expiry dates are already known, and a rule that's always right beats a prediction that's sometimes wrong.
- **Spin-off:** reading uploaded certificates (PDFs and phone photos in many formats) is a separate problem that does suit AI. Run it through triage on its own.
