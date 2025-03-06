import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultPage extends BasePage {
  public readonly searchResultsSection: Locator;
  public readonly searchResultItems: Locator;

  constructor(page: Page) {
    super(page);
    this.searchResultsSection = page.locator(
      "section.main_content.search_results"
    );
    this.searchResultItems = page.locator("section.panel div.title a.result");
  }

  async isSearchResultsSectionVisible(): Promise<boolean> {
    return this.searchResultsSection.isVisible();
  }

  async getSearchResultTexts(): Promise<string[]> {
    return this.searchResultItems.allInnerTexts();
  }
}
