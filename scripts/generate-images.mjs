#!/usr/bin/env node
/**
 * Generates placeholder SVG images for the project.
 * Re-run with `npm run images` after adding new ids below.
 */
import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const palettes = {
  navy: ["#0B1F3A", "#14345C", "#C62828"],
  red: ["#C62828", "#8E1B1B", "#0B1F3A"],
  gold: ["#D4A72C", "#0B1F3A", "#8E6B14"],
  steel: ["#2A4A76", "#0B1F3A", "#D4A72C"],
  teal: ["#0F766E", "#0B1F3A", "#D4A72C"],
  plum: ["#6B3F7E", "#0B1F3A", "#C62828"],
  olive: ["#708238", "#0B1F3A", "#D4A72C"],
};

function svgTag(width, height) {
  return { width, height };
}

function background(c1, c2) {
  return `<defs>
  <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="${c1}"/>
    <stop offset="100%" stop-color="${c2}"/>
  </linearGradient>
  <radialGradient id="glow" cx="70%" cy="20%" r="80%">
    <stop offset="0%" stop-color="rgba(255,255,255,0.18)"/>
    <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
  </radialGradient>
  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
    <path d="M60 0H0V60" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
  </pattern>
</defs>`;
}

function campusSilhouette(color, opacity) {
  return `<g fill="${color}" fill-opacity="${opacity}">
    <rect x="0" y="760" width="1200" height="60"/>
    <rect x="120" y="620" width="220" height="140"/>
    <rect x="340" y="700" width="140" height="60"/>
    <rect x="500" y="560" width="280" height="200"/>
    <rect x="780" y="640" width="200" height="120"/>
    <path d="M170 620 L230 480 L290 620 Z"/>
    <path d="M590 560 L640 420 L690 560 Z"/>
    <path d="M830 640 L880 500 L930 640 Z"/>
    <rect x="125" y="640" width="18" height="40"/>
    <rect x="210" y="640" width="18" height="40"/>
    <circle cx="640" cy="520" r="6"/>
    <circle cx="655" cy="520" r="6"/>
    <rect x="635" y="540" width="10" height="6"/>
  </g>`;
}

function templeMotif(color) {
  return `<g fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round">
    <path d="M250 300 v-60 M270 300 v-60 M290 300 v-60 M310 300 v-60"/>
    <path d="M240 240 l70 60 h-140 Z"/>
    <path d="M245 200 q35 40 60 40 q-25 0 -60 40" transform="translate(-20,0)"/>
  </g>`;
}

function circles(color, opacity) {
  return `<g fill="${color}" fill-opacity="${opacity}">
    <circle cx="920" cy="180" r="220"/>
    <circle cx="1010" cy="280" r="120"/>
    <circle cx="180" cy="620" r="260"/>
    <circle cx="1050" cy="620" r="90"/>
  </g>`;
}

function rays(color) {
  return `<g stroke="${color}" stroke-opacity="0.25" stroke-width="2">
    <line x1="400" y1="130" x2="330" y2="55"/>
    <line x1="420" y1="130" x2="420" y2="30"/>
    <line x1="440" y1="130" x2="510" y2="55"/>
    <line x1="400" y1="140" x2="310" y2="140"/>
    <line x1="460" y1="140" x2="540" y2="140"/>
  </g>`;
}

function label(width, height, text) {
  const x = width / 2;
  return `<style>
    .t { font-family: 'Noto Sans Khmer', 'Arial', sans-serif; font-weight: 700; }
    .e { font-family: 'Arial', sans-serif; font-weight: 700; letter-spacing: 2px; }
  </style>
  <g text-anchor="middle">
    <rect x="${x - 260}" y="${height / 2 - 70}" width="520" height="140" rx="18" fill="rgba(11,31,58,0.55)" stroke="rgba(212,167,44,0.6)" stroke-width="2"/>
    <text class="e" x="${x}" y="${height / 2 - 16}" fill="rgba(212,167,44,1)" font-size="15">HUN SEN KAMPONG TRALACH HIGH SCHOOL</text>
    <text class="t" x="${x}" y="${height / 2 + 34}" fill="#ffffff" font-size="30">${text}</text>
  </g>`;
}

