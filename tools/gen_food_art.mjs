/**
 * Generate kawaii cartoon food WebP assets (1024×1024).
 * Each food has a base + twin (…b) with one tiny prop difference.
 * Usage: node tools/gen_food_art.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "../apps/web/node_modules/sharp/lib/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../apps/web/public/foods");

const SIZE = 1024;
const INK = "#2C2118";

function svgShell(body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <g stroke="${INK}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
    ${body}
  </g>
</svg>`;
}

function hl(cx, cy, rx = 36, ry = 50, rot = -28) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#ffffff" fill-opacity="0.32" stroke="none" transform="rotate(${rot} ${cx} ${cy})"/>`;
}

function strawberry(cx, cy, s = 1) {
  return `<g transform="translate(${cx},${cy}) scale(${s})">
    <path d="M0 -36 C-34 -36 -48 0 -34 34 C-18 62 18 62 34 34 C48 0 34 -36 0 -36 Z" fill="#E53935"/>
    <ellipse cx="-10" cy="-42" rx="12" ry="18" fill="#7CB342" stroke="${INK}" stroke-width="10"/>
    <ellipse cx="10" cy="-42" rx="12" ry="18" fill="#8BC34A" stroke="${INK}" stroke-width="10"/>
    <circle cx="-12" cy="0" r="4" fill="#FFCDD2" stroke="none"/>
    <circle cx="10" cy="12" r="4" fill="#FFCDD2" stroke="none"/>
    <circle cx="8" cy="-8" r="3.5" fill="#FFCDD2" stroke="none"/>
  </g>`;
}

function cherry(cx, cy, s = 1) {
  return `<g transform="translate(${cx},${cy}) scale(${s})">
    <path d="M0 -8 C0 -28 18 -40 28 -48" fill="none" stroke="${INK}" stroke-width="10"/>
    <circle cx="0" cy="8" r="22" fill="#E53935"/>
    ${hl( -6, 2, 8, 10, -20)}
  </g>`;
}

function olive(cx, cy, s = 1) {
  return `<g transform="translate(${cx},${cy}) scale(${s})">
    <ellipse cx="0" cy="0" rx="22" ry="16" fill="#558B2F"/>
    <ellipse cx="0" cy="0" rx="8" ry="6" fill="#F5F5F5" stroke="${INK}" stroke-width="8"/>
  </g>`;
}

/** Food drawers: each returns { base, twin } SVG bodies (inside shell). */
const FOODS = {
  // Pizza — twin adds strawberry topping
  F01: {
    name: "pizza",
    twinNote: "strawberry topping",
    draw(withBerry) {
      return `
      <path d="M512 220 L820 780 L204 780 Z" fill="#F6C945"/>
      <path d="M512 280 L760 740 L264 740 Z" fill="#E53935"/>
      <ellipse cx="430" cy="520" rx="42" ry="28" fill="#FFF8E1" stroke="${INK}" stroke-width="12"/>
      <ellipse cx="560" cy="580" rx="38" ry="26" fill="#FFF8E1" stroke="${INK}" stroke-width="12"/>
      <ellipse cx="500" cy="460" rx="34" ry="24" fill="#81C784" stroke="${INK}" stroke-width="12"/>
      <circle cx="600" cy="500" r="18" fill="#8D6E63" stroke="${INK}" stroke-width="10"/>
      <circle cx="420" cy="620" r="16" fill="#8D6E63" stroke="${INK}" stroke-width="10"/>
      ${hl(470, 400, 40, 28, 20)}
      ${withBerry ? strawberry(560, 420, 0.72) : ""}
      `;
    },
  },

  // Ice cream cone — twin adds cherry
  F02: {
    name: "ice cream",
    twinNote: "cherry on top",
    draw(withCherry) {
      return `
      <path d="M390 560 L512 860 L634 560 Z" fill="#F4A460"/>
      <path d="M410 600 L512 800 L614 600" fill="none" stroke="${INK}" stroke-width="12" opacity="0.45"/>
      <path d="M430 680 L512 820 L594 680" fill="none" stroke="${INK}" stroke-width="10" opacity="0.35"/>
      <circle cx="512" cy="470" r="120" fill="#FFF3E0"/>
      <circle cx="452" cy="390" r="88" fill="#F8BBD0"/>
      <circle cx="572" cy="390" r="88" fill="#B3E5FC"/>
      ${hl(470, 430, 34, 40)}
      ${withCherry ? cherry(512, 300, 1) : ""}
      `;
    },
  },

  // Cookie — twin adds chocolate chips
  F03: {
    name: "cookie",
    twinNote: "chocolate chips",
    draw(withChips) {
      return `
      <circle cx="512" cy="520" r="250" fill="#E0A85C"/>
      <circle cx="512" cy="520" r="220" fill="#F0C27B" stroke="none"/>
      ${hl(430, 440, 50, 60)}
      ${
        withChips
          ? `<circle cx="430" cy="460" r="22" fill="#5D4037" stroke="${INK}" stroke-width="10"/>
      <circle cx="560" cy="420" r="18" fill="#5D4037" stroke="${INK}" stroke-width="10"/>
      <circle cx="500" cy="560" r="20" fill="#5D4037" stroke="${INK}" stroke-width="10"/>
      <circle cx="600" cy="560" r="16" fill="#5D4037" stroke="${INK}" stroke-width="10"/>
      <circle cx="450" cy="600" r="14" fill="#5D4037" stroke="${INK}" stroke-width="10"/>`
          : ""
      }
      `;
    },
  },

  // Milk carton — twin adds straw
  F04: {
    name: "milk",
    twinNote: "straw",
    draw(withStraw) {
      return `
      <path d="M360 300 L512 220 L664 300 L664 820 L360 820 Z" fill="#E3F2FD"/>
      <path d="M360 300 L512 220 L664 300 L512 360 Z" fill="#BBDEFB"/>
      <rect x="420" y="420" width="184" height="220" rx="18" fill="#FFFFFF" stroke="${INK}" stroke-width="14"/>
      <circle cx="512" cy="530" r="48" fill="#90CAF9" stroke="${INK}" stroke-width="12"/>
      ${hl(440, 480, 28, 70, -10)}
      ${
        withStraw
          ? `<rect x="600" y="180" width="28" height="260" rx="12" fill="#FF8A65" stroke="${INK}" stroke-width="12" transform="rotate(12 614 310)"/>`
          : ""
      }
      `;
    },
  },

  // Butter toast — twin adds butter pat
  F05: {
    name: "butter bread",
    twinNote: "butter pat",
    draw(withButter) {
      return `
      <rect x="280" y="300" width="464" height="420" rx="42" fill="#F6D7A7"/>
      <rect x="310" y="330" width="404" height="360" rx="30" fill="#FFE0B2" stroke="none"/>
      <path d="M340 420 Q512 380 684 420" fill="none" stroke="#E0B883" stroke-width="14"/>
      <path d="M340 520 Q512 480 684 520" fill="none" stroke="#E0B883" stroke-width="14"/>
      <path d="M340 620 Q512 580 684 620" fill="none" stroke="#E0B883" stroke-width="14"/>
      ${hl(380, 400, 40, 50)}
      ${
        withButter
          ? `<rect x="450" y="470" width="120" height="90" rx="14" fill="#FFE082" stroke="${INK}" stroke-width="12"/>
      <path d="M470 500 L550 500 M470 530 L550 530" fill="none" stroke="#FBC02D" stroke-width="8"/>`
          : ""
      }
      `;
    },
  },

  // Chocolate bar — twin adds almond
  F06: {
    name: "chocolate",
    twinNote: "almond piece",
    draw(withNut) {
      return `
      <rect x="290" y="340" width="444" height="340" rx="28" fill="#5D4037"/>
      <path d="M290 453 H734 M290 566 H734 M438 340 V680 M586 340 V680" fill="none" stroke="${INK}" stroke-width="14"/>
      ${hl(360, 400, 30, 40)}
      ${
        withNut
          ? `<ellipse cx="512" cy="510" rx="42" ry="28" fill="#F5DEB3" stroke="${INK}" stroke-width="12"/>
      <ellipse cx="512" cy="510" rx="18" ry="10" fill="#E8C99B" stroke="none"/>`
          : ""
      }
      `;
    },
  },

  // Cheese wedge — twin adds olive
  F07: {
    name: "cheese",
    twinNote: "olive",
    draw(withOlive) {
      return `
      <path d="M240 700 L512 260 L784 700 Z" fill="#FFD54F"/>
      <path d="M512 260 L784 700 L512 700 Z" fill="#FFCA28"/>
      <circle cx="430" cy="520" r="28" fill="#FFE082" stroke="${INK}" stroke-width="12"/>
      <circle cx="560" cy="580" r="22" fill="#FFE082" stroke="${INK}" stroke-width="12"/>
      <circle cx="500" cy="440" r="18" fill="#FFE082" stroke="${INK}" stroke-width="12"/>
      ${hl(400, 480, 34, 40)}
      ${withOlive ? olive(600, 480, 1.1) : ""}
      `;
    },
  },

  // Burger — twin adds extra sesame
  F08: {
    name: "hamburger",
    twinNote: "extra sesame seed",
    draw(extraSesame) {
      return `
      <ellipse cx="512" cy="360" rx="230" ry="90" fill="#F6C945"/>
      <rect x="290" y="400" width="444" height="50" rx="12" fill="#81C784"/>
      <rect x="300" y="450" width="424" height="70" rx="18" fill="#8D6E63"/>
      <rect x="290" y="520" width="444" height="46" rx="12" fill="#FFF8E1"/>
      <ellipse cx="512" cy="620" rx="230" ry="80" fill="#E0A85C"/>
      <ellipse cx="430" cy="340" rx="14" ry="10" fill="#FFF8E1" stroke="${INK}" stroke-width="8"/>
      <ellipse cx="540" cy="330" rx="14" ry="10" fill="#FFF8E1" stroke="${INK}" stroke-width="8"/>
      <ellipse cx="480" cy="355" rx="12" ry="9" fill="#FFF8E1" stroke="${INK}" stroke-width="8"/>
      ${
        extraSesame
          ? `<ellipse cx="590" cy="350" rx="14" ry="10" fill="#FFF8E1" stroke="${INK}" stroke-width="8"/>`
          : ""
      }
      ${hl(420, 340, 40, 24, 10)}
      `;
    },
  },

  // Hot dog — twin adds ketchup
  F09: {
    name: "hot dog",
    twinNote: "ketchup squiggle",
    draw(withKetchup) {
      return `
      <path d="M220 560 C280 420 744 420 804 560 C744 700 280 700 220 560 Z" fill="#F6C945"/>
      <path d="M260 560 C320 470 704 470 764 560 C704 650 320 650 260 560 Z" fill="#E57373"/>
      ${hl(360, 520, 40, 24, 8)}
      ${
        withKetchup
          ? `<path d="M320 540 Q400 500 480 540 Q560 580 640 520 Q700 490 740 530" fill="none" stroke="#C62828" stroke-width="18"/>`
          : ""
      }
      `;
    },
  },

  // Donut — twin adds sprinkle cluster
  F10: {
    name: "donut",
    twinNote: "sprinkles",
    draw(withSprinkles) {
      return `
      <circle cx="512" cy="520" r="250" fill="#F8BBD0"/>
      <circle cx="512" cy="520" r="210" fill="#F48FB1" stroke="none"/>
      <circle cx="512" cy="520" r="90" fill="#ffffff" stroke="${INK}" stroke-width="16"/>
      ${hl(430, 440, 40, 50)}
      ${
        withSprinkles
          ? `<rect x="400" y="400" width="36" height="12" rx="6" fill="#42A5F5" stroke="none" transform="rotate(-30 418 406)"/>
      <rect x="560" y="430" width="36" height="12" rx="6" fill="#FFEE58" stroke="none" transform="rotate(25 578 436)"/>
      <rect x="450" y="560" width="36" height="12" rx="6" fill="#66BB6A" stroke="none" transform="rotate(-10 468 566)"/>
      <rect x="580" y="540" width="36" height="12" rx="6" fill="#AB47BC" stroke="none" transform="rotate(40 598 546)"/>`
          : ""
      }
      `;
    },
  },

  // Cake slice — twin adds candle
  F11: {
    name: "cake",
    twinNote: "candle",
    draw(withCandle) {
      return `
      <path d="M280 700 L512 280 L744 700 Z" fill="#F8BBD0"/>
      <path d="M512 280 L744 700 L512 700 Z" fill="#F48FB1"/>
      <path d="M320 520 H700" fill="none" stroke="#FFFFFF" stroke-width="28"/>
      <path d="M340 600 H680" fill="none" stroke="#FFFFFF" stroke-width="22"/>
      ${hl(420, 480, 30, 40)}
      ${
        withCandle
          ? `<rect x="496" y="220" width="32" height="110" rx="8" fill="#90CAF9" stroke="${INK}" stroke-width="12"/>
      <ellipse cx="512" cy="200" rx="18" ry="28" fill="#FFB74D" stroke="${INK}" stroke-width="10"/>`
          : ""
      }
      `;
    },
  },

  // Cupcake — twin adds cherry
  F12: {
    name: "cupcake",
    twinNote: "cherry",
    draw(withCherry) {
      return `
      <path d="M360 560 L390 820 L634 820 L664 560 Z" fill="#FFCC80"/>
      <path d="M390 620 H634 M400 700 H624 M410 760 H614" fill="none" stroke="${INK}" stroke-width="10" opacity="0.35"/>
      <ellipse cx="512" cy="520" rx="210" ry="90" fill="#F8BBD0"/>
      <circle cx="430" cy="440" r="70" fill="#F48FB1"/>
      <circle cx="590" cy="440" r="70" fill="#F48FB1"/>
      <circle cx="512" cy="400" r="80" fill="#FCE4EC"/>
      ${hl(460, 420, 28, 34)}
      ${withCherry ? cherry(512, 330, 0.9) : ""}
      `;
    },
  },

  // Sushi nigiri — twin adds wasabi
  F13: {
    name: "sushi",
    twinNote: "wasabi dab",
    draw(withWasabi) {
      return `
      <rect x="330" y="520" width="364" height="160" rx="40" fill="#FFF8E1"/>
      <ellipse cx="512" cy="480" rx="200" ry="90" fill="#EF5350"/>
      <path d="M360 470 Q512 420 664 470" fill="none" stroke="#C62828" stroke-width="12" opacity="0.5"/>
      ${hl(430, 450, 40, 28, 8)}
      ${
        withWasabi
          ? `<ellipse cx="620" cy="620" rx="36" ry="24" fill="#9CCC65" stroke="${INK}" stroke-width="12"/>`
          : ""
      }
      `;
    },
  },

  // Ramen — twin adds egg half
  F14: {
    name: "ramen",
    twinNote: "egg half",
    draw(withEgg) {
      return `
      <ellipse cx="512" cy="620" rx="280" ry="90" fill="#90A4AE"/>
      <ellipse cx="512" cy="560" rx="250" ry="200" fill="#FFE082"/>
      <path d="M340 520 Q400 560 460 520 Q520 480 580 530 Q640 580 700 520" fill="none" stroke="#F9A825" stroke-width="18"/>
      <path d="M360 580 Q430 620 500 570 Q570 530 650 590" fill="none" stroke="#F9A825" stroke-width="16"/>
      <ellipse cx="400" cy="500" rx="40" ry="28" fill="#E57373" stroke="${INK}" stroke-width="12"/>
      <rect x="600" y="470" width="18" height="90" rx="8" fill="#8D6E63"/>
      <ellipse cx="609" cy="460" rx="28" ry="16" fill="#A1887F" stroke="${INK}" stroke-width="10"/>
      ${hl(430, 480, 40, 30)}
      ${
        withEgg
          ? `<path d="M520 500 C470 500 450 560 490 600 C520 630 570 610 580 560 C590 520 560 500 520 500 Z" fill="#FFFDE7" stroke="${INK}" stroke-width="12"/>
      <circle cx="530" cy="560" r="22" fill="#FFCA28" stroke="${INK}" stroke-width="10"/>`
          : ""
      }
      `;
    },
  },

  // Taco — twin adds cilantro
  F15: {
    name: "taco",
    twinNote: "cilantro leaf",
    draw(withCilantro) {
      return `
      <path d="M240 620 C280 360 744 360 784 620 C700 760 324 760 240 620 Z" fill="#F6C945"/>
      <path d="M300 600 C340 440 684 440 724 600 C650 700 380 700 300 600 Z" fill="#8D6E63"/>
      <ellipse cx="420" cy="540" rx="36" ry="22" fill="#E53935" stroke="${INK}" stroke-width="10"/>
      <ellipse cx="540" cy="560" rx="34" ry="20" fill="#FF7043" stroke="${INK}" stroke-width="10"/>
      <ellipse cx="620" cy="530" rx="30" ry="18" fill="#FFEE58" stroke="${INK}" stroke-width="10"/>
      ${hl(380, 500, 34, 24)}
      ${
        withCilantro
          ? `<ellipse cx="500" cy="500" rx="28" ry="16" fill="#66BB6A" stroke="${INK}" stroke-width="10" transform="rotate(-20 500 500)"/>
      <ellipse cx="530" cy="490" rx="22" ry="12" fill="#81C784" stroke="${INK}" stroke-width="8" transform="rotate(25 530 490)"/>`
          : ""
      }
      `;
    },
  },

  // Fries — twin adds ketchup
  F16: {
    name: "fries",
    twinNote: "ketchup blob",
    draw(withKetchup) {
      return `
      <path d="M360 480 L400 820 L624 820 L664 480 Z" fill="#E53935"/>
      <rect x="400" y="280" width="48" height="280" rx="16" fill="#F6C945" transform="rotate(-8 424 420)"/>
      <rect x="470" y="250" width="52" height="300" rx="16" fill="#FFD54F"/>
      <rect x="545" y="270" width="48" height="290" rx="16" fill="#F6C945" transform="rotate(7 569 415)"/>
      <rect x="430" y="300" width="44" height="260" rx="14" fill="#FFE082" transform="rotate(3 452 430)"/>
      ${hl(480, 340, 24, 40)}
      ${
        withKetchup
          ? `<ellipse cx="560" cy="520" rx="40" ry="28" fill="#C62828" stroke="${INK}" stroke-width="12"/>`
          : ""
      }
      `;
    },
  },

  // Popcorn — twin adds caramel piece
  F17: {
    name: "popcorn",
    twinNote: "caramel piece",
    draw(withCaramel) {
      return `
      <path d="M340 520 L380 820 L644 820 L684 520 Z" fill="#E53935"/>
      <path d="M340 520 H684 L640 620 H380 Z" fill="#FFCDD2"/>
      <circle cx="430" cy="420" r="55" fill="#FFF8E1"/>
      <circle cx="520" cy="380" r="60" fill="#FFFDE7"/>
      <circle cx="600" cy="430" r="52" fill="#FFF8E1"/>
      <circle cx="480" cy="470" r="48" fill="#FFFDE7"/>
      <circle cx="560" cy="490" r="44" fill="#FFF8E1"/>
      ${hl(470, 390, 28, 30)}
      ${
        withCaramel
          ? `<circle cx="520" cy="440" r="34" fill="#D4A017" stroke="${INK}" stroke-width="12"/>`
          : ""
      }
      `;
    },
  },

  // Pancakes — twin adds blueberry
  F18: {
    name: "pancake",
    twinNote: "blueberry",
    draw(withBerry) {
      return `
      <ellipse cx="512" cy="680" rx="240" ry="70" fill="#E0A85C"/>
      <ellipse cx="512" cy="600" rx="240" ry="70" fill="#F0C27B"/>
      <ellipse cx="512" cy="520" rx="240" ry="70" fill="#E0A85C"/>
      <ellipse cx="512" cy="440" rx="240" ry="70" fill="#FFE0B2"/>
      <path d="M420 360 Q512 420 620 340" fill="none" stroke="#FFB300" stroke-width="22"/>
      ${hl(430, 420, 40, 28)}
      ${
        withBerry
          ? `<circle cx="560" cy="400" r="28" fill="#5C6BC0" stroke="${INK}" stroke-width="12"/>
      <circle cx="568" cy="390" r="6" fill="#E8EAF6" stroke="none"/>`
          : ""
      }
      `;
    },
  },

  // Onigiri — twin adds sesame seeds
  F19: {
    name: "onigiri",
    twinNote: "sesame seeds",
    draw(withSesame) {
      return `
      <path d="M512 240 L760 720 L264 720 Z" fill="#FFF8E1"/>
      <rect x="430" y="560" width="164" height="180" rx="18" fill="#37474F"/>
      ${hl(430, 420, 36, 50)}
      ${
        withSesame
          ? `<ellipse cx="450" cy="420" rx="10" ry="6" fill="${INK}" stroke="none" transform="rotate(-20 450 420)"/>
      <ellipse cx="520" cy="380" rx="10" ry="6" fill="${INK}" stroke="none" transform="rotate(15 520 380)"/>
      <ellipse cx="580" cy="450" rx="10" ry="6" fill="${INK}" stroke="none" transform="rotate(-5 580 450)"/>
      <ellipse cx="490" cy="480" rx="9" ry="5" fill="${INK}" stroke="none" transform="rotate(30 490 480)"/>`
          : ""
      }
      `;
    },
  },

  // Pudding — twin adds whipped cream
  F20: {
    name: "pudding",
    twinNote: "whipped cream",
    draw(withCream) {
      return `
      <path d="M340 420 L380 780 L644 780 L684 420 Z" fill="#FFCC80"/>
      <ellipse cx="512" cy="420" rx="180" ry="70" fill="#FFE0B2"/>
      <ellipse cx="512" cy="780" rx="140" ry="40" fill="#FFB74D" stroke="${INK}" stroke-width="14"/>
      ${hl(440, 520, 34, 50)}
      ${
        withCream
          ? `<circle cx="460" cy="380" r="40" fill="#FFFFFF"/>
      <circle cx="520" cy="360" r="46" fill="#FFFFFF"/>
      <circle cx="580" cy="385" r="38" fill="#FFFFFF"/>
      <path d="M460 380 Q512 300 580 385" fill="#FFFFFF" stroke="none"/>`
          : ""
      }
      `;
    },
  },
};

async function writeFood(id, label, body) {
  const svg = svgShell(body);
  const outPath = path.join(OUT, `food_${label}.webp`);
  await sharp(Buffer.from(svg))
    .resize(SIZE, SIZE)
    .webp({ quality: 86 })
    .toFile(outPath);
  console.log("wrote", outPath);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const ids = Object.keys(FOODS);
  for (const id of ids) {
    const food = FOODS[id];
    const base = id.toLowerCase();
    const twin = `${base}b`;
    await writeFood(id, base, food.draw(false));
    await writeFood(id, twin, food.draw(true));
  }
  console.log("OK", ids.length, "foods × 2 =", ids.length * 2, "assets");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
