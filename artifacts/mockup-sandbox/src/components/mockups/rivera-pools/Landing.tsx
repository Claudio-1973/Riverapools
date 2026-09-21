import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Droplets, 
  Wrench, 
  Settings, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Star, 
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  ThumbsUp,
  Award,
  ArrowRight,
  Shield,
  Sparkles,
  Search
} from "lucide-react";
import { trackPhoneClick, trackQuoteSubmission } from "@/lib/analytics";

// Resolves image/video paths correctly in both Replit sandbox (/__mockup/) and Vercel (/)
const BASE = typeof window !== "undefined" && window.location.pathname.startsWith("/__mockup")
  ? "/__mockup/"
  : "/";
const asset = (name: string) => `${BASE}images/${name}`;

const CITY_PAGE_PATHS: Record<string, string> = {
  Riverside: "/riverside",
  Corona: "/corona",
  Temecula: "/temecula",
  Murrieta: "/murrieta",
  Menifee: "/menifee",
  Hemet: "/hemet",
  Fallbrook: "/fallbrook",
  Bonsall: "/bonsall",
  Vista: "/vista",
  Oceanside: "/oceanside",
};

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const querySection = new URLSearchParams(window.location.search).get("section");
    const targetId = querySection || window.location.hash.replace(/^#/, "");
    if (!targetId) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  // Before/After modal state
  const [baModal, setBaModal] = useState<null | { title: string; before: string; after: string }>(null);

  // Contact form state
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    from_name: "", phone: "", from_email: "", city: "", project_type: "", message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSelect = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Pool Estimate Request — ${formData.from_name}`,
          from_name: formData.from_name,
          email: formData.from_email,
          phone: formData.phone,
          city: formData.city,
          project_type: formData.project_type,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        trackQuoteSubmission({
          formLocation: "landing_contact",
          city: formData.city || undefined,
          service: formData.project_type || undefined,
        });
        setFormStatus("success");
        setFormData({ from_name: "", phone: "", from_email: "", city: "", project_type: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch (err) {
      console.error("Web3Forms error:", err);
      setFormStatus("error");
    }
  };

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-['Inter'] text-slate-700 bg-white overflow-x-hidden scroll-smooth selection:bg-[#06B6D4] selection:text-white">
      {/* NAVIGATION */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-md shadow-sm" 
            : "bg-white/50 backdrop-blur-sm"
        }`}
      >
        {/* Top bar — hours + quick contact */}
        <div className="hidden md:block bg-[#0F253F] text-white text-xs">
          <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between py-1.5">
            <span className="flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2"/></svg>
              Mon – Sat: 8:00 AM – 5:00 PM
            </span>
            <a href="tel:+19513459276" onClick={() => trackPhoneClick("header_hours_bar")} className="flex items-center gap-1.5 hover:text-[#06B6D4] transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              (951) 345-9276
            </a>
          </div>
        </div>

        <div className={`container mx-auto px-6 max-w-7xl flex items-center justify-between transition-all duration-300 ${isScrolled ? "py-3" : "py-5"}`}>
          <div className="flex items-center gap-2 group">
            <a href="/" className="flex items-center gap-2" aria-label="Rivera Pools Riverside home">
              <Droplets className="w-8 h-8 text-[#06B6D4]" />
              <span className="font-['Montserrat'] font-extrabold text-xl tracking-tight text-[#0F253F] leading-none">
                RIVERA POOLS
                <span className="font-medium text-slate-500 text-sm block tracking-widest">RIVERSIDE</span>
              </span>
            </a>
            <a href="tel:+19513459276" onClick={() => trackPhoneClick("header_navigation")} className="font-bold text-[#0F253F] text-[15px] tracking-wide hover:text-[#06B6D4] transition-colors">
              (951) 345-9276
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/pool-resurfacing" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4] transition-colors">Services</a>
            <a href="#portfolio" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4] transition-colors">Portfolio</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4] transition-colors">About</a>
            <a href="#process" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4] transition-colors">Process</a>
            <a href="#coverage" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4] transition-colors">Coverage</a>
            <a href="/blog" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4] transition-colors">Blogs</a>
            <Button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white rounded-full px-6 font-medium shadow-lg shadow-[#06B6D4]/20">
              Free Estimate
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-[#0F253F]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
            <a href="/pool-resurfacing" className="px-4 py-2 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#portfolio" className="px-4 py-2 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
            <a href="#about" className="px-4 py-2 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#process" className="px-4 py-2 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Process</a>
            <a href="#coverage" className="px-4 py-2 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Coverage</a>
            <a href="/blog" className="px-4 py-2 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Blogs</a>
            <Button onClick={() => { setMobileMenuOpen(false); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white w-full rounded-lg mt-2">
              Free Estimate
            </Button>
          </div>
        )}
      </header>

      <main>
        {/* Sentinel for IntersectionObserver — triggers navbar scroll state with zero reflow */}
        <div ref={sentinelRef} className="absolute top-20 h-px w-full pointer-events-none" aria-hidden="true" />

        {/* 2. HERO SECTION — full-screen video background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background video */}
          <video
            src={asset("pool-video-opt.mp4")}
            poster={asset("rivera-opt.webp")}
            preload="metadata"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F253F]/55 via-[#0F253F]/35 to-[#0F253F]/65 z-10" />

          {/* Content */}
          <div className="relative z-20 container mx-auto px-6 max-w-5xl text-center">
            {/* Trust pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 shadow mb-8">
              <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-xs font-medium text-white/90">15+ Years of Experience · Quality Guaranteed</span>
            </div>

            <h1 className="font-['Montserrat'] font-extrabold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.08] tracking-tight mb-6">
              Pool Plastering<br className="hidden md:block" />
              <span className="text-[#06B6D4]"> &amp; Resurfacing</span><br className="hidden md:block" />
              in Riverside County
            </h1>

            <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed mb-10">
              Over 15 years transforming pools across Riverside County. Every project backed by our quality guarantee — from premium plaster and Stone Scapes finishes to full structural remodels. Local, licensed, and built to last.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white h-14 px-10 rounded-xl font-bold shadow-2xl shadow-[#06B6D4]/30 text-base">
                Get a Free Estimate
              </Button>
              <a href="tel:+19513459276" onClick={() => trackPhoneClick("hero")}>
                <Button variant="outline" className="h-14 px-10 rounded-xl font-semibold border-white/40 text-white hover:bg-white/10 text-base bg-transparent backdrop-blur gap-2">
                  <Phone className="w-4 h-4" /> Call (951) 345-9276
                </Button>
              </a>
            </div>

            {/* Trust badges row */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-5 py-2.5">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-semibold text-white">Licensed &amp; Insured</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-5 py-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
              <span className="text-xs font-semibold text-white">C-35 License #1053279</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-5 py-2.5">
                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="text-xs font-semibold text-white">15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-5 py-2.5">
                <Shield className="w-4 h-4 text-[#06B6D4]" />
                <span className="text-xs font-semibold text-white">Quality Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/75 animate-bounce">
            <div className="w-px h-10 bg-white/30 rounded-full" />
          </div>
        </section>

        {/* 3. PORTFOLIO (BEFORE & AFTER BENTO GRID) */}
        <section id="portfolio" className="py-24 bg-white relative">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#0F253F] mb-4">Our Transformations</h2>
                <p className="text-slate-600 max-w-2xl">Browse our recent remodeling projects across Riverside County, featuring high-end materials and meticulous craftsmanship.</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-[#0F253F] text-white hover:bg-[#0F253F] rounded-full px-4 py-1.5 text-sm cursor-pointer">All</Badge>
                <Badge variant="outline" className="text-slate-600 hover:bg-slate-50 rounded-full px-4 py-1.5 text-sm cursor-pointer border-slate-200">Full Remodel</Badge>
                <Badge variant="outline" className="text-slate-600 hover:bg-slate-50 rounded-full px-4 py-1.5 text-sm cursor-pointer border-slate-200">Resurfacing</Badge>
                <Badge variant="outline" className="text-slate-600 hover:bg-slate-50 rounded-full px-4 py-1.5 text-sm cursor-pointer border-slate-200">Stone & Tile</Badge>
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
              {/* Item 1 - Large */}
              <div className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer h-[300px] md:h-auto shadow-sm hover:shadow-xl transition-all duration-300">
                <img
                  src="https://res.cloudinary.com/ci1jfnss/image/upload/f_auto,q_auto:good,w_1274,h_1200,c_fill/v1783996664/1783996593574_yqch5d.png"
                  alt="Modern Stone Scapes pebble finish pool remodel — Rivera Pools Riverside CA"
                  width={1274}
                  height={1200}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F253F]/90 via-[#0F253F]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                <button
                  onClick={() => setBaModal({ title: "Modern Stone Scapes Oasis — Temecula", before: asset("before1.webp"), after: asset("photo2.webp") })}
                  className="absolute top-4 right-4 bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20 transition-colors cursor-pointer"
                >
                  Before → After
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#06B6D4] text-white px-2 py-1 rounded">Stone Scapes</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded">Full Remodel</span>
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-2xl text-white mb-2">Modern Stone Scapes Oasis — Temecula</h3>
                  <div className="flex items-center gap-2 text-[#06B6D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <span className="text-sm font-semibold">View Project Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[250px] md:h-auto shadow-sm hover:shadow-xl transition-all duration-300">
                <img src={asset("photo3.webp")} alt="Natural stone coping installation — pool renovation Riverside County CA" width={800} height={600} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F253F]/90 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37] text-white px-2 py-1 rounded">Stone Coping</span>
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-lg text-white mb-1">Artisan Edge Stone — Murrieta</h3>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[250px] md:h-auto shadow-sm hover:shadow-xl transition-all duration-300">
                <img src={asset("photo4.webp")} alt="Custom glass tile pool renovation — Riverside County CA by Rivera Pools" width={800} height={600} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F253F]/90 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                <button
                  onClick={() => setBaModal({ title: "Premium Tile & Black Pebble — Idyllwild-Pine Cove", before: asset("photo4.webp"), after: asset("photo1.webp") })}
                  className="absolute top-4 right-4 bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20 transition-colors cursor-pointer"
                >
                  Before → After
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#06B6D4] text-white px-2 py-1 rounded">Premium Tile & Black Pebble</span>
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-lg text-white mb-1">Premium Tile & Black Pebble — Idyllwild-Pine Cove</h3>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" className="border-slate-200 text-[#0F253F] hover:bg-slate-50 hover:text-[#06B6D4] transition-colors rounded-full px-8">
                View All Projects <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* 4. FEATURED CASE STUDY */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="font-['Montserrat'] font-bold text-3xl text-center md:text-left text-[#0F253F] mb-12">Featured Transformation: Modern Oasis</h2>
            
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              {/* Left: Specs */}
              <div className="w-full lg:w-[40%] bg-[#0F253F] rounded-3xl p-8 lg:p-10 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#06B6D4] opacity-10 rounded-bl-full"></div>
                
                <div className="space-y-8 relative z-10">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                      <div className="bg-white/10 p-2 rounded-lg text-[#06B6D4]"><MapPin className="w-5 h-5" /></div>
                      <div>
                        <p className="text-xs text-white/75 uppercase tracking-wider font-bold mb-1">Location</p>
                        <p className="font-medium text-lg">Temecula, CA</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                      <div className="bg-white/10 p-2 rounded-lg text-[#06B6D4]"><Clock className="w-5 h-5" /></div>
                      <div>
                        <p className="text-xs text-white/75 uppercase tracking-wider font-bold mb-1">Timeline</p>
                        <p className="font-medium text-lg">2 weeks</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                      <div className="bg-white/10 p-2 rounded-lg text-[#06B6D4]"><Wrench className="w-5 h-5" /></div>
                      <div>
                        <p className="text-xs text-white/75 uppercase tracking-wider font-bold mb-1">Services</p>
                        <p className="font-medium">Structural remodel, <a href="/travertine-coping" className="text-[#67e8f9] hover:text-white hover:underline">natural stone installation</a>, Pentair smart pump</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/20 rounded-xl p-5 border border-white/5">
                    <p className="text-sm text-white/85 mb-2"><strong className="text-white">Challenge:</strong> Cracked old plaster, outdated energy-hungry equipment, fading coping.</p>
                    <p className="text-sm text-white/85"><strong className="text-[#06B6D4]">Solution:</strong> <a href="/pool-finishes/pebble" className="text-[#67e8f9] hover:text-white hover:underline">Premium Stone Scapes resurfacing</a>, modern glass tile, eco automation system.</p>
                  </div>
                </div>
                
                <Button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="w-full mt-8 bg-[#06B6D4] hover:bg-white hover:text-[#0F253F] transition-colors rounded-xl font-bold">
                  Start Your Transformation
                </Button>
              </div>
              
              {/* Right: Gallery */}
              <div className="w-full lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 rounded-3xl overflow-hidden h-[300px] lg:h-auto shadow-md">
                  <img src={asset("photo1.webp")} alt="Completed Stone Scapes pool remodel in Temecula CA" width={800} height={600} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-3xl overflow-hidden h-[200px] shadow-md hidden md:block">
                  <img src={asset("photo3.webp")} alt="Natural stone coping installation Riverside County" width={800} height={600} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-3xl overflow-hidden h-[200px] shadow-md hidden md:block">
                  <img src={asset("photo4.webp")} alt="Premium pool tile renovation Murrieta CA" width={800} height={600} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SERVICES & CAPABILITIES */}
        <section id="services" className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#0F253F] mb-4">Expert Pool Services</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">We specialize in complete restorations that enhance the beauty, durability, and efficiency of your pool.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <Card className="border-slate-100 bg-white hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0F253F]/5 transition-all duration-300 rounded-2xl">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-[#0F253F]/5 rounded-2xl flex items-center justify-center mb-6 text-[#0F253F]">
                    <Droplets className="w-7 h-7" />
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F253F] mb-3"><a href="/pool-remodeling" className="hover:text-[#0891b2]">Pool Remodeling &amp; Resurfacing</a></h3>
                  <p className="text-slate-600 leading-relaxed mb-3">Plan a complete <a href="/pool-remodeling" className="font-semibold text-[#0891b2] hover:underline">pool remodeling and renovation</a> with <a href="/pool-resurfacing" className="font-semibold text-[#0891b2] hover:underline">pool resurfacing and replastering</a>, <a href="/pool-finishes/pebble" className="font-semibold text-[#0891b2] hover:underline">Pebble and StoneScapes resurfacing</a>, or <a href="/pool-finishes/quartz" className="font-semibold text-[#0891b2] hover:underline">quartz pool finishes</a>. Whether your <a href="/pool-plaster-delaminating" className="font-semibold text-[#0891b2] hover:underline">pool plaster is delaminating</a>, staining, or simply outdated, we drain the pool, prepare the shell, and match the finish to the project.</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">Looking for <a href="/pool-finishes/pebble" className="font-semibold text-[#0891b2] hover:underline">Stone Scapes finishes in Riverside</a> or <a href="/rough-pool-plaster-repair" className="font-semibold text-[#0891b2] hover:underline">pool plaster repair near you</a>? We work with NovaBead, Stone Scapes, and standard white plaster — and help you choose the right material for your Riverside County climate and budget.</p>
              <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> <a href="/pool-finishes/pebble" className="hover:text-[#0891b2] hover:underline">Pebble and StoneScapes resurfacing</a></li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> <a href="/rough-pool-plaster-repair" className="hover:text-[#0891b2] hover:underline">Rough plaster repair</a></li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> <a href="/pool-resurfacing" className="hover:text-[#0891b2] hover:underline">Pool resurfacing and replastering</a></li>
                  </ul>
                </CardContent>
              </Card>

              {/* Service 2 */}
              <Card className="border-slate-100 bg-white hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0F253F]/5 transition-all duration-300 rounded-2xl">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-[#0F253F]/5 rounded-2xl flex items-center justify-center mb-6 text-[#0F253F]">
                    <div className="relative">
                      <div className="w-6 h-6 border-2 border-current rounded-sm"></div>
                      <div className="w-4 h-4 border-2 border-current rounded-sm absolute -bottom-1 -right-1 bg-white"></div>
                    </div>
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F253F] mb-3"><a href="/travertine-coping" className="hover:text-[#0891b2]">Tile, Coping &amp; Deck Restoration</a></h3>
                  <p className="text-slate-600 leading-relaxed mb-3">Upgrade your pool's aesthetic with artisan edge stone, elegant glass tile, and modern mosaics that redefine luxury. Coping is the cap around your pool's edge — replacing it with <a href="/travertine-coping" className="font-semibold text-[#0891b2] hover:underline">travertine pool coping</a>, slate, or bullnose concrete dramatically changes how the entire backyard looks and feels.</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">Waterline tile protects the shell at the water line while adding color and texture. We install 6×6 glass tile, ceramic mosaic, and natural stone tile across Riverside County.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> <a href="/travertine-coping" className="hover:text-[#0891b2] hover:underline">Travertine coping and deck restoration</a></li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> <a href="/travertine-coping" className="hover:text-[#0891b2] hover:underline">Waterline tile restoration</a></li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> Custom water features</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Service 3 */}
              <Card className="border-slate-100 bg-white hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0F253F]/5 transition-all duration-300 rounded-2xl">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-[#0F253F]/5 rounded-2xl flex items-center justify-center mb-6 text-[#0F253F]">
                    <Settings className="w-7 h-7" />
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F253F] mb-3"><a href="/pool-equipment-upgrades" className="hover:text-[#0891b2]">Equipment Upgrades</a></h3>
                  <p className="text-slate-600 leading-relaxed mb-3">Modernize your pool with smart, energy-efficient equipment including variable-speed pumps, heaters, and automation. We review the current system before recommending equipment that fits the pool, plumbing, and renovation scope.</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">We also convert chlorine pools to saltwater systems for softer, gentler water — and install Pentair and Hayward automation so you can control temperature, lights, and jets from your phone.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> <a href="/pool-equipment-upgrades" className="hover:text-[#0891b2] hover:underline">Variable-speed pump upgrades</a></li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> <a href="/pool-equipment-upgrades" className="hover:text-[#0891b2] hover:underline">Pool automation systems</a></li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> <a href="/pool-equipment-upgrades" className="hover:text-[#0891b2] hover:underline">Saltwater conversions</a></li>
                  </ul>
                </CardContent>
              </Card>

              {/* Service 4 */}
              <Card className="border-slate-100 bg-white hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0F253F]/5 transition-all duration-300 rounded-2xl">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-[#06B6D4]/10 rounded-2xl flex items-center justify-center mb-6 text-[#06B6D4]">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F253F] mb-3">Pool Cleaning & Maintenance</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">Keep your pool sparkling clean and chemically balanced year-round with our professional cleaning service. We handle everything so you can simply enjoy your pool — no more lugging chemicals or scrubbing walls on weekends.</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">Our technicians visit weekly or bi-weekly, test and adjust water chemistry, brush walls and tile, vacuum the floor, clean the filter, and leave a written service report after every visit. Serving Riverside County homeowners since day one.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> Weekly & Bi-Weekly Service Plans</li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> Water Chemistry Balancing</li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> Filter Cleaning & Equipment Checks</li>
                  </ul>
                  <a href="/blog/pool-cleaning-maintenance-riverside-ca" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0891b2] hover:underline">
                    Read our pool care guide <ArrowRight className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>

              {/* Service 5 */}
              <Card className="border-slate-100 bg-white hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0F253F]/5 transition-all duration-300 rounded-2xl">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-[#06B6D4]/10 rounded-2xl flex items-center justify-center mb-6 text-[#06B6D4]">
                    <Search className="w-7 h-7" />
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F253F] mb-3"><a href="/pool-leak-detection" className="hover:text-[#0891b2]">Pool Leak Detection</a></h3>
                  <p className="text-slate-600 leading-relaxed mb-3">Find unexplained water loss before it causes bigger damage. We evaluate pool water loss and help identify whether the source is in the shell, plumbing, equipment, or surrounding deck.</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">A focused leak assessment can help you avoid unnecessary resurfacing, protect your pool structure, and choose the right repair plan for your Riverside County property.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> <a href="/pool-leak-detection" className="hover:text-[#0891b2] hover:underline">Pool leak detection and water-loss assessment</a></li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> Plumbing and equipment checks</li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> Repair recommendations</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <nav aria-label="Specialized pool services" className="mt-12 rounded-2xl border border-slate-100 bg-[#F8FAFC] p-6">
              <p className="font-['Montserrat'] font-bold text-[#0F253F] mb-4">Explore specialized pool services</p>
              <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
                <a href="/pool-finishes/quartz" className="font-semibold text-[#0891b2] hover:underline">Quartz pool finish</a>
                <a href="/pool-finishes/pebble" className="font-semibold text-[#0891b2] hover:underline">Pebble pool finish</a>
                <a href="/pool-finishes/stone-scapes" className="font-semibold text-[#0891b2] hover:underline">StoneScapes pool finish</a>
                <a href="/pool-finishes/diamond-brite" className="font-semibold text-[#0891b2] hover:underline">Diamond Brite finish</a>
                <a href="/pool-resurfacing" className="font-semibold text-[#0891b2] hover:underline">Pool resurfacing</a>
                <a href="/pool-leak-detection" className="font-semibold text-[#0891b2] hover:underline">Pool leak detection</a>
                <a href="/pool-equipment-upgrades" className="font-semibold text-[#0891b2] hover:underline">Equipment upgrades</a>
                <a href="/travertine-coping" className="font-semibold text-[#0891b2] hover:underline">Travertine pool coping</a>
                <a href="/pool-plaster-delaminating" className="font-semibold text-[#0891b2] hover:underline">Delaminating plaster repair</a>
                <a href="/rough-pool-plaster-repair" className="font-semibold text-[#0891b2] hover:underline">Rough plaster repair</a>
                <a href="/baja-shelf-addition-cost" className="font-semibold text-[#0891b2] hover:underline">Baja shelf additions</a>
              </div>
            </nav>

            <section id="pool-cleaning" className="mt-16 scroll-mt-28 overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F253F] to-[#163352] text-white">
              <div className="grid items-center gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#67e8f9]">Pool Cleaning &amp; Maintenance</p>
                  <h3 className="font-['Montserrat'] text-2xl font-bold md:text-3xl">A cleaner pool, every week</h3>
                  <p className="mt-4 max-w-2xl leading-relaxed text-white/75">Keep your pool ready for family time with dependable weekly or bi-weekly service. We test the water, brush and vacuum the pool, empty baskets, check the filter, and flag small problems before they become expensive repairs.</p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a href="#contact" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#06B6D4] px-6 font-bold text-white hover:bg-[#0891b2]">Ask about service</a>
                    <a href="/blog/pool-cleaning-maintenance-riverside-ca" className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 px-6 font-semibold text-white hover:bg-white/10">Read the pool care guide <ArrowRight className="ml-2 h-4 w-4" /></a>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-sm font-semibold text-white/90">What a regular visit covers</p>
                  <ul className="mt-4 space-y-3 text-sm text-white/75">
                    <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#67e8f9]" /> Water chemistry testing and balancing</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#67e8f9]" /> Skimming, brushing, vacuuming, and basket service</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#67e8f9]" /> Filter and visible equipment checks</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Process Steps */}
            <div className="mt-20 bg-[#F8FAFC] rounded-3xl p-10">
              <h3 className="font-['Montserrat'] font-bold text-2xl text-[#0F253F] text-center mb-10">Our Remodeling Process — From Estimate to Swim</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { step: "01", title: "Free Estimate", desc: "We visit your property, assess the pool condition, and provide a detailed written quote — no surprises, no pressure." },
                    { step: "02", title: "Material Selection", desc: "Choose from our finish samples: Stone Scapes, pebble, quartz, or Diamond Brite. We help match the look to your backyard and budget." },
                  { step: "03", title: "Permits & Prep", desc: "We pull all required city and county permits. Your pool is drained, the old surface is chipped, and the shell is acid-washed and prepped." },
                  { step: "04", title: "Installation & Fill", desc: "New surface is applied by our licensed crew. Once cured, the pool is filled, balanced, and handed back ready to swim." },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="text-center">
                    <div className="w-12 h-12 bg-[#06B6D4] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-['Montserrat'] font-bold text-sm">{step}</div>
                    <h4 className="font-['Montserrat'] font-bold text-[#0F253F] mb-2">{title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service FAQ */}
            <div className="mt-16">
              <h3 className="font-['Montserrat'] font-bold text-2xl text-[#0F253F] text-center mb-8">Common Questions About Pool Remodeling</h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { q: "How long does pool resurfacing near me in Riverside take?", a: "Most pool resurfacing jobs in Riverside County take 5–7 business days from drain to refill. Full renovations with new coping and tile can take 2–3 weeks depending on scope." },
                  { q: "How often does a pool need to be resurfaced?", a: "Standard white plaster typically lasts 7–10 years. Stone Scapes and pebble finishes last 15–20 years with proper water chemistry maintenance." },
                  { q: "Do I need a permit for pool remodeling in Riverside County?", a: "Permits are required in most Riverside County cities for structural work. As your pool remodeling specialists in Riverside County, we handle all permit applications and inspections — you don't need to do anything." },
                  { q: "What are Stone Scapes finishes in Riverside and why choose them?", a: "Stone Scapes finishes in Riverside are pebble-aggregate surfaces applied over the pool shell. More durable than plaster, naturally slip-resistant, and available in dozens of colors — our most popular finish for Riverside County homeowners." },
                  { q: "Can you match my existing coping or tile?", a: "We carry a wide inventory of travertine, slate, and tile products. In most cases we can closely match existing materials, or help you design a full refresh that looks intentional." },
                  { q: "What are pool plaster resurfacing costs in Riverside?", a: "Pool plaster resurfacing costs in Riverside start around $4,500 for a standard replaster. Stone Scapes finishes range from $6,000–$10,000 depending on pool size. Full renovations vary — we provide free itemized written estimates." },
                ].map(({ q, a }) => (
                  <div key={q} className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-100">
                    <h4 className="font-['Montserrat'] font-semibold text-[#0F253F] mb-2 text-sm">{q}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 6. ABOUT US */}
        <section id="about" className="py-24 bg-[#F8FAFC] overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-[45%] relative">
                <div className="absolute inset-0 bg-[#06B6D4] rounded-3xl transform rotate-3 scale-105 opacity-10"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10 transform -rotate-1 transition-transform hover:rotate-0 duration-500">
                  <img src={asset("rivera-opt.webp")} alt="Rivera Pools Riverside licensed pool remodeling crew" width={512} height={640} loading="lazy" className="w-full h-auto aspect-[4/5] object-cover" />
                </div>
              </div>
              
              <div className="w-full lg:w-[55%]">
                <Badge variant="outline" className="border-[#06B6D4] text-[#06B6D4] px-3 py-1 mb-6 text-xs font-bold uppercase tracking-widest bg-[#06B6D4]/5">Local Craftsmen</Badge>
                <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#0F253F] mb-6">About Rivera Pools Riverside</h2>
                
                <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-8">
                  <p>
                    As a locally rooted, family-operated contractor in Riverside County, we don't just build pools—we build relationships. We understand that your backyard is your private sanctuary.
                  </p>
                  <p>
                    Unlike volume-focused builders, our approach is defined by <strong className="text-[#0F253F]">artisan craftsmanship</strong> and <strong className="text-[#0F253F]">transparent pricing</strong>. When we quote a job, that's the price. No hidden fees, no surprise materials costs mid-project.
                  </p>
                  <p>
                    From the first stone laid to the final chemical balancing, our licensed, insured team handles every detail with precision. We believe in doing it right the first time.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })} variant="outline" className="border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white h-12 px-8 rounded-xl font-medium transition-colors">
                    Our Process
                  </Button>
                  <div className="flex items-center gap-3 text-[#0F253F] font-bold">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                      <Phone className="w-5 h-5 text-[#06B6D4]" />
                    </div>
                    <a href="tel:+19513459276" onClick={() => trackPhoneClick("about")} className="hover:text-[#06B6D4] transition-colors">
                      <p className="text-xs text-slate-500 font-normal">Call us directly</p>
                      <p>(951) 345-9276</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. WORK PROCESS */}
        <section id="process" className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#0F253F] mb-4">Our Proven Process</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">A seamless, stress-free experience from the first handshake to the first swim.</p>
            </div>
            
            <div className="relative">
              {/* Desktop Connecting Line */}
              <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-slate-100"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white border-4 border-[#F8FAFC] shadow-lg rounded-full flex items-center justify-center text-[#0F253F] font-['Montserrat'] font-bold text-2xl mb-6 relative group-hover:border-[#06B6D4] transition-colors duration-300">
                    1
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F253F] mb-3">Free Site Assessment</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">We visit your property at no cost to evaluate the pool's condition, take measurements, and discuss your vision.</p>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white border-4 border-[#F8FAFC] shadow-lg rounded-full flex items-center justify-center text-[#0F253F] font-['Montserrat'] font-bold text-2xl mb-6 relative group-hover:border-[#06B6D4] transition-colors duration-300">
                    2
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F253F] mb-3">Material & Design</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Choose your finishes, stone coping, tile patterns, and select energy-efficient smart equipment together with our experts.</p>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-[#0F253F] border-4 border-[#F8FAFC] shadow-lg shadow-[#0F253F]/20 rounded-full flex items-center justify-center text-white font-['Montserrat'] font-bold text-2xl mb-6 relative group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F253F] mb-3">Clean Execution</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Fast demolition, structural prep, and expert application by our specialized crews with zero mess left behind.</p>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white border-4 border-[#F8FAFC] shadow-lg rounded-full flex items-center justify-center text-[#0F253F] font-['Montserrat'] font-bold text-2xl mb-6 relative group-hover:border-[#06B6D4] transition-colors duration-300">
                    4
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F253F] mb-3">Handover & Swim</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">We fill the pool, balance the water chemistry, and deliver your brand new backyard oasis ready to enjoy.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS */}
        <section className="py-24 bg-[#0F253F] text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#06B6D4] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl mb-12 text-center">What Our Neighbors Are Saying</h2>
            
            <div className="flex overflow-x-auto pb-8 -mx-6 px-6 gap-6 snap-x hide-scrollbar">
              {/* Card 1 */}
              <div className="min-w-[300px] md:min-w-[400px] bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm snap-center hover:bg-white/10 transition-colors">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />)}
                </div>
                <p className="text-lg text-white/90 mb-6 italic">"Rivera Pools completely transformed our pool in Murrieta. The stone coping work was impeccable and they finished right on schedule. Absolutely recommend them."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#06B6D4] rounded-full flex items-center justify-center font-bold text-lg">M</div>
                  <div>
                    <p className="font-bold text-white">Mark S.</p>
                    <a href="/murrieta" className="text-sm text-white/75 hover:text-[#67e8f9] hover:underline">Murrieta, CA</a>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="min-w-[300px] md:min-w-[400px] bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm snap-center hover:bg-white/10 transition-colors">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />)}
                </div>
                <p className="text-lg text-white/90 mb-6 italic">"Excellent communication from start to finish. We upgraded from old plaster to Stone Scapes and the water looks absolutely stunning now. Very professional and clean crew."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center font-bold text-lg">S</div>
                  <div>
                    <p className="font-bold text-white">Sarah L.</p>
                    <a href="/temecula" className="text-sm text-white/75 hover:text-[#67e8f9] hover:underline">Temecula, CA</a>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="min-w-[300px] md:min-w-[400px] bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm snap-center hover:bg-white/10 transition-colors">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />)}
                </div>
                <p className="text-lg text-white/90 mb-6 italic">"Best investment we made for our home. The new stone coping completely changed the look of the backyard. Very professional team from start to finish."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center font-bold text-lg">J</div>
                  <div>
                    <p className="font-bold text-white">James R.</p>
                    <p className="text-sm text-white/75">Menifee, CA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. PARTNERS & CERTIFICATIONS */}
        <section className="py-12 border-b border-slate-100 bg-white">
          <div className="container mx-auto px-6 max-w-7xl text-center">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Trusted Brands We Install & Service</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="font-['Montserrat'] font-bold text-2xl text-slate-800">PENTAIR</span>
              <span className="font-['Montserrat'] font-bold text-2xl text-slate-800">Jandy</span>
              <span className="font-['Montserrat'] font-bold text-2xl text-slate-800">HAYWARD</span>
              <span className="font-['Montserrat'] font-bold text-2xl text-slate-800">Stone Scapes</span>
              <span className="font-['Montserrat'] font-bold text-2xl text-slate-800 border border-slate-800 px-3 py-1">NPC</span>
            </div>
          </div>
        </section>

        {/* 10. SERVICE AREA / COVERAGE */}
        <section id="coverage" className="py-24 bg-[#F8FAFC]">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-14">
              <span className="text-xs font-semibold text-[#06B6D4] uppercase tracking-widest">Where We Work</span>
              <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#0F253F] mt-3 mb-4">Serving Riverside County &amp; Inland Empire</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">We provide pool remodeling, resurfacing, and restoration throughout Riverside County. If you don't see your city, call us — we likely serve your area.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {[
                { city: "Riverside", note: "County seat" },
                { city: "Corona", note: "City pages available" },
                { city: "Temecula", note: "City pages available" },
                { city: "Murrieta", note: "City pages available" },
                { city: "Menifee", note: "SW Riverside County" },
                { city: "Moreno Valley", note: "NW Riverside County" },
                { city: "Lake Elsinore", note: "Near I-15 corridor" },
                { city: "Norco", note: "Western Riverside" },
                { city: "Eastvale", note: "Western Riverside" },
                { city: "Jurupa Valley", note: "Western Riverside" },
                { city: "Winchester", note: "Near Menifee" },
                { city: "Wildomar", note: "Near Murrieta" },
                { city: "Fallbrook", note: "North San Diego County" },
                { city: "Bonsall", note: "North San Diego County" },
                { city: "Vista", note: "North San Diego County" },
                { city: "Oceanside", note: "North San Diego County" },
              ].map(({ city, note }) => {
                const content = (
                  <>
                    <MapPin className="w-4 h-4 text-[#06B6D4] mb-2 group-hover:scale-110 transition-transform" />
                    <p className="font-semibold text-[#0F253F] text-sm">{city}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{note}</p>
                  </>
                );
                const cityClassName = "block bg-white rounded-xl border border-slate-100 shadow-sm p-5 hover:border-[#06B6D4]/40 hover:shadow-md transition-all group";
                return CITY_PAGE_PATHS[city] ? (
                  <a key={city} href={CITY_PAGE_PATHS[city]} className={cityClassName} aria-label={`Pool remodeling services in ${city}`}>
                    {content}
                  </a>
                ) : (
                  <div key={city} className={cityClassName}>{content}</div>
                );
              })}
            </div>

            <div className="bg-[#0F253F] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
              <div>
                <p className="font-['Montserrat'] font-bold text-xl mb-1">Don't see your city?</p>
                <p className="text-white/75 text-sm">We serve all of Riverside County. Call for a free phone consultation.</p>
              </div>
              <a href="tel:+19513459276" onClick={() => trackPhoneClick("coverage")} className="shrink-0 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-bold px-8 py-3 rounded-full transition-colors shadow-lg shadow-[#06B6D4]/20">
                Call (951) 345-9276
              </a>
            </div>
          </div>
        </section>

        {/* 11. CONTACT FORM */}
        <section id="contact" className="py-24 bg-white relative">
          <div className="absolute left-0 top-0 w-1/3 h-full bg-[#F8FAFC] -z-10 hidden lg:block"></div>
          
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="bg-[#0F253F] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
              {/* Info Side */}
              <div className="w-full lg:w-[40%] p-10 lg:p-14 text-white relative">
                <div className="absolute inset-0 bg-[#06B6D4] opacity-10"></div>
                <div className="relative z-10">
                  <h2 className="font-['Montserrat'] font-bold text-3xl lg:text-4xl mb-4">Ready to Transform Your Pool?</h2>
                  <p className="text-white/80 text-lg mb-12">Request your free estimate today. We'll get back to you within 24 business hours.</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/10 p-3 rounded-full"><Phone className="w-5 h-5 text-[#06B6D4]" /></div>
                      <a href="tel:+19513459276" onClick={() => trackPhoneClick("contact")} className="hover:text-[#06B6D4] transition-colors">
                        <p className="text-sm text-white/75">Call Us</p>
                        <p className="font-medium">(951) 345-9276</p>
                      </a>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-white/10 p-3 rounded-full"><Mail className="w-5 h-5 text-[#06B6D4]" /></div>
                      <div>
                        <p className="text-sm text-white/75">Email Us</p>
                        <p className="font-medium">claudio@contractor.net</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-white/10 p-3 rounded-full"><MapPin className="w-5 h-5 text-[#06B6D4]" /></div>
                      <div>
                        <p className="text-sm text-white/75">Service Area</p>
                        <p className="font-medium">Riverside County, CA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form Side */}
              <div className="w-full lg:w-[60%] bg-white p-10 lg:p-14">
                {formStatus === "success" ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-[#06B6D4]/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-[#06B6D4]" />
                    </div>
                    <h3 className="font-['Montserrat'] font-bold text-2xl text-[#0F253F]">Message Sent!</h3>
                    <p className="text-slate-500 max-w-sm">We received your request and will get back to you within 24 business hours.</p>
                    <Button variant="outline" onClick={() => setFormStatus("idle")} className="mt-4 border-[#06B6D4] text-[#06B6D4]">
                      Send Another Request
                    </Button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Full Name</label>
                        <Input name="from_name" value={formData.from_name} onChange={handleChange} placeholder="John Doe" className="bg-slate-50 border-slate-200 h-12" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Phone</label>
                        <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="(951) 345-9276" className="bg-slate-50 border-slate-200 h-12" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Email Address</label>
                        <Input name="from_email" type="email" value={formData.from_email} onChange={handleChange} placeholder="john@example.com" className="bg-slate-50 border-slate-200 h-12" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">City</label>
                        <select
                          value={formData.city}
                          onChange={e => handleSelect("city", e.target.value)}
                          aria-label="Select your city"
                          className="w-full bg-slate-50 border border-slate-200 h-12 rounded-md px-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                        >
                          <option value="">Select City</option>
                          <option value="Riverside">Riverside</option>
                          <option value="Corona">Corona</option>
                          <option value="Temecula">Temecula</option>
                          <option value="Murrieta">Murrieta</option>
                          <option value="Menifee">Menifee</option>
                          <option value="Moreno Valley">Moreno Valley</option>
                          <option value="Lake Elsinore">Lake Elsinore</option>
                          <option value="Norco">Norco</option>
                          <option value="Eastvale">Eastvale</option>
                          <option value="Jurupa Valley">Jurupa Valley</option>
                          <option value="Winchester">Winchester</option>
                          <option value="Wildomar">Wildomar</option>
                          <option value="Fallbrook">Fallbrook</option>
                          <option value="Bonsall">Bonsall</option>
                          <option value="Vista">Vista</option>
                          <option value="Oceanside">Oceanside</option>
                          <option value="Other">Other (Riverside County)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
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
                        <option value="Stone Coping & Tile">Stone Coping &amp; Tile</option>
                        <option value="Equipment Upgrade">Equipment Upgrade</option>
                        <option value="Pool Cleaning & Maintenance">Pool Cleaning &amp; Maintenance</option>
                        <option value="Pool Leak Detection">Pool Leak Detection</option>
                        <option value="Other / Not Sure">Other / Not Sure</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Project Details</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us a bit about your pool and what you're looking to do..."
                        className="bg-slate-50 border-slate-200 min-h-[120px] resize-none"
                      />
                    </div>

                    {formStatus === "error" && (
                      <p className="text-sm text-red-500">Something went wrong. Please try again or call us at (951) 345-9276.</p>
                    )}

                    <Button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-bold h-14 text-lg rounded-xl shadow-lg shadow-[#06B6D4]/20 disabled:opacity-60"
                    >
                      {formStatus === "sending" ? "Sending…" : "Request My Free Estimate"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 11. FOOTER */}
      <footer className="bg-[#0A0A0A] pt-16 pb-8 text-white/80">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12 border-b border-white/10 pb-12">
            
            <div className="lg:col-span-2">
              <a href="/" className="flex items-center gap-2 mb-6" aria-label="Rivera Pools Riverside home">
                <div className="bg-[#06B6D4] p-1.5 rounded-md">
                  <Droplets className="w-4 h-4 text-white" />
                </div>
                <span className="font-['Montserrat'] font-bold text-xl tracking-tight text-white">
                  RIVERA POOLS <span className="font-medium text-white/80 text-xs block -mt-1 tracking-widest">RIVERSIDE</span>
                </span>
              </a>
              <p className="text-sm text-white/80 max-w-sm mb-6">
                Professional Pool Construction, Remodeling, & Restoration in Riverside County. We build outdoor living spaces that last a lifetime.
              </p>
              <div className="flex gap-4">
                <a href="https://maps.google.com/maps?cid=7153614855009489923" aria-label="Rivera Pools Riverside on Google Business" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#06B6D4] hover:text-white transition-colors">
                  <Star className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Services</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><a href="/pool-resurfacing" className="hover:text-[#06B6D4] transition-colors">Pool Resurfacing &amp; Replastering</a></li>
                <li><a href="/pool-finishes/pebble" className="hover:text-[#06B6D4] transition-colors">Pebble Pool Finishes</a></li>
                <li><a href="/pool-finishes/stone-scapes" className="hover:text-[#06B6D4] transition-colors">Pebble &amp; StoneScapes Resurfacing</a></li>
                <li><a href="/pool-finishes/quartz" className="hover:text-[#06B6D4] transition-colors">Quartz Pool Finishes</a></li>
                <li><a href="/pool-finishes/diamond-brite" className="hover:text-[#06B6D4] transition-colors">Diamond Brite Finishes</a></li>
                <li><a href="/travertine-coping" className="hover:text-[#06B6D4] transition-colors">Travertine Coping &amp; Tile</a></li>
                <li><a href="/rough-pool-plaster-repair" className="hover:text-[#06B6D4] transition-colors">Pool Plaster Repair</a></li>
                <li><a href="/pool-leak-detection" className="hover:text-[#06B6D4] transition-colors">Pool Leak Detection</a></li>
                <li><a href="/pool-equipment-upgrades" className="hover:text-[#06B6D4] transition-colors">Equipment &amp; Automation</a></li>
                <li><a href="/baja-shelf-addition-cost" className="hover:text-[#06B6D4] transition-colors">Baja Shelf Additions</a></li>
                <li><a href="/blog/pool-cleaning-maintenance-riverside-ca" className="hover:text-[#06B6D4] transition-colors">Pool Cleaning Guide</a></li>
                <li><a href="/blog/pool-remodeling" className="hover:text-[#06B6D4] transition-colors">Pool Remodeling Blog</a></li>
                <li><a href="#contact" className="hover:text-[#06B6D4] transition-colors">Free Pool Estimate</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Service Areas</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li><a href="/riverside" className="hover:text-[#06B6D4] transition-colors">Riverside</a></li>
                <li><a href="/temecula" className="hover:text-[#06B6D4] transition-colors">Temecula</a></li>
                <li><a href="/murrieta" className="hover:text-[#06B6D4] transition-colors">Murrieta</a></li>
                <li><a href="/corona" className="hover:text-[#06B6D4] transition-colors">Corona</a></li>
                <li><a href="/fallbrook" className="hover:text-[#06B6D4] transition-colors">Fallbrook</a></li>
                <li><a href="/oceanside" className="hover:text-[#06B6D4] transition-colors">Oceanside</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                  <span>Serving Temecula, Murrieta, Menifee, Winchester, Wildomar, Fallbrook, Bonsall, Vista, Oceanside, Corona, and surrounding areas.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#06B6D4]" />
                  <a href="tel:+19513459276" onClick={() => trackPhoneClick("footer")} className="hover:text-[#06B6D4] transition-colors">(951) 345-9276</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#06B6D4]" />
                  <span>claudio@contractor.net</span>
                </li>
              </ul>
            </div>
            
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/65">
            <p>Copyright © {new Date().getFullYear()} Rivera Pools Riverside. All rights reserved.</p>
            <div className="flex gap-4">
                <span className="flex items-center gap-1"><Award className="w-3 h-3" /> Licensed, Bonded, &amp; Insured. CA C-35 Contractor License #1053279</span>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Before / After Modal */}
      {baModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setBaModal(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-[#0F253F] rounded-3xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-white/10">
              <div>
                <p className="text-[#06B6D4] text-xs font-bold uppercase tracking-widest mb-1">Before & After</p>
                <h3 className="font-['Montserrat'] font-bold text-xl text-white">{baModal.title}</h3>
              </div>
              <button
                onClick={() => setBaModal(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Photos */}
            <div className="grid grid-cols-2 gap-0">
              <div className="relative">
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Before
                </div>
                <img src={baModal.before} alt={`Before pool remodel — ${baModal.title}`} width={800} height={600} className="w-full aspect-[4/3] object-cover" />
              </div>
              <div className="relative">
                <div className="absolute top-4 right-4 z-10 bg-[#06B6D4] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  After
                </div>
                <img src={baModal.after} alt={`After pool remodel — ${baModal.title}`} width={800} height={600} className="w-full aspect-[4/3] object-cover" />
              </div>
            </div>

            {/* Footer CTA */}
            <div className="flex items-center justify-between px-8 py-5 border-t border-white/10">
              <p className="text-white/75 text-sm">¿Te gustaría un resultado similar?</p>
              <Button
                onClick={() => { setBaModal(null); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white rounded-xl px-6 h-10 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20"
              >
                Schedule Free Estimate
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Utility Style for custom scrollbar hidden in testimonials */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
