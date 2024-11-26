const { defineConfig } = require("cypress");
require("dotenv").config({
  path: `.env.${process.env.STAGE_ENV || "development"}`,
});

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.REACT_APP_POLICYENGINE_DOMAIN,
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/tests/**/*.cy.js",
  },
  setupNodeEvents(on, config) {
    on("task", {
      log(message) {
        console.log(message);
        return null;
      },
    });
  },
});
