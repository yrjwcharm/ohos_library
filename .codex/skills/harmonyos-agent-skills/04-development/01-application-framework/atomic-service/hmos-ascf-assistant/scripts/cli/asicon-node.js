// Patch browser globals BEFORE requiring asicon.js.
// asicon.js was built for web (uses document.createElement, Image, etc.);
// @napi-rs/canvas provides compatible API in Node.js.
const { createCanvas, Image } = require('@napi-rs/canvas');

global.HTMLImageElement = Image;
global.Image = Image;
global.document = {
  createElement(tag) {
    if (tag === 'canvas') return createCanvas(0, 0);
    if (tag === 'img') return new Image();
    throw new Error(`Unsupported element type: ${tag}`);
  },
};

const fs = require('fs');
const path = require('path');
const { AsIconGenerator } = require('@atomicservice/as-icon-generator');

/**
 * Generate atomic service icons from a source image.
 * Reuses the same algorithm as the web-based asicon.js:
 *   - Extracts dominant color palette
 *   - Detects whether border should be light/dark/colored
 *   - Draws 512x512 icon with circular clip + decorative border
 *   - Optionally scales down to 216x216 for AGC (AppGallery Connect)
 *
 * @param {object} options
 * @param {string} options.input - Path to source image (1024x1024 recommended)
 * @param {string} options.output - Path for the 512x512 app icon output
 * @param {string} [options.agc] - Path for the 216x216 AGC icon output
 * @param {boolean} [options.force=false] - Overwrite existing files
 * @returns {Promise<{ outputImage: string, agcImage?: string }>}
 */
async function generateAsIcon({ input, output, agc, force = false }) {
  const inputPath = path.resolve(input);
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  const outputPath = path.resolve(output);
  if (fs.existsSync(outputPath) && !force) {
    throw new Error(
      `Output file already exists: ${outputPath} (use --force to overwrite)`,
    );
  }

  if (agc) {
    const agcPath = path.resolve(agc);
    if (fs.existsSync(agcPath) && !force) {
      throw new Error(
        `AGC output file already exists: ${agcPath} (use --force to overwrite)`,
      );
    }
  }

  // Read source image as Buffer — @napi-rs/canvas Image.src accepts Buffers
  const imgBuffer = fs.readFileSync(inputPath);

  const generator = new AsIconGenerator({ srcImg: imgBuffer });

  // getColors() loads the image and extracts the dominant color palette
  const colors = await generator.getColors();
  if (colors.length > 0) {
    generator.setColor(colors[0]);
  }

  // generate() runs the full icon pipeline and returns base64 data URLs
  const result = await generator.generate({ agc: !!agc });

  const written = {};

  // Write 512x512 icon
  const pngData = result.outputImage.replace(/^data:image\/png;base64,/, '');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, Buffer.from(pngData, 'base64'));
  written.outputImage = outputPath;

  // Write 216x216 AGC icon
  if (agc && result.agcImage) {
    const agcPath = path.resolve(agc);
    const agcData = result.agcImage.replace(/^data:image\/png;base64,/, '');
    fs.mkdirSync(path.dirname(agcPath), { recursive: true });
    fs.writeFileSync(agcPath, Buffer.from(agcData, 'base64'));
    written.agcImage = agcPath;
  }

  return written;
}

module.exports = { generateAsIcon };
