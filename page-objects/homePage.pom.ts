import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  public readonly tmdbLogoLocator: Locator;
  public readonly loginButtonLocator: Locator;
  public readonly searchBarLocator: Locator;
  public readonly searchButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.tmdbLogoLocator = page.locator(
      'a.logo img[alt="The Movie Database (TMDB)"]'
    );
    this.loginButtonLocator = page.locator('a[aria-label="Login"]');
    this.searchBarLocator = page.locator("#inner_search_v4");
    this.searchButtonLocator = page.locator('input[value="Search"]');
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async search(text: string): Promise<void> {
    await this.searchBarLocator.fill(text);
    await this.searchButtonLocator.click();
  }

  async login(): Promise<void> {
    await this.loginButtonLocator.click();
    await this.page.waitForURL(/.*login/);
  }
}
