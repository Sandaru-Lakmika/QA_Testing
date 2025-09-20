const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const BASE = process.env.WEB_URL || 'http://localhost:3000';
const tmpProfile = path.join(os.tmpdir(), `chrome-prof-${crypto.randomBytes(6).toString('hex')}`);

describe('Login UI', function () {
  this.timeout(60000);
  let driver;

  before(async () => {
    const options = new chrome.Options().addArguments(
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      `--user-data-dir=${tmpProfile}`,
      '--remote-debugging-port=0'
    );
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });

  after(async () => { if (driver) await driver.quit(); });

  it('logs in with valid credentials', async () => {
    await driver.get(`${BASE}/login.html`);
    await driver.findElement(By.id('username')).sendKeys('admin');
    await driver.findElement(By.id('password')).sendKeys('password123');
    await driver.findElement(By.id('loginBtn')).click();

    await driver.wait(until.urlContains('items.html'), 10000);
    const title = await driver.getTitle();
    expect(title).to.equal('Items');
  });
});
