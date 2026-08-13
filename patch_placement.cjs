const fs = require('fs');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  content = content.replace(/100% placement assistance/gi, '100% Placement Guarantee');
  content = content.replace(/placement assistance/gi, '100% Placement Guarantee');
  content = content.replace(/100% placement support/gi, '100% Placement Guarantee');
  content = content.replace(/placement support/gi, '100% Placement Guarantee');
  content = content.replace(/100% placement guidance/gi, '100% Placement Guarantee');
  content = content.replace(/placement guidance/gi, '100% Placement Guarantee');
  content = content.replace(/100% placement guaranty/gi, '100% Placement Guarantee');
  content = content.replace(/placement guaranty/gi, '100% Placement Guarantee');

  content = content.replace(/100%\s*100%\s*Placement Guarantee/gi, '100% Placement Guarantee');

  // Let's also check if we replaced "Placement Support Banner" comment and update it for cleanliness.
  content = content.replace(/Placement Guarantee Banner/gi, 'Placement Guarantee Banner');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

['pages/CourseDetail.tsx', 'pages/Trainings.tsx'].forEach(replaceInFile);
