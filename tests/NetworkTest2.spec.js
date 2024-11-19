const { test } = require('@playwright/test');

test('Security test request intercept', async ({ page }) => {

  // Login and reach orders page
  await page.goto("https://rahulshettyacademy.com/client");
  const userName = page.locator('//input[@id="userEmail"]')
  const password = page.locator('//input[@id="userPassword"]')
  const signIn = page.locator('//input[@id="login"]')
  await userName.fill("kaleos31@gmail.com");
  await password.fill("sonata666");
  await signIn.click();
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();

  // Since the order itself will keep changing a wildcard is used at the end this symbol <*> 
  // the section with route is to intercept and the section with url has an order id from another item at the end.
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=672142c1ae2afd4c0bad3b6d' }));  // Comes from clicking the Orders button and then clicking the View button. Under the Network tab in Headers for the order ID.
  await page.locator("button:has-text('View')").first().click();
  await page.pause();
})