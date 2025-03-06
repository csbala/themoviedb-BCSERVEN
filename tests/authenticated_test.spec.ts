import { test, expect } from "../page-objects/fixtures";

test("Search for the movie 'Matrix' with authenticated user", async ({
  homePage,
  searchResultPage,
}) => {
  // GIVEN the home page is opened
  await homePage.goto();

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
