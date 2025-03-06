import { test, expect } from "@playwright/test";

test("displays movie details correctly", async ({ page }) => {
  // Mock the API response for movie details (e.g., movie with ID 550: Fight Club)
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

  // Navigate to the movie details page (assuming the route is /movie/{id})
  await page.goto("/movie/550");

  // Verify the movie title is displayed correctly
  await expect(page.locator("h1")).toHaveText("Fight Club");

  // Verify the release date is displayed correctly
  await expect(page.locator(".release-date")).toHaveText("1999-10-15");

  // Verify the overview is displayed correctly
  await expect(page.locator(".overview")).toHaveText(
    "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy."
  );
});
