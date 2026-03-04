import { roomInvalidPassword, roomValidPassword } from "../../data/credentials";
import { test } from "../../fixtures/authorizedFixtures";

test("Проверка доступности хэдера лобби snapshot", async ({ lobbyPage }) => {
  await lobbyPage.lobbyHeaderHasCorrectAriaSnaphot();
});

test("Проверка доступности элементов хэдера лобби", async ({ lobbyPage }) => {
  await lobbyPage.checkHeading();
  await lobbyPage.checkLogo();
  await lobbyPage.checkTitle();
  await lobbyPage.checkLogoutButton();
});

test("Логаут по нажатию кнопки 'Выйти'", async ({ lobbyPage }) => {
  await lobbyPage.logout();
});

test("Проверка списка карточек комнаты snapshot", async ({ lobbyPage }) => {
  await test.step("1. Проверка заголовка списка комнат", async () => {
    await lobbyPage.checkRoomsListHeader();
  });
  const roomsCount = await lobbyPage.roomLocator.count();
  if (roomsCount === 0) {
    await test.step("2. Комнат нет - Проверка иконки и текста об отсутствии комнат", async () => {
      await lobbyPage.checkEmptyRoomsList();
    });
  } else {
    await test.step("2. Комнаты есть - Проверка комнат snapshot", async () => {
      for (let i = 0; i < roomsCount; i++) {
        await lobbyPage.lobbyRoomCardHasCorrectAriaSnaphot(i);
      }
    });
  }
});

test("Вход в открытую комнату", async ({ lobbyPage }) => {
  await lobbyPage.enterOpenRoom();
});

test("Вход в закрытую комнату", async ({ lobbyPage }) => {
  await lobbyPage.enterClosedRoom(roomValidPassword);
});

test("Вход в закрытую комнату с неверным паролем", async ({ lobbyPage }) => {
  await lobbyPage.enterClosedRoomFail(roomInvalidPassword, "Неверный пароль");
});

test("Вход в закрытую комнату с пустым паролем", async ({ lobbyPage }) => {
  await lobbyPage.enterClosedRoomFail("", "Пожалуйста, введите пароль");
});

test("Проверка доступности элементов модального окна входа в закрытую комнату и закрытие по нажатию на иконку", async ({ lobbyPage}) => {
  await lobbyPage.enterRoomModal();
})

test("Открытие модального окна входа в закрытую комнату и закрытие по клику на овэрлей", async ({ lobbyPage })=> {
  await lobbyPage.openAndCloseRoomModal();
})
