const { test, expect, request } = require("playwright/test");                                         // request is needed for the API testing section.
const loginPayLoad = { userEmail: "kaleos31@gmail.com", userPassword: "sonata666" };                  // This is captured in a variable. It is coming from the Network tab, then Payload.
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6581ca979fd99c85e8ee7faf" }] }; // This is captured in a variable. It is coming from the Network tab, then Payload after adding an item to cart and checkout.
const { APiUtils } = require('../utils/APiUtils');

let response;

test.beforeAll(async () => {                                       // beforeAll will execute once before all tests are executed.
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);
});

// Create order is successful
test('Place the order', async ({ page }) => {
    page.addInitScript(value => {                       // The function addInitScript is evaluated for a given scenario.
        window.localStorage.setItem('token', value);    // value comes from value from the line above.
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");       // Instead of going straight to the login screen, now it will bypass and go the dashboard since we are using API.
    await page.locator("button[routerlink*='myorders']").click();   // Clicks on Orders button on top.
    await page.locator("//table").waitFor();                        // To make sure the table loads first before grabbing everything from it.

    const rows = await page.locator("//tr[contains(@class, 'ng-star-inserted')]");   // Grabs all the rows from the Orders screen.
    for (let i = 0; i < await rows.count(); ++i) {                                   // Similar loop but this time with await and .count                  
        const rowOrderId = await rows.nth(i).locator("th").textContent();            // th is the child of the parent tr for all the rows.
        if (response.orderId.includes(rowOrderId)) {                                 // This is asking if orderId on line 26 matches rowOrderId
            await rows.nth(i).locator("button").first().click();                     // The await rows.nth(i) is for the entire row, then button tag for that row alone which is the first button View.
            break;
        }
    }

    const orderIdDetails = await page.locator("//div[contains(@class, 'col-text')]").textContent();   // This is for the order id only.
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();                                   // The orginal ID from line 26 matching orderIdDetails from line 34.
});
// Verify if order created is showing in history page.