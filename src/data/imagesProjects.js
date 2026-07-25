// imagesProjects.js

// ambil semua gambar dari semua subfolder assets/*/*.png
const modules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});

// group berdasarkan nama folder -> array gambar terurut
const grouped = {};

Object.entries(modules).forEach(([path, url]) => {
  // path contoh: "../assets/capstone/2.png"
  const parts = path.split('/');
  const folder = parts[parts.length - 2]; // "capstone"
  const filename = parts[parts.length - 1]; // "2.png"

  if (!grouped[folder]) grouped[folder] = [];
  grouped[folder].push({ filename, url });
});

// urutkan tiap grup berdasarkan nama file (1.png, 2.png, 3.png, ...)
Object.keys(grouped).forEach((folder) => {
  grouped[folder].sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }));
});

export const PROJECT_IMAGES = Object.fromEntries(
  Object.entries(grouped).map(([folder, files]) => [folder, files.map((f) => f.url)])
);