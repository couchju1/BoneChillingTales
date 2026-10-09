import raw from "../../site.config.json";

export type CaseStatus = "unsolved" | "missing" | "solved" | "in-court";

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
    provider: "kit";
    formAction: string;
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
