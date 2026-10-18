# Bone Chilling Tales style guide

Every agent reads this before touching a story. It covers how stories sound, how facts are handled, and how the Facebook post is written. The legal and sourcing rules come from the public standards page (`src/content/pages/standards.md`). If this file and that page ever disagree, the standards page wins.

## What this site is

True crime about real people. Real victims, real families, real people who were charged and sometimes acquitted. Nothing is made up, nothing is guessed at, and nothing is written to be "spooky." The tagline is "True crime stories that stay with you." The tone is a careful reporter who cares about the people in the story, not a horror narrator.

Launch states get priority: SD, ND, MN, IA, NE. Cases from other states are fine when they're strong.

## The non-negotiables

1. Every fact gets a source tag. A sentence with a fact in it ends with `[S1]` or `[S2, S4]`, placed after the final punctuation: `She was 19. [S1]`
2. No fact without a source. If it can't be tagged, cut it.
3. Accused means accused. Someone charged is "charged with" or "accused of" a crime until a court convicts them. If a jury acquitted them or charges were dropped, say so near the top, and never hint they did it anyway.
4. Only use roles the record gives. If police never called someone a suspect, the story doesn't either.
5. Opinions are labeled and attributed. "A childhood friend believes there was a cover-up. [S2]" Not "There was a cover-up."
6. When sources disagree, say so plainly instead of picking one silently. ("The FBI says ditch. Newspapers say ravine.")
7. Say what the record doesn't show. Gaps are part of the story. ("The public record doesn't say when she left the farm.")
8. Never publish: crime scene photos, private photos of victims without family permission, names of accused minors (unless charged as adults and named by the court), names of sexual assault victims who haven't spoken publicly, mugshots of people not convicted (unless agency-released and directly newsworthy).
9. Violence against a child or sexual violence requires a `contentNote`.
10. Open cases (`unsolved`, `missing`) must give the agency tip line, and the story should end by pointing readers to it.

## Deaths ruled suicide or no foul play

Some stories are about a death that officials say wasn't a crime, but the family doesn't accept that. Justin approved telling these on October 18, 2026, starting with Kara Greger. The rules above still apply, plus these.

- Lead with the official position, and attribute it to the agency or person who stated it. Say who actually used the word "suicide." A sheriff saying "no foul play" isn't the same as a mayor saying "suicide."
- The family's doubts are their questions, attributed to them. Never present them as findings. "Her family asked who pulled the trigger. [S6]" Not "Someone pulled the trigger."
- Never name, describe or line up anyone in a way that suggests they caused the death. That includes people in an earlier fight or argument and the last person who saw them. Keep each person's part to what the record says.
- Use "died by suicide" or "officials called it a suicide." Never "committed suicide."
- Give the method only as far as the official account and the family's questions depend on it. No details about wounds or the scene, and no step-by-step account of how it happened.
- Don't present suicide as the result of one thing, like the fight, the breakup or the bad night, unless a source says so.
- Set a `contentNote`, like `"a gun death that officials have called a suicide"`.
- End with the agency line if the agency is still investigating anything, or if the family asked people to come forward. Then add the 988 Suicide and Crisis Lifeline: "If you or someone you know is struggling, call or text 988."
- The Facebook post follows the same rules, and ends with the 988 line after the agency number.
- Use `status: unresolved`. It shows as "Questions remain" with no day counter. A tip line is optional, but set one if you end with the agency line.

## Sources

Good sources, in rough order: agency press releases and wanted/missing posters (FBI, state DCI, sheriff), court filings and appeals decisions, NamUs and state missing person records, established local news (KELO, Argus Leader, Yankton Press & Dakotan, Omaha World-Herald, etc.), national outlets (AP, NBC/Dateline).

Not sources: Reddit, Facebook groups, YouTube true crime channels, podcasts, Wikipedia (use it to find sources, never cite it), websleuth forums, other AI tools.

Each source in the frontmatter needs `id`, `title`, `publisher`, `url`, and `date`. Add an `archive` link (web.archive.org) for any local news page that might disappear. Source ids climb in order (S1, S2, S3). Gaps are allowed, repeats and backwards steps are not.

## How stories sound

Read two or three published stories in `src/content/cases/` before writing. Tammy Haas, Rachel Cyriacks and Curtis Bradford are good models.

- Short paragraphs. One to three sentences. Single-sentence paragraphs are common.
- Plain words. Short sentences. Write like you're telling a friend something serious.
- Open on a concrete moment or detail, not a summary. ("Her mother's birthday is November 14." / "On September 23, 1992, a golfer went looking for lost balls near Crofton, Nebraska.")
- Treat victims as people first. A section about who they were, built only from what's on the record. If the record is thin, say so and leave it there. Don't invent warmth.
- Section headings are short and specific, pulled from the story: "The last morning", "The slug", "A pizza in Revere". Not "Background" or "Investigation".
- Length: 1,600 to 3,000 words.
- Ending, for open cases: a "where it stands" section that separates what's documented, where sources disagree, what's reported but not proven, and what no one has answered. Then the tip line as a `tel:` link. Then one reader question.
- Ending, for solved cases: what the outcome was, what the record still leaves open, and something that keeps the victims at the center.
- Close with one honest question for the reader. It drives comments.

