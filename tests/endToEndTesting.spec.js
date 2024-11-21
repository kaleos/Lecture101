const { test, expect } = require('@playwright/test');
const {POManager} = require('../pages/POManager');
// Goal is to get to adidas original and add it to the cart

test('@Web Client App login', async ({ page }) => {
  const poManager = new POManager(page);                  // This holds all the objects of the pages like LoginPage and DashboardPage.
  const userName = "kaleos31@gmail.com";
  const password = "sonata666"
  const productName = 'ADIDAS ORIGINAL';
  const products = page.locator(".card-body");
  const loginPage = await poManager.getLoginPage();             // Holding CTRL and clicking on the method goes to the function in POManager.js file proving they are connected properly.   
  await loginPage.goTo();                                 // This comes from the LoginPage.js file
  await loginPage.validLogin(userName, password);
  const dashboardPage = await poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(productName);  // Searches the product and adds it to the cart.
  await dashboardPage.navigateToCart();

  const cartPage = await poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();

  const ordersReviewPage = await poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("uni","United");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = await poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
