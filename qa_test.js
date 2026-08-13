import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const baseUrl = 'http://localhost:3000';
  
  const courses = [
    'aws-solution-architect',
    'devops-master-program',
    'network-engineering-diploma',
    'ai-powered-cyber-security',
    'ms-office-365'
  ];
  
  console.log("=== 1. Testing Valid Courses & SEO ===");
  for (const slug of courses) {
    const page = await browser.newPage();
    const url = `${baseUrl}/courses/${slug}`;
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const title = await page.title();
    const canonical = await page.$eval('link[rel="canonical"]', el => el.href).catch(() => 'Missing');
    const metaDesc = await page.$eval('meta[name="description"]', el => el.content).catch(() => 'Missing');
    const jsonLd = await page.$$eval('script[type="application/ld+json"]', els => els.map(e => e.innerText));
    const h1 = await page.$eval('h1', el => el.innerText).catch(() => 'Missing');
    
    console.log(`\nCourse: ${slug}`);
    console.log(`- Rendered H1: ${h1 !== 'Missing' ? 'Yes' : 'No'} (${h1.substring(0, 30)}...)`);
    console.log(`- Title: ${title}`);
    console.log(`- Canonical: ${canonical}`);
    console.log(`- Meta Desc: ${metaDesc.substring(0, 30)}...`);
    console.log(`- JSON-LD present: ${jsonLd.length > 0}`);
    if (jsonLd.length > 0) {
      try {
        const parsed = JSON.parse(jsonLd[0]);
        console.log(`  - Valid JSON: Yes (Type: ${Array.isArray(parsed) ? parsed.map(p => p['@type']).join(', ') : parsed['@type']})`);
      } catch (e) {
        console.log(`  - Valid JSON: No (${e.message})`);
      }
    }
    await page.close();
  }

  console.log("\n=== 2. Testing Invalid Course ===");
  const invalidPage = await browser.newPage();
  await invalidPage.goto(`${baseUrl}/courses/does-not-exist`, { waitUntil: 'networkidle2' });
  const notFoundText = await invalidPage.evaluate(() => document.body.innerText.includes('Course not found'));
  console.log(`- "Course not found" text present: ${notFoundText}`);
  await invalidPage.close();

  console.log("\n=== 3. Testing Enquiry Flow ===");
  const enquiryPage = await browser.newPage();
  await enquiryPage.goto(`${baseUrl}/courses/aws-solution-architect`, { waitUntil: 'networkidle2' });
  
  // Click Quick Inquiry
  await enquiryPage.click('.fixed.bottom-6.right-6');
  await enquiryPage.waitForSelector('form', { visible: true });
  console.log("- Modal opened successfully");
  
  // Fill form
  await enquiryPage.type('input[type="text"]', 'Test User');
  await enquiryPage.type('input[type="email"]', 'test@example.com');
  await enquiryPage.type('input[type="tel"]', '+1234567890');
  
  // Submit and wait for result
  await enquiryPage.click('form button[type="submit"]');
  console.log("- Form submitted, waiting for response...");
  
  try {
    await enquiryPage.waitForSelector('.bg-emerald-50, .bg-rose-50', { timeout: 5000 });
    const resultText = await enquiryPage.evaluate(() => {
      const success = document.querySelector('.bg-emerald-50');
      const error = document.querySelector('.bg-rose-50');
      if (success) return 'Success: ' + success.innerText;
      if (error) return 'Error: ' + error.innerText;
      return 'Unknown';
    });
    console.log(`- Form Result: ${resultText.replace(/\n/g, ' ')}`);
  } catch (e) {
    console.log("- Form Result: Timed out waiting for response indicator");
  }
  
  await enquiryPage.close();
  await browser.close();
})();
