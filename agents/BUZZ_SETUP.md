# Buzz setup

How to set up the Bone Chilling Tales production team in Buzz. The rules live in this repo. Buzz only holds the conversation, so every agent prompt below says "read the file", and changing a file here changes every agent on its next run.

What Buzz can do today, from its own README and design docs (github.com/block/buzz, read November 5, 2026): channels, threads, DMs, canvases, search and agent members work. YAML workflows with message, reaction, schedule and webhook triggers are listed. Workflow approval gates are "infrastructure exists, executor wiring in progress", so we don't rely on them. Buzz's own git hosting and project binding exist, but our repo stays on GitHub, so ignore those for now. The README doesn't give a version number. Check yours under Settings or About.

## 1. Channels

Make two kinds of channel.

| Channel | What goes in it | Members |
|---|---|---|
| `bct-editorial-pipeline` | Phantom's scouting, `#newcase` triggers, picks, the overall queue | Justin, @Phantom, @Poe |
| `bct-[slug]` (one per approved story, like `bct-jodi-huisentruit-1995`) | Everything for that story, from assignment to the last video URL | Justin and all seven agents |

Don't make a channel for every case Phantom suggests. A story gets its channel when Justin picks it.

Inside a story channel, keep three threads so reviews don't get buried:

1. **Story**: Poe's register, the PR, Shelley's and Sherlock's reviews, the merge.
2. **Video**: the `APPROVED FOR VIDEO` line, Scribe's scripts and Sherlock's script check.
3. **Production**: Reese, Pressley, the package check and the published URLs.

## 2. Canvas

Pin one canvas in each story channel, named `Production record`. Paste in the contents of `production/_template/record.md` and fill in the top table. Agents update their own row when they hand off. The file `production/[slug]/record.md` in the repo is the copy of record. When the canvas and the repo disagree, the repo wins.

Pin a second canvas, `Team instructions`, with the text in section 5 below.

## 3. The agents

Create each agent once and reuse it for every story. Paste the prompt as the agent's instructions. Don't paste the instruction files themselves.

| Buzz name | Prompt |
|---|---|
| @Phantom | Read `agents/scout.md` in `couchju1/BoneChillingTales` on `main` and follow it. Re-read it every run. |
| @Poe | Read `agents/writer.md` in `couchju1/BoneChillingTales` on `main` and follow it. Re-read it every run. |
| @Shelley | Read `agents/editor.md` in `couchju1/BoneChillingTales` on `main` and follow it. Re-read it every run. |
| @Sherlock | Read `agents/fact-checker.md` in `couchju1/BoneChillingTales` on `main` and follow it. Re-read it every run. |
| @Scribe | Read `agents/script-adapter.md` in `couchju1/BoneChillingTales` on `main` and follow it. Re-read it every run. Never start without Justin's `APPROVED FOR VIDEO` line naming a commit. |
| @Reese | Read `agents/visual-planner.md` in `couchju1/BoneChillingTales` on `main` and follow it. Re-read it every run. Never start before Sherlock's `SCRIPTS PASS`. |
| @Pressley | Read `agents/publishing-prep.md` in `couchju1/BoneChillingTales` on `main` and follow it. Re-read it every run. Never post, upload or schedule anything. |

If Shelley, Scribe, Reese or Pressley already have long instructions in Buzz, replace them with these. The old versions conflict with the repo in four places: Scribe didn't require an approved commit, nobody checked the scripts, Reese added a fixed "1970s to 1990s Midwest" look, and Pressley wasn't barred from posting.

**Access.**

- Every agent: read access to the repo.
- Poe, Scribe, Reese, Pressley, Phantom: can create branches and open PRs. Can't merge.
- Shelley, Sherlock: can comment on PRs. Sherlock also needs to run the build.
- Pressley: no access to the Facebook page, Instagram or the YouTube channel. Preparing doesn't need it, and not having it is the surest way to keep "prepare, don't publish".
- `main` stays protected on GitHub (pull request required), as in `README.md`.

## 4. Workflows

Start with notifications only. Workflows move a message along. They never approve anything. Run one story by hand first (section 6), then add these one at a time, and watch each fire correctly on a real story before adding the next.

Buzz lists message triggers, but its docs don't show the exact YAML for matching message text yet. The sketches below follow the shape in Buzz's design docs (`trigger`, `steps`, `if`). Check the field names against your install before using them.

