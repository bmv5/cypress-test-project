const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    //baseUrl: 'https://google.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