### Banned

The build fails on these, so don't use them anywhere in story text, titles, descriptions, summaries, or timeline/update text:

- Em dashes, en dashes, and semicolons in the story body.
- delve, elevate, empower, seamless, unlock, robust, leverage, streamline, comprehensive, cutting-edge, top-notch, journey, look no further, passionate about, whether you're, bombshell, shocking, chilling turn, little did they know, sent shockwaves, tight-knit community, a cold case that haunts. Full list in `scripts/check-content.mjs`.

Also avoid, even though the build won't catch them: "tragically", "brutally", "senseless", "evil", "monster", "sinister", "the unthinkable", "a parent's worst nightmare", and any line that sounds like a TV promo.

## Frontmatter that trips people up

- `seoTitle` 60 characters max. Pattern: `Person Name: What Happened in Town, ST`
- `description` 155 characters max.
- `summary` under 60 words, tagged. Who, where, when, where it stands.
- `title` pattern: `A Specific Hook: The [Killing/Disappearance/Death] of Person Name`
- `tipLine` E.164 format: `+16055551234`
- Missing cases need `lastSeenDate`. Solved cases need `resolvedDate`.
- `contentNote` is lowercase with no period: `"a violent killing and a suicide"`
- Timeline `section` values must match a heading id: "The last night" becomes `the-last-night`.
- File name and slug: `firstname-lastname-YEAR.md`

## The Facebook post

One post per story, written by the same agent that wrote the story so the tone matches. This format is based on the two best performers so far: Tyler Weathersby (100k+ views) and Rachel Cyriacks (50k+). Read both in `agents/facebook-examples/` before writing a post.

The post tells the whole story in short form. It is not a teaser. People read it right in their feed.

### Structure

1. **Headline in ALL CAPS** on the first line. Two short sentences built on a human moment, or a title plus the person's name. It has to work alone, since Facebook cuts off after it.
   - `HE KISSED HIS FAMILY GOODBYE. THEN HE WALKED AWAY AND VANISHED.`
   - `THE BIRTHDAY CALL THAT NEVER CAME: THE DISAPPEARANCE OF RACHEL CYRIACKS`
2. **The opening moment.** The concrete scene the story opens on: date, place, age, what happened. Usually the same detail the website story leads with.
3. **The turn.** One short line: "But Tyler never came home." / "The phone never rang."
4. **Who they were.** Two to four lines making them a person: family, work, what they loved. Attributed when it comes from family ("Her family described her as...").
5. **The case, in order.** What happened, what investigators found, key evidence or developments, with dates.
6. **Where it stands.** What authorities have and haven't said. Who has and hasn't been charged.
7. **The ache.** A few short lines tying back to the opening detail, like the birthday that will come around again.
8. **For missing people**: last-seen clothing, height, weight, identifying marks, if the agency released them.
9. **One bold line** addressed to whoever knows something: `**Someone may know why Rachel never made that call.**`
10. **The tip line**, with the agency name and the number in bold: `contact the South Dakota Division of Criminal Investigation at **605-773-3331**.`
11. **Hashtags**, five, on the last line: the person's name in lowercase, the case type, the city or state, one broad tag, and `#BoneChillingTales`. Example: `#tylerweathersby #Missingperson #siouxfalls #SouthDakota #BoneChillingTales`

### Rhythm

- One sentence per line. Almost every line is its own paragraph.
- Build to short stacks of lines that land together:
  > The truck had been found.
  > The quilt hadn't.
  > And neither had Rachel.
- Set up a beat with "Then another piece of evidence surfaced." or "But something else was missing." Use these sparingly, two or three per post, not every few lines.
- 350 to 550 words.
- No emoji, no source tags, no em dashes.

### Same rules as the story

The post goes out to far more people than the website, so the legal rules matter more here, not less.

- Every fact in the post must be in the website story with a source. The Fact-checker checks the post against the story.
- Attribute anything that's someone's account: "According to her mother", "She later told NBC's Dateline", "Brad reportedly told investigators".
- Say plainly what hasn't been established: "Authorities have not publicly established that either person was involved." / "No one has been charged in connection with her disappearance."
- Never imply that someone the record doesn't name as a suspect is responsible, even through the order of the lines. Placing an uncharged person's name right before "the trail went cold" can read as an accusation. Keep their part to what the record says.
- Avoid wording that assumes the outcome. "Vanished" and "never came home" are fine. "Was taken" or "was killed" are not unless the record says so.

### The link

Don't put the website link in the post itself, since Facebook shows posts with outside links to fewer people. Put it in the first comment instead:

> Full story, with every source and the timeline: https://www.bonechillingtales.com/cases/[slug]/

Include that comment text right after the post in the PR description.
