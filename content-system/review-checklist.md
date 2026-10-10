# Review checklist

Run this on the draft before `draft: false`, and on the Facebook posts before scheduling.
About 20 minutes per story. Never skip it. AI tools state wrong facts with full confidence, and
on real cases a wrong name or legal status is a legal and reputational problem.

## The story

- [ ] Every `[S#]` tag checked against the saved source in `research/[slug]/`. The source says
      that thing, not just something close.
- [ ] Anything a source doesn't support is fixed or cut.
- [ ] No `[NEEDS RESEARCH]` left (`npm run check:launch` finds them).
- [ ] Every person's legal status is right as of today: charged, convicted, acquitted, dropped.
- [ ] Nobody is called a suspect unless officials did. Nobody uncharged is hinted at.
- [ ] Prosecutors' claims are attributed to prosecutors.
- [ ] No names of accused minors or sexual assault victims (see Standards for exceptions).
- [ ] Content note set if it describes violence against a child or sexual violence.
- [ ] Tip line number is the agency's real, current number (call it or check the agency site).
- [ ] Every source link opens. Add an archive link for any that might disappear.
- [ ] Reads like a person wrote it. Read the first and last section out loud.
- [ ] `npm run build && npm run check` passes.

## The Facebook posts

- [ ] Every fact in the post is in the published story.
- [ ] First line works alone.
- [ ] The question fits the case (no "who did it?" on a solved case).
- [ ] Image shows no real person, no crime scene, no blood.
- [ ] The link goes in the first comment.

## Keep a log

When a check fails, write down what went wrong. After a few weeks, turn the repeat problems
into new rules in the matching prompt file and in the tool's saved instructions.

| Date | Story | Tool | What was wrong | Rule added |
| --- | --- | --- | --- | --- |
| | | | | |
