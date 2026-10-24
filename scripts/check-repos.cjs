const puppeteer = require('puppeteer-core');

async function checkRepos() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://github.com/Alexhzier?tab=repositories', { waitUntil: 'networkidle2' });
  
  const repos = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h3 a')).map(a => ({
      name: a.innerText.trim(),
      href: a.href
    }));
  });

  console.log(JSON.stringify(repos, null, 2));
  await browser.close();
}

checkRepos().catch(console.error);
