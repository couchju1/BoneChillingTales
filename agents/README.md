# Agent team

Instructions for the Buzz agents that research and write Bone Chilling Tales stories. Nothing in this folder is deployed. Astro only builds `src/` and `public/`.

## The team

| Agent | Instructions | Does | Model |
|---|---|---|---|
| Scout | `scout.md` | Suggests three cases, keeps `QUEUE.md` | A cheaper model is fine |
| Writer | `writer.md` | Researches the picked case, writes the story and Facebook post, opens a PR | Claude (via Claude Code in Buzz) |
| Fact-checker | `fact-checker.md` | Checks every tagged claim against its source, plus legal and build checks | Claude, separate agent from the Writer |

All three read `STYLE_GUIDE.md`. Change the rules there, and every agent picks them up on the next run.

## How one story moves

1. **Trigger.** Tag a message `#newcase` in the Buzz channel, or run on a schedule.
2. **Scout** posts three options in a new thread.
3. **Justin** replies with a pick.
4. **Writer** posts the source register, then writes the story on a `story/[slug]` branch and opens a PR with the Facebook post in the description.
5. **Fact-checker** comments on the PR with a verdict and a claim table.
6. **Writer** fixes anything flagged.
7. **Justin** reads the story, spot-checks the claim table, and merges. Merging to `main` publishes, because Hostinger deploys every push to `main`.
8. **Justin** copies the Facebook post from the PR into Facebook once the page is live.

Two human checkpoints: picking the case and merging the PR. Nothing goes public without both.

## One-time setup

1. **Protect `main` on GitHub.** Settings → Branches → add a rule for `main`: require a pull request before merging. That way no agent can publish by pushing directly, even by mistake.
2. **Give the agents repo access in Buzz** with permission to create branches and open PRs, but not to merge.
3. **Create the three agents in Buzz** and point each at its instruction file in this folder. Paste in "Read `agents/[name].md` in the repo and follow it" rather than copying the text, so edits here take effect without updating Buzz.
4. **Make one channel** for the pipeline. One thread per case.
5. **Start small.** Run the Writer alone on a case you choose for the first two or three stories. Add the Fact-checker next, then the Scout.

## Why the Fact-checker is a separate agent

The site's standards page promises that a person checks every fact against its source. The Fact-checker doesn't replace that, it makes it fast. It has to be a different agent from the Writer so the work isn't grading itself.

## Things Justin still decides

- Which case to cover.
- Photos. Agents only list agency-released options with links, they never add images.
- Anything flagged in "Open questions for Justin" in the PR.
- The final merge.
