import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import dotenv from "dotenv";

dotenv.config();

export class LoginPage extends BasePage {
  public readonly usernameInput: Locator;
  public readonly passwordInput: Locator;
  public readonly loginButton: Locator;
  public readonly userInfoLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login_button");
    this.userInfoLocator = page.locator(".about");
  }

  async login(
    username = process.env.TEST_USER_USERNAME!,
    password = process.env.TEST_USER_PASSWORD!
  ): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.userInfoLocator).toBeVisible({ timeout: 30000 });
  }
}
