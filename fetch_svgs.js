import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const urls = [
  { name: 'palo-alto-networks.svg', url: 'https://cdn.worldvectorlogo.com/logos/palo-alto-networks.svg' },
  { name: 'bitdefender.svg', url: 'https://cdn.worldvectorlogo.com/logos/bitdefender-1.svg' },
  { name: 'barracuda.svg', url: 'https://cdn.worldvectorlogo.com/logos/barracuda-networks.svg' },
  { name: 'safetica.svg', url: 'https://cdn.worldvectorlogo.com/logos/safetica.svg' },
  { name: 'check-point.svg', url: 'https://cdn.worldvectorlogo.com/logos/check-point-software-technologies-1.svg' }
];

async function run() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  for (const item of urls) {
    try {
      console.log(`Fetching ${item.url}...`);
      await page.goto(item.url, { waitUntil: 'networkidle0' });
      const content = await page.evaluate(() => document.documentElement.outerHTML);
      // Sometimes it wraps in <html><body><svg...
      const svgMatch = content.match(/<svg[\s\S]*?<\/svg>/i);
      if (svgMatch) {
        fs.writeFileSync(path.join('public/vendors', item.name), svgMatch[0]);
        console.log(`Saved ${item.name}`);
      } else {
        console.log(`No SVG found for ${item.name}`);
      }
    } catch (e) {
      console.log(`Error on ${item.name}: ${e.message}`);
    }
  }
  await browser.close();
}
run();
