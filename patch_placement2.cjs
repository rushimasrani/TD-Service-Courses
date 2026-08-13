const fs = require('fs');
let content = fs.readFileSync('pages/CourseDetail.tsx', 'utf8');
content = content.replace(/Is there a placement guarantee\?/gi, 'Is there a 100% Placement Guarantee?');
fs.writeFileSync('pages/CourseDetail.tsx', content, 'utf8');
console.log('Updated CourseDetail.tsx');
