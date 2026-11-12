# PRD Template

The skeleton below covers every section. Each section is tagged with the lowest tier that includes it. Notes in `<!-- -->` are guidance for the writer, so remove them from the finished PRD.

- Include only the sections for the chosen tier, plus any conditional sections that apply.
- Never leave a heading empty. If reviewers would expect a section that doesn't apply, write `N/A — <reason>`.
- Keep IDs stable (G1, R-01, M1, Q1, …) so comments and tickets can refer to them. New requirements get the next free ID, even if they sit next to older ones in the table.
- **Write each thing once.** A flow step is one line in User experience; its exact copy and values live in the acceptance criteria. Don't restate a section; point to its IDs.
- For AI features, use the sections in [prd-ai-sections.md](prd-ai-sections.md) instead of the short AI/ML block in section 9.

```markdown
# <Product / feature name> — PRD

| | |
|---|---|
| **Status** | Draft · In review · Approved · Shipped <!-- add "Build starts after <validation gate>" if discovery is still open --> |
| **Author** | <PM name> |
| **Last updated** | <YYYY-MM-DD> — <what changed, with the IDs touched> |
| **Tier** | Lite · Standard · Full |
| **Reviewers** | Eng: <name> · Design: <name> · Data: <name> · Security/legal: <name> |
| **Approver** | <name> |
| **Links** | Brief · JTBD · Prototype · Eval plan · Designs · Epic/tickets |
| **Evidence labels** | Customer: [Observed] · [Stated] · [Hypothesis]. Product/platform: [Assumption] (who confirms) · [Needs validation] → Confirmed (source). <!-- Short forms [H] [A] [NV] are fine once defined here. --> |
| **Example data** | <"Real" or "Fictional example customer: <name>. Its people, rules and numbers are made up."> |
| **How to read this** | This PRD says what and why. **Eng decides** marks places where the build choice belongs to engineering. |
| **Definitions** | <Loaded terms the acceptance criteria depend on, e.g. "Saved: a record exists that someone else can see or count, or that starts a workflow."> |

## 1. Summary                                                    [Lite]
<!-- 3–5 bullets an exec can read in 30 seconds: who has what problem,
what we will do, the primary metric, and when. Write it last. -->

## 2. Problem                                                    [Lite]
<!-- The user's problem in their terms. No solution. Who has it, when it
happens, what it costs them (time, money, risk, missed opportunity). -->

### Evidence
<!-- Label each claim and link its source. Say how many, e.g. "9 of 14
interviewed admins". A table works well: | Claim | Label | Source |.
No evidence yet? Say so plainly, and name the validation gate: what
discovery must show before build starts, and what would change the plan. -->

### Why now
<!-- What changed: strategy, data, market, technology, competitor move,
customer commitment, regulation. "Why this first" is a different question;
answer both if both matter. -->

### Today's workaround
<!-- What users do instead today, and why it falls short. One line per
workaround, or link the JTBD's current-solutions table. -->

## 3. Goals and non-goals                                        [Lite]

### Goals
<!-- 1–3 outcome goals (a change in user behavior or a business result),
not outputs. Platform deliverables go in Requirements, not here. -->
| ID | Goal | Measured by | JTBD outcome |
|---|---|---|---|
| G1 | <outcome> | <metric> | <★ top outcome / supporting / — > |

### Non-goals
<!-- What we are explicitly NOT doing in this release, and why. Include
the tempting adjacent ideas and the "while we're at it" requests. Don't
also list them as low-priority requirements. -->
| Not in this release | Why |
|---|---|
| <non-goal> | <why not now> |

## 4. Success metrics                                            [Lite]
<!-- The primary metric measures the outcome across every channel, not
only use of the new feature. Usage of the feature is a secondary metric.
Measure from the human-confirmed value, not the AI's guess. -->
| Metric | Type | Baseline | Target | Timeframe | Source |
|---|---|---|---|---|---|
| <the one metric that tells us G1 happened> | Primary | <value or [OPEN: … — owner, due]> | | | |
| <adoption / leading indicator> | Secondary | | | | |
| <what must NOT get worse: errors, review load, support load, privacy> | Guardrail | | | | |

**Kill / rethink criteria:** <!-- The result, by when, that makes us roll
back, pivot, or stop. Carry over the JTBD's "what would change our mind". -->

## 5. Users, roles and jobs                                      [Standard]
<!-- Primary user/segment and secondary users. Name who is NOT a target.
Core job story: "When <situation>, I want to <motivation>, so I can
<expected outcome>." Link the JTBD analysis if one exists. -->

### Roles and permissions
<!-- Include when more than one role uses it or permissions matter. Cover
guests, admins, and the installer. State how the product acts: "Every
action runs as the signed-in person, with their permissions." -->
| Role | Can do | Can't do |
|---|---|---|
| | | |

## 6. Context and strategy fit                                   [Full]
<!-- How this supports product strategy or OKRs, what it displaces on the
roadmap, and the cost of not doing it. -->

## 7. Requirements                                               [Lite]
<!-- User-observable behavior, one per row. Each traces to a goal (G#) or
job. P0 = launch-blocking, P1 = should have, P2 = later. (MoSCoW is fine
if used consistently.) Test each P0: "Would we delay launch without this?"
Group rows under bold sub-headings for long tables. Put real constraints
in Notes with their source, e.g. a platform limit. -->

| ID | Requirement | Priority | Traces to | Notes |
|---|---|---|---|---|
| R-01 | <User> can <capability> so that <benefit> | P0 | G1 | |
| R-02 | | P1 | | Eng decides how |

### Acceptance criteria
<!-- Required for every P0. Binary and testable, with concrete values
(a labeled fictional example is fine). Include at least one unhappy path
per P0. Use either format, but every P0 must appear somewhere. -->

**Per requirement** (best for short PRDs):

**R-01**
- Given <context>, when <action>, then <observable result>.
- Given <error/edge condition>, when <action>, then <observable result>.

**Per flow** (best when requirements combine into flows):

| ID | Given | When | Then | Covers |
|---|---|---|---|---|
| M1 | <context> | <action> | <observable result, with exact copy and values> | R-01, R-02 |

### Non-functional requirements                               [Standard]
<!-- Only those that matter here, each with a measurable bar: latency
(p90 < 3 s), availability (during shift hours), accessibility (WCAG 2.2 AA
or the host platform's standard), localization, file types and sizes,
data retention, scale. Unknown? [OPEN: … — owner]. -->

## 8. User experience                                            [Standard]
<!-- Key flows and entry points (link designs or the prototype). One line
per step; the exact copy lives in the acceptance criteria. States: empty,
loading, error, partial data, permission denied, limit reached.
Notifications. -->

### Edge cases
| Case | What the product does | Why |
|---|---|---|
| | | |

### Prototype vs this PRD
<!-- Only if a prototype exists. -->
- **Where the prototype is simpler than this PRD:** <behavior the PRD
  requires that the prototype doesn't show>
- **Where the prototype looks richer than the platform allows:** <what
  will look plainer in the real product, and what stays the same>

## 9. Conditional sections                                       [any tier, when applicable]

### AI/ML behavior
<!-- Use the sections in prd-ai-sections.md: who decides what, hard and
judgment rules, must-never list, refuse/hand off, quality bar and release
gate, fallbacks, actions and tools, data sources, monitoring. The PRD
states the bar; the eval plan holds the method and is linked here. -->
- **Eval plan:** <link> <!-- or [OPEN: eval plan — owner, due] -->

### Platform and integration
<!-- When the product runs inside or depends on another platform (Teams,
Slack, Salesforce, an app store, a browser extension). -->
| | |
|---|---|
| **Permissions requested** | <scope — why> |
| **Permissions we never request** | <scope — why, e.g. reading all chat messages> |
| **Install and admin prerequisites** | <who installs or approves it, how, who owns that onboarding step> |
| **Platform limits that shape the design** | <limit — source — date checked> |

### Privacy, security and compliance
| Data | Where it lives | Retention | Who can see it |
|---|---|---|---|
| <e.g. medical details, photos with faces> | | | |
<!-- Plus: data sent to third parties (including model providers),
tenant isolation, regulatory scope (e.g. GDPR, HIPAA, OSHA privacy cases),
what is never logged in analytics, and the named security/legal reviewer
and when they review. -->

### Migration and backwards compatibility
<!-- What happens to existing users, data, integrations, and APIs.
Opt-in vs automatic. Communication. -->

### Pricing and packaging
<!-- Which plans get it, limits, upgrade path, effect on revenue.
Undecided? [OPEN: … — owner]. -->

## 10. Alternatives considered                                   [Full]
<!-- Including "do nothing" and "buy/partner". Two or three lines each:
what it is, why rejected. -->

## 11. Risks, assumptions and dependencies                       [Standard]

**Riskiest assumption:** <!-- The one that, if wrong, sinks this. How and
when we'll test it, and what changes if it's wrong. -->

**Assumptions**
<!-- One line each: the assumption, who confirms it, and what changes if
it's wrong. Add Likelihood/Impact ratings only when there is evidence for
them; before discovery, a labeled assumption is more honest. -->
- [Assumption] <assumption>. <Who confirms>. If wrong: <consequence>.

**Dependencies**
| Dependency | Owner | Needed by | Blocks |
|---|---|---|---|
| <team, system, vendor, customer step> | | <date or stage> | <IDs> |

## 12. Rollout and launch                                        [Standard]
| Stage | Who (eligibility) | Move on when |
|---|---|---|
| 1. Internal | | <numbers, not "going up"> |
| 2. Beta / design partners | | |
| 3. % rollout | | |
| 4. GA | | — |

**Rollback:** <!-- how to undo, and what happens to data created so far -->

**Kill switch** <!-- Required for AI or safety-critical features. -->
- **Who can pull it:** <!-- internal on-call, customer admin -->
- **Scope:** <!-- everyone, one customer, one site, one action -->
- **What users see:** <!-- the fallback message and the usual way to finish the job; open work handed back, not lost -->
- **Pull it at once if:** <!-- the must-never list, e.g. a commit without confirmation -->

**Enablement:** <!-- support, docs, sales/CS, what end users are told
(especially about privacy), training for admins or managers. -->

## 13. Analytics and instrumentation                             [Standard]
| Event | Key properties | Feeds |
|---|---|---|
| <event_name> | <properties; never sensitive free text> | <metric or G# — for AI: Used / Right / Safe / Affordable> |
<!-- Every metric in section 4 has an event or a named source, including
events that happen in other systems. Dashboard link, and when results are
reviewed (e.g. 2 and 6 weeks after GA) and by whom. -->

## 14. Open questions                                            [Lite]
| # | Question | For | Owner | Due | Status |
|---|---|---|---|---|---|
| Q1 | | Eng · Design · Legal · Customer | | | Open |
<!-- Once answered, move it to the decision log and keep the ID. -->

## 15. Appendix and decision log                                 [Full]
<!-- Research detail, prior art, competitor notes.
Decision log (useful at any tier): YYYY-MM-DD — decision — who decided — why. -->
```

## Writing tips

| Instead of | Write |
|---|---|
| "Improve onboarding" | "Increase % of new workspaces that invite a teammate within 7 days from 22% to 35%" |
| "Export should be fast" | "Exports of up to 50k rows complete in under 10 s (p95)" |
| "Responds within a few seconds" | "Shows typing or replies within 3 s for 9 in 10 messages" |
| "Users can manage notifications" | "Admins can turn off email digests for their whole workspace" |
| "Support all file types" | "Supports PDF, DOCX, and PNG up to 25 MB; other types show an 'unsupported' message" |
| "Seamless integration with Slack" | "Users can connect Slack in ≤ 3 steps without leaving the app; no re-login required" |
| "North star: reports made with the assistant" | "Primary: reports per site per week, all channels. Secondary: share made with the assistant" |
| "TBD" | "[OPEN: Which plans include this? — Priya, by 2026-12-01]" |
| "Nothing is written until Confirm" | Define "written" in the header, then use it the same way everywhere |
