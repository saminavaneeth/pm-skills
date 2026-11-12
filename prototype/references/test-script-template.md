# Usability Test Script Template

Write this file as `prototypes/<name>/test-script.md` whenever the purpose is a user test. Build the tasks from the JTBD job stories or the PRD's P0 flows. Five participants per segment usually surface most of the major usability problems. Run more rounds rather than more people per round.

```markdown
# Test script: <prototype name>

**Goal:** <what we need to learn, e.g. "Can renewal managers find at-risk accounts and act on them without help?">
**Decision it informs:** <e.g. ship the risk column as designed / rework>
**Prototype:** prototypes/<name>/index.html?present   (press Reset between participants: open without ?present, click Reset)
**Participants:** <job performer from JTBD, segment, n=5>, recruited by <who>
**Session:** 30–45 min, moderated, remote or in person, recorded with consent

## Before the session
- [ ] Prototype opens and the Check shows no issues
- [ ] State reset; browser zoom 100%; other tabs closed
- [ ] Consent form; note-taker assigned

## Intro (read aloud, ~3 min)
"Thanks for helping. We're testing a design, not you. There are no wrong answers,
and you can't hurt our feelings. This is an early prototype: some things won't
work, and that's fine. Please think aloud as you go, telling me what you're looking
at, what you expect, and what's confusing. I may not answer questions during the
tasks, because we want to see how it works without help."

## Warm-up (~5 min)
- Tell me about your role and how you handle <the job> today.
- When did you last <do the job>? Walk me through it briefly.

## Tasks
<!-- One task per key flow. Describe the GOAL in the user's words, as a
scenario. Never use UI labels ("click New customer") that give away the
answer. -->

### Task 1: <short name> (flow: R1, R2)
**Scenario:** "Imagine <situation from the job story>. You want to <motivation>. Show me how you'd do that."
**Success:** <observable end state, e.g. "reaches the customer detail for Northwind and sets a reminder">
**Watch for:** <hesitation points, wrong turns, misread labels>
**Follow-ups (after the task):** "What did you expect to happen when…?" · "How confident are you that it worked? Why?"

### Task 2: …

## Wrap-up (~5 min)
- What was easiest? What was hardest?
- If this existed today, what would you use it for? What would stop you?
- Anything you expected to see that wasn't there?

## Rules for the facilitator
- Ask about what they did and expected, not what they like.
- Don't rescue too early. Wait about 10 seconds of struggle before a neutral prompt: "What are you looking for?"
- Answer questions with questions: "What do you think it does?"
- Never pitch or explain the design.

## Results (one row per participant per task)
| Participant | Task | Completed (yes / with help / no) | Time | Wrong turns / confusion | Quote |
|---|---|---|---|---|---|

## Synthesis
| Issue | Tasks affected | # participants (of n) | Severity (blocks / slows / cosmetic) | Proposed fix |
|---|---|---|---|---|
```
