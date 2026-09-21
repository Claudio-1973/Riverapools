/**
 * Post-build script: generates static HTML for each city page.
 * Each city HTML is a copy of dist/index.html with unique title, meta tags,
 * canonical URL, and LocalBusiness JSON-LD so Googlebot sees them immediately.
 *
 * Usage: node scripts/generate-city-pages.mjs
 * Run after: vite build
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const baseHtml = readFileSync(join(distDir, "index.html"), "utf-8");
const seoPages = JSON.parse(readFileSync(join(__dirname, "..", "src/components/mockups/rivera-pools/seo-pages.json"), "utf-8"));
const serviceDetails = JSON.parse(readFileSync(join(__dirname, "..", "src/components/mockups/rivera-pools/service-details.json"), "utf-8"));
const cityLocalContent = JSON.parse(readFileSync(join(__dirname, "..", "src/components/mockups/rivera-pools/city-local-content.json"), "utf-8"));
const blogPost = JSON.parse(readFileSync(join(__dirname, "..", "src/components/mockups/rivera-pools/blog-post.json"), "utf-8"));
const pebbleQuartzPost = JSON.parse(readFileSync(join(__dirname, "..", "src/components/mockups/rivera-pools/pebble-vs-quartz-post.json"), "utf-8"));
const remodelingSource = readFileSync(
  join(__dirname, "..", "..", "..", "attached_assets", "Pasted--1-The-Sound-of-Hollow-Plaster-How-to-Tell-if-Your-Pool_1788486146375.txt"),
  "utf-8",
);
const cleaningSource = readFileSync(
  join(__dirname, "..", "..", "..", "attached_assets", "Pasted-Aqu-tienes-la-serie-completa-de-los-10-art-culos-redact_1788486751351.txt"),
  "utf-8",
);

const blogHubMeta = {
  slug: "blog",
  title: "Pool Remodeling & Pool Care Blog | Rivera Pools Riverside",
  description: "Explore practical pool cleaning advice and ten contractor-level guides to pool remodeling, finishes, repairs, coping, tile, startup, and equipment.",
  keyword: "pool cleaning and remodeling blog Riverside CA",
};

const remodelingBlogMeta = {
  slug: "blog/pool-remodeling",
  title: "Pool Remodeling Guide | Riverside County | Rivera Pools",
  description: "Ten technical pool remodeling guides covering plaster failure, chip-out preparation, pebble and quartz finishes, Baja shelves, tile, coping, startup, and pumps.",
  keyword: "pool remodeling blog Riverside CA",
};

const cleaningBlogMeta = {
  slug: "blog/pool-cleaning-maintenance-riverside-ca",
  title: "Pool Cleaning & Maintenance Guide | Riverside County | Rivera Pools",
  description: "Ten practical pool care guides for Riverside County covering hard water, salt cells, Santa Ana winds, filters, algae, CYA, pumps, chemistry, and restorative cleaning.",
  keyword: "pool cleaning maintenance blog Riverside County CA",
};

const esc = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const staticLicenseFooter = () => `
    <footer style="border-top:1px solid #dbe5e8;margin-top:40px;padding-top:20px;color:#475569">
      <p>Rivera Pools Riverside · (951) 345-9276</p>
      <p>CA C-35 Contractor License #1053279 · Licensed, Bonded, &amp; Insured</p>
    </footer>`;

function parseRemodelingTopics(source) {
  const headings = [...source.matchAll(/^# (\d+)\. (.+)$/gm)];
  return headings.map((heading, index) => {
    const start = heading.index + heading[0].length;
    const end = headings[index + 1]?.index ?? source.length;
    return {
      number: heading[1],
      title: heading[2].trim(),
      slug: `topic-${heading[1]}`,
      markdown: source.slice(start, end).trim(),
    };
  });
}

const remodelingTopics = parseRemodelingTopics(remodelingSource);

function parseNumberedArticles(source, count) {
  const headings = [];
  let cursor = 0;
  for (let number = 1; number <= count; number += 1) {
    const pattern = new RegExp(`^${number}\\. (.+)$`, "gm");
    pattern.lastIndex = cursor;
    const heading = pattern.exec(source);
    if (!heading) throw new Error(`Could not find cleaning article ${number}`);
    headings.push(heading);
    cursor = pattern.lastIndex;
  }
  return headings.map((heading, index) => {
    const start = heading.index + heading[0].length;
    const end = headings[index + 1]?.index ?? source.length;
    return {
      number: String(index + 1),
      title: heading[1].trim(),
      slug: `topic-${index + 1}`,
      markdown: source.slice(start, end).trim(),
    };
  });
}

const cleaningTopics = parseNumberedArticles(cleaningSource, 10);

function replaceRoot(html, content) {
  const rootStart = html.indexOf('    <div id="root"');
  const bodyEnd = html.indexOf("  </body>", rootStart);
  if (rootStart < 0 || bodyEnd < 0) throw new Error("Could not locate static root in index.html");
  return `${html.slice(0, rootStart)}    <div id="root" style="height: 100%">${content}</div>\n${html.slice(bodyEnd)}`;
}

function cityStaticRoot(city) {
  const local = cityLocalContent[city.slug];
  if (!local) throw new Error(`Missing local content for ${city.slug}`);
  const faqs = local.localFaqs;
  const h1 = city.h1 || city.title.replace(/\s+\|.*$/, "");
  const localServices = local.localServices?.length
    ? `<h2 style="font-size:1.5rem;margin-top:32px">Services available in ${esc(city.name)}</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">${local.localServices.map((service) => `<article style="border:1px solid #dbe5e8;border-radius:16px;padding:18px"><h3 style="margin:0 0 8px;color:#0f253f">${esc(service.title)}</h3><p style="color:#475569;line-height:1.7">${esc(service.description)}</p><a href="${esc(service.href)}">Learn about this service</a></article>`).join("")}</div>`
    : "";
  const localSigns = local.resurfacingSigns?.length
    ? `<h2 style="font-size:1.5rem;margin-top:32px">Signs a ${esc(city.name)} pool may need resurfacing</h2><ul style="line-height:1.8;padding-left:24px">${local.resurfacingSigns.map((sign) => `<li><strong>${esc(sign.title)}:</strong> ${esc(sign.description)}</li>`).join("")}</ul>`
    : "";
  const localFinishes = local.availableFinishes?.length
    ? `<h2 style="font-size:1.5rem;margin-top:32px">Finishes available in ${esc(city.name)}</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">${local.availableFinishes.map((finish) => `<article style="border:1px solid #dbe5e8;border-radius:16px;padding:18px"><h3 style="margin:0 0 8px;color:#0f253f">${esc(finish.name)}</h3><p style="color:#475569;line-height:1.7">${esc(finish.description)}</p><a href="${esc(finish.href)}">Compare this finish</a></article>`).join("")}</div>`
    : "";
  const project = local.documentedProject;
  const projectSection = project
    ? `<section style="margin-top:32px;padding:24px;background:#f8fafc;border:1px solid #bfe3e5;border-radius:18px"><p style="color:#0891b2;font-size:.8rem;font-weight:700;letter-spacing:.12em">DOCUMENTED LOCAL PROJECT</p><h2 style="font-size:1.5rem;margin:10px 0">${esc(project.title)} — ${esc(project.location)}</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px"><div><h3>The problem</h3><p style="color:#475569;line-height:1.7">${esc(project.problem)}</p></div><div><h3>The work</h3><p style="color:#475569;line-height:1.7">${esc(project.work)}</p></div><div><h3>The result</h3><p style="color:#475569;line-height:1.7">${esc(project.result)}</p></div></div><div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:18px">${project.photos.map((photo) => `<img src="/images/${esc(photo.file)}" alt="${esc(photo.alt)}" width="500" height="375" style="max-width:48%;height:auto;border-radius:14px" />`).join("")}</div></section>`
    : `<section style="margin-top:32px;padding:24px;background:#f8fafc;border:1px solid #dbe5e8;border-radius:18px"><p style="color:#0891b2;font-size:.8rem;font-weight:700;letter-spacing:.12em">PROJECT DOCUMENTATION</p><h2 style="font-size:1.5rem;margin:10px 0">See completed Rivera Pools work</h2><p style="color:#475569;line-height:1.7">We show representative completed work below and do not present a photo as a ${esc(city.name)}-specific case study until the project location and scope are documented.</p></section>`;
  const projectPhotos = local.projectPhotos?.length ? local.projectPhotos : [
    { file: "photo1.webp", alt: "Representative Rivera Pools pool remodeling project with new coping" },
    { file: "photo2.webp", alt: "Representative Rivera Pools pool resurfacing project" },
  ];
  const nearbyAreas = local.nearbyAreas?.length
    ? `<h2 style="font-size:1.5rem;margin-top:32px">Nearby areas we serve from ${esc(city.name)}</h2><p style="color:#475569;line-height:1.8">${local.nearbyAreas.map((area) => `<a href="${esc(area.href)}" style="margin-right:18px">${esc(area.name)}</a>`).join("")}</p>`
    : "";
  return `<div style="font-family:Inter,sans-serif;color:#1e293b;max-width:1200px;margin:0 auto;padding:32px 24px">
    <header><a href="/" style="font-weight:800;letter-spacing:.05em;color:#0f253f">RIVERA POOLS RIVERSIDE</a></header>
    <main>
       <h1 style="font-size:2.5rem;font-weight:800;line-height:1.15;margin:48px 0 16px">${esc(h1)}</h1>
      <p style="font-size:1.125rem;color:#475569">${esc(city.description)}</p>
       <p style="font-weight:700;color:#334155">Rivera Pools Riverside provides pool inspections, resurfacing, plastering, finish selection, and remodeling for homeowners in ${esc(city.name)}, CA. <a href="#contact">Request an inspection or free estimate</a>, or call <a href="tel:+19513459276">(951) 345-9276</a>.</p>
      <h2 style="font-size:1.5rem;margin-top:32px">Projects We Plan for ${esc(city.name)} Homeowners</h2>
      <p style="color:#475569;line-height:1.75">${esc(local.projectFocus)}</p>
      <h2 style="font-size:1.5rem;margin-top:32px">Local Pool Planning Considerations</h2>
      <p style="color:#475569;line-height:1.75">${esc(local.localConsiderations)}</p>
       ${localServices}
      <h2 style="font-size:1.5rem;margin-top:32px">Pool Plastering &amp; Remodeling Services in ${esc(city.name)}</h2>
      <ul style="line-height:2;padding-left:24px">
         <li><a href="/pool-resurfacing">Pool resurfacing and replastering</a></li>
         <li><a href="/pool-finishes/quartz">Quartz pool finish</a>, <a href="/pool-finishes/pebble">pebble finishes</a>, and <a href="/pool-finishes/stone-scapes">StoneScapes finishes</a></li>
        <li><a href="/pool-finishes/diamond-brite">Diamond Brite pool finish</a></li>
        <li><a href="/travertine-coping">Travertine coping</a> and waterline tile</li>
        <li><a href="/pool-plaster-delaminating">Delaminating plaster repair</a> and <a href="/rough-pool-plaster-repair">rough plaster repair</a></li>
         <li><a href="/pool-leak-detection">Pool leak detection and water-loss assessment</a></li>
         <li><a href="/pool-equipment-upgrades">Pool equipment upgrades and automation</a></li>
        <li>Pool cleaning and maintenance</li>
      </ul>
      <h2 style="font-size:1.5rem;margin-top:32px">Pool Finish Options in ${esc(city.name)}</h2>
      <ul style="line-height:2;padding-left:24px">
        <li>Standard Plaster — a clean, classic resurfacing option</li>
        <li>Quartz Finish — fine aggregate with color and texture</li>
        <li>Pebble &amp; Stone Scapes — durable natural aggregate blends</li>
      </ul>
      <h2 style="font-size:1.5rem;margin-top:32px">Technical Pool Resurfacing Process</h2>
      <ol style="line-height:2;padding-left:24px">
        <li>Drain &amp; Inspect</li>
        <li>Chip-out &amp; Prep</li>
        <li>Troweling &amp; Detail</li>
        <li>Fill &amp; Balance</li>
      </ol>
      <h2 style="font-size:1.5rem;margin-top:32px">Pool Surface Problems We Solve</h2>
      <ul style="line-height:2;padding-left:24px">
        <li>Rough pool plaster and sharp surfaces</li>
        <li>Pool stains and discoloration</li>
        <li>Delaminating or lifting plaster</li>
        <li>Cracks and surface damage</li>
      </ul>
       ${localSigns}
       ${localFinishes}
      <h2 style="font-size:1.5rem;margin-top:32px">Neighborhoods We Serve</h2>
      <p style="color:#475569">${city.areaServed.map(esc).join(", ")}</p>
       ${projectSection}
      <h2 style="font-size:1.5rem;margin-top:32px">Representative Rivera Pools Project Photos</h2>
       <p style="color:#475569">These original Rivera Pools photos help homeowners compare finishes, coping, tile, and resurfacing options. They are not labeled as city-specific case studies unless identified above.</p>
      <div>
         ${projectPhotos.map((photo) => `<img src="/images/${esc(photo.file)}" alt="${esc(photo.alt)}" width="400" height="300" style="max-width:48%;height:auto;margin:8px" />`).join("")}
      </div>
      <h2 style="font-size:1.5rem;margin-top:32px">Questions About Pool Remodeling in ${esc(city.name)}</h2>
      ${faqs.map((faq) => `<h3 style="font-size:1.1rem;margin-top:20px">${esc(faq.q)}</h3><p style="color:#475569">${esc(faq.a)}</p>`).join("")}
       ${nearbyAreas}
      <p style="margin-top:32px"><strong>Call:</strong> <a href="tel:+19513459276">(951) 345-9276</a> for a free estimate.</p>
    </main>
    <footer style="border-top:1px solid #dbe5e8;margin-top:40px;padding-top:20px;color:#475569">
      <p>Rivera Pools Riverside · (951) 345-9276</p>
      <p>CA C-35 Contractor License #1053279 · Licensed, Bonded, &amp; Insured</p>
    </footer>
  </div>`;
}

function cityFaqs(city) {
  const local = cityLocalContent[city.slug];
  if (!local) throw new Error(`Missing local content for ${city.slug}`);
  return local.localFaqs;
}

function seoStaticRoot(page, details) {
  const relatedPages = seoPages
    .filter((related) => related.slug !== page.slug)
    .map((related) => `<a href="/${related.slug}">${esc(related.title)}</a>`)
    .join(" · ");
  const locations = page.locations
    .map((location) => {
      const slug = location.toLowerCase().replace(/\s+/g, "-");
      return `<a href="${slug === "riverside" ? "/" : `/${slug}`}">${esc(location)}</a>`;
    })
    .join(", ");
  const list = (items) => `<ul style="line-height:1.8;padding-left:24px">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
  const photos = details.images
    .map((image) => `<img src="/images/${esc(image.file)}" alt="${esc(image.alt)}" width="600" height="450" style="max-width:48%;height:auto;margin:8px" />`)
    .join("");
  const comparison = details.comparison?.length
    ? `<h2 style="font-size:1.5rem;margin-top:32px">How the options compare</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">${details.comparison.map((item) => `<article style="border:1px solid #dbe5e8;border-radius:16px;padding:18px"><h3 style="margin:0 0 8px;color:#0f253f">${esc(item.label)}</h3><p style="color:#475569;line-height:1.7;margin:0">${esc(item.detail)}</p></article>`).join("")}</div>`
    : "";
  const whenToCall = details.whenToCall?.length
    ? `<h2 style="font-size:1.5rem;margin-top:32px">When to call</h2>${list(details.whenToCall)}`
    : "";
  const localLinks = details.localLinks?.length
    ? `<h2 style="font-size:1.5rem;margin-top:32px">Local service pages</h2><p style="color:#475569;line-height:1.8">${details.localLinks.map((link) => `<a href="${esc(link.href)}" style="margin-right:18px">${esc(link.label)}</a>`).join("")}</p>`
    : "";
  const diagnosticNotes = details.diagnosticNotes?.length
    ? `<h2 style="font-size:1.5rem;margin-top:32px">What a Useful Site Evaluation Should Answer</h2>${details.diagnosticNotes.map((note) => `<p style="color:#475569;line-height:1.75">${esc(note)}</p>`).join("")}`
    : "";
  const ownerChecklist = details.ownerChecklist?.length
    ? `<h2 style="font-size:1.5rem;margin-top:32px">Questions to Settle Before Signing a Proposal</h2>${list(details.ownerChecklist)}`
    : "";
  const projectExample = details.projectExample
    ? `<section style="margin-top:40px;padding:28px;background:#0f253f;color:white;border-radius:18px"><p style="color:#67e8f9;font-weight:700">DOCUMENTED RIVERA POOLS PROJECT</p><h2>${esc(details.projectExample.title)}</h2><p>${esc(details.projectExample.summary)}</p><h3>Condition and goal</h3><p>${esc(details.projectExample.challenge)}</p><h3>Coordinated response</h3><p>${esc(details.projectExample.response)}</p><p><strong>What this project demonstrates:</strong> ${esc(details.projectExample.lesson)}</p><div><img src="/images/before1.webp" alt="Before work on ${esc(details.projectExample.title)}" width="500" height="375" style="max-width:46%;height:auto;margin:8px" /><img src="/images/photo2.webp" alt="Completed ${esc(details.projectExample.title)} by Rivera Pools" width="500" height="375" style="max-width:46%;height:auto;margin:8px" /></div></section>`
    : "";
  const serviceSummary = `${page.title} for homeowners in Riverside County and the Inland Empire, including ${page.locations.slice(0, 4).map(esc).join(", ")}.`;
  return `<div style="font-family:Inter,sans-serif;color:#1e293b;max-width:1200px;margin:0 auto;padding:32px 24px">
    <header><a href="/" style="font-weight:800;letter-spacing:.05em;color:#0f253f">RIVERA POOLS RIVERSIDE</a></header>
    <main>
      <p style="margin-top:48px;color:#0891b2;font-size:.8rem;font-weight:700;letter-spacing:.12em">${esc(page.eyebrow)}</p>
      <h1 style="font-size:2.5rem;font-weight:800;line-height:1.15;margin:12px 0 16px">${esc(page.title)} in Riverside County &amp; Inland Empire</h1>
      <p style="font-size:1.125rem;color:#475569">${esc(page.intro)}</p>
      <p style="font-weight:700;color:#334155">${serviceSummary}</p>
      <h2 style="font-size:1.5rem;margin-top:32px">The Problem</h2>
      <p style="color:#475569">${esc(page.problem)}</p>
      <h2 style="font-size:1.5rem;margin-top:32px">The Rivera Pools Solution</h2>
      <p style="color:#475569">${esc(page.solution)}</p>
      <h2 style="font-size:1.5rem;margin-top:32px">Symptoms to Watch For</h2>
      ${list(details.symptoms)}
      <h2 style="font-size:1.5rem;margin-top:32px">Possible Causes We Check</h2>
      ${list(details.causes)}
      ${diagnosticNotes}
      ${whenToCall}
      <h2 style="font-size:1.5rem;margin-top:32px">What We Cover</h2>
      <ul style="line-height:2;padding-left:24px">${page.materials.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
      <h2 style="font-size:1.5rem;margin-top:32px">Finish and Project Options</h2>
      ${list(details.options)}
      ${comparison}
      <h2 style="font-size:1.5rem;margin-top:32px">Our Process</h2>
      ${list(details.process)}
      <h2 style="font-size:1.5rem;margin-top:32px">Duration and Price Factors</h2>
      <p style="color:#475569;line-height:1.75">${esc(details.duration)}</p>
      ${list(details.priceFactors)}
      <h2 style="font-size:1.5rem;margin-top:32px">Post-Project Maintenance</h2>
      ${list(details.aftercare)}
      ${projectExample}
      ${ownerChecklist}
      <h2 style="font-size:1.5rem;margin-top:32px">Representative Rivera Pools Project Photos</h2>
      <p style="color:#475569">These photos show completed Rivera Pools work and before-and-after renovation details. They are representative project examples, not city-specific case studies.</p>
      <div style="display:flex;flex-wrap:wrap;margin:-8px">${photos}</div>
      <h2 style="font-size:1.5rem;margin-top:32px">Common Questions</h2>
      ${page.faqs.map((faq) => `<h3 style="font-size:1.1rem;margin-top:20px">${esc(faq.q)}</h3><p style="color:#475569">${esc(faq.a)}</p>`).join("")}
      <h2 style="font-size:1.5rem;margin-top:32px">Service Area</h2>
      <p style="color:#475569">${locations}</p>
      ${localLinks}
      <h2 style="font-size:1.5rem;margin-top:32px">Related Pool Remodeling Services</h2>
      <p style="color:#475569;line-height:1.8">${relatedPages}</p>
      <section id="estimate-form" style="margin-top:40px;padding:28px;background:#0f253f;color:white;border-radius:18px">
        <h2 style="font-size:1.5rem;margin:0 0 10px">Get a Free Estimate</h2>
        <p style="color:#dbeafe">Tell us about your pool and the service you need.</p>
        <form action="/#contact" method="get" style="display:grid;gap:12px;max-width:520px">
          <label>Full name<input name="name" required style="display:block;width:100%;padding:10px;margin-top:4px" /></label>
          <label>Phone<input name="phone" type="tel" required style="display:block;width:100%;padding:10px;margin-top:4px" /></label>
          <label>Service<textarea name="service" rows="2" style="display:block;width:100%;padding:10px;margin-top:4px"></textarea></label>
          <button type="submit" style="padding:12px 18px;background:#06b6d4;color:white;border:0;border-radius:10px;font-weight:700">Get a Free Estimate</button>
        </form>
        <p style="margin-top:18px"><a href="tel:+19513459276" style="color:#67e8f9">Call (951) 345-9276</a> — ${esc(details.ctaText ?? "Call for a free estimate.")}</p>
      </section>
    </main>
    <footer style="border-top:1px solid #dbe5e8;margin-top:40px;padding-top:20px;color:#475569">
      <p>Rivera Pools Riverside · (951) 345-9276</p>
      <p>CA C-35 Contractor License #1053279 · Licensed, Bonded, &amp; Insured</p>
    </footer>
  </div>`;
}

function blogStaticRoot(post) {
  const sections = post.sections.map((section) => `
      <section style="margin-top:32px">
        <h2 style="font-size:1.5rem;margin-bottom:12px">${esc(section.heading)}</h2>
        ${section.paragraphs.map((paragraph) => `<p style="color:#475569;line-height:1.7">${esc(paragraph)}</p>`).join("")}
        ${section.bullets.length ? `<ul style="line-height:2;padding-left:24px">${section.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join("")}</ul>` : ""}
      </section>`).join("");
  const faqs = post.faqs.map((faq) => `
      <h3 style="font-size:1.1rem;margin-top:20px">${esc(faq.question)}</h3>
      <p style="color:#475569">${esc(faq.answer)}</p>`).join("");

  return `<div style="font-family:Inter,sans-serif;color:#1e293b;max-width:1200px;margin:0 auto;padding:32px 24px">
    <header><a href="/" style="font-weight:800;letter-spacing:.05em;color:#0f253f">RIVERA POOLS RIVERSIDE</a></header>
    <main>
      <p style="margin-top:48px;color:#0891b2;font-size:.8rem;font-weight:700;letter-spacing:.12em">${esc(post.eyebrow)}</p>
      <h1 style="font-size:2.5rem;font-weight:800;line-height:1.15;margin:12px 0 16px">${esc(post.title)}</h1>
      <p style="font-size:1.125rem;color:#475569">${esc(post.intro)}</p>
      <p style="color:#64748b;font-size:.9rem">${esc(post.published)} · ${esc(post.readTime)}</p>
      <img src="/images/photo3.webp" alt="Clean backyard swimming pool in Riverside County, California" width="800" height="533" style="max-width:100%;height:auto;margin-top:24px" />
      ${sections}
      <h2 style="font-size:1.5rem;margin-top:32px">Pool cleaning questions</h2>
      ${faqs}
      <h2 style="font-size:1.5rem;margin-top:32px">Related Rivera Pools services</h2>
      <p style="line-height:1.8">
        <a href="/pool-finishes/pebble">Pebble pool finishes</a> ·
        <a href="/pool-plaster-delaminating">Pool plaster repair</a> ·
        <a href="/riverside">Pool remodeling in Riverside</a> ·
        <a href="/temecula">Pool remodeling in Temecula</a>
      </p>
      <p style="margin-top:32px"><strong>Call:</strong> <a href="tel:+19513459276">(951) 345-9276</a> for pool cleaning and maintenance information.</p>
     </main>
     ${staticLicenseFooter()}
  </div>`;
}

function inlineMarkdown(value) {
  let output = esc(value);
  output = output.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, rawUrl) => {
    let url = rawUrl.replace(/&amp;/g, "&");
    const localSearch = url.match(/^https:\/\/www\.google\.com\/search\?q=(\/[^&]+)$/);
    if (localSearch) url = localSearch[1];
    return `<a href="${esc(url)}">${label}</a>`;
  });
  return output;
}

function markdownToHtml(markdown) {
  const html = [];
  let paragraph = [];
  let listType = null;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p style="color:#475569;line-height:1.75">${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (!listType) return;
    html.push(`</${listType}>`);
    listType = null;
  };

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }
    if (line === "---") {
      flushParagraph();
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      html.push(`<h3 style="font-size:1.25rem;margin:28px 0 10px">${inlineMarkdown(line.slice(3))}</h3>`);
      continue;
    }
    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      html.push(`<h4 style="font-size:1.05rem;margin:22px 0 8px">${inlineMarkdown(line.slice(4))}</h4>`);
      continue;
    }
    const unordered = line.match(/^\*\s+(.+)$/);
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const nextList = unordered ? "ul" : "ol";
      if (listType && listType !== nextList) flushList();
      if (!listType) {
        listType = nextList;
        html.push(`<${listType} style="line-height:1.8;padding-left:24px;color:#475569">`);
      }
      html.push(`<li>${inlineMarkdown((unordered || ordered)[1])}</li>`);
      continue;
    }
    if (line.startsWith("|")) {
      flushParagraph();
      flushList();
      const cells = line.split("|").map((cell) => cell.trim()).filter(Boolean);
      if (cells.every((cell) => /^[-:\s]+$/.test(cell))) continue;
      if (cells.length) {
        html.push(`<p style="color:#475569;line-height:1.65"><strong>${inlineMarkdown(cells[0])}</strong>${cells.slice(1).map((cell) => ` · ${inlineMarkdown(cell)}`).join("")}</p>`);
      }
      continue;
    }
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return html.join("\n");
}

function blogHubStaticRoot() {
  return `<div style="font-family:Inter,sans-serif;color:#17324d;max-width:1200px;margin:0 auto;padding:32px 24px">
    <header><a href="/" style="font-weight:800;letter-spacing:.05em;color:#0f253f">RIVERA POOLS RIVERSIDE</a></header>
    <main>
      <p style="margin-top:48px;color:#0891b2;font-size:.8rem;font-weight:700;letter-spacing:.12em">RIVERA POOLS FIELD NOTES</p>
      <h1 style="font-size:2.75rem;font-weight:800;line-height:1.12;margin:12px 0 16px">Pool Cleaning and Remodeling Blogs</h1>
      <p style="font-size:1.125rem;color:#475569;max-width:760px">Practical guidance for keeping pool water healthy and understanding the structure, materials, and workmanship behind a successful remodel.</p>
      <section style="margin-top:40px">
        <h2><a href="/blog/pool-cleaning-maintenance-riverside-ca">Pool Cleaning Blog</a></h2>
        <p style="color:#475569">Weekly service, water chemistry, filtration, and early warning signs.</p>
        <h2 style="margin-top:28px"><a href="/blog/pool-remodeling">Pool Remodeling Knowledge Center</a></h2>
        <p style="color:#475569">Ten technical guides about plaster failure, surface preparation, finishes, structural additions, tile, coping, startup, and equipment.</p>
        <h2 style="margin-top:28px"><a href="/blog/pebble-vs-quartz-pool-finishes">Pebble vs. Quartz Pool Finishes</a></h2>
        <p style="color:#475569">A plaster and aggregate finish comparison covering texture, appearance, lifespan, investment, and 28-day startup care.</p>
      </section>
     </main>
     ${staticLicenseFooter()}
  </div>`;
}

function remodelingBlogStaticRoot() {
  const articles = remodelingTopics.map((topic) => `
      <article id="${topic.slug}" style="margin-top:48px;border-top:1px solid #d9e5e7;padding-top:32px">
        <p style="color:#0891b2;font-size:.8rem;font-weight:700;letter-spacing:.12em">TOPIC ${topic.number}</p>
        <h2 style="font-size:1.75rem;line-height:1.25">${esc(topic.title)}</h2>
        ${markdownToHtml(topic.markdown)}
      </article>`).join("");
  const index = remodelingTopics.map((topic) => `<li><a href="#${topic.slug}">${esc(topic.title)}</a></li>`).join("");

  return `<div style="font-family:Inter,sans-serif;color:#17324d;max-width:1000px;margin:0 auto;padding:32px 24px">
    <header><a href="/" style="font-weight:800;letter-spacing:.05em;color:#0f253f">RIVERA POOLS RIVERSIDE</a> · <a href="/blog">All Blogs</a></header>
    <main>
      <p style="margin-top:48px;color:#0891b2;font-size:.8rem;font-weight:700;letter-spacing:.12em">POOL REMODELING KNOWLEDGE CENTER</p>
      <h1 style="font-size:2.75rem;font-weight:800;line-height:1.12;margin:12px 0 16px">Understand the Work Before You Approve the Work</h1>
      <p style="font-size:1.125rem;color:#475569">Ten contractor-level topics organized for Riverside County homeowners comparing repairs, materials, preparation methods, and upgrades.</p>
      <nav aria-label="Remodeling topics" style="margin-top:32px"><h2>Ten Pool Remodeling Topics</h2><ol style="line-height:1.9;padding-left:24px">${index}</ol></nav>
      ${articles}
      <p style="margin-top:48px"><a href="/#contact">Request a pool evaluation</a> or call <a href="tel:+19513459276">(951) 345-9276</a>.</p>
     </main>
     ${staticLicenseFooter()}
  </div>`;
}

function cleaningBlogStaticRoot() {
  const articles = cleaningTopics.map((topic) => `
      <article id="${topic.slug}" style="margin-top:48px;border-top:1px solid #d9e5e7;padding-top:32px">
        <p style="color:#0891b2;font-size:.8rem;font-weight:700;letter-spacing:.12em">CLEANING TOPIC ${topic.number}</p>
        <h2 style="font-size:1.75rem;line-height:1.25">${esc(topic.title)}</h2>
        ${markdownToHtml(topic.markdown)}
      </article>`).join("");
  const index = cleaningTopics.map((topic) => `<li><a href="#${topic.slug}">${esc(topic.title)}</a></li>`).join("");

  return `<div style="font-family:Inter,sans-serif;color:#17324d;max-width:1000px;margin:0 auto;padding:32px 24px">
    <header><a href="/" style="font-weight:800;letter-spacing:.05em;color:#0f253f">RIVERA POOLS RIVERSIDE</a> · <a href="/blog">All Blogs</a></header>
    <main>
      <p style="margin-top:48px;color:#0891b2;font-size:.8rem;font-weight:700;letter-spacing:.12em">POOL CLEANING &amp; MAINTENANCE KNOWLEDGE CENTER</p>
      <h1 style="font-size:2.75rem;font-weight:800;line-height:1.12;margin:12px 0 16px">Clear Water Starts With Better Pool Care</h1>
      <p style="font-size:1.125rem;color:#475569">Ten technical pool-care guides organized for Riverside County homeowners managing hard water, extreme heat, wind, algae, filtration, sanitizers, and equipment.</p>
      <nav aria-label="Pool cleaning topics" style="margin-top:32px"><h2>Ten Pool Cleaning and Maintenance Topics</h2><ol style="line-height:1.9;padding-left:24px">${index}</ol></nav>
      ${articles}
      <p style="margin-top:48px"><a href="/#contact">Request pool service</a> or call <a href="tel:+19513459276">(951) 345-9276</a>.</p>
     </main>
     ${staticLicenseFooter()}
  </div>`;
}

function pebbleQuartzStaticRoot() {
  const sections = pebbleQuartzPost.sections.map((section, index) => `
      <section style="margin-top:42px">
        <h2 style="font-size:1.75rem;line-height:1.25">${esc(section.heading)}</h2>
        ${section.paragraphs.map((paragraph) => `<p style="color:#475569;line-height:1.75">${esc(paragraph)}</p>`).join("")}
        ${section.bullets.length ? `<ul style="line-height:1.8;padding-left:24px;color:#475569">${section.bullets.map((bullet) => `<li>${esc(bullet)}</li>`).join("")}</ul>` : ""}
        ${index === 2 ? `<table style="width:100%;border-collapse:collapse;color:#475569"><thead><tr style="background:#0f253f;color:#fff"><th style="padding:12px;text-align:left">Feature</th><th style="padding:12px;text-align:left">Quartz</th><th style="padding:12px;text-align:left">Pebble</th></tr></thead><tbody><tr><td style="padding:12px;border-bottom:1px solid #e2e8f0">Lifespan</td><td style="padding:12px;border-bottom:1px solid #e2e8f0">10–15 years</td><td style="padding:12px;border-bottom:1px solid #e2e8f0">20–25+ years</td></tr><tr><td style="padding:12px;border-bottom:1px solid #e2e8f0">Texture</td><td style="padding:12px;border-bottom:1px solid #e2e8f0">Smooth with subtle grip</td><td style="padding:12px;border-bottom:1px solid #e2e8f0">Textured; mini-pebble is smoother</td></tr><tr><td style="padding:12px;border-bottom:1px solid #e2e8f0">Aesthetic</td><td style="padding:12px;border-bottom:1px solid #e2e8f0">Bright, uniform shimmer</td><td style="padding:12px;border-bottom:1px solid #e2e8f0">Deep, natural lagoon tones</td></tr><tr><td style="padding:12px">Investment</td><td style="padding:12px">Moderate</td><td style="padding:12px">Premium</td></tr></tbody></table>` : ""}
      </section>`).join("");
  const faqs = pebbleQuartzPost.faqs.map((faq) => `<section style="margin-top:28px"><h3>${esc(faq.question)}</h3><p style="color:#475569;line-height:1.7">${esc(faq.answer)}</p></section>`).join("");

  return `<div style="font-family:Inter,sans-serif;color:#17324d;max-width:1000px;margin:0 auto;padding:32px 24px">
    <header><a href="/" style="font-weight:800;letter-spacing:.05em;color:#0f253f">RIVERA POOLS RIVERSIDE</a> · <a href="/blog">All Blogs</a> · <a href="/blog/pool-remodeling">Remodeling Blog</a></header>
    <main>
      <p style="margin-top:48px;color:#0891b2;font-size:.8rem;font-weight:700;letter-spacing:.12em">${esc(pebbleQuartzPost.eyebrow)}</p>
      <h1 style="font-size:2.75rem;font-weight:800;line-height:1.12;margin:12px 0 16px">${esc(pebbleQuartzPost.title)}</h1>
      <p style="font-size:1.125rem;color:#475569;line-height:1.75">${esc(pebbleQuartzPost.intro)}</p>
      <p style="color:#64748b">${esc(pebbleQuartzPost.published)} · ${esc(pebbleQuartzPost.readTime)}</p>
      <p style="margin-top:28px;color:#475569;line-height:1.75">At Rivera Swimming Pools Riverside, we specialize in high-end replastering using premium aggregate finishes. Here is a clear breakdown to help you choose the best surface for your backyard.</p>
      ${sections}
      <section style="margin-top:48px;background:#0f253f;color:#fff;padding:32px;border-radius:20px"><h2>Ready to Remodel Your Pool?</h2><p>Get the peace of mind that comes with expert installation by Rivera Swimming Pools Riverside and certified post-finish care from Rivera Pool Care.</p><a href="/#contact" style="color:#67e8f9;font-weight:700">Request a Free Estimate</a></section>
      <section style="margin-top:48px"><h2>Pebble and quartz finish questions</h2>${faqs}</section>
      <p style="margin-top:48px"><a href="/pool-finishes/pebble">Pebble pool resurfacing</a> · <a href="/pool-finishes/quartz">Quartz pool finishes</a> · <a href="/pool-plaster-delaminating">Pool plaster repair</a></p>
     </main>
     ${staticLicenseFooter()}
  </div>`;
}

function replacePageMeta(html, page) {
  const url = `https://www.riverapoolsriverside.com/${page.slug}`;
  const replacements = [
    [/<title>.*?<\/title>/s, `<title>${page.metaTitle}</title>`],
    [/<meta name="description" content=".*?".*?\/>/, `<meta name="description" content="${page.metaDescription}" />`],
    [/<meta property="og:title" content=".*?".*?\/>/, `<meta property="og:title" content="${page.metaTitle}" />`],
    [/<meta property="og:description" content=".*?".*?\/>/, `<meta property="og:description" content="${page.metaDescription}" />`],
    [/<meta property="og:url" content=".*?".*?\/>/, `<meta property="og:url" content="${url}" />`],
    [/<meta name="twitter:title" content=".*?".*?\/>/, `<meta name="twitter:title" content="${page.metaTitle}" />`],
    [/<meta name="twitter:description" content=".*?".*?\/>/, `<meta name="twitter:description" content="${page.metaDescription}" />`],
    [/<link rel="canonical" href=".*?".*?\/>/, `<link rel="canonical" href="${url}" />`],
  ];
  for (const [pattern, replacement] of replacements) html = html.replace(pattern, replacement);
  return html.replace(
    /<meta name="geo.placename".*?\/>/,
    `<meta name="geo.placename" content="Riverside County, California" />\n    <meta name="keywords" content="${page.primaryKeyword}, pool contractor Riverside County, Rivera Pools Riverside" />`,
  );
}

function replaceBlogMeta(html, post) {
  const url = `https://www.riverapoolsriverside.com/${post.slug}`;
  const replacements = [
    [/<title>.*?<\/title>/s, `<title>${esc(post.metaTitle)}</title>`],
    [/<meta name="description" content=".*?".*?\/>/, `<meta name="description" content="${esc(post.metaDescription)}" />`],
    [/<meta property="og:title" content=".*?".*?\/>/, `<meta property="og:title" content="${esc(post.metaTitle)}" />`],
    [/<meta property="og:description" content=".*?".*?\/>/, `<meta property="og:description" content="${esc(post.metaDescription)}" />`],
    [/<meta property="og:url" content=".*?".*?\/>/, `<meta property="og:url" content="${url}" />`],
    [/<meta property="og:type" content=".*?".*?\/>/, `<meta property="og:type" content="article" />`],
    [/<meta name="twitter:title" content=".*?".*?\/>/, `<meta name="twitter:title" content="${esc(post.metaTitle)}" />`],
    [/<meta name="twitter:description" content=".*?".*?\/>/, `<meta name="twitter:description" content="${esc(post.metaDescription)}" />`],
    [/<link rel="canonical" href=".*?".*?\/>/, `<link rel="canonical" href="${url}" />`],
  ];
  for (const [pattern, replacement] of replacements) html = html.replace(pattern, replacement);
  return html.replace(
    /<meta name="geo.placename".*?\/>/,
    `<meta name="geo.placename" content="Riverside County, California" />\n    <meta name="keywords" content="${esc(post.primaryKeyword)}, pool maintenance Riverside County, Rivera Pools Riverside" />`,
  );
}

function removeBaseFaqSchema(html) {
  return html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
    (block) => block.includes('"@type": "FAQPage"') ? "" : block,
  );
}

const cities = [
  {
    slug: "riverside",
    name: "Riverside",
    title: "Pool Remodeling & Resurfacing in Riverside, CA | Rivera Pools",
    description: "Pool remodeling in Riverside, CA by Rivera Pools Riverside. Plaster resurfacing, leak detection, Stone Scapes finishes, coping, tile, and complete renovations.",
    keywords: "pool remodeling Riverside CA, pool resurfacing Riverside, pool leak detection Riverside, pool contractor Riverside CA, pool plaster repair Riverside",
    url: "https://www.riverapoolsriverside.com/riverside",
    areaServed: ["Riverside", "Wood Streets", "Canyon Crest", "Orangecrest", "Mission Grove", "Arlington Heights"],
  },
  {
    slug: "temecula",
    name: "Temecula",
    h1: "Pool Resurfacing & Plastering in Temecula, CA",
    title: "Pool Resurfacing & Pebble Finishes in Temecula, CA | Rivera Pools",
    description: "Pool remodeling in Temecula, CA by Rivera Pools Riverside. Stone Scapes, plaster resurfacing, coping & tile. Licensed & insured. Free estimate — (951) 345-9276.",
    keywords: "pool remodeling Temecula, pool resurfacing Temecula CA, pool renovation Temecula, Stone Scapes Temecula, pool contractor Temecula CA",
    url: "https://www.riverapoolsriverside.com/temecula",
    areaServed: ["Temecula", "Wine Country", "Redhawk", "Crowne Hill"],
  },
  {
    slug: "murrieta",
    name: "Murrieta",
    h1: "Pool Resurfacing & Plastering in Murrieta, CA",
    title: "Pool Plaster Repair & Remodeling in Murrieta, CA | Free Estimates",
    description: "Pool remodeling in Murrieta, CA by Rivera Pools Riverside. Stone Scapes, plaster resurfacing, coping & tile. Licensed & insured. Free estimate — (951) 345-9276.",
    keywords: "pool remodeling Murrieta, pool resurfacing Murrieta CA, pool renovation Murrieta, pool contractor Murrieta CA, Stone Scapes Murrieta",
    url: "https://www.riverapoolsriverside.com/murrieta",
    areaServed: ["Murrieta", "Bear Creek", "French Valley", "Murrieta Hot Springs"],
  },
  {
    slug: "menifee",
    name: "Menifee",
    h1: "Pool Resurfacing & Plastering in Menifee, CA",
    title: "Pool Resurfacing & Remodeling in Menifee, CA | Rivera Pools",
    description: "Pool resurfacing and remodeling in Menifee, CA by Rivera Pools Riverside. Plaster repair, quartz, pebble, StoneScapes, coping, tile, and free estimates.",
    keywords: "pool resurfacing Menifee CA, pool remodeling Menifee, pool plaster repair Menifee, pool contractor Menifee CA",
    url: "https://www.riverapoolsriverside.com/menifee",
    areaServed: ["Menifee", "Menifee Lakes", "Quail Valley", "Sun City", "Heritage Lake", "Audie Murphy Ranch"],
  },
  {
    slug: "hemet",
    name: "Hemet",
    h1: "Pool Resurfacing & Plastering in Hemet, CA",
    title: "Pool Plastering & Resurfacing in Hemet, CA | Rivera Pools",
    description: "Pool plastering and resurfacing in Hemet, CA by Rivera Pools Riverside. Quartz, pebble, StoneScapes, coping, tile, leak assessment, and remodeling.",
    keywords: "pool plastering Hemet CA, pool resurfacing Hemet, pool remodeling Hemet, pool contractor Hemet CA",
    url: "https://www.riverapoolsriverside.com/hemet",
    areaServed: ["Hemet", "Seven Hills", "West Hemet", "East Hemet", "Stoney Mountain Ranch", "Valle Vista"],
  },
  {
    slug: "corona",
    name: "Corona",
    title: "Pool Remodeling, Tile & Coping in Corona, CA | C-35 Contractor",
    description: "Pool remodeling in Corona, CA by Rivera Pools Riverside. Stone Scapes, plaster resurfacing, coping & tile. Licensed & insured. Free estimate — (951) 345-9276.",
    keywords: "pool remodeling Corona CA, pool resurfacing Corona, pool renovation Corona, pool contractor Corona CA, Stone Scapes Corona",
    url: "https://www.riverapoolsriverside.com/corona",
    areaServed: ["Corona", "Eagle Glen", "Sycamore Creek", "Dos Lagos", "Temescal Valley"],
  },
  {
    slug: "fallbrook",
    name: "Fallbrook",
    title: "Pool Resurfacing & Plaster Repair in Fallbrook, CA | Rivera Pools",
    description: "Pool remodeling in Fallbrook, CA by Rivera Pools Riverside. Quartz, pebble, Diamond Brite, coping, tile, and plaster repairs. Licensed & insured.",
    keywords: "pool remodeling Fallbrook, pool resurfacing Fallbrook CA, pool plaster repair Fallbrook, pool contractor Fallbrook CA",
    url: "https://www.riverapoolsriverside.com/fallbrook",
    areaServed: ["Fallbrook", "Rainbow", "Live Oak Park", "Fallbrook Estates"],
  },
  {
    slug: "bonsall",
    name: "Bonsall",
    title: "Pool Remodeling & Natural Stone Finishes in Bonsall, CA | Rivera Pools",
    description: "Pool remodeling in Bonsall, CA by Rivera Pools Riverside. Premium finishes, travertine coping, plaster repair, and complete pool renovations.",
    keywords: "pool remodeling Bonsall, pool resurfacing Bonsall CA, pool plaster repair Bonsall, pool contractor Bonsall CA",
    url: "https://www.riverapoolsriverside.com/bonsall",
    areaServed: ["Bonsall", "Bonsall Village", "Via Monserate", "Lilac Hills"],
  },
  {
    slug: "vista",
    name: "Vista",
    title: "Pool Plaster Repair & Resurfacing in Vista, CA | Rivera Pools",
    description: "Pool remodeling in Vista, CA by Rivera Pools Riverside. Rough plaster repair, quartz and pebble finishes, coping, tile, and equipment upgrades.",
    keywords: "pool remodeling Vista CA, pool resurfacing Vista, rough pool plaster repair Vista, pool contractor Vista CA",
    url: "https://www.riverapoolsriverside.com/vista",
    areaServed: ["Vista", "Shadowridge", "Buena", "Vista Village"],
  },
  {
    slug: "oceanside",
    name: "Oceanside",
    title: "Pool Remodeling & Pool Finishes in Oceanside, CA | Rivera Pools",
    description: "Pool remodeling in Oceanside, CA by Rivera Pools Riverside. Durable pool finishes, plaster repairs, travertine coping, tile, and renovations.",
    keywords: "pool remodeling Oceanside CA, pool resurfacing Oceanside, pool plaster repair Oceanside, pool contractor Oceanside CA",
    url: "https://www.riverapoolsriverside.com/oceanside",
    areaServed: ["Oceanside", "Fire Mountain", "Arrowood", "Rancho Del Oro"],
  },
];

for (const city of cities) {
  const local = cityLocalContent[city.slug];
  if (!local) throw new Error(`Missing local content for ${city.slug}`);
  const cityDescription = local.metaDescription || city.description;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${city.url}#service`,
    "name": `Pool Plastering & Resurfacing in ${city.name}, CA`,
    "description": cityDescription,
    "serviceType": "Pool plastering, resurfacing, and remodeling",
    "url": city.url,
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://www.riverapoolsriverside.com/#business",
      "name": "Rivera Pools Riverside",
      "url": "https://www.riverapoolsriverside.com",
      "telephone": "+1-951-345-9276"
    },
    "areaServed": city.areaServed.map(n => ({ "@type": "City", "name": n })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pool Remodeling Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pool Resurfacing & Replastering" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Quartz, Pebble & Stone Scapes Finishes" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Travertine Coping & Tile" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pool Leak Detection" } }
      ]
    }
  };

  // Replace title
  let html = removeBaseFaqSchema(baseHtml).replace(
    /<title>.*?<\/title>/s,
    `<title>${city.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content=".*?".*?\/>/,
    `<meta name="description" content="${cityDescription}" />`
  );

  // Replace og:title
  html = html.replace(
    /<meta property="og:title" content=".*?".*?\/>/,
    `<meta property="og:title" content="${city.title}" />`
  );

  // Replace og:description
  html = html.replace(
    /<meta property="og:description" content=".*?".*?\/>/,
    `<meta property="og:description" content="${cityDescription}" />`
  );

  // Replace og:url
  html = html.replace(
    /<meta property="og:url" content=".*?".*?\/>/,
    `<meta property="og:url" content="${city.url}" />`
  );

  // Replace twitter:title
  html = html.replace(
    /<meta name="twitter:title" content=".*?".*?\/>/,
    `<meta name="twitter:title" content="${city.title}" />`
  );

  // Replace twitter:description
  html = html.replace(
    /<meta name="twitter:description" content=".*?".*?\/>/,
    `<meta name="twitter:description" content="${cityDescription}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href=".*?".*?\/>/,
    `<link rel="canonical" href="${city.url}" />`
  );

  // Add city keywords meta after geo.placename
  html = html.replace(
    /<meta name="geo.placename".*?\/>/,
    `<meta name="geo.placename" content="${city.name}, California" />\n    <meta name="keywords" content="${city.keywords}" />`
  );

  // Inject city-specific LocalBusiness schema before closing </head>
  const citySchema = `\n    <!-- City-specific LocalBusiness Schema -->\n    <script type="application/ld+json">\n    ${JSON.stringify(schema, null, 2)}\n    </script>`;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": cityFaqs(city).map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  };
  html = html.replace(
    "</head>",
    `${citySchema}
    <script type="application/ld+json">
    ${JSON.stringify(faqSchema, null, 2)}
    </script>
  </head>`,
  );
  html = replaceRoot(html, cityStaticRoot(city));

  // Write to dist/<slug>/index.html
  const cityDir = join(distDir, city.slug);
  mkdirSync(cityDir, { recursive: true });
  writeFileSync(join(cityDir, "index.html"), html, "utf-8");
  console.log(`✓ Generated dist/${city.slug}/index.html`);
}

for (const page of seoPages) {
  const details = serviceDetails[page.slug];
  if (!details) throw new Error(`Missing service details for ${page.slug}`);
  const url = `https://www.riverapoolsriverside.com/${page.slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    "name": page.title,
    "serviceType": page.primaryKeyword,
    "description": page.metaDescription,
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": "Rivera Pools Riverside",
      "url": "https://www.riverapoolsriverside.com",
      "telephone": "+1-951-345-9276",
    },
    "areaServed": page.locations.map((name) => ({ "@type": "City", name })),
    "url": url,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  };

  let html = replacePageMeta(removeBaseFaqSchema(baseHtml), page);
  html = replaceRoot(html, seoStaticRoot(page, details));
  const schemas = `\n    <!-- Service-specific SEO schema -->\n    <script type="application/ld+json">\n    ${JSON.stringify(serviceSchema, null, 2)}\n    </script>\n    <script type="application/ld+json">\n    ${JSON.stringify(faqSchema, null, 2)}\n    </script>`;
  html = html.replace("</head>", `${schemas}\n  </head>`);

  const pageDir = join(distDir, page.slug);
  mkdirSync(pageDir, { recursive: true });
  writeFileSync(join(pageDir, "index.html"), html, "utf-8");
  console.log(`✓ Generated dist/${page.slug}/index.html`);
}

{
  const page = {
    slug: cleaningBlogMeta.slug,
    metaTitle: cleaningBlogMeta.title,
    metaDescription: cleaningBlogMeta.description,
    primaryKeyword: cleaningBlogMeta.keyword,
  };
  const url = `https://www.riverapoolsriverside.com/${page.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": page.metaTitle,
    "description": page.metaDescription,
    "url": url,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": cleaningTopics.length,
      "itemListElement": cleaningTopics.map((topic, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${url}#${topic.slug}`,
        "name": topic.title,
      })),
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rivera Pools Riverside",
      "url": "https://www.riverapoolsriverside.com",
    },
  };
  let html = replaceBlogMeta(removeBaseFaqSchema(baseHtml), page)
    .replace('<meta property="og:type" content="article" />', '<meta property="og:type" content="website" />');
  html = replaceRoot(html, cleaningBlogStaticRoot());
  html = html.replace("</head>", `
    <script type="application/ld+json">
    ${JSON.stringify(schema, null, 2)}
    </script>
  </head>`);
  const pageDir = join(distDir, page.slug);
  mkdirSync(pageDir, { recursive: true });
  writeFileSync(join(pageDir, "index.html"), html, "utf-8");
  console.log(`✓ Generated dist/${page.slug}/index.html`);
}

{
  const page = {
    slug: blogHubMeta.slug,
    metaTitle: blogHubMeta.title,
    metaDescription: blogHubMeta.description,
    primaryKeyword: blogHubMeta.keyword,
  };
  const url = `https://www.riverapoolsriverside.com/${page.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": page.metaTitle,
    "description": page.metaDescription,
    "url": url,
    "hasPart": [
      {
        "@type": "CollectionPage",
        "name": cleaningBlogMeta.title,
        "url": `https://www.riverapoolsriverside.com/${cleaningBlogMeta.slug}`,
      },
      {
        "@type": "CollectionPage",
        "name": remodelingBlogMeta.title,
        "url": `https://www.riverapoolsriverside.com/${remodelingBlogMeta.slug}`,
      },
      {
        "@type": "Article",
        "name": pebbleQuartzPost.title,
        "url": `https://www.riverapoolsriverside.com/${pebbleQuartzPost.slug}`,
      },
    ],
  };
  let html = replaceBlogMeta(removeBaseFaqSchema(baseHtml), page)
    .replace('<meta property="og:type" content="article" />', '<meta property="og:type" content="website" />');
  html = replaceRoot(html, blogHubStaticRoot());
  html = html.replace("</head>", `
    <script type="application/ld+json">
    ${JSON.stringify(schema, null, 2)}
    </script>
  </head>`);
  const pageDir = join(distDir, page.slug);
  mkdirSync(pageDir, { recursive: true });
  writeFileSync(join(pageDir, "index.html"), html, "utf-8");
  console.log(`✓ Generated dist/${page.slug}/index.html`);
}

{
  const page = {
    slug: remodelingBlogMeta.slug,
    metaTitle: remodelingBlogMeta.title,
    metaDescription: remodelingBlogMeta.description,
    primaryKeyword: remodelingBlogMeta.keyword,
  };
  const url = `https://www.riverapoolsriverside.com/${page.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": page.metaTitle,
    "description": page.metaDescription,
    "url": url,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": remodelingTopics.length,
      "itemListElement": remodelingTopics.map((topic, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${url}#${topic.slug}`,
        "name": topic.title,
      })),
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rivera Pools Riverside",
      "url": "https://www.riverapoolsriverside.com",
    },
  };
  let html = replaceBlogMeta(removeBaseFaqSchema(baseHtml), page)
    .replace('<meta property="og:type" content="article" />', '<meta property="og:type" content="website" />');
  html = replaceRoot(html, remodelingBlogStaticRoot());
  html = html.replace("</head>", `
    <script type="application/ld+json">
    ${JSON.stringify(schema, null, 2)}
    </script>
  </head>`);
  const pageDir = join(distDir, page.slug);
  mkdirSync(pageDir, { recursive: true });
  writeFileSync(join(pageDir, "index.html"), html, "utf-8");
  console.log(`✓ Generated dist/${page.slug}/index.html`);
}

{
  const url = `https://www.riverapoolsriverside.com/${pebbleQuartzPost.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    "headline": pebbleQuartzPost.title,
    "description": pebbleQuartzPost.metaDescription,
    "datePublished": "2026-09-12",
    "dateModified": "2026-09-12",
    "mainEntityOfPage": url,
    "image": "https://www.riverapoolsriverside.com/images/photo3.webp",
    "author": {
      "@type": "Organization",
      "name": "Rivera Pools Riverside",
      "url": "https://www.riverapoolsriverside.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Rivera Pools Riverside",
      "url": "https://www.riverapoolsriverside.com",
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pebbleQuartzPost.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
    })),
  };
  let html = replaceBlogMeta(removeBaseFaqSchema(baseHtml), pebbleQuartzPost);
  html = replaceRoot(html, pebbleQuartzStaticRoot());
  html = html.replace("</head>", `
    <script type="application/ld+json">
    ${JSON.stringify(articleSchema, null, 2)}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify(faqSchema, null, 2)}
    </script>
  </head>`);
  const pageDir = join(distDir, pebbleQuartzPost.slug);
  mkdirSync(pageDir, { recursive: true });
  writeFileSync(join(pageDir, "index.html"), html, "utf-8");
  console.log(`✓ Generated dist/${pebbleQuartzPost.slug}/index.html`);
}

console.log("SEO pages generated successfully.");
