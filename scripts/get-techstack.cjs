const puppeteer = require('puppeteer-core');

async function getTechStack() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://raw.githubusercontent.com/Alexhzier/Social-Media-Listening-for-Mental-Health-Issues-in-SOCCSARGEN./main/README.md', { waitUntil: 'networkidle2' });
  const content = await page.evaluate(() => document.body.innerText);
  const techStackIndex = content.indexOf('## Tech Stack');
  console.log(content.slice(techStackIndex, techStackIndex + 2500));
  await browser.close();
}

getTechStack().catch(console.error);
