import { renderToString } from 'react-dom/server';
// Need babel or something. Let's just create a basic express server that serves the built index.html,
// and we'll use puppeteer to grab the console errors.
