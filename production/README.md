# Video production

One folder per story: `production/[slug]/`, made by copying `_template/`. Nothing here is deployed. Astro only builds `src/` and `public/`.

| File | Owner | Starts after |
|---|---|---|
| `record.md` | Justin (agents update their rows) | Justin approves the story for video |
| `script-short.md` | @Scribe | `APPROVED FOR VIDEO: [slug] @ [commit]` |
| `script-long.md` | @Scribe | same |
| `shots.md` | @Reese | `SCRIPTS PASS @ [commit]` |
| `publishing.md` | @Pressley | `SCRIPTS PASS @ [commit]` |

All work happens on one branch, `video/[slug]`, in one PR titled `Video scripts: [Story title]`. The rules are in `agents/OPERATIONS.md` under "Video production".

Source tags (`[S3]`) stay in the scripts so @Sherlock can check them against the story. They never appear in anything public.

Don't put rendered video, audio or large image files here. Keep those wherever Justin edits, and link them from `record.md`.
