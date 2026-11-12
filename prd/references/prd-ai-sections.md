# AI and Agent Sections

Use these sections whenever the feature uses a model. They replace the short AI/ML block in the template. Include sections 1–6 for every AI feature. Add section 7 when the AI takes actions or calls tools, and section 8 when it reads data from more than one system.

## The boundary: PRD vs eval plan

**The PRD states the bar. The eval plan holds the method.** One source of truth per concern.

| In the PRD | In the eval plan (linked, not copied) |
|---|---|
| The must-never list | Test-set contents and case design |
| Quality criteria, launch thresholds per slice, who signs off | Where test data comes from (logs, partners, synthetic) |
| Which fields or outputs are critical | Graders: code check, LLM judge, or human |
| The release gate and the rerun rule | Judge prompts and judge validation |
| Fallbacks, user correction, latency and cost budget | Error analysis and the failure taxonomy |

- **If you're describing test cases, where their data comes from, or which grader runs them, stop.** That belongs in the eval plan (`docs/evals/<feature>/eval-plan.md` by default). Link it from the PRD.
- **No eval plan yet?** Write `[OPEN: eval plan — owner, due]` and suggest creating one (for example with an evals skill, if available).
- **End-to-end software tests** (e.g. "nothing saves without Confirm, including double taps and going offline") aren't model evals. List them as release-gate rows owned by QA.

## 1. Who decides what

Separate what the model does from what rules and people decide. Reviewers check this table first.

```markdown
| Step | Who decides | Example |
|---|---|---|
| Read the messy input | Model | "forklift hit the racking in aisle 7" + photo → location, equipment, what happened |
| Ask what's missing | Model, within limits the product sets | "Was anyone hurt?" |
| Set the severity | The customer's rule | Rule S-4: equipment touching racking is High |
| Explain | Model, quoting the rule | "Your site rule S-4 says…" |
| Save the record | The user | Taps Confirm |
| Final regulatory call | A named team, outside the AI | EHS team decides recordability |
```

## 2. Hard rules and judgment rules

- **Hard rules** live in code, and the model can't override them: permissions, tenant isolation, confirm-before-commit, safety triggers, and any rule that is a clear yes or no on the facts.
- **Judgment rules** need interpretation. They're given to the model, and each has an owner, a version, and tests.
- Every output that depends on a rule names the rule it used (ID, version, owner).
- When no rule covers the case, say what the product does instead (e.g. "leaves it for a person to set"). The model never falls back on its own opinion for a rule-owned decision.

## 3. Must never

One consolidated list. Each item is zero-tolerance (0 failures to launch), maps to a release-gate row, and is a reason to pull the kill switch.

```markdown
**<Product> must never**
1. Save or send anything without the user's confirmation.
2. Show one customer's data to another customer.
3. Post sensitive details (injury, medical, salary, …) where people without permission can see them.
4. Make up a value it didn't read or get told. It leaves the field blank and asks.
5. Follow instructions found inside user content (messages, files, photos).
```

## 4. Refuse or hand off

```markdown
| Request | What it does |
|---|---|
| Advice outside its remit (medical, legal) | Declines and points to the right person or channel |
| "Word it so we don't get in trouble" | Keeps the facts, won't soften the record |
| Data the user isn't allowed to see | Declines without confirming whether it exists |
| Unrelated questions | One line on what it does here |
```

## 5. Quality bar and release gate

Criteria come from user outcomes (JTBD outcome statements, PRD goals), not generic metrics like "helpfulness". Set thresholds per **slice**: the circumstances that change the job (e.g. injury cases, short messages from non-native speakers, night shift). A good overall score can hide a failing slice.

