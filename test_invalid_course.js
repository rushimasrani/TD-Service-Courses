import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/courses/does-not-exist', { waitUntil: 'networkidle2' });
  const content = await page.content();
  console.log("Has Course not found:", content.includes("Course not found"));
  await browser.close();
})();
