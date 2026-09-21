import { ArrowRight, CheckCircle2, Droplets, MapPin, Menu, Phone, ShieldCheck, Star, X } from "lucide-react";
import { useState } from "react";
import { trackPhoneClick } from "@/lib/analytics";
import { QuoteForm } from "./QuoteForm";

export type SeoFaq = { q: string; a: string };
export type SeoImage = { file: string; alt: string };
export type SeoComparison = { label: string; detail: string };
export type SeoLocalLink = { href: string; label: string };
export type SeoProjectExample = {
  title: string;
  summary: string;
  challenge: string;
  response: string;
  lesson: string;
};

export type SeoPage = {
  slug: string;
  kind: "service" | "problem";
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  eyebrow: string;
  intro: string;
  problem: string;
  solution: string;
  materials: string[];
  symptoms: string[];
  causes: string[];
  options: string[];
  comparison?: SeoComparison[];
  process: string[];
  duration: string;
  priceFactors: string[];
  aftercare: string[];
  whenToCall?: string[];
  diagnosticNotes?: string[];
  ownerChecklist?: string[];
  projectExample?: SeoProjectExample;
  images: SeoImage[];
  locations: string[];
  localLinks?: SeoLocalLink[];
  faqs: SeoFaq[];
  ctaTitle?: string;
  ctaText?: string;
  ctaLabel?: string;
};

const RELATED_SERVICES = [
  { slug: "pool-finishes/quartz", label: "Quartz pool finish" },
  { slug: "pool-finishes/pebble", label: "Pebble pool finish" },
  { slug: "pool-finishes/stone-scapes", label: "StoneScapes pool finish" },
  { slug: "pool-finishes/diamond-brite", label: "Diamond Brite pool finish" },
  { slug: "pool-remodeling", label: "Pool remodeling and renovation" },
  { slug: "pool-resurfacing", label: "Pool resurfacing and replastering" },
  { slug: "pool-leak-detection", label: "Pool leak detection" },
  { slug: "pool-equipment-upgrades", label: "Equipment upgrades and automation" },
  { slug: "travertine-coping", label: "Travertine pool coping" },
  { slug: "pool-plaster-delaminating", label: "Delaminating plaster repair" },
  { slug: "rough-pool-plaster-repair", label: "Rough plaster repair" },
  { slug: "baja-shelf-addition-cost", label: "Baja shelf additions" },
  { slug: "blog/pool-cleaning-maintenance-riverside-ca", label: "Pool cleaning guide" },
];

function asset(file: string): string {
  const base = window.location.pathname.startsWith("/__mockup") ? "/__mockup/images/" : "/images/";
  return `${base}${file}`;
}

function citySlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, "-");
}

function cityHref(city: string): string {
  return city.toLowerCase() === "riverside" ? "/" : `/${citySlug(city)}`;
}

