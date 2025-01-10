const {LoginPage} = require('./LoginPage');                  // This imports the class to use it in this file.
const {DashboardPage} = require('./DashboardPage');
const {OrdersHistoryPage} = require('./OrdersHistoryPage');
const {OrdersReviewPage} = require('./OrdersReviewPage');
const {CartPage} = require('./CartPage');

class POManager {

  constructor(page)
  {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    this.cartPage = new CartPage(this.page);
  }

  async getLoginPage() {
    return this.loginPage;
  }

  async getCartPage() {
    return this.cartPage;
  }

  async getDashboardPage() {
    return this.dashboardPage;
  }

  async getOrdersHistoryPage() {
    return this.ordersHistoryPage;
  }

  async getOrdersReviewPage() {
    return this.ordersReviewPage;
  }
}
module.exports = {POManager};