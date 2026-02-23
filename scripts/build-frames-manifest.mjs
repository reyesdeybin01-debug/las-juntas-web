import { readdirSync, writeFileSync } from "fs";
import { join, extname } from "path";

const FRAMES_DIR = join(process.cwd(), "public", "frames");
const MANIFEST_PATH = join(FRAMES_DIR, "manifest.json");
const ALLOWED_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

try {
    const files = readdirSync(FRAMES_DIR)
        .filter((f) => ALLOWED_EXTS.has(extname(f).toLowerCase()));

    // Sort by numeric suffix found in filename
    files.sort((a, b) => {
        const numA = extractNumber(a);
        const numB = extractNumber(b);
        if (numA !== null && numB !== null) return numA - numB;
        if (numA !== null) return -1;
        if (numB !== null) return 1;
        return a.localeCompare(b);
    });

    const manifest = files.map((f) => `/frames/${f}`);
    writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log(`✅ Frames manifest generated: ${manifest.length} frames`);
} catch (err) {
    console.error("❌ Failed to generate frames manifest:", err.message);
    process.exit(1);
}

function extractNumber(filename) {
    const match = filename.match(/(\d+)\.[^.]+$/);
    return match ? parseInt(match[1], 10) : null;
}
