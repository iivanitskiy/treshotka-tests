import { test } from "../../fixtures/fixtures"

test('Проверка доступности элементов авторизации', async ({ loginPage }) => {
	await loginPage.authStackHasCorrectAriaSnaphot();
});

test('Проверка элементов авторизации', async ({ loginPage }) => {
	await loginPage.heading();
	await loginPage.logo();
	await loginPage.title();
	await loginPage.emailInput();
	await loginPage.passwordInput();
	await loginPage.loginButton();
	await loginPage.registerMessage();
	await loginPage.registerLink();
});

test('Авторизация с корректными данными', async ({ loginPage }) => {
	await loginPage.login();
});
