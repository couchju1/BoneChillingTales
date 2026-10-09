# Bone Chilling Tales

Static Astro site for bonechillingtales.com. Stories are Markdown files in `src/content/cases/`.

## Commands

```sh
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # writes the site to dist/ and builds the search index
npm run check    # type check plus the banned-word and punctuation scan of src/content
npm run check:launch  # same, but also fails on any [NEEDS ...] or [VERIFY] placeholder left
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

## Posting a case update

Small news goes in the story's `updates:` list (and bump `lastChecked`). Bigger news also gets a
short post: copy `src/content/updates/_example.md`, set `case:` to the story's file name, and set
`draft: false`. Mark either kind `type: correction` to list it on the Corrections page.

## Forms

- Newsletter: set `newsletter.formAction` in `site.config.json` to your Kit form's URL. To tag
  signups by story, create a custom field in Kit and put its key in `newsletter.caseField`.
- Suggest a case: set `forms.suggestTo` to the inbox that should get suggestions. The build writes
  it into `api/config.php`, which `public/api/suggest.php` reads. Mail goes out through PHP `mail()`
  from `noreply@` your domain, so set up SPF and DKIM for the domain at Hostinger.
- Spam guards: a hidden honeypot field, a 3 second minimum, and 5 sends per IP per hour.

## Analytics and ads

- Analytics: put your GA4 measurement ID in `analytics.ga4Id`. Nothing loads until you do.
  Visitors in the EU, UK and Switzerland start with analytics cookies off (Google Consent Mode v2),
  and anyone with Global Privacy Control on, or who taps "Turn off analytics" in the footer, is
  never tracked. gtag.js loads after the page finishes, so it never slows the story.
- Events: newsletter_submit, newsletter_success, suggest_submit, video_play, outbound_tip_call
  and read_75. In GA4, mark newsletter_success as a key event. Add `?ga_debug=1` to any page
  URL to watch events arrive in DebugView.
- Ads: set `ads.enabled` to true once a network approves you. Two slots sit on each story,
  after the summary and before the sources, with their height held so nothing jumps. With no
  `ads.network` set they show as dashed boxes for testing. Add the network's script per its
  instructions, and re-run PageSpeed after.

## Notes

- Fonts are self-hosted from `public/fonts/` (Newsreader and Public Sans, OFL, Latin subset).
- Source packs go in `research/[slug]/`. That folder is git-ignored and never deployed.
