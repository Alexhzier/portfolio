const puppeteer = require('puppeteer-core');
const path = require('path');

async function captureThesis() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const tempPath = path.join(process.env.TEMP, 'thesis-repo', 'index.html');
  const fileUrl = 'file:///' + tempPath.replace(/\\/g, '/');
  console.log('Navigating to:', fileUrl);

  await page.goto(fileUrl, { waitUntil: 'networkidle2', timeout: 15000 }).catch(e => console.log('goto err:', e.message));

  await new Promise(r => setTimeout(r, 2000));

  const dest = path.join(__dirname, '..', 'public', 'projects', 'social-media-listening.png');
  await page.screenshot({ path: dest, fullPage: false });
  console.log('Saved genuine thesis screenshot to:', dest);

  await browser.close();
}

captureThesis().catch(console.error);
