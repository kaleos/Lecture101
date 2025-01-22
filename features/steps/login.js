const { Given, When, Then } = require('@cucumber/cucumber');
const {POManager} = require('../../pages/POManager');
const {expect} = require('@playwright/test');
const playwright = require('@playwright/test');  // The playwright keyword helps generate a browser object.

Given('The user logs in to the Ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (username, password) {
  const products = this.page.locator(".card-body");
  const loginPage = await this.poManager.getLoginPage();  
  await loginPage.goTo();
  await loginPage.validLogin(username, password);
});

When('Add {string} to cart', async function (productName) {
  this.dashboardPage = await this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAddCart(productName);
  await this.dashboardPage.navigateToCart();
});

Then('The item {string} is displayed in the cart', async function (productName) {
  const cartPage = await this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
});

When('Enter valid details and place the order', async function () {
  const ordersReviewPage = await this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("uni","United States");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
});

Then('The order is displayed in the order history', async function () {
  this.dashboardPage.navigateToOrders();
  const ordersHistoryPage = await this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

Given('The user logs in to the Ecommerce2 application with {string} and {string}', async function (username, password) {
  const userName = this.page.locator('//input[@id="username"]');
  const signIn = this.page.locator('//input[@id="signInBtn"]');
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await this.page.title());
  await userName.fill(username);
  await this.page.locator('//input[@id="password"]').fill(password);
  await signIn.click();
});

Then('Verify error message is displayed', async function () {
  //console.log(await this.page.locator("[style*='block']").textContent());  // This locator method will wait for the error message.
  await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
})
