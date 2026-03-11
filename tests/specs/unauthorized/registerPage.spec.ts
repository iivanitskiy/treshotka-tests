import { expect, test } from "../../fixtures/unauthorizedFixtures";
import { newValidUser, existUser } from "../../data/credentials";

test("Проверка доступности элементов регистрации snapshot", async ({
  registerPage,
}) => {
  await registerPage.registerStackHasCorrectAriaSnapshot();
});

test("Проверка доступности элементов регистрации", async ({ registerPage }) => {
  await registerPage.checkHeading();
  await registerPage.checkLogo();
  await registerPage.checkTitle();
  await registerPage.checkNameInput();
  await registerPage.checkEmailInput();
  await registerPage.checkPasswordInput();
  await registerPage.checkRegisterButton();
  await registerPage.checkRegisterMessage();  
  await registerPage.checkAuthLink();
});

test("Регистрация нового пользователя", async ({ registerPage }) => {
  await registerPage.register(
    newValidUser.name,
    newValidUser.email,
    newValidUser.password,
  );
  await expect(registerPage.page).toHaveURL(
    "https://treshotka.vercel.app/lobby",
  );
});

test("Регистрация нового пользователя с email, который уже зарегистрирован", async ({
  registerPage,
}) => {
  await registerPage.register(
    'Тестовый пользователь',
    existUser.login,
    existUser.password,
  );
  await registerPage.checkExistUserRegisterErrorMessage();
});

test("Регистрация c пустыми полем Имя, Email, Пароль или всеми полями", async ({
  registerPage,
}) => {
  await test.step("1. Регистрация с пустыми полями", async () => {
    await registerPage.register("", "", "");
    await registerPage.checkEmptyNameFieldErrorMessage();
    await registerPage.checkEmptyEmailFieldErrorMessage();
    await registerPage.checkEmptyPasswordFieldErrorMessage();
  });

  await test.step("2. Регистрация с пустым полем Имя пользователя", async () => {
    await registerPage.register("", newValidUser.email, newValidUser.password);
    await registerPage.checkEmptyNameFieldErrorMessage();
  });

  await test.step("3. Регистрация с пустым полем Email", async () => {
    await registerPage.register(newValidUser.name, "", newValidUser.password);
    await registerPage.checkEmptyEmailFieldErrorMessage();
  });

  await test.step("4. Регистрация с пустым полем Пароль", async () => {
    await registerPage.register(newValidUser.name, newValidUser.email, "");
    await registerPage.checkEmptyPasswordFieldErrorMessage();
  });
});

test("Проверка валидации поля Email", async ({ registerPage }) => {
  await test.step("1. Ввод email без @", async () => {
    await registerPage.emailInputLocator.click();
    await registerPage.emailInputLocator.fill("guestemail.com");
    await registerPage.checkInvalidEmailErrorMessage();
  });
  await test.step("2. Ввод email без .", async () => {
    await registerPage.emailInputLocator.click();
    await registerPage.emailInputLocator.fill("guest@emailcom");
    await registerPage.checkInvalidEmailErrorMessage();
  });
});

test("Проверка валидации поля Пароль", async ({ registerPage }) => {
  await registerPage.passwordInputLocator.click();
  await registerPage.passwordInputLocator.fill("12345");
  await registerPage.checkInvalidPasswordErrorMessage();  
});
