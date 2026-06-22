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

test("renders Arabic from the language URL", async ({ page }) => {
  await page.goto("/?lang=ar");

  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "أدِر شركتك"
  );
  await expect(
    page.getByRole("region", { name: "معرض الأعمال المختارة" })
  ).toBeVisible();
});

test("keeps all sections Arabic when Arabic is saved locally", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("binaa-lang", "ar");
  });

  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  await expect(page.locator(".stat-label").first()).toContainText("الكود");
  await expect(page.locator("#the-gap")).toContainText("فخّ");
  await expect(page.locator("#the-gap")).not.toContainText(
    "The Software Studio Trap"
  );
});

test("exposes carousel state to assistive technology", async ({ page }) => {
  await page.goto("/");

  const dots = page.locator(".work-dot");
  await expect(dots.first()).toHaveAttribute("aria-current", "true");
  await page.getByRole("button", { name: "Next project" }).click();
  await expect(dots.nth(1)).toHaveAttribute("aria-current", "true");
  await expect(page.locator(".sr-only")).toContainText("Project 2 of");
});
