import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
  readonly registerStackLocator: Locator;
  readonly headingLocator: Locator;
  readonly logoLocator: Locator;
  readonly titleLocator: Locator;
  readonly nameInputLocator: Locator;
  readonly emailInputLocator: Locator;
  readonly passwordInputLocator: Locator;
  readonly registerButtonLocator: Locator;
  readonly registerMessageLocator: Locator;
  readonly authLinkLocator: Locator;
  readonly emptyNameFieldErrorMessageLocator: Locator;
  readonly emptyEmailFieldErrorMessageLocator: Locator;
  readonly invalidEmailErrorMessageLocator: Locator;
  readonly emptyPasswordFieldErrorMessageLocator: Locator;
  readonly invalidPasswordErrorMessageLocator: Locator;
  readonly existUserRegisterErrorMessageLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.registerStackLocator = this.page.locator("div.auth-stack");
    this.headingLocator = this.page.getByRole("heading", { name: "Трещотка" });
    this.logoLocator = this.page.getByRole("img", { name: "Логотип" });
    this.titleLocator = this.page.getByRole("heading", {
      name: "Создать аккаунт",
    });
    this.nameInputLocator = this.page.getByPlaceholder("Имя пользователя");
    this.emailInputLocator = this.page.getByPlaceholder("Email");
    this.passwordInputLocator = this.page.getByPlaceholder("Пароль");
    this.registerButtonLocator = this.page.getByRole("button", {
      name: "Зарегистрироваться",
    });
    this.registerMessageLocator = this.page.getByText("Уже есть аккаунт?");
    this.authLinkLocator = this.page.getByRole("link", {
      name: "Войти",
    });
    this.emptyNameFieldErrorMessageLocator = this.page.getByText(
      "Пожалуйста, введите ваше имя!",
    );
    this.invalidEmailErrorMessageLocator = this.page.getByText(
      "Пожалуйста, введите корректный email!",
    );
    this.emptyEmailFieldErrorMessageLocator = this.page.getByText(
      "Пожалуйста, введите ваш email!",
    );
    this.invalidPasswordErrorMessageLocator = this.page.getByText(
      "Пароль должен содержать минимум 6 символов.",
    );
    this.emptyPasswordFieldErrorMessageLocator = this.page.getByText(
      "Пожалуйста, введите ваш пароль!",
    );
    this.existUserRegisterErrorMessageLocator = this.page.getByText(
      "Этот email уже зарегистрирован.",
    );
  }

  // actions
  async open() {
    await this.page.goto("https://treshotka.vercel.app/register");
  }

  async register(name: string, email: string, pass: string) {
    await this.nameInputLocator.fill(name);
    await this.emailInputLocator.fill(email);
    await this.passwordInputLocator.fill(pass);
    await this.registerButtonLocator.click();
  }

  // assertions
  async registerStackHasCorrectAriaSnaphot() {
    await this.checkAriaSnapshot(this.registerStackLocator, "snapshot контейнера регистрации.yml");
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
    await expect(this.titleLocator).toHaveText("Создать аккаунт");
  }

  async checkNameInput() {
    await expect(this.nameInputLocator).toBeVisible();
  }

  async checkEmailInput() {
    await expect(this.emailInputLocator).toBeVisible();
  }

  async checkPasswordInput() {
    await expect(this.passwordInputLocator).toBeVisible();
  }

  async checkRegisterMessage() {
    await expect(this.registerMessageLocator).toBeVisible();
    await expect(this.registerMessageLocator).toHaveText("Уже есть аккаунт?");
  }

  async checkRegisterButton() {
    await expect(this.registerButtonLocator).toBeVisible();
  }

  async checkAuthLink() {
    await expect(this.authLinkLocator).toBeVisible();
    await expect(this.authLinkLocator).toHaveText("Войти");
  }

  async checkEmptyNameFieldErrorMessage() {
    await expect(this.emptyNameFieldErrorMessageLocator).toBeVisible();
  }

  async checkEmptyEmailFieldErrorMessage() {
    await expect(this.emptyEmailFieldErrorMessageLocator).toBeVisible();
  }

  async checkInvalidEmailErrorMessage() {
    await expect(this.invalidEmailErrorMessageLocator).toBeVisible();
  }

  async checkEmptyPasswordFieldErrorMessage() {
    await expect(this.emptyPasswordFieldErrorMessageLocator).toBeVisible();
  }

  async checkInvalidPasswordErrorMessage() {
    await expect(this.invalidPasswordErrorMessageLocator).toBeVisible();
  }

  async checkExistUserRegisterErrorMessage() {
    await expect(this.existUserRegisterErrorMessageLocator).toBeVisible();
    await expect(this.existUserRegisterErrorMessageLocator).toHaveText(
      "Этот email уже зарегистрирован.",
    );
  }
}
