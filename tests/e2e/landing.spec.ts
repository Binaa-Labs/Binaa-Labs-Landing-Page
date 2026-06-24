import { expect, test } from "@playwright/test";

test("renders the English landing page", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Run Your Business Online"
  );
  await expect(
    page.getByRole("region", { name: "Selected work carousel" })
  ).toBeVisible();
});

test("renders Arabic at /ar", async ({ page }) => {
  await page.goto("/ar");

  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "أدِر عملك أونلاين"
  );
  await expect(
    page.getByRole("region", { name: "معرض الأعمال المختارة" })
  ).toBeVisible();
});

test("switches language in place without losing the section", async ({
  page,
}) => {
  await page.goto("/?utm=ad");

  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.locator("#contact")).toBeInViewport();

  // Toggle to Arabic — soft navigation to /ar, query preserved, no scroll jump.
  await page.getByRole("button", { name: "AR" }).click();
  await page.waitForURL("**/ar?utm=ad");
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("#contact")).toBeInViewport();

  // And back to English.
  await page.getByRole("button", { name: "EN" }).click();
  await page.waitForURL("**/?utm=ad");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
});

test("keeps every section Arabic on /ar", async ({ page }) => {
  await page.goto("/ar");

  await expect(page.locator(".stat-label").first()).toContainText("الكود");
  await expect(page.locator("#the-gap")).toContainText("فخ شركات البرمجيات");
  await expect(page.locator("#the-gap")).not.toContainText(
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

  await page.goto("/ar#offer");

  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "أدِر عملك أونلاين"
  );

  await context.close();
});

test("reflects language on browser back/forward", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "AR" }).click();
  await page.waitForURL("**/ar");
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");

  await page.goBack();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");

  await page.goForward();
  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});

test("exposes carousel state to assistive technology", async ({ page }) => {
  await page.goto("/");

  const dots = page.locator(".work-dot");
  await expect(dots.first()).toHaveAttribute("aria-current", "true");
  await page.getByRole("button", { name: "Next project" }).click();
  await expect(dots.nth(1)).toHaveAttribute("aria-current", "true");
  await expect(page.locator(".sr-only")).toContainText("Project 2 of");
});
