class DashboardPage {

  constructor(page)
  {
    this.page = page;
    this.products = page.locator(".card-body");            // Grabs all elements from each product.
    this.productsText = page.locator(".card-body b");     // Grabs only the title element from each product.
    this.cart = page.locator("[routerlink*='cart']");     // Element for the cart.
    this.orders = page.locator("button[routerlink*='myorders']");
  }

  async searchProductAddCart(productName)
  {
    const titles = await this.productsText.allTextContents();  // This is all titles of the products.
    console.log(titles); 
    const count = await this.products.count();   // This will return the number of elements matching the selector <.card-body b> If this is coming from an array it will give the count. In this case it is an array.
    for (let i = 0; i < count; ++i) {            // This is a for loop which is needed in this case since we have an array.
        if (await this.products.nth(i).locator("b").textContent() === productName) {
           //add to cart
          await this.products.nth(i).locator("text= Add To Cart").click();
          break;
        }
    }
  }

  async navigateToOrders()
  {
    await this.orders.click();
  }

  async navigateToCart()
  {
    await this.cart.click();
  }
}
module.exports = {DashboardPage};