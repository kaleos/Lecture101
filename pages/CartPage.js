const {test, expect} = require('@playwright/test');

class CartPage
{
  constructor(page)
  {
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator('//*[text()="Checkout"]');
  }
  
  async VerifyProductIsDisplayed(productName)
  {
    await this.cartProducts.waitFor();  // Wait until the li tag is displayed on the page, but starting with the parent which is div for the cart section.
    const productLocator = this.getProductLocator(productName);
    const bool = await productLocator.isVisible(); // Verifies the locator is visible on the page. Since isVisible is an asynchronous method it needs to be awaited.
    expect(bool).toBeTruthy();
  }

  async Checkout()
  {
    await this.checkout.click(); // Clicks on the checkout button.
  }

  async getProductLocator(productName)
  {
    return this.page.locator("h3:has-text('"+productName+"')");  //This will look only for elements with an h3 tag and that is why it will find adidas original in the cart instead of the homepage.
  }
}
module.exports = {CartPage};