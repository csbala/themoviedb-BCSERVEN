import { test as setup, expect } from "../page-objects/fixtures";
import path from "path";

const authFile = path.resolve(__dirname, "../user.json");

setup("Authenticate with test user", async ({ page, homePage, loginPage }) => {
  // GIVEN the home page is opened
  await homePage.goto();

  // THEN the TMDB header and Login button should be visible
  await expect(homePage.tmdbLogoLocator).toBeVisible();
  await expect(homePage.loginButtonLocator).toBeVisible();

  // Perform authentication steps
  await homePage.login();
  await loginPage.login();

  // Save authentication state
  await page.context().storageState({ path: authFile });
});
