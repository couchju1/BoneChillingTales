# How to make the Joshua Guimond video

Your checklist, in order. The files it points to are all in this folder.

| File | What it is |
|---|---|
| `script-long.md` / `script-short.md` | The scripts with source tags, for the fact check |
| `narration-long.txt` / `narration-short.txt` | The same scripts, cleaned for ElevenLabs |
| `shots.md` | Every shot, with Midjourney and Higgsfield prompts |
| `publishing.md` | Title, description, chapters, captions, thumbnail |
| `record.md` | Where it stands |

## Step 0. Decide and check (before you spend credits)

1. **Approve the commit.** Post `APPROVED FOR VIDEO: joshua-guimond-2002 @ 22d95aa` in the Buzz thread so the record is clean.
2. **Have @Sherlock check the scripts** against the story (`agents/fact-checker.md`, "Video scripts and packages"). Don't record until SCRIPTS PASS. A fix after recording means paying ElevenLabs twice.
3. **Answer the open questions** below.

### Open questions for Justin

- **Q1. Pronunciation of "Guimond"** and "Hydukovich", "St. Maur", "Kostreba", "Romme". The script guesses (GHEE-mund). Check a WCCO or FOX 9 clip before you record. Everything else falls apart if the name is wrong.
- **Q2. The online meeting theory** in "The computer" section. The script keeps it exactly as the story words it ("One theory it raised, MPR reported… Soyka said investigators had not ruled it out"). It's allowed by the story's rules, but in audio it lands harder than in print. Keep it as is, or cut those two sentences and keep only Soyka's "We're open to all kinds of possibilities" quote. My lean: keep, because the sheriff put it on record, and the visual stays a plain text card with no music change.
- **Q3. Linking the sheriff's release of the 28 images** in the pinned comment. It could help someone identify a person, which is what the sheriff asked for. The video itself never shows them either way. Your call.
- **Q4. Film your own campus footage?** One visit to St. John's at dusk (the lakes, the woods, the abbey church, no people) would replace half the generated shots with real places. See `shots.md`, "Photo suggestions".

## Step 1. Voice in ElevenLabs (about 1 hour)

1. **Pick one voice** and keep it for every Bone Chilling Tales video. Look in the Voice Library for a calm, low, measured American documentary narrator. Avoid anything tagged "horror", "creepy" or "dramatic trailer". The house voice is a careful reporter, not a ghost story.
2. **Model:** Eleven v3 or Multilingual v2. Test a paragraph on both and keep the one that reads quotes more naturally.
3. **Settings to start from:** Stability 55 to 65, Similarity 75, Style 0 to 10, Speaker boost on, speed 0.95. Higher stability keeps the tone even across 13 minutes.
4. **Pronunciation dictionary:** add the names from the table at the top of `script-long.md` as aliases (for example `Guimond` → `GHEE-mund`, once Q1 is settled).
5. **Generate one section at a time** from `narration-long.txt` (paste the text between the `=== ===` lines). Short chunks are easier to redo and keep the voice steady.
6. **Listen for:** names, numbers ("eleven forty-five p.m.", "twenty-five hundred", the tip line), and that quotes sound like quotes. Regenerate any line that rushes a name or adds drama.
7. **Rules:** one narrator only. Never clone or imitate Brian, Lisa, Paul, Nick or any official. Quotes are read by the narrator, with "he said" as written.
8. **Export** WAV (or MP3 at 192 kbps or better), one file per section, named `01-hook.wav`, `02-maple-lake.wav` and so on.
9. **Short:** do `narration-short.txt` the same way. It should land around 65 seconds.
10. **Music and sound (optional):** ElevenLabs music or sound effects for a low, slow ambient bed and soft lake or wind sound. No stings, hits or risers anywhere, and keep the bed level under quotes and names.

## Step 2. Stills in Midjourney (about 1 hour)

1. Open `shots.md` and use the prompts **MJ-1 to MJ-10**, with the parameters in "Midjourney settings" (`--ar 16:9` for the long video, `--ar 9:16` for the short).
2. Make MJ-1 first. When you like one, note its seed and reuse it on the rest so they look like one place.
3. **Reject** anything with a person, a figure far off, a building, a dock, a boat, a sign or lettering. Reroll.
4. Upscale the keepers. Name them by ID (`MJ-1.png`).
5. Only these 10 are generated. Everything else is a case photo or a text card.

## Step 3. Motion in Higgsfield (about 1 hour)

1. Image to video on each approved MJ still, using **H-1 to H-10** in `shots.md`.
2. Keep moves slow: static with drifting mist, slow pan, slow dolly in.
3. **Reject** any clip where something appears, a shape becomes a figure, or the scene turns into a building.
4. **Never put a photo of Josh into Higgsfield** (or any face or animation tool). His photos only get a slow pan or zoom in your editor.
5. Export at the highest quality your plan allows, 16:9 and 9:16.

## Step 4. Text cards (about 30 minutes)

Make them in your editor or Canva. One template: black or very dark background, the site's fonts (Newsreader for quotes, Public Sans for labels, both in `public/fonts/`), white text, plenty of space.

- Date and time cards: `shots.md` L1, L2, L13, L16, L18, L25, L32, L33, L39
- Quote cards: every quote, with who said it, to whom, and the year (L10, L20, L26, L28 to L30, L34, L35, L38, L40 to L43, L45)
- Tip card: "Stearns County Sheriff's Office. 320 251 4240." Hold it for the full spoken line plus 2 seconds
- Notes: "Some images are illustrations, not case evidence." and "Digitally enhanced." for Josh's photos
- Credits on screen: "Photo by Bobak Ha'Eri, CC BY 3.0" on the abbey church, "Map data © OpenStreetMap contributors" on the map

## Step 5. Edit (about 3 to 4 hours)

1. Lay the voice files down first, in order. Cut to the voice, not the music.
2. Follow `shots.md` row by row (L1 to L47 for the long, S1 to S13 for the short).
3. Case photos are in `src/content/cases/` (`joshua-guimond-2002*.jpg` and `.png`). Use only those seven.
4. Never show the 28 images the sheriff released.
5. Captions: burn them into the short. Upload an SRT for the long (export from your editor, or from the ElevenLabs text).
6. Export the long at 1080p or 4K, 16:9. The short at 1080 × 1920.
7. Write down the real chapter times as you go. They replace the estimates in `publishing.md`.

## Step 6. Thumbnail (about 20 minutes)

The lead portrait (`joshua-guimond-2002.jpg`) and "THREE MINUTES AWAY". Small corner text "Missing since 2002". No generated image, no red, no arrows, no lake.

## Step 7. Package check, then publish

1. Fill in the real chapter times in `publishing.md`.
2. Have @Sherlock check the package and text cards. Wait for PACKAGE PASS.
3. Upload. Use the title, description, tags and pinned comment from `publishing.md`. Turn on "altered or synthetic content" in YouTube's disclosure, since the b-roll is generated.
4. Post the short, the Reel and the Facebook Reel with their captions.
5. Add `youtubeId` to the story frontmatter in its own PR, and record every URL in `record.md`.

Timing note: November 9 is the 24th anniversary. If you want it out that day, the voice and stills need to be done by about November 7.
