import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, Droplets, Menu, Phone, ShieldCheck, Sparkles, Star, X } from "lucide-react";
import postData from "./blog-post.json";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets: string[];
};

export type BlogPostData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  eyebrow: string;
  intro: string;
  published: string;
  readTime: string;
  sections: BlogSection[];
  faqs: { question: string; answer: string }[];
};

export const POOL_CLEANING_POST = postData as BlogPostData;

function asset(file: string): string {
  const base = window.location.pathname.startsWith("/__mockup") ? "/__mockup/images/" : "/images/";
  return `${base}${file}`;
}

function setMetaDescription(content: string): void {
  const meta = document.querySelector('meta[name="description"]');
  meta?.setAttribute("content", content);
}

export function BlogPost({ post = POOL_CLEANING_POST }: { post?: BlogPostData }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
    document.title = post.metaTitle;
    setMetaDescription(post.metaDescription);

    return () => {
      document.title = previousTitle;
      if (description) setMetaDescription(description);
    };
  }, [post]);

  return (
    <div className="min-h-screen bg-white font-['DM_Sans',sans-serif] text-slate-700">
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
            <a href="/blog" className="text-sm font-semibold text-[#0891b2]">All Blogs</a>
            <a href="/blog/pool-remodeling" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4]">Remodeling Blog</a>
            <a href="tel:+19513459276" className="flex items-center gap-2 text-sm font-bold text-[#0F253F]">
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
            <a href="/blog" className="px-4 py-2 rounded-lg bg-cyan-50 text-cyan-800 font-semibold" onClick={() => setMobileOpen(false)}>All Blogs</a>
            <a href="/blog/pool-remodeling" className="px-4 py-2 rounded-lg hover:bg-slate-50 font-medium" onClick={() => setMobileOpen(false)}>Remodeling Blog</a>
            <a href="tel:+19513459276" className="px-4 py-3 rounded-lg bg-[#06B6D4] text-white font-bold text-center">Call (951) 345-9276</a>
          </div>
        )}
      </header>

      <main>
        <section className="relative pt-36 pb-20 bg-[#0F253F] overflow-hidden">
          <img src={asset("photo3.webp")} alt="" aria-hidden="true" width={1200} height={800} className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F253F]/70 to-[#0F253F]" />
          <div className="relative container mx-auto max-w-5xl px-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#06B6D4]/40 bg-[#06B6D4]/15 px-4 py-2 text-xs font-bold tracking-widest text-[#67e8f9]">
              <Sparkles className="w-3.5 h-3.5" /> {post.eyebrow}
            </span>
            <h1 className="mt-7 mb-6 font-['Montserrat'] font-extrabold text-4xl md:text-6xl leading-tight text-white">
              {post.title}
            </h1>
            <p className="mx-auto max-w-3xl text-lg md:text-xl leading-relaxed text-white/80">{post.intro}</p>
            <div className="mt-7 flex items-center justify-center gap-5 text-sm text-white/70">
              <span className="inline-flex items-center gap-2"><CalendarDays className="w-4 h-4 text-[#67e8f9]" /> {post.published}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        <article className="container mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="mb-12 overflow-hidden rounded-3xl">
            <img src={asset("photo3.webp")} alt="Clean backyard swimming pool in Riverside County, California" width={1200} height={800} className="w-full aspect-[16/8] object-cover" />
          </div>

          {post.sections.map((section) => (
            <section key={section.heading} className="mb-12">
              <h2 className="font-['Montserrat'] text-2xl md:text-3xl font-bold text-[#0F253F] mb-5">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-slate-600 mb-4">{paragraph}</p>
              ))}
              {section.bullets.length > 0 && (
                <ul className="mt-5 space-y-3 rounded-2xl bg-[#F8FAFC] border border-slate-100 p-6">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#06B6D4]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="mb-14 rounded-3xl bg-[#0F253F] p-8 md:p-10 text-white">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-[#67e8f9]" />
              <div>
                <h2 className="font-['Montserrat'] text-2xl font-bold mb-3">Need a dependable pool cleaning routine?</h2>
                <p className="text-white/75 leading-relaxed mb-6">Rivera Pools provides weekly and bi-weekly pool cleaning, water chemistry balancing, filter checks, and maintenance recommendations across Riverside County and nearby communities.</p>
                <a href="/#contact" className="inline-flex items-center rounded-xl bg-[#06B6D4] px-6 py-3 font-bold text-white hover:bg-[#0891b2]">
                  Request a Free Estimate <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </section>

          <section className="mb-14">
            <h2 className="font-['Montserrat'] text-2xl md:text-3xl font-bold text-[#0F253F] mb-7">Pool cleaning questions</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {post.faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-6">
                  <h3 className="font-['Montserrat'] font-bold text-[#0F253F] mb-3">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <nav aria-label="Related Rivera Pools services" className="border-t border-slate-200 pt-8">
            <p className="font-['Montserrat'] font-bold text-[#0F253F] mb-4">Related Rivera Pools services</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <a href="/pool-finishes/pebble" className="font-semibold text-[#0891b2] hover:underline">Pebble pool finishes</a>
              <a href="/pool-plaster-delaminating" className="font-semibold text-[#0891b2] hover:underline">Pool plaster repair</a>
              <a href="/riverside" className="font-semibold text-[#0891b2] hover:underline">Pool remodeling in Riverside</a>
              <a href="/temecula" className="font-semibold text-[#0891b2] hover:underline">Pool remodeling in Temecula</a>
            </div>
          </nav>
        </article>
      </main>

      <footer className="bg-[#0A0A0A] py-8 text-center text-sm text-white/70">
        <p>Rivera Pools Riverside · Pool cleaning, remodeling, resurfacing, and repairs across Riverside County.</p>
        <p className="mt-2">CA C-35 Contractor License #1053279 · Licensed, Bonded, &amp; Insured</p>
        <a href="tel:+19513459276" className="mt-2 inline-block font-semibold text-white hover:text-[#67e8f9]">(951) 345-9276</a>
      </footer>
    </div>
  );
}