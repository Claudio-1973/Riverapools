import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, Droplets, Menu, Phone, ShieldCheck, Sparkles, X } from "lucide-react";
import postData from "./pebble-vs-quartz-post.json";

type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets: string[];
};

type ArticleData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  eyebrow: string;
  intro: string;
  published: string;
  readTime: string;
  sections: ArticleSection[];
  faqs: { question: string; answer: string }[];
};

const post = postData as ArticleData;

function asset(file: string): string {
  const base = window.location.pathname.startsWith("/__mockup") ? "/__mockup/images/" : "/images/";
  return `${base}${file}`;
}

export function PebbleVsQuartzPost() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
    document.title = post.metaTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", post.metaDescription);
    return () => {
      document.title = previousTitle;
      if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-['DM_Sans',sans-serif] text-slate-700">
      <header className="fixed left-0 right-0 top-0 z-50 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2" aria-label="Rivera Pools Riverside home">
            <Droplets className="h-8 w-8 text-[#06B6D4]" />
            <span className="font-['Montserrat'] text-lg font-extrabold leading-none tracking-tight text-[#0F253F]">
              RIVERA POOLS<span className="block text-xs font-medium tracking-widest text-slate-500">RIVERSIDE</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            <a href="/#services" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4]">Services</a>
            <a href="/blog" className="text-sm font-semibold text-[#0891b2]">All Blogs</a>
            <a href="/blog/pool-remodeling" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4]">Remodeling Blog</a>
            <a href="tel:+19513459276" className="flex items-center gap-2 text-sm font-bold text-[#0F253F]"><Phone className="h-4 w-4 text-[#06B6D4]" />(951) 345-9276</a>
          </nav>
          <button className="p-2 text-[#0F253F] md:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
        {mobileOpen && <div className="flex flex-col gap-2 border-t border-slate-100 bg-white p-4 shadow-xl md:hidden">
          <a href="/blog" className="rounded-lg bg-cyan-50 px-4 py-2 font-semibold text-cyan-800">All Blogs</a>
          <a href="/blog/pool-remodeling" className="rounded-lg px-4 py-2 font-medium hover:bg-slate-50">Remodeling Blog</a>
          <a href="tel:+19513459276" className="rounded-lg bg-[#06B6D4] px-4 py-3 text-center font-bold text-white">Call (951) 345-9276</a>
        </div>}
      </header>

      <main>
        <section className="relative overflow-hidden bg-[#0F253F] pb-20 pt-36">
          <img src={asset("photo3.webp")} alt="" aria-hidden="true" width={1200} height={800} className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F253F]/70 to-[#0F253F]" />
          <div className="relative container mx-auto max-w-5xl px-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#06B6D4]/40 bg-[#06B6D4]/15 px-4 py-2 text-xs font-bold tracking-widest text-[#67e8f9]"><Sparkles className="h-3.5 w-3.5" />{post.eyebrow}</span>
            <h1 className="mt-7 font-['Montserrat'] text-4xl font-extrabold leading-tight text-white md:text-6xl">{post.title}</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">{post.intro}</p>
            <div className="mt-7 flex items-center justify-center gap-5 text-sm text-white/70"><span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-[#67e8f9]" />{post.published}</span><span aria-hidden="true">·</span><span>{post.readTime}</span></div>
          </div>
        </section>

        <article className="container mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="mb-12 overflow-hidden rounded-3xl"><img src={asset("photo3.webp")} alt="Pebble and quartz pool finish options for a Riverside County remodel" width={1200} height={800} className="aspect-[16/8] w-full object-cover" /></div>
          <p className="mb-12 text-lg leading-relaxed text-slate-600">At Rivera Pools Riverside, we specialize in high-end replastering using premium aggregate finishes. Here is a clear breakdown to help you choose the best surface for your backyard.</p>

          {post.sections.map((section, index) => (
            <section key={section.heading} className="mb-12">
              <h2 className="mb-5 font-['Montserrat'] text-2xl font-bold text-[#0F253F] md:text-3xl">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph} className="mb-4 text-lg leading-relaxed text-slate-600">{paragraph}</p>)}
              {index === 2 ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <div className="grid grid-cols-3 bg-[#0F253F] p-4 text-sm font-bold text-white"><span>Feature</span><span>Quartz Finish</span><span>Pebble Finish</span></div>
                  {[
                    ["Lifespan", "10–15 years", "20–25+ years"],
                    ["Texture", "Smooth with subtle grip", "Textured; mini-pebble is smoother"],
                    ["Aesthetic", "Bright, uniform shimmer", "Deep, natural lagoon tones"],
                    ["Investment", "Moderate", "Premium"]
                  ].map(([feature, quartz, pebble]) => <div key={feature} className="grid grid-cols-3 gap-2 border-t border-slate-100 p-4 text-sm leading-relaxed text-slate-600"><strong className="text-[#0F253F]">{feature}</strong><span>{quartz}</span><span>{pebble}</span></div>)}
                </div>
              ) : section.bullets.length > 0 ? <ul className="mt-5 space-y-3 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-6">{section.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-3 leading-relaxed text-slate-600"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#06B6D4]" /><span>{bullet}</span></li>)}</ul> : null}
            </section>
          ))}

          <section className="mb-14 rounded-3xl bg-[#0F253F] p-8 text-white md:p-10">
            <div className="flex items-start gap-4"><ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-[#67e8f9]" /><div><h2 className="mb-3 font-['Montserrat'] text-2xl font-bold">Ready to Remodel Your Pool?</h2><p className="mb-6 leading-relaxed text-white/75">Get the peace of mind that comes with expert installation and certified post-finish start-up care by Rivera Pools Riverside.</p><a href="/#contact" className="inline-flex items-center rounded-xl bg-[#06B6D4] px-6 py-3 font-bold text-white hover:bg-[#0891b2]">Request a Free Estimate <ArrowRight className="ml-2 h-4 w-4" /></a></div></div>
          </section>

          <section className="mb-14">
            <h2 className="mb-7 font-['Montserrat'] text-2xl font-bold text-[#0F253F] md:text-3xl">Pebble and quartz finish questions</h2>
            <div className="grid gap-5 md:grid-cols-3">{post.faqs.map((faq) => <article key={faq.question} className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-6"><h3 className="mb-3 font-['Montserrat'] font-bold text-[#0F253F]">{faq.question}</h3><p className="leading-relaxed text-slate-600">{faq.answer}</p></article>)}</div>
          </section>

          <nav aria-label="Related Rivera Pools services" className="border-t border-slate-200 pt-8"><p className="mb-4 font-['Montserrat'] font-bold text-[#0F253F]">Related Rivera Pools services</p><div className="flex flex-wrap gap-x-6 gap-y-3"><a href="/pool-finishes/pebble" className="font-semibold text-[#0891b2] hover:underline">Pebble pool resurfacing</a><a href="/pool-finishes/quartz" className="font-semibold text-[#0891b2] hover:underline">Quartz pool finishes</a><a href="/pool-plaster-delaminating" className="font-semibold text-[#0891b2] hover:underline">Pool plaster repair</a><a href="/blog/pool-remodeling" className="font-semibold text-[#0891b2] hover:underline">Remodeling knowledge center</a></div></nav>
        </article>
      </main>
      <footer className="bg-[#0A0A0A] py-8 text-center text-sm text-white/70"><p>Rivera Pools Riverside · Pool plastering, remodeling, resurfacing, and repairs across Riverside County.</p><p className="mt-2">C R Quality Pool Services dba Rivera Pools Care · CSLB #1053279 (C-35 Lathing &amp; Plastering) · Licensed, Bonded &amp; Insured</p><p className="mt-2">Weekly pool cleaning: <a href="https://prospoolcare.com/" className="underline">Rivera Pools Care</a> · (951) 383-9753</p><a href="tel:+19513459276" className="mt-2 inline-block font-semibold text-white hover:text-[#67e8f9]">(951) 345-9276</a></footer>
    </div>
  );
}