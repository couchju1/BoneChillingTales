# Bone Chilling Tales

Static Astro site for bonechillingtales.com. Stories are Markdown files in `src/content/cases/`.

## Commands

```sh
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # writes the site to dist/
npm run check    # type check plus the banned-word and punctuation scan of src/content
```

## Publishing a story

1. Copy `src/content/cases/_example.md` to `src/content/cases/[slug].md`.
2. Fill in the frontmatter and the story. Tag every fact with its source, like `[S2]` or `[S2, S4]`.
3. Preview it with `npm run dev` and open `/cases/[slug]/`. Drafts show there with a banner.
   `PREVIEW_DRAFTS=1 npm run build && npm run preview` does the same on a full build.
4. Set `draft: false`, run `npm run build && npm run check`, commit and push.

Timeline events can link to a story section with `section: "heading-id"`, where the id is the
heading text in lowercase with dashes ("The last night" becomes `the-last-night`).

The build fails when a published case has no sources, a `[S#]` tag points at a missing source,
sources aren't numbered S1, S2, S3 in order, an unsolved or missing case has no tip line, the
summary is missing or over 60 words, or a timeline event points at a heading that doesn't exist.

## Notes

- Fonts are self-hosted from `public/fonts/` (Newsreader and Public Sans, OFL, Latin subset).
- Source packs go in `research/[slug]/`. That folder is git-ignored and never deployed.
