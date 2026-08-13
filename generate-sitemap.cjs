const fs = require('fs');

const DOMAIN = 'https://www.techdefends.com';

const staticRoutes = [
  '/',
  '/about',
  '/contact',
  '/careers',
  '/trainings',
  '/privacy-policy',
  '/case-studies',
  '/resources',
  '/services/vapt',
  '/services/managed-soc',
  '/services/microsoft-365',
  '/services/network-security',
  '/industries/financial-services',
  '/industries/ca-accounting-firms',
  '/industries/it-companies',
  '/industries/smes-startups',
  '/industries/healthcare',
];

// If there's a dynamic constants.ts, we could import it, but we can just parse it or read src/data/content.ts
// For this script, we'll extract slugs from src/data/content.ts
let caseStudySlugs = [];
let resourceSlugs = [];

try {
  const content = fs.readFileSync('data/content.ts', 'utf8');
  
  const csMatch = content.match(/slug:\s*'([^']+)'/g);
  if (csMatch) {
    caseStudySlugs = csMatch.filter(m => !m.includes('what-is-vapt') && !m.includes('how-to-improve') && !m.includes('how-to-start')).map(s => s.replace("slug: '", "").replace("'", ""));
  }
} catch (e) {
  console.log("Error reading content file for slugs:", e);
}

// Since regex parsing is brittle, I'll just hardcode the known slugs we just created to be safe, or just run a ts-node script.
const knownCsSlugs = [
  'financial-services-web-application-security-assessment',
  'healthcare-provider-network-security-assessment'
];

const knownResSlugs = [
  'what-is-vapt-why-businesses-need-it',
  'how-to-improve-microsoft-365-security',
  'how-to-start-a-career-in-cybersecurity'
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const addUrl = (path, priority) => {
  xml += `  <url>\n    <loc>${DOMAIN}${path}</loc>\n    <priority>${priority}</priority>\n  </url>\n`;
};

staticRoutes.forEach(route => {
  const priority = route === '/' ? '1.0' : '0.8';
  addUrl(route, priority);
});

knownCsSlugs.forEach(slug => {
  addUrl(`/case-studies/${slug}`, '0.7');
});

knownResSlugs.forEach(slug => {
  addUrl(`/resources/${slug}`, '0.7');
});

xml += `</urlset>`;

fs.writeFileSync('public/sitemap.xml', xml);
console.log("Generated public/sitemap.xml");

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;
fs.writeFileSync('public/robots.txt', robotsTxt);
console.log("Generated public/robots.txt");
