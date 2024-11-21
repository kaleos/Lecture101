// test browser, cart-order, orderdetails, orderhistory
// Goal is to get to adidas original and add it to the cart
const { test, expect } = require('@playwright/test');
let webContext;

// This section is for login and is executed once since it is using the function beforeAll.
test.beforeAll(async({browser})=>
{
  const context = await browser.newContext()
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator('//input[@id="userEmail"]').fill("kaleos31@gmail.com");
  await page.locator('//input[@id="userPassword"]').fill("sonata666");
  await page.locator('//input[@id="login"]').click();
  await page.waitForLoadState('networkidle');        // networkidle will wait until the network comes to an idle state. Needed to make sure all network calls have been made. In case networkidle doesn't work use waitFor below as a substitute.
  await context.storageState({path: 'state.json'});
  webContext = await browser.newContext({storageState:'state.json'});
})

test('@Web Client App login', async () => {
  const email = "kaleos31@gmail.com";
  const productName = 'ADIDAS ORIGINAL';
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products = page.locator(".card-body");
  const selectCountry = page.locator("[placeholder*='Country']");
  const orderConfirmation = "Thankyou for the order."
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles); 
  const count = await products.count();

  for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
      }
  }

  // Navigate to the cart and verify the product is added
  await page.locator("[routerlink*='cart']").click();
  // await page.pause();
  await page.locator("div li").first().waitFor();     // Wait until the li tag is displayed on the page, but starting with the parent which is div for the cart section.
  const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();       //This will look only for elements with an h3 tag and that is why it will find adidas original in the cart instead of the homepage.
  expect(bool).toBeTruthy();

  // Checkout section
  await page.locator('//*[text()="Checkout"]').click();
  await selectCountry.pressSequentially("united", {delay:100});    // Fill won't work here since each letter has to be entered slowly, otherwise the auto fill will not work.
  const countryField = page.locator(".ta-results");                // Waits for the few country options with united to be displayed.
  await countryField.waitFor();
  const optionsCount = await countryField.locator("button").count();   // Page.locator is not needed since only the locators for .ta-results are needed for that section of the field results. And only looking for button for united.
  for(let i=0; i<optionsCount; ++i)
  {
    const text = await countryField.locator("button").nth(i).textContent();   // TextContent retrieves text content.
      if(text === " United States")                                     // The space is there before United because in the DOM there is also a space before it. Without it, it will fail.
      {
        await countryField.locator("button").nth(i).click();
        break;
      }
  }
  expect (page.locator("//div[contains(@class, 'user__name')]/label[@type='text']")).toHaveText(email);   // Assertion to check if email address is visible.
  await page.locator("//*[text()='Place Order ']").click();                                               // Clicks on Place Order button.
  await expect (page.locator("//h1[contains(@class, 'hero-primary')]")).toHaveText(orderConfirmation);
  //console.log(orderConfirmation);
  const orderID = await page.locator("//label[contains(@class, 'ng-star-inserted')]").textContent();  // textContent is needed to retrieve the order number from the page.
  console.log(orderID);

  // Check the orders tab to find the order number in the list and click the View button for that particular row.
  await page.locator("button[routerlink*='myorders']").click();                     // Clicks on Orders button on top.
  await page.locator("//table").waitFor();                                          // To make sure the table loads first before grabbing everything from it.
  const rows = await page.locator("//tr[contains(@class, 'ng-star-inserted')]");    // Grabs all the rows from the Orders screen.
  
  for(let i=0; i<await rows.count(); ++i)                                           // Similar loop but this time with await and .count
  {
      const rowOrderId = await rows.nth(i).locator("th").textContent();             // th is the child of the parent tr for all the rows.
      if (orderID.includes(rowOrderId))                                             // This is asking if orderID on line 63 matches rowOrderId 
      {
        await rows.nth(i).locator("button").first().click();                        // The await rows.nth(i) is for the entire row, then button tag for that row alone which is the first button View.
        break;
      }

  }
  const orderIdDetails = await page.locator("//div[contains(@class, 'col-text')]").textContent();   // This is for the order id only.
  expect(orderID.includes(orderIdDetails)).toBeTruthy();                                // The orginal ID from line 63 matching orderIdDetails from line 79.
});

// This test only 
test('Test case 2', async () => {
  const email = "kaleos31@gmail.com";
  const productName = 'ADIDAS ORIGINAL';
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products = page.locator(".card-body");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});