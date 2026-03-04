import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async checkAriaSnapshot(locator: Locator, ariaName: string) {
    await expect(locator).toMatchAriaSnapshot({
      name: ariaName,
    });
  }

  protected async checkScreenshot(locator: Locator, screenshotName: string) {
    await expect(locator).toHaveScreenshot(screenshotName);
  }
}
