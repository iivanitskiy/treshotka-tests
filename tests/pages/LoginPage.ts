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
  readonly invalidEmailErrorMessageLocator: Locator;
  readonly invalidEmailOrPasswordErrorMessageLocator: Locator;
  readonly emptyEmailFieldErrorMessageLocator: Locator;
  readonly emptyPasswordFieldErrorMessageLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.authStackLocator = this.page.locator("div.auth-stack");
    this.headingLocator = this.page.getByRole("heading", { name: "Трещотка" });
    this.logoLocator = this.page.getByRole("img", { name: "Логотип" });
    this.titleLocator = this.page.getByRole("heading", {
      name: "Добро пожаловать",
    });
    this.emailInputLocator = this.page.getByPlaceholder("Email");
    this.passwordInputLocator = this.page.getByPlaceholder("Пароль");
    this.loginButtonLocator = this.page.getByRole("button", { name: "Войти" });
    this.registerMessageLocator = this.page.getByText("Нет аккаунта?");
    this.registerLinkLocator = this.page.getByRole("link", {
      name: "Зарегистрироваться",
    });
    this.invalidEmailErrorMessageLocator = this.page.getByText(
      "Пожалуйста, введите корректный email!",
    );
    this.emptyEmailFieldErrorMessageLocator = this.page.getByText(
      "Пожалуйста, введите ваш email!",
    );
    this.emptyPasswordFieldErrorMessageLocator = this.page.getByText(
      "Пожалуйста, введите ваш пароль!",
    );
    this.invalidEmailOrPasswordErrorMessageLocator = this.page.getByText(
      "Неверный email или пароль.",
    );
  }

  // actions
  async open() {
    await this.page.goto("https://treshotka.vercel.app/login");
  }

  async login(login: string, pass: string) {
    await this.emailInputLocator.fill(login);
    await this.passwordInputLocator.fill(pass);
    await this.loginButtonLocator.click();
  }

  // assertions
  async authStackHasCorrectAriaSnaphot() {
    await this.checkAriaSnapshot(this.authStackLocator, "snapshot контейнера авторизации.yml");
  }

  async checkHeading() {
    await expect(this.headingLocator).toBeVisible();
    await expect(this.headingLocator).toHaveText("Трещотка");
  }

  async checkLogo() {
    await expect(this.logoLocator).toBeVisible();
  }

  async checkTitle() {
    await expect(this.titleLocator).toBeVisible();
    await expect(this.titleLocator).toHaveText("Добро пожаловать");
  }

  async checkEmailInput() {
    await expect(this.emailInputLocator).toBeVisible();
  }

  async checkPasswordInput() {
    await expect(this.passwordInputLocator).toBeVisible();
  }

  async checkLoginButton() {
    await expect(this.loginButtonLocator).toBeVisible();
  }

  async checkRegisterMessage() {
    await expect(this.registerMessageLocator).toBeVisible();
    await expect(this.registerMessageLocator).toHaveText("Нет аккаунта?");
  }

  async checkRegisterLink() {
    await expect(this.registerLinkLocator).toBeVisible();
    await expect(this.registerLinkLocator).toHaveText("Зарегистрироваться");
  }

  async checkInvalidEmailErrorMessage() {
    await expect(this.invalidEmailErrorMessageLocator).toBeVisible();
  }

  async checkEmptyEmailFieldErrorMessage() {
    await expect(this.emptyEmailFieldErrorMessageLocator).toBeVisible();
  }

  async checkEmptyPasswordFieldErrorMessage() {
    await expect(this.emptyPasswordFieldErrorMessageLocator).toBeVisible();
  }

  async checkInvalidEmailOrPasswordErrorMessage() {
    await expect(this.invalidEmailOrPasswordErrorMessageLocator).toBeVisible();
  }
}
