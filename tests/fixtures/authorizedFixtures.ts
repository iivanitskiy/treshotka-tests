import { test as base, expect, BrowserContext } from "@playwright/test";
import { LobbyPage } from "../pages/LobbyPage";
import { RoomPage } from "../pages/RoomPage";
import { existUser } from "../data/credentials";

type MyFixtures = {
  lobbyPage: LobbyPage;
  roomPage: RoomPage;
};

export const test = base.extend<MyFixtures & { context: BrowserContext }>({
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://treshotka.vercel.app/login");
    await page.getByPlaceholder("Email").fill(existUser.login);
    await page.getByPlaceholder("Пароль").fill(existUser.password);
    await page.getByRole("button", { name: "Войти" }).click();
    await expect(page).toHaveURL("https://treshotka.vercel.app/");
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
  lobbyPage: async ({ page }, use) => {
    const lobbyPage = new LobbyPage(page);
    await page.goto("https://treshotka.vercel.app/lobby");
    await use(lobbyPage);
  },
  roomPage: async ({ page }, use) => {
    const roomPage = new RoomPage(page);
    await roomPage.open();
    await use(roomPage);
  },
});
export { expect } from "@playwright/test";
