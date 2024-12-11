const { test, expect } = require('@playwright/test');
//const {customTest} = require("../utils/test-base");
const {POManager} = require('../pages/POManager');
const dataset = JSON.parse(JSON.stringify(require("../utils/endToEndTestingTestData.json")));  // Now dataSet has all the things needed from the endToEndTestingTestData.json file
// Json->string->js object

test("Web Client App login for", async ({ page }) => {  // Now the test title will change dynamically and therefore 2 tests will be executed.
  const poManager = new POManager(page);   // This holds all the objects of the pages like LoginPage and DashboardPage.
  //const userName = "kaleos31@gmail.com";
  //const password = "sonata666"
  //const productName = "ADIDAS ORIGINAL";
  const products = page.locator(".card-body");
  const loginPage = await poManager.getLoginPage();  
  await loginPage.goTo();
  await loginPage.validLogin(dataset.userName,dataset.password);
  const dashboardPage = await poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(dataset.productName);  // Searches the product and adds it to the cart.
  await dashboardPage.navigateToCart();

  const cartPage = await poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(dataset.productName);
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
