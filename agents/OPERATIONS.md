# Editorial operations

How Bone Chilling Tales applies the Buzz Editorial Operations Manual (v1.0, October 19, 2026). The full manual is in `reference/EDITORIAL_OPERATIONS_MANUAL_v1.0.md`. This file is the short version every agent follows. If the two disagree, the manual wins on process and the standards page (`src/content/pages/standards.md`) wins on what we publish. Where this file leaves something out, it says why, under "Not adopted yet".

Every story is a **NARRATIVE** assignment (manual section 8). The book and news workflows don't apply. A story about a case still moving through the courts also takes the news freshness check below.

## Who does what

| Manual role | Here | Notes |
|---|---|---|
| Human publisher and release authority | Justin | Approves an exact commit by merging it. Owns policy and every risk, rights and legal call. |
| Backup release authority | None named yet | Justin decides. Until then, nothing merges without Justin. |
| Editorial Director | Justin | Routes cases, accepts handoffs, settles disagreements between agents. Agents can't act as Director, because the Director recommends release. |
| Researcher, author, structural, line and copy editor | Writer (@Poe) | One agent may do these in sequence. The manual allows it. |
| Fact Checker and final proof | Fact-checker (@Sherlock) | Must be a different agent from the Writer. |
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
| READY FOR REVIEW | The PR is open and the Fact-checker is tagged. |
| REWORK | The Fact-checker or Justin returned fixes. |
| NEEDS INPUT | Work is blocked on a missing source, file or decision. Name the owner and the exact question. |
| HOLD | A specific publication risk is unresolved. Nothing in the affected part moves until Justin clears it. |
| READY FOR HUMAN APPROVAL | The Fact-checker's verdict is PASS on a named commit. |
| APPROVED FOR RELEASE | Justin merges that exact commit. |
| PUBLISHED | The page is live and Justin has checked it. |
| CORRECTION REVIEW | A complaint, an error or a change in the case reopened a published story. |

## Stage statuses

Every handoff ends with one of these.

- **PASS**: the stage's criteria are met. The Fact-checker's "Ready for Justin" is a PASS.
- **REWORK**: fixable defects. The Fact-checker's "Needs fixes" is REWORK.
- **NEEDS INPUT**: missing material. Ask the exact question and keep going on anything that doesn't depend on the answer.
- **HOLD**: an unresolved publication risk. The Fact-checker's "Don't publish" is a HOLD.

No agent status is approval to publish. Only Justin's merge is.

## The handoff message

Every handoff in the thread (Writer to Fact-checker, Fact-checker to Writer or Justin) gives:

1. **Status** (PASS, REWORK, NEEDS INPUT or HOLD) and the **PR**.
2. **Input commit and output commit.** The commit is the revision ID. Never say "the PR" without a commit.
3. **What changed and why**, briefly.
4. **Evidence checked**, and anything you couldn't open (mark it UNVERIFIED, never assume).
5. **Open issues**, each with an owner.
6. **Next owner**, tagged by exact Buzz handle.

The receiver checks that the commit exists and the files open before working. An unreadable attachment or a missing commit isn't accepted. Say so and return NEEDS INPUT.

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

Justin merges only when all of these are true. The Fact-checker's report shows G3 and G5. The Writer's PR shows G1, G2 and G4.

| Gate | What has to be true | Shown by |
|---|---|---|
| G1 Scope | The case, the angle, the risk level and any special instructions (like Mailer style) are recorded in the thread. | Writer, in the PR "Case" section |
| G2 Content | The structure is settled, and Justin's editorial decisions are applied. | Writer |
| G3 Evidence | Every claim has a disposition. No blocking UNVERIFIED claims. Contradictions are named in the story. Case status was checked. | Fact-checker |
| G4 Risk and rights | Legal care notes are complete, and every image has a rights row with a decision. | Writer, with Justin's decisions |
| G5 Final proof | Build and launch check pass on the exact commit. The Facebook post, title, description, summary, captions and alt text match the checked story. | Fact-checker |
| G6 Release | Justin merges that commit. | GitHub |
| G7 Live check | Justin opens the live page and confirms it matches. | Justin |

**Approval covers one commit.** A PASS covers the commit it names. Anything pushed after that needs a recheck before merge. If a PR is merged while work is still going, the remaining work goes in a new PR from `main`. Agents check that the PR is still open before pushing to its branch.

## Rework loop

The Fact-checker numbers each issue (M1, M2 for must-fix). The Writer answers every number in the fix message. The Fact-checker rechecks the changed lines and anything that depends on them, including the summary, timeline and Facebook post.

If the same material defect survives two rework rounds, the Fact-checker sets HOLD on that section and asks Justin to decide: find more evidence, narrow the claim, cut it, or drop the story. Never pass something just because the loop ran long.

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
7. **Training-case test run (manual section 19).** Not run. Justin can ask the agents to run the five cases in section 18 against these files.
