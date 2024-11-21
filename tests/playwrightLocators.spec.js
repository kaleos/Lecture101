import { test } from '@playwright/test';

test('Playwright Special locators', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();       // getByLabel is specific to Playwright. It takes from the label in the DOM.
  await page.getByLabel("Employed").click();
  await page.getByLabel("Gender").selectOption("Male");
  await page.getByPlaceholder("Password").fill("abc123");
  await page.getByRole("button", {name: 'Submit'}).click();   // After using <button> then use a second argument, in this case it is Submit. In this case button looks for all buttons on the page.
  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  await page.getByRole("link", {name: 'Shop'}).click();     // Same as line 10 with <submit>, but with Shop this time.
  await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();    // app-card is css. This is almost the same as line 10.

});