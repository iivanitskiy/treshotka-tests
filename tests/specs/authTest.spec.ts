import { test, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('test', async ({ page }) => {
  await page.goto('https://treshotka.vercel.app/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('guest@email.com');
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.getByRole('textbox', { name: 'Пароль' }).fill('123456');
  await page.getByRole('button', { name: 'Войти' }).click();

  await page.context().storageState({ path: authFile });
});