function buildImage(id, theme, width, height, caption) {
  const [c1, c2, accent] = palettes[theme];
  const s = svgTag(width, height);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s.width} ${s.height}">
${background(c1, c2)}
<rect width="${s.width}" height="${s.height}" fill="url(#bg)"/>
<rect width="${s.width}" height="${s.height}" fill="url(#glow)"/>
<rect width="${s.width}" height="${s.height}" fill="url(#grid)"/>
${rays(accent)}
${circles(accent, 0.08)}
${campusSilhouette(c1, 0.45)}
${label(s.width, s.height, caption)}
</svg>`;
}

const avatarStyles = {
  male: `M260 300 a100 100 0 1 0 0 -200 a100 100 0 0 0 0 200 Z M260 360 c-160 0 -200 90 -200 140 h400 c0 -50 -40 -140 -200 -140 Z`,
  female: `M260 300 a100 100 0 1 0 0 -200 a100 100 0 0 0 0 200 Z M260 360 c-160 0 -200 90 -200 140 h400 c0 -50 -40 -140 -200 -140 Z M160 200 q-30 40 0 60`,
};

function buildAvatar(id, theme, gender) {
  const [c1, c2, accent] = palettes[theme];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520">
<defs>
  <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="${c1}"/>
    <stop offset="100%" stop-color="${c2}"/>
  </linearGradient>
</defs>
<rect width="520" height="520" fill="url(#bg)"/>
<circle cx="260" cy="260" r="205" fill="rgba(255,255,255,0.08)" stroke="rgba(212,167,44,0.5)" stroke-width="3"/>
<path d="${avatarStyles[gender]}" fill="${accent}" fill-opacity="0.85"/>
<circle cx="260" cy="258" r="118" fill="rgba(255,255,255,0.92)"/>
<circle cx="218" cy="252" r="7" fill="${c1}"/>
<circle cx="302" cy="252" r="7" fill="${c1}"/>
<path d="M226 292 q34 24 68 0" stroke="${c1}" stroke-width="6" fill="none" stroke-linecap="round"/>
<text x="260" y="452" text-anchor="middle" fill="#ffffff" font-family="Arial" font-weight="700" font-size="18" letter-spacing="2">${id.toUpperCase()}</text>
</svg>`;
}

