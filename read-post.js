
const puppeteer = require('puppeteer');
//open puppeteer
//
const getPage = async () => {

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: false,
    slowMo: 100
  });

  const comment = async (link) => {
    const page = await browser.newPage();
    console.info('******** Loading Post Page ********\n\n');
    try {
      await page.goto(link, {
        timeout: 0,
      });

    } catch (e) {
      console.error('**** Error Commenting On Post ****\n\n', e);
    }
    await page.close();
  }

  const page = await browser.newPage();
  console.info('******** Loading Home Page ******** \n\n');
  try {
    await page.goto('https://www.giftalworld.com/', {
      timeout: 0,
    });
    //await page.waitForNavigation({timeout: 0,waitUntil:'load'});
  } catch (e) {
    console.error('**** Error Loading Home Page **** \n\n', e)
  }

  console.info('******** Extracting Post Links ********\n\n');
  try {
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.entry-content a'))
        .map(data => data.href);
    });
    console.log(links);
    for (let i of links) {
      await comment(i);
    }
  } catch (e) {
    console.error('**** Error Extracting Links ****\n\n', e);
  }
  //await page.close();

}

getPage();
//ONE thousand milliseconds = 1seconds
//0 seconds make 1 minute
//0 minutes make 1 hour
// 