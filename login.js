const puppeteer = require('puppeteer');
//open puppeteer
const login = async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: false,
    slowMo: 100
  });

  try {
    console.info('\n******** Getting Login Page *********\n\n')
    await page.goto('https://www.giftalworld.com/giftal-login/', {
      timeout: 0,
    });

    //await page.waitForNavigation({ timeout: 0, waitUntil: 'load' });
  } catch (e) {
    console.error('**** Could Not Load Login Page ****\n\n', e)
  }

  try {
    await page.type('input#userusername', 'nocturnal')
    await page.type('input#userpassword', '36354887');
    await page.click('input#remember');
    await page.click('input[name="login"]');
  } catch (e) {
    console.error('**** Error signing ****\n\n')
  }
};

login();
