import fs from 'fs';
import { execSync } from 'child_process';

// 1. Copy unmodified master to public/assets/techdefends-logo-original.png
fs.mkdirSync('./public/assets', { recursive: true });
fs.copyFileSync('./public/techdefends-original-logo.png', './public/assets/techdefends-logo-original.png');
console.log('Saved unmodified master to ./public/assets/techdefends-logo-original.png');

// 2. HTML to load image into Canvas, find non-white bounding box, and deterministically crop with padding
const htmlContent = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0; background:#ffffff;">
  <img id="srcImg" src="techdefends-original-logo.png" style="display:none;" />
  <canvas id="cropCanvas"></canvas>
  <script>
    window.onload = () => {
      const img = document.getElementById('srcImg');
      const origCanvas = document.createElement('canvas');
      origCanvas.width = img.naturalWidth;
      origCanvas.height = img.naturalHeight;
      const ctx = origCanvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);

      const w = origCanvas.width;
      const h = origCanvas.height;
      const imgData = ctx.getImageData(0, 0, w, h).data;

      let minX = w, maxX = 0, minY = h, maxY = 0;

      // Detect non-white pixels (with slight tolerance for ambient shadows >= 2px threshold)
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];

          // If pixel is not pure background white (r < 252 or g < 252 or b < 252 or a < 255)
          if (a > 20 && (r < 250 || g < 250 || b < 250)) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      console.log('Detected artwork bbox:', { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY });

      // Add generous padding around the logo so shadows and bevels are fully preserved
      const padding = 40;
      const cropX = Math.max(0, minX - padding);
      const cropY = Math.max(0, minY - padding);
      const cropW = Math.min(w - cropX, (maxX - minX) + padding * 2);
      const cropH = Math.min(h - cropY, (maxY - minY) + padding * 2);

      // Make crop square for perfect aspect-ratio display in square containers
      const size = Math.max(cropW, cropH);
      const offsetX = Math.round((size - cropW) / 2);
      const offsetY = Math.round((size - cropH) / 2);

      const cropCanvas = document.getElementById('cropCanvas');
      cropCanvas.width = size;
      cropCanvas.height = size;
      const cropCtx = cropCanvas.getContext('2d');
      // Fill clean solid white background
      cropCtx.fillStyle = '#ffffff';
      cropCtx.fillRect(0, 0, size, size);

      // Draw cropped slice of original unmodified image
      cropCtx.drawImage(
        origCanvas,
        cropX, cropY, cropW, cropH,
        offsetX, offsetY, cropW, cropH
      );

      window._cropDone = true;
      window._cropSize = size;
      window._dataUrl = cropCanvas.toDataURL('image/png');
    };
  </script>
</body>
</html>`;

fs.writeFileSync('./public/_crop_runner.html', htmlContent);

// Run with headless chrome to extract the deterministically cropped dataURL
const chrome = '/ms-playwright/chromium_headless_shell-1247/chrome-headless-shell-linux64/chrome-headless-shell';
const runnerCmd = `${chrome} --no-sandbox --headless --dump-dom file://${process.cwd()}/public/_crop_runner.html`;

console.log('Running deterministic cropping in headless browser...');
// Instead of dump-dom, we can use a small node script with puppeteer/playwright or playwright-core if available,
// or let's use chrome to screenshot the canvas directly!
