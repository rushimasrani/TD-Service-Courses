import fs from 'fs';
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync('dist/assets/' + file, 'utf8');
  // Look for something.S or [a-zA-Z_$].S
  const matches = [...content.matchAll(/.{0,20}[a-zA-Z_$0-9]+\.S\b.{0,20}/g)];
  if (matches.length > 0) {
    const unique = [...new Set(matches.map(m => m[0]))];
    console.log(file, unique.slice(0, 50));
  }
}
