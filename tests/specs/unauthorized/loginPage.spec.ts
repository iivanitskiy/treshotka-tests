import { expect, test } from "../../fixtures/unauthorizedFixtures";
import {
  existUser,
  existUserWithInvalidPassword,
  notExistUser,
} from "../../data/credentials";

test("Проверка доступности элементов авторизации snapshot", async ({
  loginPage,
}) => {
  await loginPage.authStackHasCorrectAriaSnapshot();
});

test("Проверка доступности элементов авторизации", async ({ loginPage }) => {
  await loginPage.checkHeading();
  await loginPage.checkLogo();
  await loginPage.checkTitle();
  await loginPage.checkEmailInput();
  await loginPage.checkPasswordInput();
  await loginPage.checkLoginButton();
  await loginPage.checkRegisterMessage();
  await loginPage.checkRegisterLink();
});

test("Авторизация существующего пользователя", async ({ loginPage }) => {
  await loginPage.login(existUser.login, existUser.password);
  await expect(loginPage.page).toHaveURL("https://treshotka.vercel.app/");
});

test("Авторизация существующего пользователя c неверным паролем", async ({
  loginPage,
}) => {
  await loginPage.login(
    existUserWithInvalidPassword.login,
    existUserWithInvalidPassword.password,
  );
  await loginPage.checkInvalidEmailOrPasswordErrorMessage();
});

test("Авторизация несуществующего пользователя", async ({ loginPage }) => {
  await loginPage.login(notExistUser.login, notExistUser.password);
  await loginPage.checkInvalidEmailOrPasswordErrorMessage();
});

test("Авторизация c пустыми полем Email, Пароль или обеими полями", async ({ loginPage }) => {
  await test.step("1. Авторизация с пустями полями", async () => {
    await loginPage.login("", "");
    await loginPage.checkEmptyEmailFieldErrorMessage();
    await loginPage.checkEmptyPasswordFieldErrorMessage();
  });

  await test.step("2. Авторизация с пустым полем Email", async () => {
    await loginPage.login("", existUser.password);
    await loginPage.checkEmptyEmailFieldErrorMessage();
  });

  await test.step("3. Авторизация с пустым полем Пароль", async () => {
    await loginPage.login(existUser.login, "");
    await loginPage.checkEmptyPasswordFieldErrorMessage();
  });
});

test("Проверка валидации поля Email", async ({ loginPage }) => {
  await test.step("1. Ввод email без @", async () => {
    await loginPage.emailInputLocator.click();
    await loginPage.emailInputLocator.fill("guestemail.com");
    await loginPage.checkInvalidEmailErrorMessage();
  });
  await test.step("2. Ввод email без .", async () => {
    await loginPage.emailInputLocator.click();
    await loginPage.emailInputLocator.fill("guest@emailcom");
    await loginPage.checkInvalidEmailErrorMessage();
  });
});
