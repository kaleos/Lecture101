class LoginPage {

  constructor(page)
  {
    this.page = page;
    this.signInBtn = page.locator('//input[@id="login"]');
    this.userName = page.locator('//input[@id="userEmail"]');
    this.password = page.locator('//input[@id="userPassword"]');
  }

  async goTo()
  {
    await this.page.goto("https://rahulshettyacademy.com/client")
  }

  async validLogin(userName, password)    // This is a reusable utility for login, a method for valid login.
  {
    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.signInBtn.click();
    await this.page.waitForLoadState('networkidle');   // networkidle will wait until the network comes to an idle state. Needed to make sure all network calls have been made. In case networkidle doesn't work use waitFor below as a substitute.
  }
}

module.exports = {LoginPage};            // This makes it available to other files.