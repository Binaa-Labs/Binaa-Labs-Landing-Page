// Single source of truth for site-wide constants.

// Public production origin — used for canonical/OG URLs, sitemap and robots.
// Override with NEXT_PUBLIC_SITE_URL in the hosting provider. No trailing slash.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://binaalabs.com";

// Where contact/lead enquiries are sent (mailto handoff + structured data).
export const CONTACT_EMAIL = "admin@binaalabs.com";
