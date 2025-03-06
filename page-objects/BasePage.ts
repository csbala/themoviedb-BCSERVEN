import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
