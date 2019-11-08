const puppeteer = require('puppeteer');
(async () => {
  let links;
  let browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
    slowMo: 100
  });

  const login = () => new Promise(async (resolve, reject) => {
    try {
      const page = await browser.newPage();
      await page.goto('https://www.giftalworld.com/giftal-login/', {
        timeout: 0,
      });

      await page.type('input#userusername', 'joeswag joshua')
      await page.type('input#userpassword', 'jayfund190');
      await page.click('input#remember');
      await page.click('input[name="login"]');
      await page.close();

      resolve();
    } catch (err) {
      console.log('Error occured when trying to login \n', err);
      reject();
    }

  });

  const getHomepageLinks = () => new Promise(async (resolve, reject) => {
    try {
      const page = await browser.newPage();
      await page.goto('https://www.giftalworld.com', {
        timeout: 0,
      });

      links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.entry-content a'))
          .map(data => data.href);
      });
      resolve();

    } catch (err) {
      console.log('Error occured when trying to get home page links \n', err);
      reject();
    }
  });

  const visitLinks = () => new Promise(async (resolve, reject) => {
    try {
      for (let i of links) {
        const page = await browser.newPage();
        await page.goto(i, {
          timeout: 0,
        });
        await page.close();
      }
      resolve();

    } catch (err) {
      console.log('error occured', err);
      reject();
    }
  });

  const shareSponsored = () => new Promise(async (resolve, reject) => {
    try {
      const page = await browser.newPage();
      await page.goto('http://www.giftalworld.com/category/sponsored-post/', {
        timeout: 0,
      });
      const link = await page.evaluate(() => Array.from(document.querySelectorAll('.entry-content a'))
        .map(data => data.href));
      await page.goto(link[0], {
        timeout: 0,
      });
      await page.click('p a');
      await page.close();

      resolve();

    } catch (err) {
      console.log('error occured', err);
      reject();
    }
  });

  const readAll = () => new Promise(async (resolve, reject) => {
    try {
      let count = 1;
      while (count <= 360) {
        count++;
        const page = await browser.newPage();
        await page.goto(`https://www.giftalworld.com/page/${count}/`, {
          timeout: 0,
        });

        console.log('extracting links');
        const link = await page.evaluate(() => Array.from(document.querySelectorAll('.entry-content a'))
          .map(data => data.href));

        for (let i of link) {
          console.log('viewing posts');
          const page2 = await browser.newPage();
          await page2.goto(i, {
            timeout: 0,
          });
          await page2.close();
        }
        await page.close();
      }
      resolve();

    } catch (err) {
      console.log('error occured', err);
      reject();
    }
  });


  await login();
  //await getHomepageLinks();
  //await visitLinks();
  await readAll();
  await browser.close();

})();
