import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Clock3, Droplets, Filter, Menu, Phone, Search, ShieldCheck, Waves, X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWidget } from "@/components/ChatWidget";
import { blogTopics as topics } from "@/data/blog-topics";

export default function Blog() {
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Pool Cleaning & Maintenance Knowledge Center | Rivera Pool Care";
    
    const setMeta = (selector: string, attribute: string, value: string) => {
      const element = document.head.querySelector<HTMLMetaElement>(selector);
      if (element) element.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', "content", "Ten practical pool cleaning and maintenance guides for Riverside County homeowners, covering chemistry, filtration, equipment, algae, weather, and restorative cleaning.");
    setMeta('link[rel="canonical"]', "href", "https://prospoolcare.com/blog");
    setMeta('meta[property="og:title"]', "content", "Pool Cleaning & Maintenance Knowledge Center | Rivera Pool Care");
    setMeta('meta[property="og:description"]', "content", "Ten practical pool cleaning and maintenance guides for Riverside County homeowners.");
    setMeta('meta[property="og:url"]', "content", "https://prospoolcare.com/blog");
    setMeta('meta[name="twitter:title"]', "content", "Pool Cleaning & Maintenance Knowledge Center | Rivera Pool Care");
    setMeta('meta[name="twitter:description"]', "content", "Ten practical pool cleaning and maintenance guides for Riverside County homeowners.");
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return topics.filter((topic) => !needle || `${topic.title} ${topic.kicker} ${topic.intro} ${topic.tags.join(" ")} ${topic.facts.join(" ")}`.toLowerCase().includes(needle));
  }, [query]);

  return (
    <div className="min-h-[100dvh] bg-slate-50 text-foreground selection:bg-secondary selection:text-white">
      {/* HEADER */}
      <header className="bg-primary border-b border-white/10 sticky top-0 z-50">
        <nav className="container mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4" aria-label="Main navigation">
          <a href="/" className="flex items-center gap-2 text-white group">
            <span className="bg-white/10 p-2 rounded-xl text-secondary transition-colors group-hover:bg-white/20">
              <Droplets className="w-6 h-6" />
            </span>
            <span className="font-display font-extrabold text-xl leading-none tracking-tight">
              RIVERA<span className="font-medium text-sm block tracking-widest opacity-80">POOL CARE</span>
            </span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="/#services" className="text-sm font-semibold text-white/90 hover:text-white transition-colors">Services</a>
            <a href="/#service-area" className="text-sm font-semibold text-white/90 hover:text-white transition-colors">Service Area</a>
            <a href="/blog" className="text-sm font-semibold text-secondary transition-colors">Knowledge Center</a>
            
            <div className="flex items-center gap-4 ml-2">
              <a href="tel:+19513839753" className="text-white font-bold flex items-center gap-2 hover:text-white/80 transition-colors">
                <Phone className="w-4 h-4 text-secondary" />
                (951) 383-9753
              </a>
              <Button asChild className="bg-secondary hover:bg-secondary/90 text-white rounded-full font-bold shadow-lg shadow-secondary/20">
                <a href="/#contact">Free Estimate</a>
              </Button>
            </div>
          </div>
          
          <button className="md:hidden p-2 text-white bg-white/10 rounded-lg" onClick={() => setMenu(!menu)} aria-label="Toggle menu">
            {menu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
        
        {menu && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
            <a href="/#services" className="px-4 py-3 text-left hover:bg-slate-50 rounded-lg font-semibold text-primary">Services</a>
            <a href="/#service-area" className="px-4 py-3 text-left hover:bg-slate-50 rounded-lg font-semibold text-primary">Service Area</a>
            <a href="/blog" className="px-4 py-3 text-left bg-slate-50 rounded-lg font-semibold text-primary">Knowledge Center</a>
            <div className="h-px bg-border my-2"></div>
            <a href="tel:+19513839753" className="px-4 py-3 text-left hover:bg-slate-50 rounded-lg font-bold text-primary flex items-center gap-2">
              <Phone className="w-5 h-5 text-secondary" /> (951) 383-9753
            </a>
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-white w-full rounded-lg mt-2 py-6 text-lg font-bold">
              <a href="/#contact">Get an Estimate</a>
            </Button>
          </div>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-primary px-6 py-16 lg:py-24">
          <div className="absolute -right-24 -top-28 h-96 w-96 rounded-full border-[38px] border-white/5 pointer-events-none" />
          <div className="absolute bottom-[-6rem] left-[42%] h-64 w-64 rounded-full border border-white/10 pointer-events-none" />
          
          <div className="relative mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-secondary">
              <a href="/blog" className="hover:text-white transition-colors">Field Notes</a>
              <span>/</span>
              <span className="text-white/80">Knowledge Center</span>
            </div>
            
            <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_330px] lg:items-end">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-secondary">
                  <Waves className="h-4 w-4" /> 
                  Local pool care, decoded
                </div>
                <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.07] md:text-5xl lg:text-6xl text-white">
                  Clear water is a system,<br className="hidden md:block"/> not a coincidence.
                </h1>
                <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-white/80">
                  Ten practical guides for the heat, hard water, wind, dust, and equipment realities of Riverside County. Know what to test, what to clean, and when a warning deserves a professional look.
                </p>
              </div>
              
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-6 w-6 text-secondary" />
                  <span className="text-sm font-bold text-white">10 topics · about 22 minutes</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  Chemistry, filtration, equipment care, algae, weather recovery, and restorative cleaning—written for homeowners in Murrieta, Temecula, and beyond.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT GRID */}
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <p className="mb-5 text-xs font-bold uppercase tracking-[.18em] text-slate-400">In this guide</p>
                <nav className="space-y-1">
                  {topics.map((topic) => (
                    <a href={`/blog/${topic.id}`} key={topic.id} className="flex gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 font-medium transition-colors hover:bg-slate-100 hover:text-primary">
                      <span className="font-mono text-[10px] text-secondary font-bold mt-0.5">{topic.number}</span>
                      <span className="leading-snug">{topic.title}</span>
                    </a>
                  ))}
                </nav>
                <div className="mt-10 rounded-2xl bg-primary p-6 text-white shadow-xl shadow-primary/10">
                  <ShieldCheck className="mb-4 h-8 w-8 text-secondary" />
                  <p className="text-base font-bold leading-snug">Not sure what your water is telling you?</p>
                  <a href="/#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-white transition-colors">
                    Book a water check <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </aside>

            {/* Articles */}
            <div>
              <div className="mb-8 flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-secondary">The care library</p>
                  <h2 className="mt-3 font-display text-2xl font-extrabold md:text-3xl text-primary">Ten answers for the pool you have today.</h2>
                  <p className="mt-3 max-w-xl text-base text-slate-600">Open a topic for field-tested details and a Rivera Pool Care takeaway.</p>
                </div>
                <label className="relative block sm:w-72 shrink-0">
                  <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                  <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search chemistry, algae..." className="w-full rounded-xl border border-border bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20 shadow-sm" />
                </label>
              </div>

              <div className="mb-8 flex gap-3 overflow-x-auto pb-2 lg:hidden scrollbar-hide">
                {topics.map((topic) => (
                   <a href={`/blog/${topic.id}`} key={topic.id} className="shrink-0 rounded-full border border-border bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:border-secondary hover:text-secondary transition-colors">
                    <span className="text-secondary mr-1">{topic.number}</span> {topic.kicker}
                  </a>
                ))}
              </div>

              <div className="space-y-6">
                {filtered.map((topic) => (
                   <article key={topic.id} className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
                     <a href={`/blog/${topic.id}`} className="flex w-full items-start gap-4 p-6 text-left md:p-8 focus:outline-none focus:bg-slate-50 transition-colors">
                      <span className="font-mono text-sm font-bold text-secondary">{topic.number}</span>
                      <span className="flex-1">
                        <span className="block text-xs font-bold uppercase tracking-[.17em] text-slate-400">{topic.kicker}</span>
                        <span className="mt-2 block font-display text-xl font-bold leading-tight md:text-2xl text-primary">{topic.title}</span>
                        <span className="mt-4 block max-w-3xl text-base leading-relaxed text-slate-600">{topic.intro}</span>
                        <span className="mt-5 flex flex-wrap gap-2">
                          {topic.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">#{tag}</span>
                          ))}
                        </span>
                      </span>
                       <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-secondary" />
                     </a>
                  </article>
                ))}
              </div>
              
              {filtered.length === 0 && (
                <div className="rounded-2xl border-2 border-dashed border-border bg-slate-50 p-16 text-center">
                  <Filter className="mx-auto h-8 w-8 text-slate-400" />
                  <p className="mt-4 font-display text-lg font-bold text-primary">No matching topics found</p>
                  <p className="mt-2 text-slate-500 text-sm">Try adjusting your search terms.</p>
                  <Button onClick={() => setQuery("")} variant="outline" className="mt-6 font-bold">Clear search</Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <section className="bg-secondary/10 px-6 py-16 lg:py-20 border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-secondary">Good maintenance catches patterns</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-primary">Bring the warning sign to the site visit.</h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-700">Rivera Pool Care can test the water, inspect the equipment, and explain whether you need routine care, a restoration, or a larger repair.</p>
            </div>
            <Button asChild className="h-14 shrink-0 px-8 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold shadow-xl shadow-secondary/20 transition-all hover:-translate-y-0.5">
              <a href="/#contact">Request a water assessment <ArrowRight className="ml-2 h-5 w-5" /></a>
            </Button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-primary pt-16 pb-8 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-white/10 p-2 rounded-xl text-secondary">
                  <Droplets className="w-5 h-5" />
                </div>
                <span className="font-display font-bold text-xl text-white tracking-tight">
                  RIVERA <span className="font-medium text-sm opacity-80">POOL CARE</span>
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Dependable, family-owned pool cleaning and equipment repair services for Riverside County.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">Service Area</h4>
              <ul className="space-y-3 text-white/60 text-sm">
                <li><a href="/blog" className="text-secondary font-bold hover:text-white transition-colors">Knowledge Center &amp; Blog</a></li>
                <li><a href="/murrieta" className="hover:text-white transition-colors">Pool service in Murrieta, CA</a></li>
                <li><a href="/temecula" className="hover:text-white transition-colors">Pool service in Temecula, CA</a></li>
                <li><a href="/lake-elsinore" className="hover:text-white transition-colors">Pool service in Lake Elsinore, CA</a></li>
                <li><a href="/winchester" className="hover:text-white transition-colors">Pool service in Winchester, CA</a></li>
                <li><a href="/canyon-lake" className="hover:text-white transition-colors">Pool service in Canyon Lake, CA</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">Contact Us</h4>
              <ul className="space-y-4 text-white/60 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-secondary" />
                  <a href="tel:+19513839753" className="hover:text-white transition-colors">(951) 383-9753</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-secondary" />
                  <a href="mailto:claudio@prospoolcare.com" className="hover:text-white transition-colors">claudio@prospoolcare.com</a>
                </li>
                <li className="flex items-center gap-3 mt-4">
                  <div className="px-3 py-1 bg-white/10 rounded-md text-xs font-bold text-white tracking-wider">HABLAMOS ESPAÑOL</div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-white/40 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Rivera Pool Care. All rights reserved.</p>
            <p>Weekly service and dependable repairs for Southwest Riverside County.</p>
          </div>
        </div>
      </footer>
      <ChatWidget />
    </div>
  );
}