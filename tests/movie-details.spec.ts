import { test, expect } from "@playwright/test";

// Define a test suite for movie details
test.describe("Movie Details Page", () => {
  test("displays movie details correctly", async ({ page }) => {
    // Mock the API response for movie ID 550 (Fight Club)
    await page.route("**/movie/550", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          title: "Fight Club",
          release_date: "1999-10-15",
          overview:
            "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
        }),
      });
    });

    // Navigate to the movie details page
    await page.goto("/movie/550");

    // Log page content for debugging (optional, remove in production)
    console.log("Page content:", await page.content());

    // Wait for the movie title to be visible (adjust timeout if needed)
    await page
      .waitForSelector("h1", { state: "visible", timeout: 10000 })
      .catch((e) => {
        console.error("Failed to find h1 element:", e);
      });

    // Verify the movie title is displayed (adjust locator if h1 is incorrect)
    await expect(page.locator("h1"))
      .toHaveText("Fight Club", {
        timeout: 10000,
      })
      .catch(async (e) => {
        console.error("Title check failed:", e);
        // Fallback: Check alternative locators if h1 is not used
        await expect(page.locator(".movie-title, .title")).toHaveText(
          "Fight Club",
          {
            timeout: 10000,
          }
        );
      });

    // Wait for the release date to be visible
    await page
      .waitForSelector(".release-date", { state: "visible", timeout: 10000 })
      .catch((e) => {
        console.error("Failed to find release-date element:", e);
      });

    // Verify the release date is displayed
    await expect(page.locator(".release-date")).toHaveText("1999-10-15", {
      timeout: 10000,
    });

    // Wait for the overview to be visible
    await page
      .waitForSelector(".overview", { state: "visible", timeout: 10000 })
      .catch((e) => {
        console.error("Failed to find overview element:", e);
      });

    // Verify the overview is displayed
    await expect(page.locator(".overview")).toHaveText(
      "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.",
      { timeout: 10000 }
    );
  });
});
