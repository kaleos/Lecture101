const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  // Maximum time one test can run for .*/
  timeout: 30 * 1000,   // Originally was 10 * 100 but changed for longer time for debugging.
  expect: {

    timeout: 30000,     // This is timeout for assertions, another good number could be 30000.
    retries: 2,         // Retries a test up to 5x if it fails.
    workers: 5,         // Number of workers to use for the test, basically the number of tests that can run in parallel.
  },

  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName : 'webkit',
        headless: false,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',                // This will capture a screenshot of errors only.
        video: 'retain-on-failure',       // Records video for each test, but deletes the passing tests afterwards.
        ignoreHttpsErrors: true,
        trace: 'retain-on-failure'       // To collect the trace on every execution with complete log with details. Setting to 'on' for is for both passed and failed logs, but <retain-on-failure> is enough for only failed tests.
        //...devices['iPhone 11']
      }
    },
    {
      name: "chrome",
      use: {
        browserName : 'chromium',
        headless: false,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        ignoreHttpsErrors: true,
        permissions: ['geolocation'],
        trace: 'retain-on-failure',
        //...devices['Galaxy S9+']
      }
    },
    {
      name: "firefox",
      use: {
        browserName : 'firefox',
        headless: false,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        ignoreHttpsErrors: true,
        trace: 'retain-on-failure'
      }
    }
    
  ]
  
};

module.exports = config;