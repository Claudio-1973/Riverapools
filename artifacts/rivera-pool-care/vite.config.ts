import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';
import { blogTopics } from './src/data/blog-topics';

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    'PORT environment variable is required but was not provided.',
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

const localPages = [
  {
    slug: 'murrieta',
    city: 'Murrieta',
    title: 'Pool Cleaning & Repair in Murrieta, CA | Rivera Pool Care',
    description: 'Reliable pool cleaning, chemical balancing, filter care, and equipment repair in Murrieta, CA. Call Rivera Pool Care for a free estimate.',
  },
  {
    slug: 'temecula',
    city: 'Temecula',
    title: 'Pool Cleaning & Repair in Temecula, CA | Rivera Pool Care',
    description: 'Weekly pool cleaning, water balancing, filter service, and pool equipment repair in Temecula, CA. Request a free estimate from our local team.',
  },
  {
    slug: 'lake-elsinore',
    city: 'Lake Elsinore',
    title: 'Pool Cleaning in Lake Elsinore, CA | Rivera Pool Care',
    description: 'Dependable pool cleaning, green-pool recovery, filter care, and equipment repair in Lake Elsinore, CA. Call today for a free service estimate.',
  },
  {
    slug: 'winchester',
    city: 'Winchester',
    title: 'Pool Cleaning & Repair in Winchester, CA | Rivera Pool Care',
    description: 'Professional weekly pool cleaning, chemical balancing, filter service, and equipment repair for Winchester, CA homes. Get a free estimate today.',
  },
  {
    slug: 'canyon-lake',
    city: 'Canyon Lake',
    title: 'Pool Cleaning & Repair in Canyon Lake, CA | Rivera Pool Care',
    description: 'Local pool cleaning, chemical balancing, filter maintenance, and equipment repair in Canyon Lake, CA. Call Rivera Pool Care for a free estimate.',
  },
];

