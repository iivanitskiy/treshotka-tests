<div align="center">
  <h1>Тестирование приложения Treshotka</h1>
  <p>
    <strong>Playwright • TypeScript</strong>
  </p>
  <p>
    <a href="https://treshotka.vercel.app/"><img src="https://img.shields.io/badge/Приложение-Treshotka-8A2BE2" alt="Приложение Treshotka" /></a>
    <a href="https://app.xmind.com/wX7x1Oam?xid=DndEpXzE"><img src="https://img.shields.io/badge/Чек лист-Общий-00A98F" alt="Общий чек-лист" /></a>
    <a href="https://app.xmind.com/R88Zmd1N?xid=zngn1cIh"><img src="https://img.shields.io/badge/Чек лист-Smoke-FF4500" alt="Smoke чек-лист" /></a>
    <a href="https://miro.com/app/board/uXjVG5Q39Kg=/?share_link_id=948442218904"><img src="https://img.shields.io/badge/Тест кейсы-Miro-F7C922" alt="Тест-кейсы в Miro" /></a>
  </p>
</div>

---

## О проекте

Автоматизация тестирования веб-приложения **[Трещотка](https://treshotka.vercel.app/)** (*[Репозиторий](https://github.com/iivanitskiy/treshotka)*). 
В основе лежат предварительно разработанные **чек-листы** и **тест-кейсы**.

## Технологический стек 🛠️

*   **Язык:** TypeScript.
*   **Фреймворк:** Playwright.
*   **Тест-раннер:** Встроенный тест-раннер Playwright.
*   **Отчеты:** Allure (Также приходит в телеграмм) и Playwright HTML Reporter.
*   **CI/CD:** GitHub Actions.

## Архитектура и особенности 🧠

Проект построен с упором на поддерживаемость и читаемость:
*   **Page Objects**: Инкапсуляция селекторов и действий с элементами страниц.
*   **Фикстуры Playwright**: Использование встроенных фикстур и создание кастомных для переиспользования логики.
*   **Параметризация**: Тесты запускаются в разных браузерах.
*   **Изоляция**: Каждый тест независим.

## Что проверяем? 📋

Перед автоматизацией была проведена работа по тест-дизайну. Вы можете ознакомиться с документацией:

*   **[Общий чек-лист](https://app.xmind.com/share/wX7x1Oam?xid=DndEpXzE)** — полный обзор функциональности приложения.
*   **[Smoke-тестирование](https://app.xmind.com/share/R88Zmd1N?xid=zngn1cIh)** — минимальный набор проверок для приемки сборки.
*   **[Тест-кейсы в Miro](https://miro.com/app/board/uXjVG5Q39Kg=/?share_link_id=428174401295)** — детальные шаги для ручного тестирования, которые стали основой для автотестов.

Автоматизированы ключевые сценарии из этих документов: позитивные и негативные проверки основного пользовательского потока.

## Быстрый старт 🚀

1.  **Клонируйте репозиторий:**
    ```bash
    git clone https://github.com/iivanitskiy/treshotka-tests.git
2. **Установите зависимости:**
   ```bash
   cd treshotka-tests
   npm install
3. Установите браузеры Playwright:
   ```bash
   npx playwright install
4. Запустите тесты:
  *   Все тесты в headless-режиме: <code>npm test</code>
  *   С открытым браузером: <code>npm run test:headed</code>
  *   С UI-режимом Playwright: <code>npm run test:ui</code>
5. Добавьте TELEGRAM_CHAT_ID и TELEGRAM_BOT_TOKEN в secrets, чтобы Allure отчёт приходил в телеграм.

## Интеграция и отчеты 📈

GitHub Actions: При каждом пуше в репозиторий автоматически запускаются все тесты. Результаты доступны во вкладке Actions.
Отчеты: После каждого прогона генерируются подробные HTML-отчеты Allure и Playwright с шагами и скриншотами.
