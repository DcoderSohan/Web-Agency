const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, '../frontend/public/VTRCLogo.png');
const outFrontend = path.resolve(__dirname, '../frontend/public/VTRCLogo_meta.png');
const outAdmin = path.resolve(__dirname, '../admin/public/VTRCLogo_meta.png');

async function generate() {
  const size = 512;
  
  // Create a white circle SVG
  const circleSvg = `<svg width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white"/></svg>`;

  // Resize original logo to fit inside the circle with some padding
  const logoSize = Math.floor(size * 0.75);
  const logoBuffer = await sharp(inputPath)
    .resize(logoSize, logoSize, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();

  const finalImage = await sharp(Buffer.from(circleSvg))
    .composite([
      { input: logoBuffer, gravity: 'center' }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(outFrontend, finalImage);
  fs.writeFileSync(outAdmin, finalImage);
  console.log('Successfully generated VTRCLogo_meta.png in both public folders');
}

generate().catch(console.error);
