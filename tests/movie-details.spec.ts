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

    // Wait for the <pre> tag containing the JSON to be visible
    await page
      .waitForSelector("pre", { state: "visible", timeout: 10000 })
      .catch((e) => {
        console.error("Failed to find pre element:", e);
        throw e; // Fail the test if the element isn't found
      });

    // Get the text content of the <pre> tag
    const jsonText = await page.locator("pre").innerText();

    // Parse the JSON to verify its contents
    const movieData = JSON.parse(jsonText);

    // Verify the movie title
    expect(movieData.title).toBe("Fight Club");

    // Verify the release date
    expect(movieData.release_date).toBe("1999-10-15");

    // Verify the overview
    expect(movieData.overview).toBe(
      "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy."
    );
  });
});
