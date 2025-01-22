const playwright = require("@playwright/test"); // The playwright keyword helps generate a browser object.
const { POManager } = require("../../pages/POManager");
const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");

Before(async function () {
  this.browser = await playwright.chromium.launch({ headless: false });
  const context = await this.browser.newContext();
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});

BeforeStep(function () {
  // This hook will be executed before all steps in a scenario with tag @
});

AfterStep(async function ({result}) {
  if (result.status === Status.FAILED) 
  {
    await this.page.screenshot({path: `screenshot-${Date.now()}.png`});
  }
});

After(async function () {
  await this.browser.close();
  console.log("Browser closed");
});
