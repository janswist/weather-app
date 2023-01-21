const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: 'http://127.0.0.1:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
