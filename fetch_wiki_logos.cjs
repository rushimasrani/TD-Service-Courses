const fs = require('fs');
const https = require('https');
const path = require('path');

const logos = [
  { name: 'check-point.svg', title: 'File:Check_Point_Software_Technologies_logo.svg' },
  { name: 'palo-alto-networks.svg', title: 'File:Palo_Alto_Networks_logo.svg' },
  { name: 'bitdefender.svg', title: 'File:Bitdefender_Logo.svg' },
  { name: 'safetica.svg', title: 'File:Safetica_Logo.svg' },
  { name: 'barracuda.svg', title: 'File:Barracuda_Networks_logo.svg' }
];

async function fetchWikiLogo(item) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&titles=${item.title}&format=json`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId === '-1') {
             console.log(`Not found: ${item.title}`);
             resolve();
             return;
          }
          const imageUrl = pages[pageId].imageinfo[0].url;
          console.log(`Downloading ${imageUrl} to ${item.name}`);
          
          https.get(imageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (imgRes) => {
            if (imgRes.statusCode === 200) {
              const file = fs.createWriteStream(path.join('public/vendors', item.name));
              imgRes.pipe(file);
              file.on('finish', () => {
                file.close();
                console.log(`Saved ${item.name}`);
                resolve();
              });
            } else {
              console.log(`Failed to download image for ${item.name}`);
              resolve();
            }
          });
        } catch (e) {
          console.log(`Error parsing JSON for ${item.title}: ${e}`);
          resolve();
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const item of logos) {
    await fetchWikiLogo(item);
  }
}

run();
