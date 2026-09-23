import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone, Mail, MapPin, CheckCircle2, Star, Droplets, Menu, X, ArrowRight, Shield, Clock, Award
} from "lucide-react";

import { CITIES, type CityConfig } from "./cities";
import { trackPhoneClick, trackQuoteSubmission } from "@/lib/analytics";
import { ReviewModal } from "./ReviewModal";
export type { CityConfig };
export { CITIES };

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const SERVICES = [
  {
    title: "Pool Resurfacing & Replaster",
    desc: "Restore your pool's surface with premium Stone Scapes, pebble, or standard plaster finishes built to last 15–20 years. We drain the pool, prep the shell, and apply a finish that bonds correctly — no shortcuts. We work with NovaBead, Stone Scapes, and white plaster and help you choose the right material for your climate and budget.",
    bullets: ["Stone Scapes & Pebble Finishes", "White & Colored Plaster", "Acid Wash & Stain Removal"],
  },
  {
    title: "Custom Stone Coping & Tile",
    desc: "Natural travertine, slate, and glass tile work that frames your pool with lasting curb appeal. Replacing coping with premium stone dramatically transforms your entire backyard. We also install 6×6 glass tile, ceramic mosaic, and natural stone waterline tile that protects the shell and adds color.",
    bullets: ["Travertine & Slate Coping", "Glass & Ceramic Waterline Tile", "Custom Mosaic Accents"],
  },
  {
    title: "Full Pool Renovation",
    desc: "Structural remodels, new energy-efficient equipment, automation systems, and complete transformations — from start to finish. Old single-speed pumps waste electricity; a variable-speed upgrade pays for itself in 1–2 seasons. We also convert chlorine pools to saltwater and install Pentair and Hayward smart controls.",
    bullets: ["Variable-Speed Pump Upgrades", "Saltwater Conversions", "Smart Automation Systems"],
  },
  {
    title: "Pool Leak Detection",
    desc: "Investigate unexplained water loss before it leads to larger repairs. We assess the pool, plumbing, equipment, and surrounding conditions to help locate the likely source and plan the right fix.",
    bullets: ["Water-Loss Assessment", "Plumbing & Equipment Checks", "Repair Recommendations"],
  },
];

const TESTIMONIALS = [
  { name: "Jennifer M.", text: "Claudio and his team did an incredible job resurfacing our pool. Stone Scapes finish looks amazing and they finished ahead of schedule.", stars: 5 },
  { name: "Robert T.", text: "Professional from the first call to the final walk-through. Fair pricing, quality work, zero surprises. Highly recommend.", stars: 5 },
  { name: "Sandra L.", text: "We got 4 quotes before choosing Rivera Pools. Best value by far — and the results speak for themselves. Our pool looks brand new.", stars: 5 },
];

function asset(file: string): string {
  const base = window.location.pathname.startsWith("/__mockup") ? "/__mockup/images/" : "/images/";
  return `${base}${file}`;
}

