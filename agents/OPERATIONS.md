# Editorial operations

How Bone Chilling Tales applies the Buzz Editorial Operations Manual (v1.1, updated October 19, 2026). The full manual is in `reference/EDITORIAL_OPERATIONS_MANUAL_v1.1.md`. Version 1.1 supersedes v1.0 for new assignments. The v1.0 text stays in `reference/` as the record for stories checked under it. This file is the short version every agent follows. If the two disagree, the manual wins on process and the standards page (`src/content/pages/standards.md`) wins on what we publish. Where this file leaves something out, it says why, under "Not adopted yet".

Every story is a **NARRATIVE** assignment (manual section 8). The book and news workflows don't apply. A story about a case still moving through the courts also takes the news freshness check below.

## Who does what

| Manual role | Here | Notes |
|---|---|---|
| Human publisher and release authority | Justin | Approves an exact commit by merging it. Owns policy and every risk, rights and legal call. |
| Backup release authority | None named yet | Justin decides. Until then, nothing merges without Justin. |
| Editorial Director | Justin | Routes cases, accepts handoffs, settles disagreements between agents. Agents can't act as Director, because the Director recommends release. |
| Researcher, author, structural, line and copy editor | Writer (@Poe) | Makes every story and Facebook change. One agent may do these in sequence. The manual allows it. |
| Editor (editorial reviewer) | Editor (@Shelley) | Reviews structure, pacing, clarity, repetition, voice, tone, victim sensitivity, style, and story-to-Facebook consistency. Comments only. Doesn't rewrite files, push commits or certify facts. |
| Fact Checker | Fact-checker (@Sherlock) | Must be a different agent from the Writer. Starts after the Editor passes the PR. |
| Final proof | Editor and Fact-checker | The Editor's final read covers language and story-to-Facebook alignment. The Fact-checker covers facts, the build and the launch check. Justin accepts. |
| Case intake | Scout (@Phantom) | Suggests cases and records the first risk level. |
| Release operator | Hostinger auto-deploy | Merging to `main` publishes. Justin confirms the live page. |
| Specialist and legal reviewer | None | See "Not adopted yet". |

## Assignment states

Use these words in the thread and in PRs, so anyone can see where a story is.

| State | Meaning here |
|---|---|
| INTAKE | Scout has posted options, or Justin has named a case. |
| ASSIGNED | Justin picked the case and tagged the Writer. |
| IN PROGRESS | The Writer is researching or drafting. |
| READY FOR REVIEW | The PR is open. The Fact-checker has been notified and the Editor's review is pending. |
| REWORK | The Editor, the Fact-checker or Justin returned fixes. |
| NEEDS INPUT | Work is blocked on a missing source, file or decision. Name the owner and the exact question. |
| HOLD | A specific publication risk is unresolved. Nothing in the affected part moves until Justin clears it. |
| READY FOR HUMAN APPROVAL | The Editor's PASS FOR FACT CHECK and the Fact-checker's PASS both cover the current head commit (see "Approval covers one commit"). |
| APPROVED FOR RELEASE | Justin merges that exact commit. |
| PUBLISHED | The page is live and Justin has checked it. |
| CORRECTION REVIEW | A complaint, an error or a change in the case reopened a published story. |

## Stage statuses

Every handoff ends with one of these.

- **PASS**: the stage's criteria are met. The Editor's "PASS FOR FACT CHECK" and the Fact-checker's "Ready for Justin" are PASSes.
- **REWORK**: fixable defects. The Editor's "NEEDS FIXES" and the Fact-checker's "Needs fixes" are REWORK.
- **NEEDS INPUT**: missing material. Ask the exact question and keep going on anything that doesn't depend on the answer.
- **HOLD**: an unresolved publication risk. The Editor's "HOLD" and the Fact-checker's "Don't publish" are HOLDs.

No agent status is approval to publish. Only Justin's merge is.

## The handoff message

Every handoff in the thread (Writer to Editor or Fact-checker, Editor to Writer, Fact-checker to Writer or Justin) gives:

1. **Status** (PASS, REWORK, NEEDS INPUT or HOLD) and the **PR**.
2. **Input commit and output commit.** The commit is the revision ID. Never say "the PR" without a commit.
3. **What changed and why**, briefly.
4. **Evidence checked**, and anything you couldn't open (mark it UNVERIFIED, never assume).
5. **Open issues**, each with an owner.
6. **Next owner**, tagged by exact Buzz handle.

