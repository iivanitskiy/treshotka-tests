import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly authStackLocator: Locator;
  readonly headingLocator: Locator;
  readonly logoLocator: Locator;
  readonly titleLocator: Locator;
  readonly emailInputLocator: Locator;
  readonly passwordInputLocator: Locator;
  readonly loginButtonLocator: Locator;
  readonly registerMessageLocator: Locator;
  readonly registerLinkLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.authStackLocator = this.page.locator("div.auth-stack");
    this.headingLocator = this.page.getByRole("heading", { name: "Трещотка" });
    this.logoLocator = this.page.getByRole("img", { name: "Логотип" });
    this.titleLocator = this.page.getByRole("heading", {
      name: "Добро пожаловать",
    });
    this.emailInputLocator = this.page.getByPlaceholder("Email");
    this.passwordInputLocator =
      this.page.getByPlaceholder("Пароль");
    this.loginButtonLocator = this.page.getByRole("button", { name: "Войти" });
    this.registerMessageLocator = this.page.getByText("Нет аккаунта?");
    this.registerLinkLocator = this.page.getByRole("link", {
      name: "Зарегистрироваться",
    });
  }

  async open() {
    await this.page.goto("https://treshotka.vercel.app/login");
  }

  async authStackHasCorrectAriaSnaphot() {
    await expect(this.authStackLocator).toMatchAriaSnapshot({
      name: "snapshot контейнера авторизации.yml",
    });
  }

  async heading() {
    await expect(this.headingLocator).toBeVisible();
    await expect(this.headingLocator).toHaveText("Трещотка");
  }

  async logo() {
    await expect(this.logoLocator).toBeVisible();
  }

	async title() {
    await expect(this.titleLocator).toBeVisible();
    await expect(this.titleLocator).toHaveText("Добро пожаловать");
  }

	async emailInput() {
    await expect(this.emailInputLocator).toBeVisible();
  }

	async passwordInput() {
    await expect(this.passwordInputLocator).toBeVisible();
  }

	async loginButton() {
    await expect(this.loginButtonLocator).toBeVisible();
  }

	async registerMessage() {
    await expect(this.registerMessageLocator).toBeVisible();
		await expect(this.registerMessageLocator).toHaveText("Нет аккаунта?");
  }

	async registerLink() {
    await expect(this.registerLinkLocator).toBeVisible();
		await expect(this.registerLinkLocator).toHaveText("Зарегистрироваться");
  }
	
	async login() {
    await this.emailInputLocator.fill('guest@email.com');
    await this.passwordInputLocator.fill('123456');
    await this.loginButtonLocator.click();
		await expect(this.page).toHaveURL("https://treshotka.vercel.app/lobby");
  }

}
