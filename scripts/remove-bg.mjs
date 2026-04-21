/**
 * Background remover for Clavo AI gold logo.
 * Converts every dark pixel to transparent, keeping the bright gold logo intact.
 * Uses sharp (bundled with Next.js) — no extra install needed.
 */

import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

const INPUT  = "public/clavo-logo-gold.png";
const OUTPUT = "public/clavo-logo-transparent.png";

// Load image as raw RGBA buffer
const image  = sharp(INPUT);
const meta   = await image.metadata();
const { data, info } = await image
  .ensureAlpha()          // add alpha channel if missing
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const buf = Buffer.from(data);

for (let i = 0; i < buf.length; i += 4) {
  const r = buf[i];
  const g = buf[i + 1];
  const b = buf[i + 2];

  // Perceived brightness (0-255)
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

  // Saturation — gold pixels are warm (high R, lower B)
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max === 0 ? 0 : (max - min) / max;

  // Keep pixel if it's bright OR strongly saturated (gold/orange hue)
  // Remove if it's dark and unsaturated (the brown/black background)
  const isDark        = brightness < 60;
  const isBackground  = brightness < 90 && saturation < 0.35;

  if (isDark || isBackground) {
    // Fade out semi-dark edge pixels smoothly instead of hard cut
    const alpha = Math.max(0, Math.min(255, (brightness - 30) * 4));
    buf[i + 3] = isDark ? 0 : Math.min(buf[i + 3], alpha);
  }
}

// Write back as PNG with transparency
await sharp(buf, { raw: { width, height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(OUTPUT);

console.log(`✓ Saved ${OUTPUT} (${width}×${height})`);
