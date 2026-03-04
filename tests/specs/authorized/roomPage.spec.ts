import { test } from "../../fixtures/authorizedFixtures";

test('Проверка лэйаута контейнера управления вызова screenshot', async ({ roomPage }) => {
	await roomPage.videoCallControlsHasCorrectAriaSnaphot();
});

test('Проверка работы кнопки микрофона', async ({ roomPage }) => {
	await roomPage.micButtonClick();
});

test('Проверка работы кнопки камеры', async ({ roomPage }) => {
	await roomPage.cameraButtonClick();
});

test('Проверка работы кнопки подключения', async ({ roomPage }) => {
	await roomPage.connectButtonClick();
});

test('Проверка работы кнопки перехода в полноэкранный режим', async ({ roomPage }) => {
	await roomPage.fullscreenButtonClick();
});

test('Выход в лобби по нажатию кнопки "На главную"', async ({ roomPage }) => {
	await roomPage.homeButtonClick();
});

test('Отправка сообщения и проверка его отображения в чате', async ({ roomPage }) => {
	await roomPage.newMessageSend();
});

test('Отправки пустого сообщения', async ({ roomPage }) => {
	await roomPage.emptyMessageSend();
});

test('Подключения к трансляции', async ({ roomPage }) => {
	await roomPage.enterTranslation();	
});

test('Проверка индикатора количества участников в комнате', async ({ roomPage }) => {
	await roomPage.checkParticipantsCount();
});

test('Проверка участника в комнате', async ({ roomPage }) => {
	await roomPage.checkParticipant();
});
