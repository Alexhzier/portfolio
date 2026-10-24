const puppeteer = require('puppeteer-core');

async function inspectThesisRepo() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://github.com/Alexhzier/Social-Media-Listening-for-Mental-Health-Issues-in-SOCCSARGEN.', { waitUntil: 'networkidle2' });
  
  const repoData = await page.evaluate(() => {
    const files = Array.from(document.querySelectorAll('tr.react-directory-row td.react-directory-row-name-cell-large-screen a')).map(a => a.innerText.trim());
    const readme = document.querySelector('article.markdown-body')?.innerText || '';
    const langs = Array.from(document.querySelectorAll('li.d-inline')).map(li => li.innerText.trim());
    return { files, langs, readme: readme.slice(0, 3000) };
  });

  console.log(JSON.stringify(repoData, null, 2));
  await browser.close();
}

inspectThesisRepo().catch(console.error);
