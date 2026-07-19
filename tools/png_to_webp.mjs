/**
 * Convert PNG assets under apps/web/public to WebP.
 *
 * Usage (from repo root):
 *   node tools/png_to_webp.mjs
 *   node tools/png_to_webp.mjs --delete          # remove PNGs after success
 *   node tools/png_to_webp.mjs --quality=88
 *   node tools/png_to_webp.mjs --dir=apps/web/public/cats
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const deletePng = args.includes("--delete");
const qualityArg = args.find((a) => a.startsWith("--quality="));
const quality = qualityArg ? Number(qualityArg.split("=")[1]) : 85;
const dirArg = args.find((a) => a.startsWith("--dir="));
const targetDir = dirArg
  ? path.resolve(ROOT, dirArg.slice("--dir=".length))
  : path.join(ROOT, "apps/web/public");

const SKIP_DIRS = new Set(["node_modules", ".git", "dist"]);

async function loadSharp() {
  const candidates = [
    path.join(ROOT, "apps/web/node_modules/sharp/lib/index.js"),
    path.join(ROOT, "node_modules/sharp/lib/index.js"),
  ];
  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) continue;
    try {
      const sharpMod = await import(pathToFileURL(candidate).href);
      return sharpMod.default;
    } catch {
      /* try next */
    }
  }
  try {
    const sharpMod = await import("sharp");
    return sharpMod.default;
  } catch {
    console.error(
      "Missing dependency: sharp\n" +
        "Install once from apps/web:\n" +
        "  cd apps/web && npm i -D sharp\n",
    );
    process.exit(1);
  }
}

function collectPngs(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) collectPngs(full, out);
    else if (st.isFile() && /\.png$/i.test(name)) out.push(full);
  }
  return out;
}

async function convertOne(sharp, pngPath) {
  const webpPath = pngPath.replace(/\.png$/i, ".webp");
  const input = fs.readFileSync(pngPath);
  const before = input.length;

  await sharp(input)
    .webp({
      quality,
      alphaQuality: 100,
      effort: 4,
    })
    .toFile(webpPath);

  const after = fs.statSync(webpPath).size;
  if (deletePng) fs.unlinkSync(pngPath);

  return { pngPath, webpPath, before, after };
}

async function main() {
  if (!Number.isFinite(quality) || quality < 1 || quality > 100) {
    console.error("Invalid --quality= (use 1–100)");
    process.exit(1);
  }

  const sharp = await loadSharp();
  const pngs = collectPngs(targetDir);

  if (pngs.length === 0) {
    console.log("No PNG files found in", targetDir);
    return;
  }

  console.log(
    `Converting ${pngs.length} PNG → WebP (quality=${quality}${deletePng ? ", delete PNG" : ""})`,
  );

  let saved = 0;
  let beforeTotal = 0;
  let afterTotal = 0;

  for (const png of pngs) {
    const r = await convertOne(sharp, png);
    beforeTotal += r.before;
    afterTotal += r.after;
    saved += r.before - r.after;
    const rel = path.relative(ROOT, r.webpPath);
    const pct = (((r.before - r.after) / r.before) * 100).toFixed(0);
    console.log(
      `  ${rel}  ${(r.before / 1024).toFixed(0)}KB → ${(r.after / 1024).toFixed(0)}KB (−${pct}%)`,
    );
  }

  console.log(
    `\nDone. ${pngs.length} files. ` +
      `${(beforeTotal / 1024 / 1024).toFixed(2)}MB → ${(afterTotal / 1024 / 1024).toFixed(2)}MB ` +
      `(saved ${(saved / 1024 / 1024).toFixed(2)}MB)`,
  );
  if (!deletePng) {
    console.log("Tip: re-run with --delete to remove original PNGs after verifying.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
