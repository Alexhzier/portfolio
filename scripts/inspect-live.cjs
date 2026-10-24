const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function inspectLive() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const outputDir = path.join(__dirname, '..', 'public', 'projects');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 1. AI Study Tracker
  console.log('Inspecting AI Study Tracker...');
  try {
    await page.goto('https://ai-study-tracker-omega.vercel.app/', { waitUntil: 'networkidle2', timeout: 30000 });
    const studyTitle = await page.title();
    const studyInfo = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => h.innerText.trim()).filter(Boolean);
      const buttons = Array.from(document.querySelectorAll('button, a')).map(b => b.innerText.trim()).filter(Boolean);
      const textSample = document.body.innerText.slice(0, 1500);
      return { headings, buttons: buttons.slice(0, 20), textSample };
    });
    console.log('AI Study Tracker Title:', studyTitle);
    console.log('AI Study Tracker Headings:', studyInfo.headings);
    console.log('AI Study Tracker Buttons:', studyInfo.buttons);
    console.log('AI Study Tracker Text:', studyInfo.textSample);

    const studyScreenshotPath = path.join(outputDir, 'ai-study-tracker.png');
    await page.screenshot({ path: studyScreenshotPath, fullPage: false });
    console.log('Saved screenshot to:', studyScreenshotPath);
  } catch (err) {
    console.error('Error inspecting AI Study Tracker:', err.message);
  }

  // 2. Penbrae & Co.
  console.log('\nInspecting Penbrae & Co...');
  try {
    await page.goto('https://penbrae-and-co.vercel.app/', { waitUntil: 'networkidle2', timeout: 30000 });
    const penbraeTitle = await page.title();
    const penbraeInfo = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map(h => h.innerText.trim()).filter(Boolean);
      const textSample = document.body.innerText.slice(0, 1000);
      return { headings, textSample };
    });
    console.log('Penbrae Title:', penbraeTitle);
    console.log('Penbrae Headings:', penbraeInfo.headings);

    const penbraeScreenshotPath = path.join(outputDir, 'penbrae-and-co.png');
    await page.screenshot({ path: penbraeScreenshotPath, fullPage: false });
    console.log('Saved screenshot to:', penbraeScreenshotPath);
  } catch (err) {
    console.error('Error inspecting Penbrae & Co:', err.message);
  }

  await browser.close();
}

inspectLive().catch(err => {
  console.error(err);
  process.exit(1);
});