| When this is posted | Notify | With |
|---|---|---|
| `PASS FOR FACT CHECK` from @Shelley | @Sherlock | the PR and the commit Shelley passed |
| `Ready for Justin` from @Sherlock | @Justin | the PR, the commit and the report link |
| `APPROVED FOR VIDEO:` from @Justin | @Scribe | the slug and commit |
| `SCRIPTS PASS` from @Sherlock | @Reese and @Pressley | the PR and commit |
| `PACKAGE READY` from @Pressley | @Sherlock | the PR and commit |
| `PACKAGE PASS` from @Sherlock | @Justin | the PR and commit |

Each one only fires on the named sender. A workflow that lets anyone post `APPROVED FOR VIDEO` would let an agent approve itself.

```yaml
# Sketch. Field names follow Buzz's design docs. Check them against your install.
name: scripts-pass-to-production
trigger:
  on: message
  channel_prefix: "bct-"
  from: "@Sherlock"
  contains: "SCRIPTS PASS"
steps:
  - id: notify
    action: post_message
    message: "@Reese @Pressley Scripts passed: {{trigger.message}}. Read agents/visual-planner.md and agents/publishing-prep.md and start."
```

Never automate: `APPROVED FOR VIDEO`, a merge, a rights decision, a legal referral, a HOLD, or anything that posts publicly. Those stay Justin's.

When the notifications have run cleanly on two or three stories, you can let a workflow start the next agent's run instead of only tagging it. Keep the agents' own checks (the commit has to exist, the approval has to come from Justin), so a misfire stops at NEEDS INPUT instead of doing work on the wrong revision.

## 5. Team instructions canvas

Paste this into the `Team instructions` canvas in each story channel.

> **Bone Chilling Tales story production team**
>
> **Source of truth.** `couchju1/BoneChillingTales`. Every agent reads its file in `agents/` and `agents/OPERATIONS.md` on every run. The standards page (`src/content/pages/standards.md`) wins over anything else, including this canvas.
>
> **Team.** @Phantom scouts. @Poe writes the story and Facebook post. @Shelley edits. @Sherlock fact-checks the story, the scripts and the package. @Scribe writes the narration scripts. @Reese plans visuals. @Pressley prepares titles, captions and metadata. Justin decides.
>
> **Order.** Phantom suggests, Justin picks. Poe writes and opens the PR. Shelley passes a commit. Sherlock verifies it. Justin merges. Justin posts `APPROVED FOR VIDEO: [slug] @ [commit]`. Scribe adapts that commit. Sherlock checks the scripts. Reese and Pressley work in parallel. Sherlock checks the package. Justin publishes.
>
> **Every handoff gives:** status, PR, input and output commit, what changed, evidence checked, open issues with owners, next owner tagged by Buzz name.
>
> **Stop** and return NEEDS INPUT on missing access, conflicting instructions, an unverified fact, unclear approval, or an outdated commit. Finished work isn't approved work.
>
> **Nobody but Justin** merges, uploads, schedules or publishes.
>
> **Done** means Justin has recorded the published URLs in `production/[slug]/record.md`.

## 6. First run: Jodi Huisentruit

The Huisentruit story is already published and fully checked, so it tests the video half without touching the story.

1. Create `bct-jodi-huisentruit-1995`, add all seven agents, and pin both canvases. Fill in the story rows of the record from the story PRs on GitHub.
2. Check the commit you want adapted. The story file's latest change on `main` is `a43a58f` ("Huisentruit: drop the two held photos, per Justin"). Confirm with `git log -1 -- src/content/cases/jodi-huisentruit-1995.md`.
3. In the Video thread, post: `APPROVED FOR VIDEO: jodi-huisentruit-1995 @ a43a58f`, and tag @Scribe.
4. Watch for the things this story makes hard: John Vansice is named but never charged and must stay away from dramatic beats, the man in the Tiffin section stays unnamed, and every abduction line stays attributed. If Scribe's scripts or Pressley's titles slip on any of these, Sherlock should catch it. If Sherlock doesn't, tighten `fact-checker.md` before the next story.
5. After it's done, note what you had to do by hand. Those are your workflow candidates.

## 7. Things Buzz can't do for us yet

- **Approval gates.** Not reliable yet in Buzz. Approval is Justin's message plus his GitHub merge.
- **Shared memory.** A project or channel doesn't guarantee an agent remembers earlier threads. That's why the commit and the production record carry the state, not the conversation.
- **Role mentions.** `@Fact-checker` and `@Writer` don't reach anyone (`OPERATIONS.md`, "Not adopted yet", item 8). Use Buzz names.