export function CityLanding({ city }: { city: CityConfig }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [formData, setFormData] = useState({ from_name: "", phone: "", from_email: "", project_type: "" , message: "" });
  const [formStatus, setFormStatus] = useState<"idle"|"sending"|"success"|"error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSelect = (field: string, val: string) =>
    setFormData(prev => ({ ...prev, [field]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Pool Estimate — ${city.name} — ${formData.from_name}`,
          from_name: formData.from_name,
          email: formData.from_email,
          phone: formData.phone,
          city: city.name,
          project_type: formData.project_type,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("Submission failed");
      trackQuoteSubmission({
        formLocation: "city_contact",
        city: city.name,
        service: formData.project_type || undefined,
      });
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const projectPhotos = city.projectPhotos ?? [
    { file: "photo1.webp", alt: "Representative Rivera Pools pool remodeling project with new coping" },
    { file: "photo2.webp", alt: "Representative Rivera Pools pool resurfacing project" },
    { file: "photo3.webp", alt: "Representative Rivera Pools natural stone coping project" },
    { file: "photo4.webp", alt: "Representative Rivera Pools custom pool tile project" },
    { file: "before1.webp", alt: "Representative Rivera Pools pool remodeling project before renovation" },
    { file: "rivera-opt.webp", alt: "Rivera Pools pool remodeling project with completed finish" },
  ];

  return (
    <div className="min-h-screen bg-white font-['DM_Sans',sans-serif]">

      {/* NAV */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-white/70 backdrop-blur-sm py-4"}`}>
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Droplets className="w-7 h-7 text-[#06B6D4]" />
            <span className="font-['Montserrat'] font-extrabold text-lg tracking-tight text-[#0F253F] leading-none">
              RIVERA POOLS
              <span className="font-medium text-slate-500 text-xs block tracking-widest">RIVERSIDE</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4] transition-colors">Home</a>
            <a href="/#services" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4] transition-colors">Services</a>
            <a href="/#portfolio" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4] transition-colors">Portfolio</a>
            <Button onClick={() => scrollTo("contact")} className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white rounded-full px-5 text-sm font-medium shadow-lg shadow-[#06B6D4]/20">
              Free Estimate
            </Button>
          </nav>
          <button className="md:hidden p-2 text-[#0F253F]" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-4 flex flex-col gap-3">
            <a href="/" className="px-4 py-2 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileOpen(false)}>Home</a>
            <a href="/#services" className="px-4 py-2 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileOpen(false)}>Services</a>
            <Button onClick={() => { setMobileOpen(false); scrollTo("contact"); }} className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white w-full rounded-lg mt-1">
              Free Estimate
            </Button>
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#0F253F] via-[#163352] to-[#0A1F35] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={asset("photo1.webp")} alt={`Pool remodeling in ${city.name}, CA by Rivera Pools Riverside`} width={1200} height={800} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F253F]/60 to-[#0F253F]/95" />
          <div className="relative container mx-auto px-6 max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 bg-[#06B6D4]/20 border border-[#06B6D4]/30 rounded-full px-4 py-1.5 text-[#06B6D4] text-sm font-medium mb-6">
              <MapPin className="w-3.5 h-3.5" /> Serving {city.name}, {city.county}
            </div>
            <h1 className="font-['Montserrat'] font-extrabold text-4xl md:text-6xl text-white leading-tight mb-6">
              {city.heroKeyword}
            </h1>
            <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              {city.tagline} Request an inspection and a written estimate by calling (951) 345-9276 or using the form below.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => scrollTo("contact")} className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white h-14 px-10 rounded-xl font-semibold shadow-2xl shadow-[#06B6D4]/30 text-base">
                Get Free Estimate in {city.name}
              </Button>
              <a href="tel:+19513459276" onClick={() => trackPhoneClick("city_hero")}>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 rounded-xl font-medium text-base w-full sm:w-auto">
                  <Phone className="w-4 h-4 mr-2" /> (951) 345-9276
                </Button>
              </a>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 text-white/80 text-sm">
              {["Licensed & Insured", "C-35 License #1053279", "15+ Years Experience", "Free Estimates"].map(t => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CITY INTRO — adds keyword-rich body text for SEO */}
        <section className="py-14 bg-white border-b border-slate-100">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[#0F253F] mb-5">
              Pool Remodeling Experts Serving {city.name}, CA
            </h2>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg max-w-3xl mx-auto mb-4">
              Rivera Pools Riverside has been transforming outdated pools across {city.name} and {city.county} for over 15 years (replastering since 2010, CSLB-licensed since 2019).
              Whether your pool needs a fresh Stone Scapes pebble finish, full plaster resurfacing, new coping and tile, or a
              complete structural renovation, our licensed team handles every project with the same attention to detail.
            </p>
            <p className="text-slate-500 leading-relaxed text-sm md:text-base max-w-3xl mx-auto">
              {city.name} homeowners trust us because we show up on time, pull all required permits, use premium materials, and
              back every job with a satisfaction guarantee. From the first estimate to the final walk-through, you work directly
              with Claudio Rivera — no subcontractors, no surprises. Call <a href="tel:+19513459276" onClick={() => trackPhoneClick("city_intro")} className="text-[#06B6D4] font-semibold">(951) 345-9276</a> for
              a free, no-obligation estimate.
            </p>
          </div>
        </section>

        {/* LOCAL PROJECT CONTEXT */}
        <section className="py-14 bg-[#F8FAFC] border-b border-slate-100">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[#0F253F] mb-5 text-center">
              Planning a Pool Project in {city.name}
            </h2>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-4">
              {city.projectFocus}
            </p>
            <p className="text-slate-500 leading-relaxed text-sm md:text-base">
              {city.localConsiderations}
            </p>
          </div>
        </section>

        {/* LOCAL NEIGHBORHOODS */}
        <section className="py-10 bg-[#F8FAFC] border-b border-slate-100">
          <div className="container mx-auto px-6 max-w-5xl">
            <p className="text-center text-slate-500 text-sm mb-4">Neighborhoods we serve in {city.name}:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {city.neighborhoods.map(n => (
                <span key={n} className="bg-white border border-slate-200 text-slate-700 text-sm px-4 py-1.5 rounded-full shadow-sm">
                  {n}
                </span>
              ))}
              <span className="bg-white border border-slate-200 text-slate-500 text-sm px-4 py-1.5 rounded-full shadow-sm">+ surrounding areas</span>
            </div>
          </div>
        </section>

        {city.localServices && (
          <section className="py-16 bg-white border-b border-slate-100">
            <div className="container mx-auto px-6 max-w-5xl">
              <div className="max-w-3xl mb-10">
                <p className="text-xs font-bold tracking-widest text-[#06B6D4]">LOCAL SERVICE PLAN</p>
                <h2 className="mt-3 font-['Montserrat'] font-bold text-3xl text-[#0F253F]">
                  Services available in {city.name}
                </h2>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Start with an inspection, then choose only the work the pool needs. These are the services Rivera Pools plans for homeowners in {city.name}; the final scope depends on the shell, access, finish, and equipment.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {city.localServices.map((service) => (
                  <article key={service.title} className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-6">
                    <h3 className="font-['Montserrat'] font-bold text-[#0F253F]">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
                    <a href={service.href} className="mt-4 inline-flex items-center font-semibold text-[#0891b2] hover:underline">
                      Learn about this service <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SERVICES */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#0F253F] mb-3">
                Pool Plastering &amp; Remodeling Services in {city.name}
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">Everything your pool needs — done right the first time.</p>
            </div>
            <h2 className="font-['Montserrat'] font-bold text-2xl text-[#0F253F] mb-6">Pool Finish Options in {city.name}</h2>
            <div className="grid md:grid-cols-3 gap-5 mb-12">
              {[
                { title: "Standard Plaster", desc: "A clean, classic finish for homeowners who want a dependable surface and an efficient resurfacing option." },
                { title: "Quartz Finish", desc: "Fine aggregate adds color variation and texture while staying smoother than a traditional pebble finish." },
                { title: "Pebble & Stone Scapes", desc: "Natural aggregate blends create a durable, resort-style surface with rich water color and texture." },
              ].map((finish) => (
                <article key={finish.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <Droplets className="w-5 h-5 text-[#06B6D4] mb-3" />
                  <h3 className="font-['Montserrat'] font-bold text-[#0F253F] mb-2">{finish.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{finish.desc}</p>
                </article>
              ))}
            </div>
            <nav aria-label={`Specialized pool services in ${city.name}`} className="mb-12 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-6">
              <p className="font-['Montserrat'] font-bold text-[#0F253F] mb-4">Explore related pool services</p>
              <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
                <a href="/pool-finishes/quartz" className="font-semibold text-[#0891b2] hover:underline">Quartz pool finish</a>
                <a href="/pool-finishes/pebble" className="font-semibold text-[#0891b2] hover:underline">Pebble pool finish</a>
                <a href="/pool-finishes/diamond-brite" className="font-semibold text-[#0891b2] hover:underline">Diamond Brite finish</a>
                <a href="/travertine-coping" className="font-semibold text-[#0891b2] hover:underline">Travertine pool coping</a>
                <a href="/pool-plaster-delaminating" className="font-semibold text-[#0891b2] hover:underline">Delaminating plaster repair</a>
                <a href="/rough-pool-plaster-repair" className="font-semibold text-[#0891b2] hover:underline">Rough plaster repair</a>
                <a href="/baja-shelf-addition-cost" className="font-semibold text-[#0891b2] hover:underline">Baja shelf additions</a>
              </div>
            </nav>
            <div className="grid md:grid-cols-3 gap-6">
              {SERVICES.map(s => (
                <div key={s.title} className="bg-[#F8FAFC] rounded-2xl p-7 border border-slate-100 hover:shadow-md transition-shadow group">
                  <div className="w-10 h-10 bg-[#06B6D4]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#06B6D4]/20 transition-colors">
                    <Droplets className="w-5 h-5 text-[#06B6D4]" />
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-lg text-[#0F253F] mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-1.5">
                    {s.bullets.map(b => (
                      <li key={b} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {/* Process Steps */}
            <div className="mt-14 bg-[#F8FAFC] rounded-3xl p-8">
              <h2 className="font-['Montserrat'] font-bold text-xl text-[#0F253F] text-center mb-8">Our Technical Pool Resurfacing Process in {city.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[
                  { step: "01", title: "Drain & Inspect", desc: "We drain the pool, inspect the shell, document damage, and confirm the finish and repair plan for your {city} home." },
                  { step: "02", title: "Chip-out & Prep", desc: "The failing surface is chipped out, the shell is repaired and cleaned, and the bond coat is prepared for the new finish." },
                  { step: "03", title: "Troweling & Detail", desc: "Our crew applies the selected plaster, quartz, or pebble finish by hand, then completes tile, coping, and detail work." },
                  { step: "04", title: "Fill & Balance", desc: "The pool is filled, startup chemistry is balanced, and we explain the first days of care before you swim." },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="text-center">
                    <div className="w-10 h-10 bg-[#06B6D4] text-white rounded-full flex items-center justify-center mx-auto mb-3 font-['Montserrat'] font-bold text-xs">{step}</div>
                    <h4 className="font-['Montserrat'] font-bold text-[#0F253F] text-sm mb-1">{title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc.replace(/{city}/g, city.name)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PROBLEMS */}
            <div className="mt-14">
              <h2 className="font-['Montserrat'] font-bold text-2xl text-[#0F253F] text-center mb-8">Pool Surface Problems We Solve in {city.name}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Rough pool plaster", desc: "Sharp, abrasive, or uncomfortable surfaces that trap dirt and make swimming unpleasant." },
                  { title: "Pool stains and discoloration", desc: "Organic stains, scale, fading, and waterline discoloration that cleaning alone cannot resolve." },
                  { title: "Delaminating plaster", desc: "Hollow, lifting, flaking, or exposed areas that may need a repair or complete resurfacing plan." },
                  { title: "Cracks and surface damage", desc: "Visible cracks, worn plaster, and shell or coping issues evaluated before the finish is selected." },
                ].map((problem) => (
                  <article key={problem.title} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-[#06B6D4] mt-0.5" />
                    <div>
                      <h3 className="font-['Montserrat'] font-semibold text-[#0F253F] mb-1">{problem.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{problem.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {city.resurfacingSigns && city.availableFinishes && (
              <div className="mt-14 grid lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="font-['Montserrat'] font-bold text-2xl text-[#0F253F] mb-6">
                    Signs a {city.name} pool may need resurfacing
                  </h2>
                  <div className="space-y-4">
                    {city.resurfacingSigns.map((sign) => (
                      <article key={sign.title} className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-5">
                        <h3 className="font-['Montserrat'] font-semibold text-[#0F253F]">{sign.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{sign.description}</p>
                      </article>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="font-['Montserrat'] font-bold text-2xl text-[#0F253F] mb-6">
                    Finishes available in {city.name}
                  </h2>
                  <div className="space-y-4">
                    {city.availableFinishes.map((finish) => (
                      <article key={finish.name} className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-5">
                        <h3 className="font-['Montserrat'] font-semibold text-[#0F253F]">{finish.name}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{finish.description}</p>
                        <a href={finish.href} className="mt-3 inline-block text-sm font-semibold text-[#0891b2] hover:underline">Compare this finish</a>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Service FAQ */}
            <div className="mt-12">
              <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F253F] text-center mb-6">Frequently Asked Questions — Pool Remodeling in {city.name}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {city.localFaqs.map(({ q, a }) => (
                  <div key={q} className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-100">
                    <h4 className="font-['Montserrat'] font-semibold text-[#0F253F] mb-2 text-sm">{q}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* WHY RIVERA */}
        <section className="py-20 bg-[#0F253F] text-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="font-['Montserrat'] font-bold text-3xl text-center mb-12">
              Why {city.name} Homeowners Choose Rivera Pools
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: "Licensed & Insured", desc: "Fully licensed, bonded, and insured in California. All permits handled for you." },
                { icon: Clock, title: "On-Time Delivery", desc: "We respect your time. Most remodels in " + city.name + " are completed within the agreed timeline." },
                { icon: Award, title: "Premium Materials", desc: "Stone Scapes, pebble finishes, natural stone coping — we don't cut corners on materials." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center">
                  <div className="w-14 h-14 bg-[#06B6D4]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#06B6D4]" />
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-lg mb-2">{title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            {city.documentedProject ? (
              <div className="mb-14 rounded-3xl border border-[#bfe3e5] bg-[#F8FAFC] p-7 md:p-9">
                <p className="text-xs font-bold tracking-widest text-[#06B6D4]">DOCUMENTED LOCAL PROJECT</p>
                <h2 className="mt-3 font-['Montserrat'] font-bold text-3xl text-[#0F253F]">{city.documentedProject.title} — {city.documentedProject.location}</h2>
                <div className="mt-6 grid md:grid-cols-3 gap-5 text-sm leading-relaxed">
                  <div><h3 className="font-['Montserrat'] font-bold text-[#0F253F]">The problem</h3><p className="mt-2 text-slate-600">{city.documentedProject.problem}</p></div>
                  <div><h3 className="font-['Montserrat'] font-bold text-[#0F253F]">The work</h3><p className="mt-2 text-slate-600">{city.documentedProject.work}</p></div>
                  <div><h3 className="font-['Montserrat'] font-bold text-[#0F253F]">The result</h3><p className="mt-2 text-slate-600">{city.documentedProject.result}</p></div>
                </div>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {city.documentedProject.photos.map((photo) => (
                    <img key={photo.file} src={asset(photo.file)} alt={photo.alt} width={900} height={675} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-14 rounded-3xl border border-slate-200 bg-[#F8FAFC] p-7 md:p-9">
                <p className="text-xs font-bold tracking-widest text-[#06B6D4]">PROJECT DOCUMENTATION</p>
                <h2 className="mt-3 font-['Montserrat'] font-bold text-3xl text-[#0F253F]">See completed Rivera Pools work</h2>
                <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
                  We show representative completed work below and label it honestly. We do not present a photo as a {city.name}-specific case study until the project location and scope are documented.
                </p>
              </div>
            )}
            <h2 className="font-['Montserrat'] font-bold text-3xl text-center text-[#0F253F] mb-10">
              {city.documentedProject ? `More Rivera Pools project photos for ${city.name}` : `Representative Rivera Pools project photos for ${city.name}`}
            </h2>
            <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
              These original Rivera Pools photos help homeowners compare finishes, coping, tile, and resurfacing options. They are not labeled as city-specific case studies unless identified above.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {projectPhotos.map(({ file, alt }) => (
                <div key={file} className="rounded-2xl overflow-hidden aspect-square shadow-md">
                  <img src={asset(file)} alt={alt} width={800} height={800} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href="/#portfolio">
                <Button variant="outline" className="border-slate-200 text-[#0F253F] hover:text-[#06B6D4] rounded-full px-8">
                  View All Projects <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {city.nearbyAreas && (
          <section className="py-14 bg-[#F8FAFC] border-t border-slate-100">
            <div className="container mx-auto px-6 max-w-5xl">
              <h2 className="font-['Montserrat'] font-bold text-2xl text-[#0F253F]">Nearby areas we serve from {city.name}</h2>
              <p className="mt-3 text-slate-600">If your property is just outside {city.name}, these nearby service pages explain the work we plan in surrounding communities.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {city.nearbyAreas.map((area) => (
                  <a key={area.href} href={area.href} className="rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-[#0891b2] hover:border-[#06B6D4]">
                    {area.name}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TESTIMONIALS */}
        <section className="py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="font-['Montserrat'] font-bold text-3xl text-center text-[#0F253F] mb-10">
              What Homeowners Are Saying
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map(t => (
                <div key={t.name} className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                  <p className="font-semibold text-[#0F253F] text-sm">— {t.name}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setReviewModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F253F] hover:bg-[#0F253F]/90 text-white font-semibold text-sm shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                <span>Dejar una Reseña / Leave a Review</span>
              </button>
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="bg-[#0F253F] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
              {/* Left info */}
              <div className="w-full lg:w-[38%] p-10 lg:p-12 text-white relative">
                <div className="absolute inset-0 bg-[#06B6D4] opacity-10" />
                <div className="relative z-10">
                  <h2 className="font-['Montserrat'] font-bold text-2xl lg:text-3xl mb-3">
                    Free Estimate in {city.name}
                  </h2>
                  <p className="text-white/85 mb-8 text-sm leading-relaxed">
                    We serve all of {city.name} and surrounding {city.county} communities. Response within 24 hours.
                  </p>
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 p-2.5 rounded-full"><Phone className="w-4 h-4 text-[#06B6D4]" /></div>
                      <div><p className="text-xs text-white/75">Call Us</p><p className="font-medium text-sm">(951) 345-9276</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 p-2.5 rounded-full"><Mail className="w-4 h-4 text-[#06B6D4]" /></div>
                      <div><p className="text-xs text-white/75">Email</p><p className="font-medium text-sm">claudio@prospoolcare.com</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white/10 p-2.5 rounded-full"><MapPin className="w-4 h-4 text-[#06B6D4]" /></div>
                      <div><p className="text-xs text-white/75">Service Area</p><p className="font-medium text-sm">{city.name} & {city.county}</p></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right form */}
              <div className="w-full lg:w-[62%] bg-white p-10 lg:p-12">
                {formStatus === "success" ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-[#06B6D4]/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-[#06B6D4]" />
                    </div>
                    <h3 className="font-['Montserrat'] font-bold text-2xl text-[#0F253F]">Message Sent!</h3>
                    <p className="text-slate-500 max-w-sm text-sm">We received your request and will get back to you within 24 business hours.</p>
                    <Button variant="outline" onClick={() => setFormStatus("idle")} className="mt-2 border-[#06B6D4] text-[#06B6D4]">Send Another</Button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Full Name</label>
                        <Input name="from_name" value={formData.from_name} onChange={handleChange} placeholder="John Doe" className="bg-slate-50 border-slate-200 h-12" required />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700">Phone</label>
                        <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="(951) 000-0000" className="bg-slate-50 border-slate-200 h-12" required />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">Email Address</label>
                      <Input name="from_email" type="email" value={formData.from_email} onChange={handleChange} placeholder="john@example.com" className="bg-slate-50 border-slate-200 h-12" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">Project Type</label>
                      <select
                        value={formData.project_type}
                        onChange={e => handleSelect("project_type", e.target.value)}
                        aria-label="Select the service you need"
                        className="w-full bg-slate-50 border border-slate-200 h-12 rounded-md px-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                      >
                        <option value="">What do you need help with?</option>
                        <option value="Full Remodel">Full Remodel</option>
                        <option value="Plaster / Stone Scapes Resurfacing">Plaster / Stone Scapes Resurfacing</option>
                        <option value="Stone Coping & Tile">Stone Coping & Tile</option>
                        <option value="Equipment Upgrade">Equipment Upgrade</option>
                        <option value="Pool Leak Detection">Pool Leak Detection</option>
                        <option value="Other / Not Sure">Other / Not Sure</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">Details <span className="text-slate-500 font-normal">(optional)</span></label>
                      <Textarea name="message" value={formData.message} onChange={handleChange} placeholder={`Tell us about your pool in ${city.name}...`} className="bg-slate-50 border-slate-200 min-h-[100px] resize-none" />
                    </div>
                    {formStatus === "error" && (
                      <p className="text-sm text-red-500">Something went wrong. Please call us at (951) 345-9276.</p>
                    )}
                    <Button type="submit" disabled={formStatus === "sending"} className="w-full bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-bold h-13 text-base rounded-xl shadow-lg shadow-[#06B6D4]/20 disabled:opacity-60">
                      {formStatus === "sending" ? "Sending…" : `Request Free Estimate in ${city.name}`}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0A] py-10 text-white/80 text-sm">
        <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-[#06B6D4]" />
            <span className="font-['Montserrat'] font-bold text-white">Rivera Pools Riverside</span>
          </div>
           <p>Pool Remodeling in {city.name}, {city.county} · (951) 345-9276 · C R Quality Pool Services dba Rivera Pools Care · CSLB #1053279 (C-35 Lathing &amp; Plastering) · Licensed, Bonded &amp; Insured</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setReviewModalOpen(true)}
              className="text-[#D4AF37] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              Leave a Review
            </button>
            <a href="/" className="text-[#06B6D4] hover:underline">← Back to Main Site</a>
          </div>
        </div>
      </footer>

      {/* Smart Review Funnel Modal */}
      <ReviewModal 
        isOpen={reviewModalOpen} 
        onClose={() => setReviewModalOpen(false)} 
      />
    </div>
  );
}