export function SeoLanding({ page }: { page: SeoPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-['DM_Sans',sans-serif] text-slate-700">
      {/* SEO metadata and schema are prerendered into each route's HTML. */}

      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2" aria-label="Rivera Pools Riverside home">
            <Droplets className="w-8 h-8 text-[#06B6D4]" />
            <span className="font-['Montserrat'] font-extrabold text-lg tracking-tight text-[#0F253F] leading-none">
              RIVERA POOLS
              <span className="font-medium text-slate-500 text-xs block tracking-widest">RIVERSIDE</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-7">
            <a href="/#services" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4]">Services</a>
            <a href="/#coverage" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4]">Coverage</a>
            <a href="/#portfolio" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4]">Portfolio</a>
            <a href="/blog" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4]">Blogs</a>
            <a href="tel:+19513459276" onClick={() => trackPhoneClick("seo_header")} className="flex items-center gap-2 text-sm font-bold text-[#0F253F]">
              <Phone className="w-4 h-4 text-[#06B6D4]" /> (951) 345-9276
            </a>
          </nav>
          <button
            className="md:hidden p-2 text-[#0F253F]"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-xl p-4 flex flex-col gap-2">
            <a href="/#services" className="px-4 py-2 rounded-lg hover:bg-slate-50 font-medium" onClick={() => setMobileOpen(false)}>Services</a>
            <a href="/#coverage" className="px-4 py-2 rounded-lg hover:bg-slate-50 font-medium" onClick={() => setMobileOpen(false)}>Coverage</a>
            <a href="/blog" className="px-4 py-2 rounded-lg hover:bg-slate-50 font-medium" onClick={() => setMobileOpen(false)}>Blogs</a>
            <a href="tel:+19513459276" onClick={() => trackPhoneClick("seo_mobile_navigation")} className="px-4 py-3 rounded-lg bg-[#06B6D4] text-white font-bold text-center">Call (951) 345-9276</a>
          </div>
        )}
      </header>

      <main>
        <section className="relative pt-36 pb-20 bg-[#0F253F] overflow-hidden">
          <img src={asset("photo1.webp")} alt="" aria-hidden="true" width={1200} height={800} className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F253F]/60 to-[#0F253F]" />
          <div className="relative container mx-auto max-w-5xl px-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#06B6D4]/40 bg-[#06B6D4]/15 px-4 py-2 text-xs font-bold tracking-widest text-[#67e8f9]">
              <MapPin className="w-3.5 h-3.5" /> {page.eyebrow}
            </span>
            <h1 className="mt-7 mb-6 font-['Montserrat'] font-extrabold text-4xl md:text-6xl leading-tight text-white">
              {page.title}
              <span className="block text-[#06B6D4]">in Riverside County &amp; Inland Empire</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg md:text-xl leading-relaxed text-white/80">{page.intro}</p>
            <p className="mx-auto mt-5 max-w-3xl text-sm font-semibold leading-relaxed text-white/75">
              {page.title} for homeowners in Riverside County and the Inland Empire, including {page.locations.slice(0, 4).join(", ")}.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <a href="#estimate-form" className="inline-flex h-14 items-center justify-center rounded-xl bg-[#06B6D4] px-9 font-bold text-white shadow-xl shadow-[#06B6D4]/20 hover:bg-[#0891b2]">
                Get a Free Estimate <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <a href="tel:+19513459276" onClick={() => trackPhoneClick("seo_hero")} className="inline-flex h-14 items-center justify-center rounded-xl border border-white/35 px-9 font-semibold text-white hover:bg-white/10">
                <Phone className="mr-2 w-4 h-4" /> Call (951) 345-9276
              </a>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs font-semibold text-white/85">
              {["Licensed & Insured", "C-35 License #1053279", "15+ Years Experience", "Free Estimates"].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
                  {badge === "15+ Years Experience" ? <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" /> : <ShieldCheck className="w-3.5 h-3.5 text-[#67e8f9]" />}
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-10">
              <article className="rounded-3xl bg-[#F8FAFC] p-8 md:p-10 border border-slate-100">
                <span className="text-xs font-bold tracking-widest text-[#06B6D4]">THE PROBLEM</span>
                <h2 className="mt-3 mb-5 font-['Montserrat'] text-2xl font-bold text-[#0F253F]">What homeowners are dealing with</h2>
                <p className="text-lg leading-relaxed text-slate-600">{page.problem}</p>
              </article>
              <article className="rounded-3xl bg-[#0F253F] p-8 md:p-10 text-white">
                <span className="text-xs font-bold tracking-widest text-[#67e8f9]">THE RIVERA POOLS APPROACH</span>
                <h2 className="mt-3 mb-5 font-['Montserrat'] text-2xl font-bold">A practical solution built around your pool</h2>
                <p className="text-lg leading-relaxed text-white/80">{page.solution}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F8FAFC]">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <article className="rounded-3xl bg-white border border-slate-100 p-8 shadow-sm">
                <span className="text-xs font-bold tracking-widest text-[#06B6D4]">SYMPTOMS</span>
                <h2 className="mt-3 mb-5 font-['Montserrat'] text-2xl font-bold text-[#0F253F]">Signs this service may fit</h2>
                <ul className="space-y-3">
                  {page.symptoms.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-slate-600">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#06B6D4]" /> {item}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-3xl bg-white border border-slate-100 p-8 shadow-sm">
                <span className="text-xs font-bold tracking-widest text-[#06B6D4]">POSSIBLE CAUSES</span>
                <h2 className="mt-3 mb-5 font-['Montserrat'] text-2xl font-bold text-[#0F253F]">What we check before recommending work</h2>
                <ul className="space-y-3">
                  {page.causes.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-slate-600">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#06B6D4]" /> {item}
                    </li>
                  ))}
                </ul>
              </article>
              {page.whenToCall && (
                <article className="rounded-3xl bg-[#0F253F] p-8 md:p-10 text-white lg:col-span-2">
                  <span className="text-xs font-bold tracking-widest text-[#67e8f9]">WHEN TO CALL</span>
                  <h2 className="mt-3 mb-5 font-['Montserrat'] text-2xl font-bold">Call before the problem grows</h2>
                  <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                    {page.whenToCall.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed text-white/80">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#67e8f9]" /> {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </div>
          </div>
        </section>

        {page.diagnosticNotes && (
          <section className="py-20 bg-white">
            <div className="container mx-auto max-w-6xl px-6">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#06B6D4]">BEFORE YOU CHOOSE A SCOPE</span>
                  <h2 className="mt-3 font-['Montserrat'] text-3xl font-bold text-[#0F253F]">What a useful site evaluation should answer</h2>
                  <p className="mt-5 leading-relaxed text-slate-600">A proposal should connect the visible condition to the recommended work. These are the questions we use to separate a necessary repair from an optional upgrade.</p>
                </div>
                <div className="space-y-4">
                  {page.diagnosticNotes.map((note) => (
                    <p key={note} className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-5 leading-relaxed text-slate-600">{note}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-[#F8FAFC]">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-bold tracking-widest text-[#06B6D4]">WHAT WE COVER</span>
              <h2 className="mt-3 font-['Montserrat'] text-3xl font-bold text-[#0F253F]">Materials, prep, and finish details</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {page.materials.map((material) => (
                <div key={material} className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
                  <CheckCircle2 className="mb-4 w-5 h-5 text-[#06B6D4]" />
                  <p className="font-semibold text-[#0F253F]">{material}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-3xl bg-white border border-slate-100 p-8">
              <h3 className="font-['Montserrat'] text-2xl font-bold text-[#0F253F]">Finish and project options</h3>
              <div className="mt-5 grid md:grid-cols-2 gap-4">
                {page.options.map((option) => (
                  <p key={option} className="flex gap-3 leading-relaxed text-slate-600">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#06B6D4]" /> {option}
                  </p>
                ))}
              </div>
            </div>
            {page.comparison && (
              <div className="mt-6 rounded-3xl bg-[#0F253F] p-8 text-white">
                <h3 className="font-['Montserrat'] text-2xl font-bold">How the options compare</h3>
                <div className="mt-5 grid md:grid-cols-3 gap-5">
                  {page.comparison.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 p-5">
                      <h4 className="font-['Montserrat'] font-bold text-[#67e8f9]">{item.label}</h4>
                      <p className="mt-2 leading-relaxed text-white/75">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <article className="rounded-3xl bg-[#F8FAFC] border border-slate-100 p-8">
                <span className="text-xs font-bold tracking-widest text-[#06B6D4]">PROCESS</span>
                <h2 className="mt-3 mb-5 font-['Montserrat'] text-2xl font-bold text-[#0F253F]">How the work is planned</h2>
                <ol className="space-y-4">
                  {page.process.map((step, index) => (
                    <li key={step} className="flex gap-3 leading-relaxed text-slate-600">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#06B6D4] text-xs font-bold text-white">{index + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </article>
              <article className="rounded-3xl bg-[#F8FAFC] border border-slate-100 p-8">
                <span className="text-xs font-bold tracking-widest text-[#06B6D4]">TIME &amp; PRICE</span>
                <h2 className="mt-3 mb-4 font-['Montserrat'] text-2xl font-bold text-[#0F253F]">What affects the estimate</h2>
                <p className="leading-relaxed text-slate-600">{page.duration}</p>
                <ul className="mt-5 space-y-3">
                  {page.priceFactors.map((factor) => (
                    <li key={factor} className="flex gap-3 leading-relaxed text-slate-600">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#06B6D4]" /> {factor}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-3xl bg-[#F8FAFC] border border-slate-100 p-8">
                <span className="text-xs font-bold tracking-widest text-[#06B6D4]">AFTERCARE</span>
                <h2 className="mt-3 mb-5 font-['Montserrat'] text-2xl font-bold text-[#0F253F]">After the project</h2>
                <ul className="space-y-3">
                  {page.aftercare.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-slate-600">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#06B6D4]" /> {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {page.projectExample && (
          <section className="py-20 bg-[#0F253F] text-white">
            <div className="container mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#67e8f9]">DOCUMENTED RIVERA POOLS PROJECT</span>
                <h2 className="mt-3 font-['Montserrat'] text-3xl font-bold">{page.projectExample.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-white/75">{page.projectExample.summary}</p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <article className="rounded-2xl border border-white/15 bg-white/10 p-5">
                    <h3 className="font-['Montserrat'] font-bold text-[#67e8f9]">Condition and goal</h3>
                    <p className="mt-2 leading-relaxed text-white/75">{page.projectExample.challenge}</p>
                  </article>
                  <article className="rounded-2xl border border-white/15 bg-white/10 p-5">
                    <h3 className="font-['Montserrat'] font-bold text-[#67e8f9]">Coordinated response</h3>
                    <p className="mt-2 leading-relaxed text-white/75">{page.projectExample.response}</p>
                  </article>
                </div>
                <p className="mt-6 rounded-xl border-l-4 border-[#D4AF37] bg-black/20 p-5 leading-relaxed text-white/80"><strong className="text-white">What this project demonstrates:</strong> {page.projectExample.lesson}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img src={asset("before1.webp")} alt={`Before work on ${page.projectExample.title}`} width={800} height={600} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                <img src={asset("photo2.webp")} alt={`Completed ${page.projectExample.title} by Rivera Pools`} width={800} height={600} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
              </div>
            </div>
          </section>
        )}

        {page.ownerChecklist && (
          <section className="py-20 bg-white">
            <div className="container mx-auto max-w-5xl px-6">
              <span className="text-xs font-bold tracking-widest text-[#06B6D4]">HOMEOWNER CHECKLIST</span>
              <h2 className="mt-3 font-['Montserrat'] text-3xl font-bold text-[#0F253F]">Questions to settle before signing a proposal</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {page.ownerChecklist.map((item) => (
                  <p key={item} className="flex gap-3 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-6 leading-relaxed text-slate-600">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#06B6D4]" /> {item}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-[#F8FAFC]">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-bold tracking-widest text-[#06B6D4]">RIVERA POOLS PROJECT PHOTOS</span>
              <h2 className="mt-3 font-['Montserrat'] text-3xl font-bold text-[#0F253F]">Photos of completed pool work</h2>
              <p className="mt-4 leading-relaxed text-slate-600">These photos show completed Rivera Pools work and before-and-after renovation details. They are representative project examples, not city-specific case studies.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {page.images.map((image) => (
                <img key={image.file} src={asset(image.file)} alt={image.alt} width={1000} height={700} loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-sm" />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className="mb-10 text-center font-['Montserrat'] text-3xl font-bold text-[#0F253F]">Questions about {page.title.toLowerCase()}?</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {page.faqs.map((faq) => (
                <article key={faq.q} className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-6">
                  <h3 className="mb-3 font-['Montserrat'] font-bold text-[#0F253F]">{faq.q}</h3>
                  <p className="leading-relaxed text-slate-600">{faq.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F8FAFC]">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#06B6D4]">LOCAL SERVICE AREA</span>
                <h2 className="mt-3 font-['Montserrat'] text-3xl font-bold text-[#0F253F]">Serving nearby homeowners</h2>
              </div>
              <a href="/#coverage" className="font-semibold text-[#06B6D4] hover:text-[#0891b2]">See all coverage areas <ArrowRight className="inline ml-1 w-4 h-4" /></a>
            </div>
            <div className="flex flex-wrap gap-3">
              {page.locations.map((location) => (
                <a key={location} href={cityHref(location)} className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:border-[#06B6D4] hover:text-[#0891b2]">
                  {location}
                </a>
              ))}
            </div>
            {page.localLinks && (
              <div className="mt-8 rounded-2xl border border-[#bfe3e5] bg-white p-6">
                <h3 className="font-['Montserrat'] text-xl font-bold text-[#0F253F]">Local service pages</h3>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                  {page.localLinks.map((link) => (
                    <a key={link.href} href={link.href} className="font-semibold text-[#0891b2] hover:underline">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto max-w-5xl px-6">
            <h2 className="font-['Montserrat'] text-2xl font-bold text-[#0F253F]">Related pool remodeling services</h2>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              {RELATED_SERVICES.filter((service) => service.slug !== page.slug).map((service) => (
                <a key={service.slug} href={`/${service.slug}`} className="font-semibold text-[#0891b2] hover:underline">
                  {service.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="estimate-form" className="scroll-mt-20">
          <QuoteForm compact />
        </section>

        <section className="py-20 bg-[#0F253F] text-center text-white">
          <div className="container mx-auto max-w-3xl px-6">
            <h2 className="font-['Montserrat'] text-3xl font-bold">{page.ctaTitle ?? "Not sure which option fits your pool?"}</h2>
            <p className="mt-4 text-lg text-white/75">{page.ctaText ?? "Send us photos or schedule a free evaluation. We will explain the repair, finish, and remodeling options before any work begins."}</p>
            <a href="#estimate-form" className="mt-8 inline-flex h-14 items-center justify-center rounded-xl bg-[#06B6D4] px-9 font-bold text-white hover:bg-[#0891b2]">
              {page.ctaLabel ?? "Request a Free Evaluation"}
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#0A0A0A] py-8 text-center text-sm text-white/70">
        <p>Rivera Pools Riverside · Pool remodeling, resurfacing, and repairs across Riverside County and North San Diego County.</p>
        <p className="mt-2">CA C-35 Contractor License #1053279 · Licensed, Bonded, &amp; Insured</p>
        <a href="tel:+19513459276" onClick={() => trackPhoneClick("seo_footer")} className="mt-2 inline-block font-semibold text-white hover:text-[#67e8f9]">(951) 345-9276</a>
      </footer>
    </div>
  );
}