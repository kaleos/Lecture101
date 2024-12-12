const {test, expect} = require('@playwright/test');
const {customtest} = require('../utils/test-base');
const {POManager} = require('../pages/POManager');
// Json->string->js object
const dataset = JSON.parse(JSON.stringify(require("../utils/endToEndTestingTestData.json")));  // Now dataSet has all the things needed from the endToEndTestingTestData.json file

for(const data of dataset)
{  
test(`Web Client App login for ${data.productName}`, async ({ page }) => {  // Now the test title will change dynamically and therefore 2 tests will be executed.
  const poManager = new POManager(page);   // This holds all the objects of the pages like LoginPage and DashboardPage.
  const products = page.locator(".card-body");
  const loginPage = await poManager.getLoginPage();  
  await loginPage.goTo();
  await loginPage.validLogin(data.userName,data.password);
  const dashboardPage = await poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(data.productName);  // Searches the product and adds it to the cart.
  await dashboardPage.navigateToCart();

  const cartPage = await poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(data.productName);
  await cartPage.Checkout();

  const ordersReviewPage = await poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("uni","United States");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = await poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

customtest.only("Web Client App login for", async ({ page, testDataForOrder}) => {  // Now the test title will change dynamically and therefore 2 tests will be executed.
  const poManager = new POManager(page);   // This holds all the objects of the pages like LoginPage and DashboardPage.
  const products = page.locator(".card-body");
  const loginPage = await poManager.getLoginPage();  
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.userName,testDataForOrder.password);
  const dashboardPage = await poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);  // Searches the product and adds it to the cart.
  await dashboardPage.navigateToCart();
  
  const cartPage = await poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();
})
}