function localSeoPages() {
  return {
    name: 'local-seo-pages',
    apply: 'build' as const,
    async closeBundle() {
      const outputDirectory = path.resolve(import.meta.dirname, 'dist/public');
      const shell = await readFile(path.join(outputDirectory, 'index.html'), 'utf8');
      const replaceStaticRootContent = (html: string, content: string) =>
        html.replace(
          /<!-- STATIC_ROOT_CONTENT_START -->[\s\S]*?<!-- STATIC_ROOT_CONTENT_END -->/,
          content,
        );
      const escapeHtml = (value: string) =>
        value
          .replaceAll('&', '&amp;')
          .replaceAll('<', '&lt;')
          .replaceAll('>', '&gt;')
          .replaceAll('"', '&quot;');

      const blogRouteDirectory = path.join(outputDirectory, 'blog');
      await mkdir(blogRouteDirectory, { recursive: true });
      const blogHtml = shell
        .replace(/<title>.*?<\/title>/, `<title>Pool Cleaning &amp; Maintenance Knowledge Center | Rivera Pool Care</title>`)
        .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="Ten practical pool cleaning and maintenance guides for Riverside County homeowners, covering chemistry, filtration, equipment, algae, weather, and restorative cleaning." />`)
        .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="https://prospoolcare.com/blog" />`)
        .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="Pool Cleaning &amp; Maintenance Knowledge Center | Rivera Pool Care" />`)
        .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="Ten practical pool cleaning and maintenance guides for Riverside County homeowners." />`)
        .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="https://prospoolcare.com/blog" />`)
        .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="Pool Cleaning &amp; Maintenance Knowledge Center | Rivera Pool Care" />`)
        .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="Ten practical pool cleaning and maintenance guides for Riverside County homeowners." />`)
        .replace(
          /<!-- STATIC_ROOT_CONTENT_START -->[\s\S]*?<!-- STATIC_ROOT_CONTENT_END -->/,
          [
            '<main data-static-seo-fallback>',
            '<h1>Pool Cleaning &amp; Maintenance Knowledge Center</h1>',
            '<p>Ten practical pool care guides for the heat, hard water, wind, dust, and equipment realities of Riverside County. Rivera Pool Care shares clear maintenance information for homeowners who want cleaner water, dependable circulation, and fewer surprise repairs.</p>',
            '<p>Browse guidance about water chemistry, filtration, algae, pumps, heaters, seasonal maintenance, and the warning signs that a pool needs professional service. Every guide is written to help you understand the issue before choosing the next step.</p>',
            '<nav aria-label="Pool care navigation"><a href="/">Rivera Pool Care home</a> · <a href="/#services">Pool services</a> · <a href="/murrieta">Murrieta pool service</a> · <a href="/temecula">Temecula pool service</a></nav>',
            '<h2>Pool care guides for local homeowners</h2>',
            `<ul>${blogTopics.map((topic) => `<li><a href="/blog/${topic.id}">${escapeHtml(topic.title)}</a></li>`).join('')}</ul>`,
            '</main>',
          ].join(''),
        );
      await writeFile(path.join(blogRouteDirectory, 'index.html'), blogHtml);

      for (const topic of blogTopics) {
        const url = `https://prospoolcare.com/blog/${topic.id}`;
        const guideLinks = blogTopics
          .map((guide) => `<a href="/blog/${guide.id}">${escapeHtml(guide.title)}</a>`)
          .join('');
        const articleFallback = [
          '<main data-static-seo-fallback>',
          '<article>',
          `<a href="/blog">All pool care guides</a>`,
          `<h1>${escapeHtml(topic.title)}</h1>`,
          `<p>${escapeHtml(topic.intro)}</p>`,
          '<h2>What pool owners should know</h2>',
          `<ul>${topic.facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join('')}</ul>`,
          `<p><strong>Rivera Pool Care takeaway:</strong> ${escapeHtml(topic.takeaway)}</p>`,
          '</article>',
          `<nav aria-label="More pool care guides">${guideLinks}</nav>`,
          '</main>',
        ].join('');
        const articleHtml = shell
          .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(topic.seoTitle)}</title>`)
          .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escapeHtml(topic.description)}" />`)
          .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${url}" />`)
          .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${escapeHtml(topic.seoTitle)}" />`)
          .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${escapeHtml(topic.description)}" />`)
          .replace(/<meta property="og:type" content=".*?" \/>/, `<meta property="og:type" content="article" />`)
          .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${url}" />`)
          .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${escapeHtml(topic.seoTitle)}" />`)
          .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${escapeHtml(topic.description)}" />`)
          .replace(
            /<!-- STATIC_ROOT_CONTENT_START -->[\s\S]*?<!-- STATIC_ROOT_CONTENT_END -->/,
            articleFallback,
          );
        const articleDirectory = path.join(blogRouteDirectory, topic.id);
        await mkdir(articleDirectory, { recursive: true });
        await writeFile(path.join(articleDirectory, 'index.html'), articleHtml);
      }

      for (const page of localPages) {
        const url = `https://prospoolcare.com/${page.slug}`;
        const cityLinks = localPages
          .map(({ slug, city }) => `<a href="/${slug}">Pool service in ${city}, CA</a>`)
          .join('');
        const staticPage = [
          '<main data-static-seo-fallback>',
          `<h1>Pool Cleaning &amp; Equipment Repair in ${page.city}, CA</h1>`,
          `<p>Rivera Pool Care provides dependable weekly pool cleaning, chemical balancing, filter service, and equipment repair for homeowners in ${page.city}. Our family-owned, bilingual team keeps residential pools clear, balanced, and ready to enjoy through the hot Riverside County seasons.</p>`,
          `<p>Pool conditions in ${page.city} can change with heat, wind, dust, landscaping debris, hard water, and how often the pool is used. We check the water, surfaces, baskets, circulation, and equipment during each visit, then explain any issue that needs attention.</p>`,
          '<h2>Pool services available locally</h2>',
          '<ul><li>Weekly cleaning, brushing, and vacuuming</li><li>Water testing and chemical balancing</li><li>Pump, motor, filter, and heater repair</li><li>Green-pool recovery and deep filter care</li><li>Leak and automation troubleshooting</li></ul>',
          `<nav aria-label="Pool service areas">${cityLinks}</nav>`,
          `<p><a href="/#contact">Request a free estimate</a> or call <a href="tel:+19513839753">(951) 383-9753</a> to discuss pool service in ${page.city}.</p>`,
          '</main>',
        ].join('');
        const html = shell
          .replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
          .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${page.description}" />`)
          .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${url}" />`)
          .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${page.title}" />`)
          .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${page.description}" />`)
          .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${url}" />`)
          .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${page.title}" />`)
          .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${page.description}" />`)
          .replace(
            /<!-- STATIC_ROOT_CONTENT_START -->[\s\S]*?<!-- STATIC_ROOT_CONTENT_END -->/,
            staticPage,
          );
        const routeDirectory = path.join(outputDirectory, page.slug);
        await mkdir(routeDirectory, { recursive: true });
        await writeFile(path.join(routeDirectory, 'index.html'), html);
      }
    },
  };
}

if (!basePath) {
  throw new Error(
    'BASE_PATH environment variable is required but was not provided.',
  );
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    localSeoPages(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
