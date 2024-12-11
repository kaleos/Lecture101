const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  // Maximum time one test can run for .*/
  timeout: 100 * 1000,      // Originally was 10 * 100 but changed for longer time for debugging.
  expect: {

    timeout: 5000  // This is timeout for assertions, another good number could be 30000.
  },

  reporter: 'html',
  // Shared settings for all the projects below. See https://playwright.dev/doc
  use: {

    browserName : 'chromium',
    //browserName : 'firefox',
    //browserName : 'webkit',
    headless: false,
    //viewport: { width: 1280, height: 720 },
    screenshot: 'on',                // This will capture a screenshot for every action.
    trace: 'retain-on-failure'       // To collect the trace on every execution with complete log with details. Setting to 'on' for is for both passed and failed logs, but <retain-on-failure> is enough for only failed tests.
  },
};

module.exports = config;