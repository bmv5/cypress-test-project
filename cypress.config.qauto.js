const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto.forstudy.space", // Вказуємо базовий URL
    env: {
      username: "guest",
      password: "welcome2qauto"
    }
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/qauto", // Директорія для звітів
    overwrite: false,
    html: true,  // Генерувати HTML-звіт
    json: true,  // Генерувати JSON-звіт
    charts: true // Додавати графіки в звіт
  }
});
