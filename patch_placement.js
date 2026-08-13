const fs = require('fs');
const glob = require('glob');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. "100% placement assistance" -> "100% Placement Guarantee"
  content = content.replace(/100% placement assistance/gi, '100% Placement Guarantee');
  
  // 2. "placement assistance" -> "100% Placement Guarantee"
  content = content.replace(/placement assistance/gi, '100% Placement Guarantee');

  // 3. "placement support" -> "100% Placement Guarantee"
  // Keep the "100% " if it exists, otherwise add it.
  content = content.replace(/100% placement support/gi, '100% Placement Guarantee');
  content = content.replace(/placement support/gi, '100% Placement Guarantee');

  // 4. "placement guidance" -> "100% Placement Guarantee"
  content = content.replace(/100% placement guidance/gi, '100% Placement Guarantee');
  content = content.replace(/placement guidance/gi, '100% Placement Guarantee');

  // 5. "placement guaranty" -> "100% Placement Guarantee"
  content = content.replace(/100% placement guaranty/gi, '100% Placement Guarantee');
  content = content.replace(/placement guaranty/gi, '100% Placement Guarantee');

  // Avoid creating "100% 100% Placement Guarantee" by accident
  content = content.replace(/100% 100% Placement Guarantee/gi, '100% Placement Guarantee');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

['pages/CourseDetail.tsx', 'pages/Trainings.tsx'].forEach(replaceInFile);