const images = {
  "school/hero": { theme: "navy", w: 1920, h: 1080, caption: "វិទ្យាល័យ ហ៊ុន សែន កំពង់ត្រឡាច" },
  "school/about": { theme: "steel", w: 1400, h: 980, caption: "អំពីសាលារបស់យើង" },
  "school/cta": { theme: "red", w: 1920, h: 720, caption: "ជួបគ្នានៅសាលារៀន" },

  "news/academics": { theme: "navy", w: 1200, h: 800, caption: "សកម្មភាពសិក្សា" },
  "news/graduation": { theme: "gold", w: 1200, h: 800, caption: "លទ្ធផលបាក់ឌុប" },
  "news/library": { theme: "olive", w: 1200, h: 800, caption: "បណ្ណាល័យ" },
  "news/community": { theme: "teal", w: 1200, h: 800, caption: "សហគមន៍" },
  "news/science": { theme: "plum", w: 1200, h: 800, caption: "វិទ្យាសាស្ត្រ" },
  "news/football": { theme: "steel", w: 1200, h: 800, caption: "កីឡាបាល់ទាត់" },

  "events/khmer-new-year": { theme: "gold", w: 1200, h: 800, caption: "ចូលឆ្នាំខ្មែរ" },
  "events/sports": { theme: "red", w: 1200, h: 800, caption: "កីឡា" },
  "events/open-house": { theme: "navy", w: 1200, h: 800, caption: "បើកផ្ទះ" },
  "events/pchum-ben": { theme: "plum", w: 1200, h: 800, caption: "បុណ្យភ្ជុំបិណ្ឌ" },
  "events/english-speech": { theme: "steel", w: 1200, h: 800, caption: "សុន្ទរកថាអង់គ្លេស" },
  "events/water-festival": { theme: "teal", w: 1200, h: 800, caption: "បុណ្យអុំទូក" },

  "academics/grade-7": { theme: "navy", w: 900, h: 640, caption: "ថ្នាក់ទី ៧" },
  "academics/grade-8": { theme: "steel", w: 900, h: 640, caption: "ថ្នាក់ទី ៨" },
  "academics/grade-9": { theme: "teal", w: 900, h: 640, caption: "ថ្នាក់ទី ៩" },
  "academics/grade-10": { theme: "gold", w: 900, h: 640, caption: "ថ្នាក់ទី ១០" },
  "academics/grade-11": { theme: "plum", w: 900, h: 640, caption: "ថ្នាក់ទី ១១" },
  "academics/grade-12": { theme: "red", w: 900, h: 640, caption: "ថ្នាក់ទី ១២" },

  "students/sports": { theme: "red", w: 900, h: 640, caption: "កីឡា" },
  "students/clubs": { theme: "navy", w: 900, h: 640, caption: "ក្លឹប" },
  "students/cultural": { theme: "gold", w: 900, h: 640, caption: "វប្បធម៌" },
  "students/academic": { theme: "steel", w: 900, h: 640, caption: "សិក្សា" },
  "students/community": { theme: "teal", w: 900, h: 640, caption: "សហគមន៍" },
  "students/leadership": { theme: "plum", w: 900, h: 640, caption: "ភាពជាអ្នកដឹកនាំ" },

  "campus/classrooms": { theme: "navy", w: 1100, h: 740, caption: "បន្ទប់រៀន" },
  "campus/library": { theme: "olive", w: 1100, h: 740, caption: "បណ្ណាល័យ" },
  "campus/computer-room": { theme: "steel", w: 1100, h: 740, caption: "កុំព្យូទ័រ" },
  "campus/science": { theme: "teal", w: 1100, h: 740, caption: "វិទ្យាសាស្ត្រ" },
  "campus/sports-area": { theme: "red", w: 1100, h: 740, caption: "ទីលានកីឡា" },
  "campus/student-areas": { theme: "gold", w: 1100, h: 740, caption: "តំបន់សិស្ស" },

  "gallery/g-1": { theme: "navy", w: 1000, h: 750, caption: "អាគារសាលា" },
  "gallery/g-2": { theme: "gold", w: 1000, h: 750, caption: "សិស្ស" },
  "gallery/g-3": { theme: "plum", w: 1000, h: 750, caption: "ចូលឆ្នាំខ្មែរ" },
  "gallery/g-4": { theme: "red", w: 1000, h: 750, caption: "បាល់ទាត់" },
  "gallery/g-5": { theme: "olive", w: 1000, h: 750, caption: "បណ្ណាល័យ" },
  "gallery/g-6": { theme: "teal", w: 1000, h: 750, caption: "សួនសាលា" },
  "gallery/g-7": { theme: "steel", w: 1000, h: 750, caption: "បាល់ទះ" },
  "gallery/g-8": { theme: "navy", w: 1000, h: 750, caption: "កុំព្យូទ័រ" },
  "gallery/g-9": { theme: "plum", w: 1000, h: 750, caption: "ពិសោធន៍" },
  "gallery/g-10": { theme: "red", w: 1000, h: 750, caption: "ទិវាឯករាជ្យ" },
  "gallery/g-11": { theme: "gold", w: 1000, h: 750, caption: "តន្ត្រី" },
  "gallery/g-12": { theme: "teal", w: 1000, h: 750, caption: "ទីលានកីឡា" },
};

const teacherIds = [
  "teacher-1", "teacher-2", "teacher-3", "teacher-4",
  "teacher-5", "teacher-6", "teacher-7", "teacher-8",
];
const teacherThemes = ["navy", "gold", "steel", "plum", "teal", "red", "olive", "gold"];
const teacherGenders = ["male", "female", "male", "female", "male", "female", "male", "female"];

let count = 0;
for (const [key, cfg] of Object.entries(images)) {
  const path = join(root, "public", "images", `${key}.svg`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, buildImage(key, cfg.theme, cfg.w, cfg.h, cfg.caption), "utf8");
  count++;
}

teacherIds.forEach((id, i) => {
  const path = join(root, "public", "images", "teachers", `${id}.svg`);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, buildAvatar(id, teacherThemes[i], teacherGenders[i]), "utf8");
  count++;
});

console.log(`Generated ${count} placeholder images.`);