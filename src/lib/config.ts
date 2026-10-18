import raw from "../../site.config.json";

// "unresolved": officials found no crime, but questions remain. No day counter, since that would suggest one.
export type CaseStatus = "unsolved" | "missing" | "solved" | "in-court" | "unresolved";

export interface SiteConfig {
  siteName: string;
  domain: string;
  tagline: string;
  description: string;
  locale: string;
  founder: {
    name: string;
    role: string;
    photo: string;
    sameAs: string[];
  };
  contactEmail: string;
  social: {
    youtube: string;
    youtubeVerified: boolean;
  };
  newsletter: {
    /** "email" sends each sign-up to forms.suggestTo. "kit" posts to a Kit form. */
    provider: "email" | "kit";
    /** "/api/subscribe.php" for "email", or the Kit form's URL for "kit". */
    formAction: string;
    /** Extra inbox copied on each "email" sign-up. Empty or a placeholder leaves it off. */
    cc?: string;
    /** Kit custom field that records which story a signup came from. null leaves it off. */
    caseField: string | null;
    cadence: "weekly";
  };
  analytics: {
    ga4Id: string;
    searchConsoleVerification: string;
  };
  ads: {
    enabled: boolean;
    network: string | null;
    maxPerScreen: number;
  };
  affiliate: {
    amazonTag: string | null;
    disclosure: string;
  };
  forms: {
    suggestEndpoint: string;
    suggestTo: string;
    honeypotField: string;
  };
  launchStates: string[];
  statuses: Record<CaseStatus, { label: string; counterLabel: string | null }>;
  resources: { name: string; detail: string; url: string }[];
  reviewIntervalDays: number;
}

export const site = raw as SiteConfig;

/** True when a config value is still a "[NEEDS ...]" or "[KIT FORM URL]" style placeholder. */
export function isPlaceholder(value: string | null | undefined): boolean {
  return !value || /^\[.*\]$/.test(value.trim()) || value.includes("XXXX");
}
