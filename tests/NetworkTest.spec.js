const { test, expect, request } = require("playwright/test");                         // request is needed for the API testing section.
const loginPayLoad = {userEmail: "kaleos31@gmail.com", userPassword: "sonata666"}     // This is captured in a variable. It is coming from the Network tab, then Payload.
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6581ca979fd99c85e8ee7faf"}]}     // This is captured in a variable. It is coming from the Network tab, then Payload after adding an item to cart and checkout.
const {APiUtils} = require('../utils/APiUtils');
const fakePayLoadOrders = {data:[],messages:"No Orders"};
//const noOrdersMessage = page.locator("//div[contains(@class, 'mt-4')]");

let response;
test.beforeAll( async()=>    // beforeAll will execute once before all tests are executed.
{
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);
});

// Create order is successful
test('Place the order', async ({ page }) => {
  page.addInitScript(value => {                       // The function addInitScript is evaluated for a given scenario.
    window.localStorage.setItem('token', value);      // value comes from value from the line above.
  },  response.token );   
  await page.goto("https://rahulshettyacademy.com/client");   // Instead of going straight to the login screen, now it will bypass and go the dashboard since we are using API.
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/668c6072ae2afd4c0b1cac14", // This comes from the Network tab in Chrome under the Headers based on the request made. 1st what needs to be routed and 2nd the how.
    async route =>
    {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body,
        }
      )
      // Intercepting response - API response->{playwright fakeresponse} ->browser-render data on front end
    }
  )  

  await page.locator("button[routerlink*='myorders']").click();                     // Clicks on Orders button on top.
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/668c6072ae2afd4c0b1cac14")
  console.log(await page.locator(".mt-4").textContent());
});
