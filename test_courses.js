const fs = require('fs');
const content = fs.readFileSync('pages/CourseDetail.tsx', 'utf8');
// Just want to see if any course is missing 'roles' or 'modules'
// Actually let's just grep for "highlights:" or "whyChooseUs:"
