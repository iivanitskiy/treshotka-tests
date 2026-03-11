import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import {
  APP_TITLE,
  ERROR_EMAIL_INVALID,
  ERROR_EMAIL_REQUIRED,
  ERROR_EMAIL_ALREADY_REGISTERED,
  ERROR_NAME_REQUIRED,
  ERROR_PASSWORD_REQUIRED,
  ERROR_PASSWORD_TOO_SHORT,
  REGISTER_HAVE_ACCOUNT_MESSAGE,
  REGISTER_TITLE,
} from "../data/messages";

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
    this.headingLocator = this.page.getByRole("heading", { name: APP_TITLE });
    this.logoLocator = this.page.getByRole("img", { name: "Логотип" });
    this.titleLocator = this.page.getByRole("heading", {
      name: REGISTER_TITLE,
    });
    this.nameInputLocator = this.page.getByPlaceholder("Имя пользователя");
    this.emailInputLocator = this.page.getByPlaceholder("Email");
    this.passwordInputLocator = this.page.getByPlaceholder("Пароль");
    this.registerButtonLocator = this.page.getByRole("button", {
      name: "Зарегистрироваться",
    });
    this.registerMessageLocator = this.page.getByText(
      REGISTER_HAVE_ACCOUNT_MESSAGE,
    );
    this.authLinkLocator = this.page.getByRole("link", {
      name: "Войти",
    });
    this.emptyNameFieldErrorMessageLocator = this.page.getByText(
      ERROR_NAME_REQUIRED,
    );
    this.invalidEmailErrorMessageLocator = this.page.getByText(
      ERROR_EMAIL_INVALID,
    );
    this.emptyEmailFieldErrorMessageLocator = this.page.getByText(
      ERROR_EMAIL_REQUIRED,
    );
    this.invalidPasswordErrorMessageLocator = this.page.getByText(
      ERROR_PASSWORD_TOO_SHORT,
    );
    this.emptyPasswordFieldErrorMessageLocator = this.page.getByText(
      ERROR_PASSWORD_REQUIRED,
    );
    this.existUserRegisterErrorMessageLocator = this.page.getByText(
      ERROR_EMAIL_ALREADY_REGISTERED,
    );
  }

  // actions
  async open() {
    await this.page.goto("/register");
  }

  async register(name: string, email: string, pass: string) {
    await this.nameInputLocator.fill(name);
    await this.emailInputLocator.fill(email);
    await this.passwordInputLocator.fill(pass);
    await this.registerButtonLocator.click();
  }

  // assertions
  async registerStackHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(this.registerStackLocator, "snapshot контейнера регистрации.yml");
  }

  async checkHeading() {
    await expect(this.headingLocator).toBeVisible();
    await expect(this.headingLocator).toHaveText(APP_TITLE);
  }

  async checkLogo() {
    await expect(this.logoLocator).toBeVisible();
  }

  async checkTitle() {
    await expect(this.titleLocator).toBeVisible();
    await expect(this.titleLocator).toHaveText(REGISTER_TITLE);
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
    await expect(this.registerMessageLocator).toHaveText(
      REGISTER_HAVE_ACCOUNT_MESSAGE,
    );
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
      ERROR_EMAIL_ALREADY_REGISTERED,
    );
  }
}
