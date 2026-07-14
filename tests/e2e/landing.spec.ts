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
  // the proof section now renders two fixed case panels
  await expect(page.locator("#work")).toContainText("Wazen وازن");
  await expect(page.locator("#work")).toContainText("Almani Motors");
  await expect(page.locator("#work .case-link")).toHaveAttribute(
    "href",
    "https://wazen.fit"
  );
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
}) => {
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
