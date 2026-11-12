# Prototype Checklist

Use these checks before handing a prototype over, and in Review mode. Check only what applies to the prototype's **purpose**. For each failure, report:

- the severity
- the check ID
- where it is (screen, element)
- a concrete fix

Fix anything that doesn't need a PM decision yourself.

**Severity**
- **Blocker**: must pass for the stated purpose.
- **Major**: should pass.
- **Minor**: polish.

## A. Purpose and coverage

| # | Check | Severity |
|---|---|---|
| A1 | The purpose and audience are stated in the prototype's README (user test, stakeholder demo, or exploration). | Major |
| A2 | Every P0 flow from the PRD (or every task in the test script) can be completed by clicking, start to finish. | Blocker |
| A3 | No dead ends: every screen has a way forward or back, and the check finds no missing screens or dialogs. | Blocker |
| A4 | Every screen is reachable from the start screen. | Major |
| A5 | The states the PRD requires exist: empty, loading, error or validation, success, permission denied, limits. | Major |
| A6 | Things not in scope are either not linked, or clearly show "Not in this prototype yet". In user tests, prefer not linking. | Major |
| A7 | Key elements carry `data-note="R#: …"`, so coverage of PRD requirements is visible (stakeholder demos and reviews). | Minor |

## B. Realism

| # | Check | Severity |
|---|---|---|
| B1 | Data is realistic: plausible names, amounts, dates, and statuses, including long values, edge values, and at least one messy record. No lorem ipsum in user tests. | Major |
| B2 | **No real customer or personal data.** All data is invented. | Blocker |
| B3 | Copy is real product copy, written in the user's language, not placeholder or internal jargon. | Major |
| B4 | Interactions give feedback: toasts, state changes, and simulated latency where the real product would be slow. | Minor |
| B5 | AI features: scripted outputs, realistic latency, an "AI-generated" label, a feedback control, and at least one imperfect or fallback output when trust is being tested. | Major if AI |

## C. Design system use

| # | Check | Severity |
|---|---|---|
| C1 | `kit.css` and `kit.js` are unmodified copies of the skill's kit. | Major |
| C2 | Screen CSS and inline styles use tokens only: no hex, `rgb()`, or named colors; no font-size `px`; no font names. | Major |
| C3 | The look is the agreed one: the confirmed brand mapping, the chosen direction, the default, or wireframe. | Major |
| C4 | Brand tokens pass AA contrast for text, or failures were flagged to the PM. | Major |

## D. Usability and accessibility basics

| # | Check | Severity |
|---|---|---|
| D1 | Clickable things are real `<button>` or `<a>` elements, and the main flow works with the keyboard. | Major |
| D2 | Every form field has a label, every image has alt text, and icon-only buttons have an `aria-label`. The kit's Check covers this. | Major |
| D3 | It works at 390 px wide if mobile matters. Check with the toolbar's Mobile toggle. | Major if mobile |
| D4 | Visible focus states, no color-only meaning (status has text, not just a color). | Minor |

## E. Honesty and safety

| # | Check | Severity |
|---|---|---|
| E1 | It's clearly a prototype: the toolbar badge, or in `?present` mode, participants are told up front (test script). | Major |
| E2 | No network calls, tracking, or real integrations. The only external request allowed is a web font the PM approved. | Blocker |
| E3 | Out-of-scope or speculative features aren't presented as committed. They're labeled "concept", or left out of stakeholder demos. | Major |

## F. Purpose-specific

| Purpose | Extra checks |
|---|---|
| **User test** | A test script exists. Tasks match the job stories. No UI instructions inside the prototype that give away the answers. Demo controls are hidden with `?present`. Reset works between participants. |
| **Stakeholder demo** | The main path is polished. Notes are available. The brand look is used. The README lists what's faked. |
| **Exploration** | The variants or looks differ meaningfully (at least two levers or a different flow), each has a one-line rationale, and they can be switched in place. |

## Review verdict

- **Ready for <purpose>**: all blockers pass.
- **Ready with fixes**: blockers pass, some majors are open.
- **Not ready**: any blocker fails.

Name the 1–3 issues that matter most. Then give the findings, and say briefly what's strong.

```
Verdict: Not ready for user testing (1 blocker, 3 majors)
What matters most:
1. A2: task 2 "add a teammate" dead-ends at the Invite button.
2. B1: every customer is "Acme Inc" with round numbers, so participants won't believe it.
Strong: flows match the job stories; brand tokens applied cleanly.

✗ BLOCKER  A2  Invite button (team screen) has no target → add an invite dialog with a success state
✗ MAJOR    B1  #proto-data customers → realistic names, a long name, mixed amounts
✗ MAJOR    C2  index.html <style> uses #2453d4 → var(--color-primary)
```
