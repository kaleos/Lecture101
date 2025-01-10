class OrdersHistoryPage
{
constructor(page) {
  this.page = page;
  this.ordersTable = page.locator("//table");  // Locator for entire table.
  this.rows = page.locator("//tr[contains(@class, 'ng-star-inserted')]");  // All the rows from the Orders screen.
  this.orderdIdDetails =page.locator("//div[contains(@class, 'col-text')]");  // This is for the order id only after clicking on the View button.
}

async searchOrderAndSelect(orderId) {

await this.ordersTable.waitFor();
for(let i=0; i<await this.rows.count(); ++i)
{
    const rowOrderId = await this.rows.nth(i).locator("th").textContent();  // th is the child of the parent tr for all the rows.
    if (orderId.includes(rowOrderId))
    {
      await this.rows.nth(i).locator("button").first().click();  // The await rows.nth(i) is for the entire row, then button tag for that row alone which is the first button View.
      break;
    }
  }
}

async getOrderId() {
    return await this.orderdIdDetails.textContent();
  }

}
module.exports = {OrdersHistoryPage};