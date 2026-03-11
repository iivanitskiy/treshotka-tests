import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ONLINE_COUNT_TEXT_PREFIX } from "../data/messages";

export class RoomPage extends BasePage {
  readonly videoCallContainerLocator: Locator;
  readonly videoCallControlsLocator: Locator;
  readonly micButtonLocator: Locator;
  readonly micOffButtonLocator: Locator;
  readonly cameraButtonLocator: Locator;
  readonly cameraOffButtonLocator: Locator;
  readonly connectButtonLocator: Locator;
  readonly fullscreenButtonLocator: Locator;
  readonly fullscreenExitButtonLocator: Locator;
  readonly homeButtonLocator: Locator;
  readonly tabListLocator: Locator;
  readonly chatPanelLocator: Locator;
  readonly participantsPanelLocator: Locator;
  readonly chatInputLocator: Locator;
  readonly sendMessageButtonLocator: Locator;
  readonly chatMessagesListLocator: Locator;
  readonly onlineCountLocator: Locator;
  readonly participantsListLocator: Locator;
  readonly participantLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.videoCallContainerLocator = this.page.locator(
      "div.video-call-container",
    );
    this.videoCallControlsLocator = this.page.locator(
      "div.video-call-controls",
    );
    this.micButtonLocator = this.page.locator("span.anticon-audio");
    this.micOffButtonLocator = this.page.locator("span.anticon-audio-muted");
    this.cameraButtonLocator = this.page
      .locator("span.ant-btn-icon")
      .locator('span[aria-label="video-camera"]');
    this.cameraOffButtonLocator = this.page
      .locator("span.ant-btn-icon")
      .locator('span[aria-label="video-camera-add"]');
    this.connectButtonLocator = this.page.getByRole("button", {
      name: "poweroff",
    });
    this.fullscreenButtonLocator = this.page.getByRole("button", {
      name: "fullscreen",
    });
    this.homeButtonLocator = this.page.getByRole("button", { name: "home" });
    this.tabListLocator = this.page.getByRole("tablist");
    this.chatPanelLocator = this.page.locator("#rc-tabs-0-panel-chat");
    this.participantsPanelLocator = this.page.locator(
      "#rc-tabs-0-tab-participants",
    );
    this.chatInputLocator = this.page.getByRole("textbox", {
      name: "Написать сообщение",
    });
    this.sendMessageButtonLocator = this.page.getByRole("button", {
      name: "send",
    });
    this.chatMessagesListLocator = this.page.locator("div.custom-scrollbar");
    this.onlineCountLocator = this.page.getByText(/В сети/);
    this.participantsListLocator = this.page.locator(
      "div.participant-list-content",
    );
    this.participantLocator = this.page.locator("div.participant-item");
    this.fullscreenExitButtonLocator = this.page.getByRole("button", {
      name: "fullscreen-exit",
    });
  }

  // actions
  async open() {
    await this.page.goto("/lobby");
    await this.page.getByRole("button", { name: "login Войти" }).nth(1).click();
  }

  async micButtonClick() {
    await this.micButtonLocator.click();
    await expect(this.micButtonLocator).toBeHidden();
    await expect(this.micOffButtonLocator).toBeVisible();
    await this.micOffButtonLocator.click();
    await expect(this.micOffButtonLocator).toBeHidden();
    await expect(this.micButtonLocator).toBeVisible();
  }

  async cameraButtonClick() {
    await this.cameraButtonLocator.click();
    await expect(this.cameraButtonLocator).toBeHidden();
    await expect(this.cameraOffButtonLocator).toBeVisible();
    await this.cameraOffButtonLocator.click();
    await expect(this.cameraOffButtonLocator).toBeHidden();
    await expect(this.cameraButtonLocator).toBeVisible();
  }

  async enterTranslation() {
    await this.contentPageHasCorrectLayout();
    await this.connectButtonLocator.click();
    await expect(
      this.videoCallContainerLocator.locator("div.video-call-top-list"),
    ).toBeVisible();
    await expect(
      this.videoCallContainerLocator.locator("div.video-call-main-window"),
    ).toBeVisible();
    await this.connectButtonLocator.click();
    await this.contentPageHasCorrectLayout();
  }

  async connectButtonClick() {
    await this.connectButtonLocator.click();
    await expect(this.connectButtonLocator).toHaveCSS(
      "background",
      /rgb\(239, 68, 68\)/,
    );
    await this.connectButtonLocator.click();
    await expect(this.connectButtonLocator).toHaveCSS(
      "background",
      /rgb\(34, 197, 94\)/,
    );
  }

  async fullscreenButtonClick() {
    await this.fullscreenButtonLocator.click();
    await expect(this.videoCallContainerLocator).toHaveClass(/fullscreen/);
    await this.fullscreenExitButtonLocator.click();
    await expect(this.videoCallContainerLocator).not.toHaveClass(/fullscreen/);
  }

  async homeButtonClick() {
    await this.homeButtonLocator.click();
    await expect(this.page).toHaveURL(/\/lobby$/);
  }

  async newMessageSend() {
    const initialMessages = await this.chatMessagesListLocator.count();
    await this.chatInputLocator.fill("Hello, world!");
    await this.sendMessageButtonLocator.click();
    await expect(this.chatMessagesListLocator).toContainText("Hello, world!");
    await expect(this.chatMessagesListLocator).toHaveCount(initialMessages + 1);
    const lastMessage = this.chatMessagesListLocator.last();
    await expect(lastMessage).toContainText("Hello, world!");
  }

  async emptyMessageSend() {
    await this.chatInputLocator.fill("");
    await expect(this.sendMessageButtonLocator).toBeDisabled();
  }

  //assertions
  async videoCallControlsHasCorrectAriaSnapshot() {
    await this.checkAriaSnapshot(
      this.videoCallControlsLocator,
      "snapshot контейнера управления вызова.yml",
    );
  }

  async contentPageHasCorrectLayout() {
    await this.checkScreenshot(
      this.videoCallContainerLocator,
      "screenshot видео контейнера комнаты.png",
    );
  }

  async checkParticipantsCount() {
    await this.participantsPanelLocator.click();
    const count = await this.participantsListLocator.count();
    await expect(this.onlineCountLocator).toContainText(
      `${ONLINE_COUNT_TEXT_PREFIX} (${count})`,
    );
  }

  async checkParticipant() {
    await this.participantsPanelLocator.click();
    await expect(this.participantsListLocator.locator('div.participant-item')
    .getByText('Тестовый пользователь')).toBeVisible();
    await expect(
      this.participantLocator.locator("span.participant-role"),
    ).toContainText("Участник");
    await expect(this.participantLocator.locator("span.ant-avatar")).toBeVisible();
  }
}