The receiver checks that the commit exists and the files open before working. An unreadable attachment or a missing commit isn't accepted. Say so and return NEEDS INPUT.

A mention is a notification. It doesn't prove the handoff was accepted or a review was done.

## Review order

1. **Writer opens the PR.** In the same handoff, the Writer notifies the Fact-checker (@Sherlock) and writes "Shelley editorial review pending." Then the Writer routes the PR to the Editor (@Shelley). The notice tells the Fact-checker a PR exists. It isn't a request to check it.
2. **Editor reviews** the named commit and returns PASS FOR FACT CHECK, NEEDS FIXES or HOLD. Each issue is numbered (E1, E2 and so on) and gives the location, the reason, a priority, and what counts as fixed. Factual concerns go to the Fact-checker. Legal or safety concerns go to Justin.
3. **Writer revises** on the same branch and answers every E number with what changed, where, and the new commit. If the Writer disagrees, the Writer gives the reason or asks Justin to decide.
4. **Editor rechecks** the changed text and records PASS FOR FACT CHECK on a named commit.
5. **Writer requests the fact-check.** The Writer tags @Sherlock with the commit the Editor passed.
6. **Fact-checker checks** independently. The Fact-checker doesn't start before the Editor has passed a commit. If asked earlier, it returns NEEDS INPUT and asks Justin.
7. **Fixes.** The Writer fixes Needs fixes issues on the same branch. Any fix that changes meaning, structure, tone, sensitivity, attribution or the Facebook post also goes back to the Editor. The Writer says which fixes those are. The Editor or Justin can ask for a recheck of any fix anyway. Every fix goes back to the Fact-checker.
8. **Justin reviews** only after both current checks pass.

## Risk level

The Scout gives a first level and the Writer confirms it in the PR. Anyone can raise it. Only Justin can lower it, and he gives a reason.

- **Routine**: no sensitive claims about real people. Almost never applies here.
- **Elevated**: significant disputed facts, a single-source claim that matters, or uncertain photo rights.
- **High**: allegations against anyone not convicted, an acquittal, an uncharged person close to the story, minors, sexual violence, an active court case, or graphic evidence.

Nearly every story is Elevated or High. High-risk stories list each allegation about someone not convicted, with its wording and source, under "Legal care" in the PR.

## Evidence rules the manual adds

The style guide's sourcing rules still apply. The manual adds these.

- **One origin isn't two.** Two outlets repeating the same police release count as one source. Note it in the register as "same origin as S3".
- **Single-source central claims** get listed in the PR with a reason the one source is enough, or a qualifier in the text. Justin decides.
- **Status checked.** Before opening the PR, confirm the latest case status (charges, verdict, appeal, custody, parole) and give the date you checked it in the PR. Repeat it if the PR sits for more than a week, or if the case is in court.
- **Rewording reopens the check.** Any change to a fact, a qualifier or an attribution goes back to the Fact-checker, even in a "style only" edit. "May have caused" becoming "caused" is a fact change.
- **Claim dispositions.** The Fact-checker's table uses the manual's labels:
  - **VERIFIED**: the source supports the exact sentence.
  - **ATTRIBUTED**: the source shows the named person said it, not that it's true. The story must attribute it.
  - **DISPUTED**: sources conflict. The story must say so.
  - **UNVERIFIED**: the support isn't there, or the source couldn't be opened.
  - **REMOVE**: cut it.

  An UNVERIFIED or REMOVE claim that matters to the story, or could harm someone, blocks a PASS.

## Photo rights register

The manual says being online isn't permission, and a credit line isn't a license. Every PR with images has a rights table, one row per image:

| File | What it shows | Origin (URL or who supplied it) | Rights basis | Permission evidence | Credit line |
|---|---|---|---|---|---|

The rights basis is one of: agency-released, public record, licensed, family permission, or **Justin's call** (anything else, including news frames and family photos shown on TV). A photo marked "Justin's call" is a HOLD on that image until Justin records the decision in the PR. The rest of the story isn't held.

## Release gates

Justin merges only when all of these are true. The Fact-checker's report shows G3 and G5. The Writer's PR shows G1, G2 and G4. The Editor's review record supports G2 and G5.

