/**
 * Generate cute kawaii cartoon fruit WebP assets (1024×1024).
 * Usage: node tools/gen_fruit_art.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "../apps/web/node_modules/sharp/lib/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../apps/web/public/fruits");

const SIZE = 1024;
const INK = "#2C2118";

function svgShell(body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <g stroke="${INK}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round">
    ${body}
  </g>
</svg>`;
}

/** Shared leaf */
function leaf(cx, cy, rot = -35, scale = 1) {
  return `<g transform="translate(${cx},${cy}) rotate(${rot}) scale(${scale})">
    <ellipse cx="0" cy="0" rx="54" ry="28" fill="#7CB342" stroke="${INK}"/>
    <path d="M-40 0 Q0 -8 40 0" fill="none" stroke="${INK}" stroke-width="8"/>
  </g>`;
}

function highlight(cx, cy, rx = 48, ry = 70, rot = -30) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#ffffff" fill-opacity="0.35" stroke="none" transform="rotate(${rot} ${cx} ${cy})"/>`;
}

const FRUITS = {
  // Red apple — classic wide body with top dimple
  R01: () =>
    svgShell(`
      ${leaf(448, 268, -48, 1)}
      <path d="M512 340
        C470 300 400 310 355 380
        C290 480 295 690 370 780
        C430 845 594 845 654 780
        C729 690 734 480 669 380
        C624 310 554 300 512 340 Z" fill="#E53935"/>
      <path d="M470 335 Q512 365 554 335" fill="none" stroke="${INK}" stroke-width="14"/>
      ${highlight(415, 510, 52, 68)}
      <path d="M512 348 C512 290 528 250 552 228" fill="none" stroke="${INK}" stroke-width="16"/>
      <circle cx="552" cy="225" r="10" fill="${INK}" stroke="none"/>
    `),

  // Green apple
  R02: () =>
    svgShell(`
      ${leaf(448, 268, -48, 1)}
      <path d="M512 340
        C470 300 400 310 355 380
        C290 480 295 690 370 780
        C430 845 594 845 654 780
        C729 690 734 480 669 380
        C624 310 554 300 512 340 Z" fill="#8BC34A"/>
      <path d="M470 335 Q512 365 554 335" fill="none" stroke="${INK}" stroke-width="14"/>
      ${highlight(415, 510, 52, 68)}
      <path d="M512 348 C512 290 528 250 552 228" fill="none" stroke="${INK}" stroke-width="16"/>
      <circle cx="552" cy="225" r="10" fill="${INK}" stroke="none"/>
    `),

  // Pear
  R03: () =>
    svgShell(`
      ${leaf(520, 220, 30, 0.9)}
      <path d="M512 280
        C430 280 390 360 400 430
        C300 480 270 620 320 720
        C370 820 654 820 704 720
        C754 620 724 480 624 430
        C634 360 594 280 512 280 Z" fill="#C6D96D"/>
      ${highlight(440, 560, 40, 80)}
      <path d="M512 280 C512 240 520 210 535 190" fill="none" stroke="${INK}" stroke-width="16"/>
    `),

  // Peach
  R04: () =>
    svgShell(`
      ${leaf(560, 260, 25, 0.95)}
      <path d="M512 340
        C380 300 280 420 300 560
        C320 720 430 820 512 820
        C594 820 704 720 724 560
        C744 420 644 300 512 340 Z" fill="#FF8A65"/>
      <path d="M512 360 C512 480 512 640 512 780" fill="none" stroke="${INK}" stroke-width="12" opacity="0.55"/>
      ${highlight(420, 500, 42, 72)}
      <path d="M512 320 C500 260 520 220 545 200" fill="none" stroke="${INK}" stroke-width="16"/>
    `),

  // Orange
  R05: () =>
    svgShell(`
      <circle cx="512" cy="540" r="250" fill="#FF9800"/>
      ${highlight(420, 440, 55, 75)}
      <circle cx="512" cy="300" r="22" fill="#F57C00" stroke="${INK}" stroke-width="12"/>
      <path d="M490 300 C480 250 500 220 530 210" fill="none" stroke="${INK}" stroke-width="14"/>
      ${leaf(560, 250, 40, 0.7)}
    `),

  // Tangerine — flatter / slightly smaller feel
  R06: () =>
    svgShell(`
      <ellipse cx="512" cy="560" rx="240" ry="200" fill="#FFB74D"/>
      ${highlight(420, 480, 50, 55)}
      <ellipse cx="512" cy="360" rx="36" ry="22" fill="#FB8C00" stroke="${INK}" stroke-width="12"/>
      <path d="M490 350 C485 310 505 280 535 275" fill="none" stroke="${INK}" stroke-width="14"/>
      ${leaf(555, 300, 35, 0.65)}
    `),

  // Lemon
  R07: () =>
    svgShell(`
      <ellipse cx="512" cy="520" rx="170" ry="270" fill="#FFEB3B" transform="rotate(-18 512 520)"/>
      <ellipse cx="512" cy="280" rx="28" ry="36" fill="#FDD835" stroke="${INK}" stroke-width="12" transform="rotate(-18 512 280)"/>
      <ellipse cx="512" cy="760" rx="26" ry="34" fill="#FDD835" stroke="${INK}" stroke-width="12" transform="rotate(-18 512 760)"/>
      ${highlight(450, 450, 40, 90, -40)}
    `),

  // Lime — rounder, greener
  R08: () =>
    svgShell(`
      <ellipse cx="512" cy="520" rx="200" ry="230" fill="#AED581" transform="rotate(-8 512 520)"/>
      <ellipse cx="512" cy="300" rx="24" ry="30" fill="#9CCC65" stroke="${INK}" stroke-width="12"/>
      ${highlight(440, 440, 42, 70, -25)}
    `),

  // Banana
  R09: () =>
    svgShell(`
      <path d="M280 320
        C300 280 360 260 420 290
        C560 360 680 520 720 680
        C740 740 700 790 640 780
        C520 760 400 640 330 520
        C280 430 260 360 280 320 Z" fill="#FFEB3B"/>
      <path d="M300 340 C420 400 560 560 650 720" fill="none" stroke="#F9A825" stroke-width="16"/>
      <path d="M280 320 C250 300 245 270 260 250" fill="none" stroke="${INK}" stroke-width="16"/>
      ${highlight(420, 420, 30, 80, -50)}
    `),

  // Strawberry
  R10: () =>
    svgShell(`
      <path d="M512 300
        C380 300 300 420 320 560
        C340 700 430 820 512 850
        C594 820 684 700 704 560
        C724 420 644 300 512 300 Z" fill="#E53935"/>
      <ellipse cx="420" cy="290" rx="50" ry="28" fill="#7CB342" stroke="${INK}" transform="rotate(-25 420 290)"/>
      <ellipse cx="512" cy="270" rx="55" ry="30" fill="#8BC34A" stroke="${INK}"/>
      <ellipse cx="604" cy="290" rx="50" ry="28" fill="#7CB342" stroke="${INK}" transform="rotate(25 604 290)"/>
      <circle cx="430" cy="480" r="10" fill="#FFCDD2" stroke="none"/>
      <circle cx="560" cy="520" r="10" fill="#FFCDD2" stroke="none"/>
      <circle cx="480" cy="600" r="10" fill="#FFCDD2" stroke="none"/>
      <circle cx="600" cy="620" r="10" fill="#FFCDD2" stroke="none"/>
      <circle cx="520" cy="700" r="10" fill="#FFCDD2" stroke="none"/>
      ${highlight(430, 500, 35, 55)}
    `),

  // Cherry (pair)
  R11: () =>
    svgShell(`
      <path d="M450 420 C420 280 480 220 512 210 C545 220 560 260 540 340" fill="none" stroke="${INK}" stroke-width="16"/>
      <path d="M540 340 C560 260 620 240 660 280" fill="none" stroke="${INK}" stroke-width="16"/>
      <circle cx="420" cy="560" r="140" fill="#D32F2F"/>
      <circle cx="620" cy="520" r="130" fill="#E53935"/>
      ${highlight(370, 510, 35, 50)}
      ${highlight(580, 470, 32, 45)}
      ${leaf(530, 220, -20, 0.7)}
    `),

  // Grapes
  R12: () =>
    svgShell(`
      ${leaf(560, 240, 30, 0.85)}
      <path d="M500 260 C500 220 520 200 545 195" fill="none" stroke="${INK}" stroke-width="14"/>
      <circle cx="450" cy="380" r="70" fill="#7E57C2"/>
      <circle cx="560" cy="360" r="70" fill="#673AB7"/>
      <circle cx="400" cy="500" r="70" fill="#5E35B1"/>
      <circle cx="510" cy="480" r="72" fill="#7E57C2"/>
      <circle cx="620" cy="470" r="68" fill="#673AB7"/>
      <circle cx="460" cy="610" r="68" fill="#5E35B1"/>
      <circle cx="570" cy="600" r="70" fill="#7E57C2"/>
      <circle cx="520" cy="720" r="62" fill="#673AB7"/>
      ${highlight(430, 360, 22, 28)}
    `),

  // Watermelon slice
  R13: () =>
    svgShell(`
      <path d="M220 680 A320 320 0 0 1 804 680 L512 680 Z" fill="#E53935" stroke="${INK}" stroke-width="18"/>
      <path d="M250 680 A290 290 0 0 1 774 680" fill="none" stroke="#81C784" stroke-width="46"/>
      <path d="M250 680 A290 290 0 0 1 774 680" fill="none" stroke="${INK}" stroke-width="18"/>
      <ellipse cx="400" cy="560" rx="14" ry="22" fill="${INK}" stroke="none" transform="rotate(-20 400 560)"/>
      <ellipse cx="520" cy="500" rx="14" ry="22" fill="${INK}" stroke="none"/>
      <ellipse cx="640" cy="560" rx="14" ry="22" fill="${INK}" stroke="none" transform="rotate(20 640 560)"/>
      ${highlight(420, 600, 50, 30, 0)}
    `),

  // Pineapple
  R14: () =>
    svgShell(`
      <ellipse cx="420" cy="250" rx="40" ry="90" fill="#8BC34A" stroke="${INK}" transform="rotate(-25 420 250)"/>
      <ellipse cx="512" cy="220" rx="42" ry="100" fill="#9CCC65" stroke="${INK}"/>
      <ellipse cx="604" cy="250" rx="40" ry="90" fill="#8BC34A" stroke="${INK}" transform="rotate(25 604 250)"/>
      <path d="M360 360
        C340 480 360 700 400 780
        C450 860 574 860 624 780
        C664 700 684 480 664 360
        C640 300 384 300 360 360 Z" fill="#FFB300"/>
      <path d="M400 420 L620 420 M380 520 L640 520 M390 620 L630 620 M410 720 L610 720" fill="none" stroke="${INK}" stroke-width="10" opacity="0.55"/>
      <path d="M450 360 L450 780 M512 360 L512 800 M574 360 L574 780" fill="none" stroke="${INK}" stroke-width="10" opacity="0.45"/>
      ${highlight(430, 480, 35, 70)}
    `),

  // Kiwi cross-section
  R15: () =>
    svgShell(`
      <ellipse cx="512" cy="520" rx="260" ry="230" fill="#8D6E63"/>
      <ellipse cx="512" cy="520" rx="210" ry="185" fill="#C5E1A5"/>
      <ellipse cx="512" cy="520" rx="70" ry="58" fill="#FFF8E1" stroke="${INK}" stroke-width="10"/>
      <circle cx="430" cy="450" r="10" fill="${INK}" stroke="none"/>
      <circle cx="580" cy="450" r="10" fill="${INK}" stroke="none"/>
      <circle cx="400" cy="540" r="10" fill="${INK}" stroke="none"/>
      <circle cx="620" cy="540" r="10" fill="${INK}" stroke="none"/>
      <circle cx="460" cy="610" r="10" fill="${INK}" stroke="none"/>
      <circle cx="560" cy="610" r="10" fill="${INK}" stroke="none"/>
      <circle cx="512" cy="420" r="9" fill="${INK}" stroke="none"/>
      <circle cx="512" cy="630" r="9" fill="${INK}" stroke="none"/>
    `),

  // Mango
  R16: () =>
    svgShell(`
      ${leaf(560, 280, 20, 0.75)}
      <path d="M420 300
        C300 360 280 560 360 700
        C430 820 620 840 700 720
        C780 600 760 420 660 340
        C580 280 500 270 420 300 Z" fill="#FFA726"/>
      <path d="M480 360 C420 480 430 640 520 740" fill="none" stroke="#FB8C00" stroke-width="18" opacity="0.55"/>
      ${highlight(460, 440, 40, 80, -35)}
      <path d="M560 300 C555 260 575 230 600 220" fill="none" stroke="${INK}" stroke-width="14"/>
    `),
};

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const ids = Object.keys(FRUITS);
  for (const id of ids) {
    const svg = FRUITS[id]();
    const outPath = path.join(OUT, `fruit_${id.toLowerCase()}.webp`);
    await sharp(Buffer.from(svg))
      .resize(SIZE, SIZE)
      .webp({ quality: 86 })
      .toFile(outPath);
    console.log("wrote", outPath);
  }
  console.log("OK", ids.length, "fruits");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
