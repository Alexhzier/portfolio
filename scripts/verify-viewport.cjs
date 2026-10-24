const puppeteer = require('puppeteer-core');
const path = require('path');

async function testViewport() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  const viewports = [
    { name: 'iPhone SE (375px)', width: 375, height: 667 },
    { name: 'iPhone 14 / modern mobile (390px)', width: 390, height: 844 },
    { name: 'Android compact (360px)', width: 360, height: 800 },
    { name: 'Desktop HD (1440px)', width: 1440, height: 900 }
  ];

  const results = [];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle0' });

    const overflowInfo = await page.evaluate(() => {
      const docWidth = document.documentElement.offsetWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const windowWidth = window.innerWidth;
      
      const overflowingElements = [];
      const all = document.querySelectorAll('*');
      for (const el of all) {
        const rect = el.getBoundingClientRect();
        if (rect.right > windowWidth + 1.5) { // subpixel threshold
          overflowingElements.push({
            tagName: el.tagName,
            className: el.className ? String(el.className).slice(0, 50) : '',
            id: el.id,
            right: rect.right,
            width: rect.width
          });
        }
      }

      return {
        docWidth,
        scrollWidth,
        windowWidth,
        hasHorizontalScroll: scrollWidth > windowWidth,
        overflowCount: overflowingElements.length,
        overflowingElements: overflowingElements.slice(0, 5)
      };
    });

    results.push({
      viewport: vp.name,
      ...overflowInfo
    });
  }

  const artifactDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\0ff79221-dc98-4dbc-9a6b-8caddafe8f82';
  await page.setViewport({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(artifactDir, 'mobile-viewport.png'), fullPage: false });

  await page.setViewport({ width: 1440, height: 900 });
  await page.screenshot({ path: path.join(artifactDir, 'desktop-viewport.png'), fullPage: false });

  await browser.close();

  console.log('--- TEST RESULTS ---');
  console.log(JSON.stringify(results, null, 2));
}

testViewport().catch(err => {
  console.error(err);
  process.exit(1);
});
