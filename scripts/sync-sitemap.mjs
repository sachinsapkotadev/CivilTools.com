import { readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const SITE_URL = 'https://www.civiltools.com';
const PAGES_DIR = join(import.meta.dirname, '..', 'src', 'pages');
const TOOLS_DIR = join(PAGES_DIR, 'tools');
const OUTPUT = join(import.meta.dirname, '..', 'public', 'sitemap.xml');

function getPageFiles(dir) {
  const entries = [];
  try {
    const files = readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && file.name.endsWith('.astro')) {
        entries.push(relative(PAGES_DIR, join(dir, file.name)).replace(/\\/g, '/'));
      }
    }
  } catch {}
  return entries;
}

function getPriority(name) {
  if (name === 'index.astro') return '1.0';
  if (name.startsWith('tools/')) return '0.8';
  if (['about.astro', 'contact.astro', 'resources.astro'].includes(name)) return '0.7';
  if (['privacy.astro', 'terms.astro'].includes(name)) return '0.5';
  return '0.5';
}

function getChangefreq(name) {
  if (name === 'index.astro' || name.startsWith('tools/')) return 'weekly';
  return 'monthly';
}

function generate() {
  const pages = getPageFiles(PAGES_DIR).filter((f) => f !== 'api/create-checkout.ts');

  const urls = pages.map((page) => {
    const name = page.replace(/\.astro$/, '');
    const loc = name === 'index' ? '' : `/${name}`;
    return `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <changefreq>${getChangefreq(name)}</changefreq>
    <priority>${getPriority(name)}</priority>
  </url>`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  writeFileSync(OUTPUT, sitemap, 'utf-8');
  console.log(`Sitemap generated at ${OUTPUT} (${urls.length} URLs)`);
}

generate();
