const { test, expect } = require("playwright/test");
// The goal here is to validate if the Hide/Show Example field is visible and then hidden on the page.
// Also to validate the Google page and take a screenshot of the page.

//test.describe.configure({mode:'parallel'});     // This will run the tests in parallel as opposed to sequentially.
//test.describe.configure({mode:'serial'});       // This will run the tests sequentially as opposed to parallel. Also seems like this is the default mode at this point.

test("@Functional Popup validations", async({page}) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  const confirmBtn = page.locator("//input[@id='confirmbtn']");
  const mouseHoverBtn = page.locator("//button[@id='mousehover']");
  await expect(page.locator("//input[@id='displayed-text']")).toBeVisible();    // At this stage the field Hide/Show Example is visible.
  await page.locator("//input[@id='hide-textbox']").click();                    // Clicking on the Hide button makes the above field hidden.
  await expect(page.locator("//input[@id='displayed-text']")).toBeHidden();     // This validates if the field from line 8 is hidden.
  page.on('dialog', dialog => dialog.accept())                                  // page.on helps to listen to events and an event has occurred, the system says there is a dialog box there. Clicks Accept or Dismiss.
  await confirmBtn.click();
  await mouseHoverBtn.hover();                                                  // hover is a function to hover over an item on a page.
  
  // Interaction with iFrame by switching with frameLocator function
  const framesPage = page.frameLocator("#courses-iframe");                      // The frameLocator function will switch to the iFrame, along with the id found in the DOM. The courses-iframe is for the entire iFrame.
  await framesPage.locator("li a[href*='lifetime-access']:visible").click()     // Since this locator finds 2 elements, the visible one is only getting clicked.
  const textCheck = await framesPage.locator(".text h2").textContent();         // .text h2 is a css, the class name is text and h2 is the tag needed.
  console.log(textCheck.split(" ")[1]);                                         // To retieve the text " Happy Subscibers!" we use the spaces therefore space in " " and the first index in the array.
})

test('@UI Visual', async({page}) => {
  await page.goto("https://www.google.com/");
  expect(await page.screenshot()).toMatchSnapshot('landing.png');              // Screenshot here will take a screenshot of the entire page, then compare it to make sure the screenshot landing.png matches the initial screenshot of the page.
})

test("@UI Screenshot & visual comparaison", async({page}) => {
  const hideShowField = page.locator("//input[@id='displayed-text']");

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  expect (hideShowField).toBeVisible();
  await (hideShowField).screenshot({path: 'partialScreenshot.png'})            // This takes a screenshot of only the locator itself and not the whole screen.
  await page.locator("//input[@id='hide-textbox']").click();
  await page.screenshot({path: 'screenshot.png'});                             // This takes a screenshot of the entire screen and needs a path to put it somewhere. Note: The playwright.config.js file already has a setup for taking screenshots.
  expect(hideShowField).toBeHidden();
});
