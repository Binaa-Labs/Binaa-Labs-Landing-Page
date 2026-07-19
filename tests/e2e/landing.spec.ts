import { expect, test, type Page } from "@playwright/test";

// The intro splash plays once per session. Seed the session flag so the
// overlay never intercepts the tests that aren't about it (the boot script
// then hides it before paint, exactly like a returning visitor).
const seedSplashSeen = (page: Page) =>
  page.addInitScript(() => {
    try {
      sessionStorage.setItem("binaa-splash-seen", "1");
    } catch {
      /* ignore */
    }
  });

test("renders the English landing page", async ({ page }) => {
  await seedSplashSeen(page);
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Run Your Business Online"
  );
  // the proof section now renders two fixed case panels, each with its own
  // visit link
  await expect(page.locator("#work")).toContainText("Wazen وازن");
  await expect(page.locator("#work")).toContainText("Almani Motors");
  await expect(
    page.getByRole("link", { name: "Visit wazen.fit" })
  ).toHaveAttribute("href", "https://wazen.fit");
  await expect(
    page.getByRole("link", { name: "Visit almanimotors.com" })
  ).toHaveAttribute("href", "https://almanimotors.com/en/shop");
});

test("renders Arabic at /ar", async ({ page }) => {
  await seedSplashSeen(page);
  await page.goto("/ar");

  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "أدِر عملك أونلاين"
  );
  await expect(page.locator("#work")).toContainText("أعمال حقيقية");
});

test("switches language in place without losing the section", async ({
  page,
}) => {
  await seedSplashSeen(page);
  await page.goto("/?utm=ad");

  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.locator("#contact")).toBeInViewport();

  // Toggle to Arabic — soft navigation to /ar, query preserved, no scroll jump.
  await page.getByRole("button", { name: "AR", exact: true }).click();
  await page.waitForURL("**/ar?utm=ad");
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("#contact")).toBeInViewport();

  // And back to English.
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await page.waitForURL("**/?utm=ad");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
});

test("keeps every section Arabic on /ar", async ({ page }) => {
  await seedSplashSeen(page);
  await page.goto("/ar");

  // proof band (the old Stats section folded into the hero)
  await expect(page.locator(".proof").first()).toContainText("الكود");
  await expect(page.locator("#gap")).toContainText("فخ شركات البرمجيات");
  await expect(page.locator("#gap")).not.toContainText(
    "The Software Studio Trap"
  );
});

test("server-renders Arabic html attributes at /ar without JS", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  const page = await context.newPage();

  // #offer is kept as an alias anchor on the merged section
  await page.goto("/ar#offer");

  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "أدِر عملك أونلاين"
  );

  await context.close();
});

test("reflects language on browser back/forward", async ({ page }) => {
  await seedSplashSeen(page);
  await page.goto("/");

  await page.getByRole("button", { name: "AR", exact: true }).click();
  await page.waitForURL("**/ar");
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");

  await page.goBack();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");

  await page.goForward();
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});

test("FAQ accordion exposes state to assistive technology", async ({
  page,
}) => {
  await seedSplashSeen(page);
  await page.goto("/");

  const buttons = page.locator(".qa-q");
  await expect(buttons.first()).toHaveAttribute("aria-expanded", "true");
  await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "false");

  await buttons.nth(1).scrollIntoViewIfNeeded();
  await buttons.nth(1).click();
  await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "true");
  await buttons.nth(1).click();
  await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "false");
});

test("intro splash plays once per session and any scroll skips it", async ({
  page,
  isMobile,
}) => {
  // mobile viewports never mount the splash at all (D19) — covered below
  test.skip(isMobile, "splash is disabled on mobile viewports");

  // fresh session — no seeding: the splash must play
  await page.goto("/");
  await expect(page.locator("#splash")).toBeVisible();

  // ANY scroll/wheel input skips instantly
  await page.mouse.wheel(0, 120);
  await expect(page.locator("#splash")).toHaveCount(0);

  // same tab, second load — session-once: hidden before paint, then removed
  await page.reload();
  await expect(page.locator("#splash")).toHaveCount(0);
});

test("splash never mounts under reduced motion", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/");

  // CSS layer hides it immediately; the matchMedia layer removes it
  await expect(page.locator("#splash")).toBeHidden();
  await expect(page.locator("#splash")).toHaveCount(0);

  await context.close();
});

test("splash never mounts on mobile viewports (D19, LCP rung 2)", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  // fresh session — no seeding: even a first-ever visit must skip the splash
  await page.goto("/");

  // CSS layer hides it immediately; the matchMedia layer removes it
  await expect(page.locator("#splash")).toBeHidden();
  await expect(page.locator("#splash")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await context.close();
});

test("hero copy paints without waiting on hydration on mobile (D19, LCP rung 2b)", async ({
  browser,
  baseURL,
}) => {
  // JS disabled entirely: the strongest proxy for "hydration never gets a
  // chance to run before paint" (throttled-CPU hydration on the real device
  // just delays it — here it never happens at all). The hero copy must still
  // render fully visible from CSS alone, with no [data-revealed] flip needed.
  const context = await browser.newContext({
    baseURL,
    viewport: { width: 390, height: 844 },
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS(
    "opacity",
    "1"
  );
  await expect(page.locator(".hero-sub")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero-ctas")).toHaveCSS("opacity", "1");
  await expect(page.locator(".proof-band")).toHaveCSS("opacity", "1");

  await context.close();
});

test("below-fold sections still reveal on scroll on mobile (D19/2b is hero-copy only)", async ({
  browser,
  baseURL,
}) => {
  // D19/2b turns off the JS-gated fade-in for .hero-copy [data-reveal] only
  // (mobile LCP fix). Guard that the exclusion never widens to swallow the
  // rest of the page's scroll reveals.
  const context = await browser.newContext({
    baseURL,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await seedSplashSeen(page);
  await page.goto("/");

  const target = page.locator("#gap [data-reveal]").first();
  await expect(target).toHaveCSS("opacity", "0");

  await target.scrollIntoViewIfNeeded();
  await expect(target).toHaveAttribute("data-revealed", "");
  await expect(target).toHaveCSS("opacity", "1");

  await context.close();
});

test("mobile nav drawer animates open, stays closed to keyboard and tap when collapsed", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await seedSplashSeen(page);
  await page.goto("/");

  const burger = page.getByRole("button", { name: "Toggle menu" });
  const firstLink = page.locator(".nav-mobile-link").first();

  // collapsed: present in the DOM (for the CSS height animation) but not
  // reachable by keyboard, and hidden from assistive tech
  await expect(page.locator(".nav-mobile")).toHaveAttribute(
    "aria-hidden",
    "true"
  );
  await expect(firstLink).toHaveAttribute("tabindex", "-1");

  await burger.click();

  await expect(page.locator(".nav-mobile")).toHaveClass(/open/);
  await expect(page.locator(".nav-mobile")).toHaveAttribute(
    "aria-hidden",
    "false"
  );
  await expect(firstLink).not.toHaveAttribute("tabindex", "-1");
  await expect(firstLink).toHaveCSS("opacity", "1");

  await burger.click();
  await expect(page.locator(".nav-mobile")).not.toHaveClass(/open/);
  await expect(firstLink).toHaveAttribute("tabindex", "-1");

  await context.close();
});
