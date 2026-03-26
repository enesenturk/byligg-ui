import { test, expect } from "@playwright/test";

test.describe("byLiGG Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for hydration
    await page.waitForLoadState("networkidle");
  });

  test("hero section is visible with CTA buttons", async ({ page }) => {
    await expect(page.getByRole("link", { name: /hemen oyna|play now/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /nasıl çalışır|how it works/i }).first()).toBeVisible();
  });

  test("navbar shows byLiGG brand", async ({ page }) => {
    const nav = page.locator("header");
    await expect(nav).toBeVisible();
    await expect(nav.getByText("byLiGG").first()).toBeVisible();
  });

  test("theme switcher opens and changes theme", async ({ page }) => {
    // Open theme popover
    await page.locator("header button").filter({ has: page.locator("span.rounded-full") }).click();

    // Click Sapphire theme
    await page.getByText(/safir gece|sapphire night/i).click();

    // Verify CSS variable changed
    const accent = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue("--theme-accent").trim()
    );
    expect(accent).toBe("#3b82f6");
  });

  test("language toggle switches TR/EN", async ({ page }) => {
    // Click EN button (text content "en")
    await page.locator("header button", { hasText: /^en$/i }).click();
    // Hero h2 headline should switch to english (line1 = "PREDICT.")
    await expect(page.locator("h2").first()).toContainText(/predict/i);

    // Switch back to TR
    await page.locator("header button", { hasText: /^tr$/i }).click();
    // Check for "YARIŞ" which has standard chars
    await expect(page.locator("h2").first()).toContainText("YARIŞ");
  });

  test("scoring section shows 10 point tier", async ({ page }) => {
    // Scroll past hero + features sections to reach scoring
    await page.evaluate(() => window.scrollBy(0, 2000));
    await page.waitForTimeout(300);
    // "10" point badge should be visible somewhere on page
    const tenPts = page.locator("text=10").first();
    await tenPts.scrollIntoViewIfNeeded();
    const tamSkor = page.getByText(/tam skor|exact score/i).first();
    await tamSkor.scrollIntoViewIfNeeded();
    await expect(tamSkor).toBeVisible();
  });

  test("leaderboard preview shows mock players", async ({ page }) => {
    await page.evaluate(() => window.scrollBy(0, 4000));
    await page.waitForTimeout(300);
    // First() because GalatasarayFan23 also appears in hero's mini leaderboard card
    await expect(page.getByText("GalatasarayFan23").first()).toBeVisible();
  });

  test("full page screenshot", async ({ page }) => {
    await expect(page).toHaveScreenshot("landing-full.png", {
      fullPage: true,
      animations: "disabled",
    });
  });
});
