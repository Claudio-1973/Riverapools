import { ArrowRight, BookOpen, CheckCircle2, Droplets, FileText, Menu, Phone, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

const asset = (file: string) => `${window.location.pathname.startsWith("/__mockup") ? "/__mockup/images/" : "/images/"}${file}`;

export function BlogHub() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.title = "Pool Cleaning & Remodeling Blogs | Rivera Pools Riverside";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Explore practical pool cleaning advice and contractor-level guides to pool remodeling, finishes, repairs, coping, tile, startup, and equipment.");
  }, []);
  return (
    <div className="min-h-screen bg-[#f4f8f8] text-[#17324d] font-['DM_Sans',sans-serif]">
      <header className="sticky top-0 z-40 border-b border-[#d9e5e7] bg-[#fbfdfc]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="/" className="flex items-center gap-2" aria-label="Rivera Pools Riverside home">
            <Droplets className="h-8 w-8 text-[#08aeca]" />
            <span className="font-['Montserrat'] text-lg font-extrabold leading-none tracking-tight">RIVERA POOLS<span className="block text-[10px] font-semibold tracking-[.28em] text-[#607685]">RIVERSIDE</span></span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            <a href="/#services" className="text-sm font-semibold text-[#526a79] hover:text-[#08aeca]">Services</a>
            <a href="/blog" className="text-sm font-bold text-[#08aeca]">Knowledge center</a>
            <a href="tel:+19513459276" className="flex items-center gap-2 text-sm font-bold"><Phone className="h-4 w-4 text-[#08aeca]" />(951) 345-9276</a>
          </nav>
          <button className="rounded-lg p-2 md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && <div className="border-t border-[#d9e5e7] bg-white p-4 md:hidden"><a href="/blog/pool-remodeling" className="block rounded-lg bg-[#e7f7f8] px-4 py-3 font-bold text-[#087b91]">Pool remodeling center</a><a href="/blog/pool-cleaning-maintenance-riverside-ca" className="mt-2 block rounded-lg px-4 py-3 font-semibold">Pool care blog</a></div>}
      </header>
      <main>
        <section className="relative overflow-hidden bg-[#17324d] px-5 py-20 text-white lg:px-8 lg:py-28">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border-[40px] border-[#08aeca]/15" />
          <div className="relative mx-auto max-w-7xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#6de1e5]"><BookOpen className="h-4 w-4" /> Rivera Pools field notes</p>
            <h1 className="max-w-4xl font-['Montserrat'] text-4xl font-extrabold leading-[1.08] md:text-6xl">Good pool decisions start with better questions.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">Two practical libraries for Riverside County homeowners: one for keeping water healthy, and one for understanding the structure, materials, and workmanship behind a remodel.</p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="mb-10 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#0a9aae]">Choose your starting point</p><h2 className="mt-3 font-['Montserrat'] text-3xl font-extrabold md:text-4xl">Advice for the pool you have today.</h2></div>
          <div className="grid gap-6 lg:grid-cols-2">
            <a href="/blog/pool-cleaning-maintenance-riverside-ca" className="group rounded-[2rem] border border-[#d9e5e7] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg md:p-10">
              <div className="flex h-full min-h-[330px] flex-col"><div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f7f8] text-[#08aeca]"><Droplets className="h-7 w-7" /></div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#0a9aae]">Blog 01 · Pool cleaning</p><h3 className="mt-3 font-['Montserrat'] text-2xl font-extrabold">Keep the water clear and the equipment working.</h3><p className="mt-4 flex-1 leading-relaxed text-[#607685]">Straightforward maintenance guidance for weekly service, chemistry, filtration, and the small warning signs worth acting on early.</p><span className="mt-8 inline-flex items-center gap-2 font-bold text-[#087b91]">Read the cleaning blog <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" /></span></div>
            </a>
            <a href="/blog/pool-remodeling" className="group relative min-h-[390px] overflow-hidden rounded-[2rem] bg-[#0b5268] p-8 text-white shadow-xl shadow-[#17324d]/10 md:p-11">
              <img src={asset("photo1.webp")} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20 transition duration-700 group-hover:scale-105" />
              <div className="relative flex h-full flex-col justify-between"><div><span className="rounded-full border border-[#6de1e5]/50 bg-[#6de1e5]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#b5fbf5]">Blog 02 · Pool remodeling</span><h3 className="mt-7 max-w-xl font-['Montserrat'] text-3xl font-extrabold leading-tight md:text-4xl">Pool Remodeling Knowledge Center</h3><p className="mt-4 max-w-lg leading-relaxed text-white/75">Ten contractor-level guides on plaster failure, surface prep, finish performance, tile movement, coping, water chemistry, startup, and equipment.</p></div><span className="mt-8 inline-flex items-center gap-2 font-bold text-[#a4f0ed]">Explore the 10 remodeling topics <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" /></span></div>
            </a>
          </div>
          <a href="/blog/pebble-vs-quartz-pool-finishes" className="group mt-8 flex flex-col gap-5 rounded-3xl border border-[#d9e5e7] bg-[#f7fbfb] p-6 transition hover:-translate-y-1 hover:border-[#08aeca]/40 hover:shadow-lg md:flex-row md:items-center md:justify-between md:p-8">
            <div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#0a9aae]">Latest plaster guide</p><h3 className="mt-2 font-['Montserrat'] text-2xl font-extrabold text-[#17324d]">Pebble vs. Quartz Pool Finishes: Which One Fits Your Pool?</h3><p className="mt-2 max-w-2xl leading-relaxed text-[#607685]">Compare comfort, lifespan, texture, color, investment, and the 28-day startup care that protects a new finish.</p></div>
            <span className="inline-flex shrink-0 items-center gap-2 font-bold text-[#087b91]">Read the finish guide <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" /></span>
          </a>
          <div className="mt-14 grid gap-4 border-t border-[#d9e5e7] pt-8 text-sm text-[#607685] sm:grid-cols-3"><div className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-[#d3a62d]" /><span>Licensed contractor perspective, not anonymous advice.</span></div><div className="flex gap-3"><FileText className="h-5 w-5 shrink-0 text-[#08aeca]" /><span>Technical details explained in plain language.</span></div><div className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-[#08aeca]" /><span>Know what to ask before work begins.</span></div></div>
        </section>
      </main>
      <footer className="bg-[#10283f] px-5 py-8 text-center text-sm text-white/65"><p>Rivera Pools Riverside · Remodeling, resurfacing, repairs, and pool care across Riverside County.</p><p className="mt-2">CA C-35 Contractor License #1053279 · Licensed, Bonded, &amp; Insured</p><a href="tel:+19513459276" className="mt-2 inline-block font-bold text-[#80e9e9]">(951) 345-9276</a></footer>
    </div>
  );
}