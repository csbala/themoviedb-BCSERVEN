import { test, expect } from "../page-objects/fixtures";

// Reset storage state to avoid authentication for this test
test.use({ storageState: { cookies: [], origins: [] } });

test("Search for the movie 'Matrix' with unauthenticated user", async ({
  homePage,
  searchResultPage,
}) => {
  // GIVEN the home page is opened
  await homePage.goto();

  // THEN the TMDB header and Login button should be visible
  await expect(homePage.tmdbLogoLocator).toBeVisible();
  await expect(homePage.loginButtonLocator).toBeVisible();

  // WHEN the user searches for "Matrix"
  await homePage.search("Matrix");

  // THEN the Search result page should be loaded
  await expect(searchResultPage.getCurrentUrl()).resolves.toContain("/search?");
  await expect(searchResultPage.isSearchResultsSectionVisible()).resolves.toBe(
    true
  );

  // AND the first search result should have "Matrix" in its title
  await expect((await searchResultPage.getSearchResultTexts())[0]).toContain(
    "Matrix"
  );
});