```markdown
| Criterion | Severity | Launch threshold | Slice | Signs off |
|---|---|---|---|---|
| Critical fields correct (who, injured?, when) | High | ≥ 98% | every slice | Head of AI + PM |
| Other fields correct | Medium | ≥ 90% [proposed] | overall | Head of AI |
| Hard rules applied correctly | Zero-tolerance | 100% | every slice | Rule owner |
| Must-never list | Zero-tolerance | 0 failures | every slice | PM |
| Draft ready | Budget | p90 < 10 s | overall | Eng lead |
| Cost per completed task | Budget | ≤ $0.10 [illustrative] | overall | PM |

**Critical fields:** <which outputs are worse to get wrong, and why>.

**Release gate** runs before each rollout stage:
- every zero-tolerance row passes
- every threshold is met in its slice
- each rule owner has signed off the tests for their rules
- every prompt or model change reruns the full gate; any zero-tolerance failure blocks release

**Eval plan:** <link> or [OPEN: eval plan — owner, due]
```

The numbers above are examples, not defaults. Mark proposed thresholds `[proposed]` with who sets the final bar and by when. Label prices illustrative unless they've been checked.

## 6. Fallbacks, correction, disclosure

- **When unsure:** ask, leave the field blank, or hand to a person. Say which one.
- **When the model or a dependency is down:** what the user sees and how they finish the job another way.
- **User correction:** edit any AI-filled value, see the original, flag a mistake. Flagged cases feed the eval plan.
- **Disclosure:** how users know which values came from the AI (e.g. a source tag on each field, guesses labeled as guesses).
- **Data sent to model providers:** which model and hosting meet the customer's data rules, or `[OPEN]`.

## 7. Actions and tools

Required when the AI calls tools, takes actions, or will later be exposed to outside agents (e.g. through MCP, the Model Context Protocol). Define each action by **what it does, who may call it, and its risk level**, not by how this one surface uses it, so other surfaces can reuse it without drift. **Eng decides** how each maps to existing services.

```markdown
| Action | What it must do | Risk level | Acts as / who may call | Needs confirmation | Notes |
|---|---|---|---|---|---|
| `create_draft` | Builds a draft and returns each field with its source | Draft | The signed-in user, with their permissions | No | Creates nothing others can see |
| `suggest_level` | Returns a level, the rule used, and the reason, or "no rule matched" | Decision | Same | No | Never writes |
| `save_record` | Saves the confirmed draft with audit details; returns the ID | Commit | Same | **Yes, a user tap** | One save per confirmation, even on a double tap |
| `notify_owner` | Sends a message; saves no record | Message | Fired by a hard rule | No | Never the only alarm for urgent cases |
```

**Risk levels:** Read (returns data) · Decision (returns a judgment, writes nothing) · Draft (private, invisible to others) · Commit (creates or changes a record others can see) · Message (reaches another person).

- Every Commit names the human confirmation that triggers it.
- Every action runs as the signed-in person, never as a shared account with wider access.
- Mark actions that don't exist yet, with working names Eng confirms.

## 8. Data sources

Everything the AI reads to do its job: records, reference data, the customer's own rules, identity. These are usually where scope hides.

```markdown
| Source | Used for | Exists today? | Owner | Permission check | Freshness |
|---|---|---|---|---|---|
| Incident records | Duplicate check, status answers | Yes | Platform team | Per user, per record | Live |
| Customer's severity rules | Suggested severity | [NV] only in documents? | Customer EHS manager | Tenant | Versioned |
| Crew list | Matching names | [A] | HR / Teams | Per user | Daily |
| Regulatory list (e.g. OSHA first aid) | Recordability check | Public | PM keeps current | None | On change |
```

A source marked "No" or `[NV]` under "Exists today?" is a dependency. Add it to the dependencies table with an owner and a date.

## 9. Production monitoring

- Name the signals that show the AI is going wrong after launch: edits to AI values, flags, retries, refusals, hand-offs, cost per task.
- A useful frame for AI-feature metrics is **Used? Right? Safe? Affordable?** Map each logged event to one or more of these in the analytics section.
- Never log sensitive free text (injury, medical, personal details) in analytics.
