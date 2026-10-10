# Content system

How a Bone Chilling Tales story goes from a trending case to the website and Facebook.
Each AI tool gets one job. Run it by hand for 2 to 3 weeks, fix what's off in these files,
then automate.

| Step | Tool | Setup it lives in | File |
| --- | --- | --- | --- |
| 1. Find cases and build a sourced brief | Perplexity | Space: "Bone Chilling Tales Research" | [1-research-perplexity.md](1-research-perplexity.md) |
| 2. Write the website story as a ready-to-publish case file | Claude | Project: "Bone Chilling Tales Writer" | [2-story-claude.md](2-story-claude.md) |
| 3. Turn the published story into Facebook posts | ChatGPT | Custom GPT: "Bone Chilling Tales Social" | [3-facebook-chatgpt.md](3-facebook-chatgpt.md) |
| 4. Check it before anything goes live | You | | [review-checklist.md](review-checklist.md) |

[brand-voice.md](brand-voice.md) gets pasted into all three tools so they sound like one site.

## The weekly run

1. **Monday, Perplexity.** Run the weekly prompt. Pick one case from the 5 it gives you.
2. **Perplexity again.** Run the deep dive on that case. Save the brief.
3. **Save the sources.** Make `research/[slug]/` and save each source as `S1-publisher-date.pdf`
   and so on. That folder is never committed or deployed. You need it for the fact check.
4. **Claude.** Paste the brief into the Writer project. It returns a full case file.
5. **Into the site.** Save it as `src/content/cases/[slug].md` with `draft: true`. Run
   `npm run dev` and open `/cases/[slug]/` to read it.
6. **Fact check.** Go through [review-checklist.md](review-checklist.md). Every `[S#]` tag gets
   checked against the saved source. Fix or cut anything a source doesn't say.
7. **Publish.** Set `draft: false`, run `npm run build && npm run check`, commit and push to
   `main`. Hostinger publishes it.
8. **ChatGPT.** Paste the published story into the Social GPT. Pick a post, add an image, and
   schedule it in Meta Business Suite. The story link goes in the first comment.

You can also hand steps 4 to 6 to Claude Code in this repo. Give it the brief and ask for a
draft. It can see the file format and run the build checks itself.

## What the tools are not for

- **Gemini** has no job here yet. Add it only if you find a gap.
- **Midjourney** makes mood images for Facebook only. Never an image of a real victim,
  suspect or crime scene, and never on the website. Story photos on the site are
  agency-released photos with a credit and license, per [Standards](../src/content/pages/standards.md).
- **Canva** is for laying out Facebook graphics and thumbnails.

## Why this differs from the first draft of the setup doc

The first doc assumed the page covered legends and hauntings and wrote in a campfire voice.
The site is true crime only ("True crime stories that stay with you") with strict sourcing.
So these prompts:

- Drop legends and hauntings.
- Use the site's calm, factual voice, not hype.
- Have Claude write the actual case file format, with `[S#]` source tags, so the build checks
  it for you.
- Use the same banned words and punctuation rules that `npm run check` enforces.

## Automating later

Once a few weeks of stories come out clean, the steps can be chained with API keys
(Perplexity Sonar, the Claude API, the OpenAI API), either in n8n/Make or as a script in this
repo. Keep step 6, the human fact check, no matter what.
