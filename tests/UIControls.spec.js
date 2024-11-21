
const { test, expect } = require('@playwright/test');

test('UI Controls dropdowns', async({page})=> {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator('//input[@id="username"]');
  const password = page.locator('//input[@id="password"]');
  const dropdown = page.locator('//select[@class="form-control"]');
  const userRadioBtn = page.locator('//span[contains(text(),"User")]');
  const termsCheckbox = page.locator('//input[@id="terms"]');
  const signIn = page.locator('//input[@id="signInBtn"]');
  const okayBtn = page.locator('//button[@id="okayBtn"]');
  const blinkingTxt = page.locator('[href*="documents-request"]');  // Green blinking text banner.

  await userRadioBtn.click();  // last is used to select the last radio button which is User.
  await okayBtn.click();
  await userName.fill("rahulshettyacademy");
  await password.fill("learning");
  await dropdown.selectOption("Teacher");  // selectOption is to select the name of the option given by the user.
  await termsCheckbox.click();
  await expect(page.locator('//input[@id="terms"]')).toBeChecked();
  await expect(page.locator('//span[contains(text(),"User")]')).toBeChecked();       // Asserts if the radio button is clicked, if it is not clicked it will fail.
  await expect(blinkingTxt).toHaveAttribute("class", "blinkingText");  // With the function toHaveAttribute the type and text is needed, in this case class and blinkingText from the DOM.
  await signIn.click();
  
  //console.log(await page.locator('//label[@class="customradio"]').last().isChecked());  // This is another way to assert if the radio button is clicked, it will return true or false.
  //await page.pause();                                                                   // To pause and play in order to see what is going on if needed.
})

// This section is about going to a different page, and since it doesn't stay on the same tab when clicking on the blinking text and opens a new tab, some changes have to be made.
test('Child windows handling', async ({browser})=>
{
  const context = await browser.newContext();  // A context is open for the original page.
  const page = await context.newPage();        // And in this session a new page is created.
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const blinkingTxt = page.locator('[href*="documents-request"]');

  const [newPage] = await Promise.all(               // Promise.all is a method that takes an iterable of promises and returns a single promise that resolves when all of the promises in the iterable have resolved. If another child window needs to be worked on then create a newPage2 in []
  [
    context.waitForEvent('page'),                    // Listen for any new page pending, rejected, fulfilled.
    await blinkingTxt.click(),
  ])
  
  const text = await newPage.locator(".red").textContent();   // Checks if the text is displayed with CSS locator. This is for the red text displayed in the middle of the page.
  const arrayText = text.split("@")                           // With only @ the left side of the array will be taken so 0 index and the right side of the array after the @ which its index is 1.
  const emailAddress = arrayText[1].split(" ")[0]                   // Since the right side after @ is needed <Please email us at mentor@rahulshettyacademy.com with below template to receive response> then 1 is used. With a split of empty space with zero to get rid of @
  console.log(emailAddress);
  await page.locator('//input[@id="username"]').fill(emailAddress); // This is to flip back to the parent window.
  //await page.pause();                                               // Since the screen is so fast pause is used here to see what is going on for the sake of testing.
  console.log(await page.locator('//input[@id="username"]').textContent());    // This is to actually see what text is being typed into the username field in the parent page.
})
