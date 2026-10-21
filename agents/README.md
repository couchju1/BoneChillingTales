# Agent team

Instructions for the Buzz agents that research and write Bone Chilling Tales stories. Nothing in this folder is deployed. Astro only builds `src/` and `public/`.

## The team

| Role | In Buzz | Instructions | Does | Model |
|---|---|---|---|---|
| Scout | @Phantom | `scout.md` | Suggests three cases, keeps `QUEUE.md` | A cheaper model is fine |
| Writer | @Poe | `writer.md` | Researches the picked case, writes the story and Facebook post, opens a PR | Claude (via Claude Code in Buzz) |
| Editor | @Shelley | None yet. Reads `STYLE_GUIDE.md` and the standards page | Reviews structure, pacing, voice, tone, victim sensitivity, and story-to-Facebook consistency. Comments only | Separate agent from the Writer |
| Fact-checker | @Sherlock | `fact-checker.md` | Checks every tagged claim against its source, plus legal and build checks | Claude, separate agent from the Writer |
| Editorial Director and final approver | @Justin | None (human) | Picks cases, settles disagreements, reviews the final PR, merges and publishes | Human |

Always tag agents by their Buzz name. "@Writer" doesn't reach anyone.

The Scout, Writer and Fact-checker read `STYLE_GUIDE.md` and `OPERATIONS.md`. The Editor reads `STYLE_GUIDE.md` and the standards page. It doesn't have an instruction file in this folder. Change the rules there, and every agent picks them up on the next run.

`OPERATIONS.md` applies the Buzz Editorial Operations Manual (full text in `reference/`) to this team: who holds each role, the assignment states, PASS / REWORK / NEEDS INPUT / HOLD, risk levels, the handoff message, the photo rights register and the release gates. It also lists the parts of the manual we haven't adopted yet, and why.

## How one story moves

1. **Trigger.** Tag a message `#newcase` in the Buzz channel, or run on a schedule.
2. **Scout** posts three options in a new thread.
3. **Justin** replies with a pick.
4. **Writer (@Poe)** posts the source register, then writes the story on a `story/[slug]` branch, opens a PR with the Facebook post in the description, and tags @Sherlock in the thread with "Shelley editorial review pending". It routes the PR to @Shelley in the same message.
5. **Editor (@Shelley)** reviews the PR and returns PASS FOR FACT CHECK, NEEDS FIXES or HOLD. The Writer revises and answers each issue. The Editor rechecks until it passes a commit.
6. **Writer** tags @Sherlock to fact-check the commit the Editor passed.
7. **Fact-checker (@Sherlock)** comments on the PR with a verdict and a claim table, then posts a one-line summary in the thread that tags Justin. If fixes are needed it also tags @Poe.
8. **Writer** fixes anything flagged, replies in the thread with what changed, and tags @Sherlock to recheck. Fixes that change meaning, tone, sensitivity, attribution or the Facebook post also go back to @Shelley. Steps 7 and 8 repeat until the verdict is "Ready for Justin".
9. **Justin** reads the story, the "Open questions for Justin" section and the claim table, and merges. Merging to `main` publishes, because Hostinger deploys every push to `main`. The merge approves the exact commit the Editor and Fact-checker passed. If anything was pushed after that PASS, it needs a recheck first.
10. **Justin** opens the live page and confirms it matches (gate G7).
11. **Justin** copies the Facebook post from the PR into Facebook once the page is live, with the story link in the first comment, not the post.

Two human checkpoints: picking the case and merging the PR. Nothing goes public without both.

## One-time setup

1. **Protect `main` on GitHub.** Settings → Branches → add a rule for `main`: require a pull request before merging. That way no agent can publish by pushing directly, even by mistake.
2. **Give the agents repo access in Buzz** with permission to create branches and open PRs, but not to merge.
3. **Create the four agents in Buzz** and point each at its instruction file in this folder. Paste in "Read `agents/[name].md` in the repo and follow it" rather than copying the text, so edits here take effect without updating Buzz.
4. **Make one channel** for the pipeline. One thread per case.
5. **Start small.** For the first two or three stories, pick the case yourself and tag @Poe directly. The Fact-checker runs on every story from the start. Bring in the Scout after that.

## Why the Fact-checker is a separate agent

The site's standards page promises that a person checks every fact against its source. The Fact-checker doesn't replace that, it makes it fast. It has to be a different agent from the Writer so the work isn't grading itself.

## Things Justin still decides

- Which case to cover.
- Photos. Agents only list agency-released options with links, they never add images.
- Anything flagged in "Open questions for Justin" in the PR.
- The final merge.
