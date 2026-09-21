import { readFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://prospoolcare.com';
const cityRoutes = [
  '/murrieta',
  '/temecula',
  '/lake-elsinore',
  '/winchester',
  '/canyon-lake',
];
const blogRoutes = [
  '/blog/hard-water',
  '/blog/salt-cell',
  '/blog/storm',
  '/blog/phosphates',
  '/blog/filters',
  '/blog/service',
  '/blog/black-algae',
  '/blog/pump',
  '/blog/green-pool',
  '/blog/cya',
];
const routes = [...cityRoutes, ...blogRoutes];
const outputDirectory = path.resolve(import.meta.dirname, '../dist/public');
const errors = [];
const valuesByTag = {
  title: new Map(),
  description: new Map(),
  canonical: new Map(),
  h1: new Map(),
};

function matches(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[1].trim());
}

function requireOne(route, label, values) {
  if (values.length !== 1) {
    errors.push(`${route}: expected exactly one ${label}, found ${values.length}`);
    return;
  }
  if (!values[0]) {
    errors.push(`${route}: ${label} must not be empty`);
    return;
  }
  valuesByTag[label].set(route, values[0]);
}

function requireUnique(label) {
  const routesByValue = new Map();
  for (const [route, value] of valuesByTag[label]) {
    const routes = routesByValue.get(value) ?? [];
    routes.push(route);
    routesByValue.set(value, routes);
  }
  for (const [value, routes] of routesByValue) {
    if (routes.length > 1) {
      errors.push(
        `${routes.join(', ')}: ${label} must be unique, but all use "${value}"`,
      );
    }
  }
}

let sitemap = '';
try {
  sitemap = await readFile(path.join(outputDirectory, 'sitemap.xml'), 'utf8');
} catch {
  errors.push('sitemap.xml: missing from production build');
}

const builtPages = new Map();
for (const route of routes) {
  const file = path.join(outputDirectory, route.slice(1), 'index.html');
  let html;
  try {
    html = await readFile(file, 'utf8');
  } catch {
    errors.push(`${route}: missing production output at ${file}`);
    continue;
  }

  builtPages.set(route, html);
  requireOne(route, 'title', matches(html, /<title[^>]*>([\s\S]*?)<\/title>/gi));
  requireOne(
    route,
    'description',
    matches(
      html,
      /<meta(?=[^>]*\bname=["']description["'])[^>]*\bcontent=["']([^"']*)["'][^>]*>/gi,
    ),
  );
  requireOne(
    route,
    'canonical',
    matches(
      html,
      /<link(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']*)["'][^>]*>/gi,
    ),
  );
  requireOne(route, 'h1', matches(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi));

  const canonical = valuesByTag.canonical.get(route);
  if (canonical && canonical !== `${siteUrl}${route}`) {
    errors.push(
      `${route}: canonical must be "${siteUrl}${route}", found "${canonical}"`,
    );
  }
  if (sitemap && !sitemap.includes(`<loc>${siteUrl}${route}</loc>`)) {
    errors.push(`${route}: missing from sitemap.xml`);
  }
}

for (const label of Object.keys(valuesByTag)) requireUnique(label);

const allBuiltHtml = [...builtPages.values()].join('\n');
for (const route of routes) {
  const hrefPattern = new RegExp(
    `href=["']${route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`,
    'i',
  );
  if (!hrefPattern.test(allBuiltHtml)) {
    errors.push(`${route}: no internal link found in city production outputs`);
  }
}

if (errors.length > 0) {
  console.error(`City SEO check failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `SEO check passed for ${routes.length} routes: outputs, unique SEO tags, sitemap entries, and internal links are present.`,
);