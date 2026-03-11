import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import {
  APP_TITLE,
  ERROR_ROOM_PASSWORD_INVALID,
  ERROR_ROOM_PASSWORD_REQUIRED,
  LOBBY_NO_ROOMS_TEXT,
  LOBBY_NO_ROOMS_TEXT_FULL,
} from "../data/messages";

export class LobbyPage extends BasePage {
  readonly lobbyHeaderLocator: Locator;
  readonly headingLocator: Locator;
  readonly logoLocator: Locator;
  readonly titleLocator: Locator;
  readonly logoutButtonLocator: Locator;
  readonly roomsListHeaderLocator: Locator;
  readonly roomLocator: Locator;
  readonly emptyRoomsListIconLocator: Locator;
  readonly emptyRoomsListTextLocator: Locator;
  readonly enterOpenedRoomButtonLocator: Locator;
  readonly enterClosedRoomButtonLocator: Locator;
  readonly enterRoomModalLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.lobbyHeaderLocator = this.page.locator("header.lobby-header");
    this.headingLocator = this.page.getByRole("heading", { name: APP_TITLE });
    this.logoLocator = this.page.getByRole("img", { name: "Логотип" });
    this.titleLocator = this.page.getByText(/Привет/);
    this.logoutButtonLocator = this.page.getByRole("button", {
      name: /Выйти/,
    });
    this.roomsListHeaderLocator = this.page.getByRole("heading", {
      name: "Доступные комнаты",
    });
    this.roomLocator = this.page.locator("div.room-card");
    this.emptyRoomsListIconLocator = this.page.getByRole("img", {
      name: "No data",
    });
    this.emptyRoomsListTextLocator = this.page.getByText(LOBBY_NO_ROOMS_TEXT);
    this.enterOpenedRoomButtonLocator = this.page
      .getByRole("button", { name: "login Войти" })
      .nth(1);
    this.enterClosedRoomButtonLocator = this.page
      .getByRole("button", { name: "login Войти" })
      .first();
    this.enterRoomModalLocator = this.page.locator("div.ant-modal");
  }

  // actions
  async logout() {
    await this.logoutButtonLocator.click();
    await expect(this.page).toHaveURL(/\/login$/);
  }

  async lobbyHeaderHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(
      this.lobbyHeaderLocator,
      "snapshot хэдера лобби.yml",
    );
  }

  async lobbyRoomCardHasCorrectAriaSnapshot(index: number) {
    await this.checkAriaSnapshot(
      this.roomLocator.nth(index),
      "snapshot карточки комнаты generic.yml",
    );
  }

  async enterOpenRoom() {
    await this.enterOpenedRoomButtonLocator.click();
    await expect(this.page).toHaveURL(/\/room.*/);
  }

  async enterClosedRoom(password: string) {
    await this.enterClosedRoomButtonLocator.click();
    const passwordInput = this.page.getByRole("textbox", { name: "Пароль" });
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill(password);
    await this.page.getByRole("button", { name: "Войти в комнату" }).click();
    await expect(this.page).toHaveURL(/\/room.*/);
  }

  async enterClosedRoomFail(password: string, errorText: string) {
    await this.enterClosedRoomButtonLocator.click();
    const passwordInput = this.page.getByRole("textbox", { name: "Пароль" });
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill(password);
    await this.page.getByRole("button", { name: "Войти в комнату" }).click();
    await expect(this.page.getByText(errorText)).toBeVisible();
  }

  async enterRoomModal() {
    await this.enterClosedRoomButtonLocator.click();
    await expect(this.enterRoomModalLocator).toBeVisible();
    await expect(
      this.enterRoomModalLocator.getByText(/Введите пароль для/),
    ).toBeVisible();
    await expect(
      this.enterRoomModalLocator.getByRole("button", { name: "Close" }),
    ).toBeVisible();
    await expect(
      this.enterRoomModalLocator.getByText("Пароль", { exact: true }),
    ).toBeVisible();
    await expect(
      this.enterRoomModalLocator.getByPlaceholder("Введите пароль комнаты"),
    ).toBeVisible();
    await expect(
      this.enterRoomModalLocator.getByRole("button", { name: "Отмена" }),
    ).toBeVisible();
    await expect(
      this.enterRoomModalLocator.getByRole("button", {
        name: "Войти в комнату",
      }),
    ).toBeVisible();
    await this.enterRoomModalLocator
      .getByRole("button", { name: "Close" })
      .click();
    await expect(this.enterRoomModalLocator).toBeHidden();
  }

  async openAndCloseRoomModal() {
    await this.enterClosedRoomButtonLocator.click();
    await expect(this.enterRoomModalLocator).toBeVisible();
    await this.page.locator("div.ant-modal-wrap").click();
    await expect(this.enterRoomModalLocator).toBeHidden();
  }

  //assertions
  async checkHeading() {
    await expect(this.headingLocator).toBeVisible();
    await expect(this.headingLocator).toHaveText(APP_TITLE);
  }

  async checkLogo() {
    await expect(this.logoLocator).toBeVisible();
  }

  async checkTitle() {
    await expect(this.titleLocator).toBeVisible();
    await expect(this.titleLocator).toHaveText(/Привет/);
  }

  async checkLogoutButton() {
    await expect(this.logoutButtonLocator).toBeVisible();
    await expect(this.logoutButtonLocator).toHaveText(/Выйти/);
  }

  async checkRoomsListHeader() {
    await expect(this.roomsListHeaderLocator).toBeVisible();
    await expect(this.roomsListHeaderLocator).toHaveText("Доступные комнаты");
  }

  async checkEmptyRoomsList() {
    await expect(this.emptyRoomsListIconLocator).toBeVisible();
    await expect(this.emptyRoomsListTextLocator).toBeVisible();
    await expect(this.emptyRoomsListTextLocator).toHaveText(
      LOBBY_NO_ROOMS_TEXT_FULL,
    );
  }
}
