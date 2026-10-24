const puppeteer = require('puppeteer-core');

async function getFullReadme() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://raw.githubusercontent.com/Alexhzier/Social-Media-Listening-for-Mental-Health-Issues-in-SOCCSARGEN./main/README.md', { waitUntil: 'networkidle2' });
  const content = await page.evaluate(() => document.body.innerText);
  console.log(content.slice(0, 4000));
  await browser.close();
}

getFullReadme().catch(console.error);
