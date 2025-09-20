const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

const BASE = process.env.WEB_URL || 'http://localhost:3000';

describe('Add Item UI', function () {
  this.timeout(60000);
  let driver;

  before(async () => {
    const options = new chrome.Options()
      .addArguments('--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    // login first
    await driver.get(`${BASE}/login.html`);
    await driver.findElement(By.id('username')).sendKeys('admin');
    await driver.findElement(By.id('password')).sendKeys('password123');
    await driver.findElement(By.id('loginBtn')).click();
    await driver.wait(until.urlContains('items.html'), 10000);
  });

  after(async () => { if (driver) await driver.quit(); });

  it('adds a new item and shows it in the list', async () => {
    // we should already be on items.html after login
    await driver.wait(until.elementLocated(By.id('itemName')), 10000);

    await driver.findElement(By.id('itemName')).sendKeys('Bread');
    await driver.findElement(By.id('addBtn')).click();

    // wait until "Bread" appears in the list
    await driver.wait(async () => {
      const lis = await driver.findElements(By.css('#list li'));
      for (const li of lis) {
        if ((await li.getText()) === 'Bread') return true;
      }
      return false;
    }, 10000);

    const lis = await driver.findElements(By.css('#list li'));
    const texts = await Promise.all(lis.map(el => el.getText()));
    expect(texts).to.include('Bread');
  });
});
