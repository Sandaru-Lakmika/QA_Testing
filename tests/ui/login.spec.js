const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Login UI', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('logs in with valid credentials', async () => {
    await driver.get('http://localhost:3000/login.html');
    await driver.findElement(By.id('username')).sendKeys('admin');
    await driver.findElement(By.id('password')).sendKeys('password123');
    await driver.findElement(By.id('loginBtn')).click();

    await driver.wait(until.urlContains('items.html'), 5000);
    const title = await driver.getTitle();
    expect(title).to.equal('Items');
  });
});
