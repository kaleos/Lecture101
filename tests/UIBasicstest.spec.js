
const { test, expect } = require('@playwright/test');

// browser after async is a global fixture and doesn't need to be declared on the top.
// Putting browser in curly brackets makes it recognizable as a playwright fixture.
// async works with await since JavaScript is asynchronous. Therefore it will wait until all steps are executed before moving to the next.

test('Browser Context Playwright test', async({browser})=> {                  
  const context = await browser.newContext();                                 // Page is initialized here before being used below, opens a new instance of the browser just like in incognito.
  const page = await context.newPage();                                       // context.newPage creates an actual page for automation

  const userName = page.locator('//input[@id="username"]');                   // The username is stored in a variable.
  const signIn = page.locator('//input[@id="signInBtn"]');                    // This signin is stored in a variable.
  const cardTitles = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("rahulshetty");                                         // This was already stored in a variable above.
  await page.locator('//input[@id="password"]').fill("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent());          // This locator method will wait for the error message.
  await expect(page.locator("[style*='block']")).toContainText('Incorrect');  // To assert use the same attribute as above and use partial text of the error message itself.
  await userName.fill("");                                                    // The blank double quotes will delete the existing content, in this case the wrong username that was entered.
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  console.log(await cardTitles.nth(0).textContent());                         // nth with 0 means that out of the 4 elements we want 0 which is the first element and get the name of the element.
  //console.log(await cardTitles.first().textContent());                      // first means that out of the 4 elements we want 0 which is the first element. (Same as above pretty much)
  const allTitles = await cardTitles.allTextContents();                       // allTitles is stored in a variable and allTextContents will grab all elements as opposed to only one like above.
  console.log(allTitles);                                                     // This returns all elements from allTitles
});

test('Page Playwright test', async({page})=> {
  await page.goto("https://www.google.com");
  //get title - assertion
  await expect(page).toHaveTitle("Google");
  console.log(await page.title());                                            // This is only needed if we need the title printed back to verify.
});