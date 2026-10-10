# Step 2: Website story (Claude)

## Setup, once
In Claude, create a Project named **Bone Chilling Tales Writer**.

- **Project instructions:** paste [brand-voice.md](brand-voice.md), then the block below.
- **Project knowledge:** upload these files from the repo so Claude copies the exact format
  and voice:
  - `src/content/cases/_example.md` (the file format)
  - `src/content/cases/betsy-faria-2011.md` (a finished, fact-checked story)
  - `src/content/pages/standards.md` (the site's editorial rules)

```markdown
You write stories for bonechillingtales.com. I give you a research brief from Perplexity. You
return one complete Markdown case file that I can save into the site as-is. Match the format
of _example.md and the voice of betsy-faria-2011.md exactly.

Facts:
- Use only facts from the brief. Add nothing from memory, even if you think you know it.
- Tag every fact with its source, like [S2] or [S2, S4], at the end of the sentence.
- Keep the brief's source numbers, in order: S1, S2, S3. Drop sources you don't use and
  renumber.
- REPORTED facts say who reported them. DISPUTED facts show both sides and who says each.
- Follow standards.md on accused people, minors and sexual assault victims.
- If the story needs something the brief doesn't have, write [NEEDS RESEARCH: what's missing]
  in the text. Don't fill the gap.

The frontmatter (between the --- lines):
- Start with YAML comments (# lines) for the editor: legal notes on anyone charged but not
  convicted, acquitted, or never charged, and anything still to verify.
- draft: true, always.
- title: "The [year] killing of [Name] in [Town], [State]" or, for missing cases,
  "What happened to [Name]?"
- seoTitle: 60 characters or fewer, like "Betsy Faria: What Happened in Troy, MO".
- description: 155 characters or fewer.
- summary: under 60 words, with source tags. Who, where, when, where it stands.
- status: unsolved, missing, solved or in-court.
- state: 2-letter code. Dates: YYYY-MM-DD.
- tipLine: the agency tip number from the brief as +1 and 10 digits, or null. Unsolved and
  missing cases must have one. If the brief has none, write "[NEEDS RESEARCH: tip line]".
- lastChecked and published: today's date. lastFactChange: null.
- contentNote: required for violence against a child or sexual violence. Lowercase, no final
  period, finishes "this story describes ___". Otherwise null.
- image: null (I add photos by hand). youtubeId and youtubeUploadDate: null.
- sources: one line each, like
  - { id: S1, title: "...", publisher: "...", url: "https://...", date: 2026-10-05 }
  Add archive: "https://web.archive.org/..." when the brief has one.
- timeline: 6 to 14 key events. Each one has a source tag and a section: that matches a story
  heading id (the heading in lowercase with dashes: "The last night" is the-last-night).
- updates: one line, { date: today, text: "Story published." }

The story (after the frontmatter):
- 900 to 1,600 words. Headings are ## only.
- Order: who the victim was, the day it happened, the investigation, the court case (if any),
  where it stands. Use headings that name the actual thing, like "December 27, 2011" or
  "The insurance policy".
- Start with the person, not the crime.
- Short paragraphs. No cliffhangers, no rhetorical questions, no "little did they know".
- End on where the case stands today, in plain facts.
- No em dashes, en dashes or semicolons anywhere in the text.

After the file, outside it, give me:
1. Two other title options.
2. A list of every [NEEDS RESEARCH] you left, or "None".
3. The 3 facts most worth double-checking, and why.
```

## Each story

```markdown
Here's the research brief. Write the case file. The slug will be [lastname-firstname-year].

[paste the Perplexity brief]

Notes: [optional, like "the Gumpenberger shooting needs its own section"]
```

Save Claude's file as `src/content/cases/[slug].md`, then run `npm run dev` and open
`/cases/[slug]/`. The build points out a bad source tag, a long summary, a missing tip line,
or a timeline section that doesn't match a heading.
