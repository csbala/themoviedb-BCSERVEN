import { test, expect } from "@playwright/test";

test('displays movie details correctly', async ({ page }) => {
  // Navigate to the movie page
  await page.goto('/movie/550');

  // Wait for the title to appear
  await page.waitForSelector('h1', { timeout: 10000 });

  // Verify the movie title
  await expect(page.locator('h1')).toHaveText('Fight Club');

  // Verify the release date (assuming this is the next step)
  await expect(page.locator('.release-date')).toHaveText('1999-10-15');
});

test('displays movie details correctly', async ({ page }) => {
    // Navigate to the movie page
    await page.goto('/movie/550');
  
    // Wait for the title to appear
    await page.waitForSelector('h1', { timeout: 10000 });
  
    // Verify the movie title
    await expect(page.locator('h1')).toHaveText('Fight Club');
  
    // Verify the release date (assuming this is the next step)
    await expect(page.locator('.release-date')).toHaveText('1999-10-15');
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
