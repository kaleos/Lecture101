
const { test, expect } = require('@playwright/test');

test.skip('Launch the practice page', async({page})=> {
  await page.goto("https://rahulshettyacademy.com/client");
  const userName = page.locator('//input[@id="userEmail"]')
  const password = page.locator('//input[@id="userPassword"]')
  const signIn = page.locator('//input[@id="login"]')
  const cardTitles = page.locator(".card-body b");
  await userName.fill("kaleos31@gmail.com");
  await password.fill("sonata666");
  await signIn.click();
  //await page.waitForLoadState('networkidle')  // networkidle will wait until the network comes to an idle state. Needed to make sure all network calls have been made. In case networkidle doesn't work use waitFor below as a substitute.
  await page.locator(".card-body b").first().waitFor();  // first will look for the 1st element or last can be used for the last.
  console.log(await cardTitles.nth(0).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);   
})