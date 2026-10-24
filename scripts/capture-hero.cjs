const puppeteer = require('puppeteer-core');
const path = require('path');

async function captureHero() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3003', { waitUntil: 'networkidle0' });

  await new Promise(r => setTimeout(r, 1500));

  const heroElement = await page.$('#hero');
  if (heroElement) {
    const dest = path.join('C:', 'Users', 'admin', '.gemini', 'antigravity', 'brain', '0ff79221-dc98-4dbc-9a6b-8caddafe8f82', 'hero-3d-preview.png');
    await heroElement.screenshot({ path: dest });
    console.log('Saved hero-3d-preview.png to', dest);
  }

  await browser.close();
}

captureHero().catch(console.error);
