// Runs after `vite build`. Serves the built dist/ folder, visits each route
// in a headless browser, waits for React (and therefore <Seo />) to render,
// then writes the resulting HTML to disk as a static file for that route.
//
// Why this exists: this is a client-only React SPA (no server-side
// rendering), so the raw HTML returned by the server never contains the
// real <title>/<meta description>/OG tags — only what's in index.html.
// Bots that don't execute JavaScript (Telegram, Facebook, WhatsApp link
// previews, and sometimes Googlebot on a slow render) only ever see that
// static fallback. Prerendering each route once at build time fixes this
// without needing a real Node SSR server in production.
//
// Add a new route here whenever a new page is added to src/router.tsx.

import { execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import handler from 'serve-handler';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const PORT = 4173;

// One entry per public route in src/router.tsx.
// `file` is where the rendered HTML is written, relative to dist/.
const routes = [
  { url: '/', file: 'index.html' },
  { url: '/services/vidhuky', file: 'services/vidhuky/index.html' },
  { url: '/services/google-maps', file: 'services/google-maps/index.html' },
  { url: '/services/vedennya-biznesu', file: 'services/vedennya-biznesu/index.html' },
  { url: '/services/lendinhy', file: 'services/lendinhy/index.html' },
  { url: '/terms', file: 'terms/index.html' }
];

async function main() {
  if (!existsSync(distDir)) {
    console.error('dist/ not found — run `vite build` before prerendering.');
    process.exit(1);
  }

  const server = createServer((req, res) => handler(req, res, { public: distDir }));
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Prerender server running at http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless
  });

  try {
    for (const route of routes) {
      const page = await browser.newPage();
      const target = `http://localhost:${PORT}${route.url}`;

      await page.goto(target, { waitUntil: 'networkidle0', timeout: 30_000 });

      await page.waitForSelector('title');
      await new Promise((r) => setTimeout(r, 150));

      const html = await page.content();
      const outPath = path.join(distDir, route.file);
      await mkdir(path.dirname(outPath), { recursive: true });
      await writeFile(outPath, html, 'utf-8');

      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      const descMatch = html.match(/<meta name="description" content="(.*?)"/);
      console.log(`✓ ${route.url}`);
      console.log(`  title: ${titleMatch ? titleMatch[1] : '(missing!)'}`);
      console.log(`  description: ${descMatch ? descMatch[1].slice(0, 60) + '…' : '(missing!)'}`);

      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log('\nPrerender complete.');
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
