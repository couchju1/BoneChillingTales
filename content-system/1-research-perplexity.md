# Step 1: Research (Perplexity)

## Setup, once
In Perplexity, create a Space named **Bone Chilling Tales Research**. In the Space's
instructions, paste [brand-voice.md](brand-voice.md) and then the block below.

```markdown
You are the research desk for Bone Chilling Tales, a true crime site. Your job is to find real
cases worth telling and hand the writer a brief they can trust. The writer may use only what
you give them, so anything you leave out can't go in the story.

Rules:
- Every factual claim gets a source link. No source, no claim.
- Use primary and reputable sources: court opinions and filings, police and prosecutor press
  releases, missing person databases (NamUs, state lists), established local and national news,
  the National Registry of Exonerations. Reddit, TikTok, YouTube and forums only show that a
  case is trending. They are never proof of a fact.
- Label every fact DOCUMENTED (an official record or two reputable outlets agree), REPORTED
  (one reputable outlet) or DISPUTED (sources disagree, show both versions).
- Give each person's legal status exactly: victim, charged, convicted, acquitted, charges
  dropped, never charged, or named by police as a suspect. Never call someone a suspect unless
  officials did.
- Flag minors, sexual assault victims, and families who have asked for privacy.
- Real cases only. No legends, folklore or paranormal stories.
- Say what you couldn't find instead of filling the gap.
```

## Weekly run: find 5 cases

```markdown
Find 5 true crime cases for Bone Chilling Tales this week. Mix them:
- 2 in the news right now: a new arrest, trial date, verdict, appeal, execution date, reopened
  case, new evidence, or a major anniversary this month.
- 2 lesser-known cases that most true crime fans haven't heard, with enough public record to
  tell fully.
- 1 from [South Dakota, North Dakota, Minnesota, Iowa or Nebraska].

Skip these, already on the site: Colleen Slemmer (1995), Ron Rudin (1994), Betsy Faria (2011).
[Add each new story here as you publish it.]

For each case give me:
1. Victim's name, town, state, year
2. One sentence on what happened
3. Why now, with a link
4. Status: unsolved / missing / solved / in court
5. Best sources available (court records? agency releases? local paper coverage?)
6. Sensitivity flags: minors, sexual violence, uncharged people publicly accused, family asked
   for privacy, very recent death
7. Your call: strong / maybe / skip, and why
```

## Deep dive: the brief for one case

```markdown
Build a full research brief on the [VICTIM NAME] case ([TOWN, STATE, YEAR]).

1. Summary: 3 to 4 sentences. Who, where, when, where it stands today.
2. Sources: a numbered list, S1, S2, S3 and so on. For each: title, publisher, URL, publish
   date, and one line on how reliable it is. Put the strongest sources first. If an archived
   copy exists (web.archive.org), give that link too.
3. Facts: every fact as one line, tagged with its source numbers and label, like
   "Russ Faria called 911 at 9:40 p.m. [S1] DOCUMENTED"
   Cover: who the victim was, the day it happened, the investigation, arrests and charges,
   trials and verdicts, appeals, and the latest news.
4. Timeline: date (as exact as the record allows: 1987, 1987-06 or 1987-06-12), event,
   source numbers.
5. People: name, role, legal status today, source. Public-record names only.
6. Open questions: what's still unknown or contested, and who says what.
7. Where it stands as of today: status, the next court date if any, the agency handling it,
   and the agency's public tip line phone number and any Crime Stoppers program (unsolved and
   missing cases only).
8. Photos: any photo of the victim released by police or the family to the press, with who
   released it and a link. Say "none found" if so.
9. Couldn't find: anything a reader would ask about that no source answers.
```

## After the deep dive
Open every source link and save it to `research/[slug]/` as `S1-publisher-date.pdf` and so on.
If a link is dead or behind a paywall you can't read, drop that source and anything that
leans only on it.
