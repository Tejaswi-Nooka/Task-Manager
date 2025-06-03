const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const generateAssets = async () => {
  // Generate PNG icons
  const icons = [
    { name: 'mickey-icon', sizes: [40] },
    { name: 'disney-castle-watermark', sizes: [512] },
    { name: 'mickey-urgent', sizes: [30] },
    { name: 'goofy-normal', sizes: [30] },
    { name: 'donald-low', sizes: [30] },
    { name: 'logo192', sizes: [192] },
    { name: 'logo512', sizes: [512] }
  ];

  for (const icon of icons) {
    const svgPath = path.join(__dirname, '../public/images', `${icon.name}.svg`);
    for (const size of icon.sizes) {
      const pngPath = path.join(__dirname, '../public/images', `${icon.name}-${size}.png`);
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(pngPath);
    }
  }

  // Generate favicon.ico
  const faviconSvg = path.join(__dirname, '../public/images/favicon.svg');
  const faviconIco = path.join(__dirname, '../public/favicon.ico');
  
  // Create favicon with multiple sizes
  const favSizes = [16, 32, 48];
  const favBuffers = await Promise.all(
    favSizes.map(size =>
      sharp(faviconSvg)
        .resize(size, size)
        .png()
        .toBuffer()
    )
  );

  // Combine into ICO file
  const ico = require('png-to-ico');
  const icoBuffer = await ico(favBuffers);
  fs.writeFileSync(faviconIco, icoBuffer);
};

generateAssets().catch(console.error); 