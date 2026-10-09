import { defineCollection, reference } from "astro:content";
import { glob, type Loader } from "astro/loaders";
import { z } from "astro/zod";

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN",
  "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
  "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT",
  "VT", "VA", "WA", "WV", "WI", "WY",
] as const;

const SOURCE_TAG = /\[(S\d+(?:\s*,\s*S\d+)*)\]/g;

const source = z.object({
  id: z.string().regex(/^S[1-9]\d*$/, 'Source ids look like "S1", "S2", ...'),
  title: z.string().min(1),
  publisher: z.string().min(1),
  url: z.url(),
  date: z.coerce.date(),
  archive: z.url().optional(),
});

const update = z.object({
  date: z.coerce.date(),
  text: z.string().min(1),
  // A correction also shows on the public Corrections page.
  type: z.enum(["update", "correction"]).default("update"),
});

const cases = defineCollection({
  loader: withSourceTagCheck(glob({ pattern: "**/*.md", base: "./src/content/cases" })),
  schema: ({ image }) =>
    z
      .object({
        draft: z.boolean().default(false),
        title: z.string().min(1),
        seoTitle: z.string().max(60, "seoTitle must be 60 characters or fewer"),
        description: z.string().max(155, "description must be 155 characters or fewer"),
        person: z.string().min(1),
        status: z.enum(["unsolved", "missing", "solved", "in-court"]),
        town: z.string().min(1),
        state: z.enum(US_STATES, "state must be a 2-letter US state code, like SD"),
        incidentDate: z.coerce.date(),
        lastSeenDate: z.coerce.date().nullish(),
        resolvedDate: z.coerce.date().nullish(),
        lastChecked: z.coerce.date(),
        // Set only when the facts change. Drives dateModified in the schema markup.
        lastFactChange: z.coerce.date().nullish(),
        published: z.coerce.date(),
        agency: z.string().min(1),
        tipLine: z
          .string()
          .regex(/^\+1\d{10}$/, "tipLine must be E.164, like +16055551234")
          .nullish(),
        contentNote: z.enum(["violence against a child", "sexual violence"]).nullish(),
        image: z
          .object({
            src: image(),
            alt: z.string().min(1),
            credit: z.string().min(1),
            license: z.string().min(1),
          })
          .nullish(),
        youtubeId: z.string().regex(/^[\w-]{11}$/).nullish(),
        sources: z.array(source).default([]),
        updates: z.array(update).default([]),
      })
      .superRefine((data, ctx) => {
        data.sources.forEach((s, i) => {
          if (s.id !== `S${i + 1}`) {
            ctx.addIssue({
              code: "custom",
              path: ["sources", i, "id"],
              message: `Source ${i + 1} has id "${s.id}". Number sources in order: S1, S2, S3...`,
            });
          }
        });

        if (data.draft) return;

        if (data.sources.length === 0) {
          ctx.addIssue({
            code: "custom",
            path: ["sources"],
            message: "A published case needs at least one source.",
          });
        }
        if ((data.status === "unsolved" || data.status === "missing") && !data.tipLine) {
          ctx.addIssue({
            code: "custom",
            path: ["tipLine"],
            message: `${data.status === "unsolved" ? "An unsolved" : "A missing"} case needs the agency tip line.`,
          });
        }
        if (data.status === "missing" && !data.lastSeenDate) {
          ctx.addIssue({
            code: "custom",
            path: ["lastSeenDate"],
            message: "A missing case needs lastSeenDate. It drives the days-since counter.",
          });
        }
        if (data.status === "solved" && !data.resolvedDate) {
          ctx.addIssue({
            code: "custom",
            path: ["resolvedDate"],
            message: "A solved case needs resolvedDate.",
          });
        }
      }),
});

const updates = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/updates" }),
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string().min(1),
    seoTitle: z.string().max(60).optional(),
    description: z.string().max(155),
    case: reference("cases"),
    date: z.coerce.date(),
    type: z.enum(["update", "correction"]).default("update"),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string().min(1),
    seoTitle: z.string().max(60).optional(),
    description: z.string().max(155),
  }),
});

export const collections = { cases, updates, pages };

/**
 * Wraps a loader so every [S#] tag in a story body must match an id in its
 * sources list. Runs on drafts too: a dangling tag is always a mistake.
 */
function withSourceTagCheck(inner: Loader): Loader {
  return {
    ...inner,
    load: (context) => {
      const store = new Proxy(context.store, {
        get(target, prop, receiver) {
          if (prop !== "set") return Reflect.get(target, prop, receiver);
          return (entry: Parameters<typeof target.set>[0]) => {
            const ids = new Set(
              ((entry.data.sources as { id: string }[] | undefined) ?? []).map((s) => s.id),
            );
            const missing = new Set<string>();
            const cited = new Set<string>();
            for (const match of (entry.body ?? "").matchAll(SOURCE_TAG)) {
              for (const tag of match[1]!.split(",").map((t) => t.trim())) {
                cited.add(tag);
                if (!ids.has(tag)) missing.add(tag);
              }
            }
            if (missing.size > 0) {
              const have = ids.size > 0 ? [...ids].join(", ") : "none";
              throw new Error(
                `${entry.filePath}: source tag ${[...missing].map((t) => `[${t}]`).join(", ")} ` +
                  `has no matching entry in "sources" (listed: ${have}). ` +
                  `Add the source or fix the tag.`,
              );
            }
            const unused = [...ids].filter((id) => !cited.has(id));
            if (unused.length > 0) {
              context.logger.warn(`${entry.filePath}: sources never cited in the text: ${unused.join(", ")}`);
            }
            return target.set(entry);
          };
        },
      });
      return inner.load({ ...context, store });
    },
  };
}
