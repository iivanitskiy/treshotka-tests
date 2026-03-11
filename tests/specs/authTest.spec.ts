import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { existUser } from "../data/credentials";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

test("authenticate", async ({ page }) => {
  if (fs.existsSync(authFile)) {
    test.skip();
  }

  await page.goto("/login");
  await page.getByPlaceholder("Email").fill(existUser.login);
  await page.getByPlaceholder("Пароль").fill(existUser.password);
  await page.getByRole("button", { name: "Войти" }).click();
  await expect(page).toHaveURL(/\/lobby$/);
  await page.getByRole("button", { name: /Выйти/ }).waitFor();

  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  await page.context().storageState({ path: authFile });
});