| Gate | What has to be true | Shown by |
|---|---|---|
| G1 Scope | The case, the angle, the risk level and any special instructions (like Mailer style) are recorded in the thread. | Writer, in the PR "Case" section |
| G2 Content | The structure is settled, the Editor has passed it, and Justin's editorial decisions are applied. | Writer, with the Editor's PASS FOR FACT CHECK |
| G3 Evidence | Every claim has a disposition. No blocking UNVERIFIED claims. Contradictions are named in the story. Case status was checked. | Fact-checker |
| G4 Risk and rights | Legal care notes are complete, and every image has a rights row with a decision. | Writer, with Justin's decisions |
| G5 Final proof | Build and launch check pass on the exact commit. The Facebook post, title, description, summary, poster, reader question, captions and alt text match the checked story. The language and story-to-Facebook alignment have the Editor's acceptance. | Fact-checker, and the Editor for language and alignment |
| G6 Release | Justin merges that commit. | GitHub |
| G7 Live check | Justin opens the live page and confirms it matches. | Justin |

**Approval covers one commit.** A PASS covers the commit it names. Anything pushed after that needs a recheck before merge. Facts go to the Fact-checker. Changes to meaning, structure, tone, sensitivity, attribution or the Facebook post also go to the Editor. New evidence or a change in case status can reopen a check even when the draft hasn't changed. If a PR is merged while work is still going, the remaining work goes in a new PR from `main`. Agents check that the PR is still open before pushing to its branch.

## Rework loop

The Editor numbers its issues E1, E2. The Fact-checker numbers its issues M1, M2 for must-fix. The Writer answers every number in the fix message. Each reviewer rechecks the changed lines and anything that depends on them, including the summary, timeline and Facebook post.

If the same material defect survives two rework rounds, the reviewer who raised it sets HOLD on that section and asks Justin to decide: find more evidence, narrow the claim, cut it, change the approach, or drop the story. Never pass something just because the loop ran long.

## After publication

- An update adds new information. A correction fixes an error. Justin chooses which one, and approves the wording. Corrections follow the standards page: a dated note in `updates` and a line on the corrections page. Never quietly change a fact.
- A new charge, verdict, acquittal, overturned conviction or release reopens the whole story and its Facebook post (CORRECTION REVIEW). An acquittal or overturned conviction means rereading every line about that person.
- Agents don't promise to watch cases. Justin owns monitoring unless he names someone else.
- After a real error, write down what failed and the rule that would have caught it. Add the rule to the relevant agent file in the same PR as the fix.

## Not adopted yet

These parts of the manual don't fit how the site runs today. Each one is listed so it isn't dropped silently. Justin decides each one.

1. **Human legal counsel (manual section 11, gate G4).** The site has no named lawyer. The manual says a missing mandatory legal review blocks release. Until Justin names counsel or writes a standing exception, Justin acts as the human risk owner. Any PR touching an acquittal, an uncharged person or a threatened claim goes under "Open questions for Justin", marked "legal referral".
2. **Right of reply (manual section 10).** Agents are forbidden to contact anyone (`writer.md`). Most stories rest on court findings about convicted people, where a reply isn't customary. For a story that makes or repeats an allegation against someone not convicted, the Writer flags it, and Justin decides whether to seek a reply himself.
3. **A backup release authority.** Not named.
4. **Separate issue, revision and approval logs.** GitHub already does this job. The commit history is the revision log, PR comments are the issue log, and the merge is the approval record. No separate files.
5. **Version file names** (`ASSIGNMENTID_stage_vNN`). Git commit hashes do this. The branch name is the assignment ID.
6. **Style sheet per assignment.** `agents/STYLE_GUIDE.md` is the house style. Case-specific spelling and name decisions go in the story's frontmatter comment block, which already serves as the assignment's style sheet.
7. **Training-case test run (manual sections 19 and 21).** Not run. Justin can ask the agents to run the five cases in section 18, and the section 21 test PR, against these files.
8. **Role mentions @Fact-checker and @Writer (manual v1.1 profile).** The manual says to keep these role mentions and to check in Buzz that they reach the intended agents. On October 20, 2026, a Buzz name lookup found no profile named "Fact-checker" or "Writer". It did find Sherlock, Shelley and Justin. Until Justin changes the Buzz setup, agents tag by Buzz name: @Poe, @Shelley, @Sherlock and @Justin.
9. **An Editor instruction file.** The manual says the Editor reads an instruction file only if Justin configures one. There isn't one. This file's Editor rules reach Shelley only if Justin adds `agents/OPERATIONS.md` to Shelley's required reads.
