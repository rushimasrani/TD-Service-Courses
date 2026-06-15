const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
for (const file of files) {
  const content = fs.readFileSync('dist/assets/' + file, 'utf8');
  // Look for something.S or [a-zA-Z_$].S
  const matches = content.match(/[a-zA-Z_$0-9]+\.S\b/g);
  if (matches) {
    const unique = [...new Set(matches)];
    console.log(file, unique);
  }
}
