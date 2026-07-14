import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  ArrowRight
} from "lucide-react";

export function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-['Inter'] text-slate-700 bg-white overflow-x-hidden scroll-smooth selection:bg-[#06B6D4] selection:text-white">
      {/* NAVIGATION */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-md shadow-sm py-3" 
            : "bg-white/50 backdrop-blur-sm py-5"
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="bg-[#0F253F] p-2 rounded-lg group-hover:bg-[#06B6D4] transition-colors">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="font-['Montserrat'] font-extrabold textxl tracking-tight text-[#0F253F]">
              RIVERA POOLS <span className="font-medium text-slate-500 text-sm block -mt-1 tracking-widest">RIVERSIDE</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4] transition-colors">Services</a>
            <a href="#portfolio" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4] transition-colors">Portfolio</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4] transition-colors">About</a>
            <a href="#process" className="text-sm font-medium text-slate-600 hover:text-[#06B6D4] transition-colors">Process</a>
            <Button className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white rounded-full px-6 font-medium shadow-lg shadow-[#06B6D4]/20">
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
            <a href="#services" className="px-4 py-2 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#portfolio" className="px-4 py-2 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
            <a href="#about" className="px-4 py-2 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#process" className="px-4 py-2 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Process</a>
            <Button className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white w-full rounded-lg mt-2">
              Free Estimate
            </Button>
          </div>
        )}
      </header>

      <main>
        {/* 2. HERO SECTION — full-screen video background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background video */}
          <video
            src="/__mockup/images/pool-video-opt.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F253F]/70 via-[#0F253F]/50 to-[#0F253F]/80 z-10" />

          {/* Content */}
          <div className="relative z-20 container mx-auto px-6 max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 shadow mb-8">
              <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="text-xs font-medium text-white/90">Licensed, Bonded & Insured | Serving Temecula & Beyond</span>
            </div>

            <h1 className="font-['Montserrat'] font-extrabold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.08] tracking-tight mb-6">
              Premium Pool Remodeling<br className="hidden md:block" />
              <span className="text-[#06B6D4]"> & Restoration</span><br className="hidden md:block" />
              in Riverside County.
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
              We transform your backyard. From plaster resurfacing and natural stone coping to complete structural remodels — local, licensed, and built to last.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white h-14 px-10 rounded-xl font-semibold shadow-2xl shadow-[#06B6D4]/30 text-base">
                Schedule Free Estimate
              </Button>
              <Button variant="outline" className="h-14 px-10 rounded-xl font-semibold border-white/40 text-white hover:bg-white/10 text-base bg-transparent backdrop-blur">
                View Our Transformations
              </Button>
            </div>

            {/* Floating trust badge */}
            <div className="mt-14 inline-flex items-center gap-4 bg-white/10 backdrop-blur border border-white/20 py-3 px-6 rounded-2xl shadow-lg">
              <div className="bg-[#D4AF37] rounded-full p-2">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-['Montserrat'] font-bold text-sm text-white">Craftsman Quality</p>
                <p className="text-xs text-white/60">Done right the first time — guaranteed</p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 animate-bounce">
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
                  src="https://res.cloudinary.com/ci1jfnss/image/upload/v1783996664/1783996593574_yqch5d.png"
                  alt="Modern Stone Scapes pool"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F253F]/90 via-[#0F253F]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  Before → After
                </div>
                
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
                <img src="/__mockup/images/photo3.jpg" alt="Natural stone coping" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
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
                <img src="/__mockup/images/photo4.jpg" alt="Pool tile renovation" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F253F]/90 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  Before → After
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#06B6D4] text-white px-2 py-1 rounded">Glass Tile</span>
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-lg text-white mb-1">Premium Tile & Plaster — Menifee</h3>
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
                        <p className="text-xs text-white/50 uppercase tracking-wider font-bold mb-1">Location</p>
                        <p className="font-medium text-lg">Temecula, CA</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                      <div className="bg-white/10 p-2 rounded-lg text-[#06B6D4]"><Clock className="w-5 h-5" /></div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-wider font-bold mb-1">Timeline</p>
                        <p className="font-medium text-lg">3 weeks</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                      <div className="bg-white/10 p-2 rounded-lg text-[#06B6D4]"><Wrench className="w-5 h-5" /></div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-wider font-bold mb-1">Services</p>
                        <p className="font-medium">Structural remodel, natural stone installation, Pentair smart pump</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/20 rounded-xl p-5 border border-white/5">
                    <p className="text-sm text-white/70 mb-2"><strong className="text-white">Challenge:</strong> Cracked old plaster, outdated energy-hungry equipment, fading coping.</p>
                    <p className="text-sm text-white/70"><strong className="text-[#06B6D4]">Solution:</strong> Premium Stone Scapes resurfacing, modern glass tile, eco automation system.</p>
                  </div>
                </div>
                
                <Button className="w-full mt-8 bg-[#06B6D4] hover:bg-white hover:text-[#0F253F] transition-colors rounded-xl font-bold">
                  Start Your Transformation
                </Button>
              </div>
              
              {/* Right: Gallery */}
              <div className="w-full lg:w-[60%] grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 rounded-3xl overflow-hidden h-[300px] lg:h-auto shadow-md">
                  <img src="/__mockup/images/photo1.jpg" alt="Finished pool" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-3xl overflow-hidden h-[200px] shadow-md hidden md:block">
                  <img src="/__mockup/images/photo3.jpg" alt="Detail 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="rounded-3xl overflow-hidden h-[200px] shadow-md hidden md:block">
                  <img src="/__mockup/images/photo4.jpg" alt="Detail 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
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
                  <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F253F] mb-3">Pool Remodeling & Resurfacing</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">Restore your pool's surface with premium plaster, durable Stone Scapes, or stunning quartz finishes designed to last decades.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> Stone Scapes Application</li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> Plaster Repair & Resurfacing</li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> Acid Wash & Stain Removal</li>
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
                  <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F253F] mb-3">Custom Stone Coping & Tile</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">Upgrade your pool's aesthetic with artisan edge stone, elegant glass tile, and modern mosaics that redefine luxury.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> Natural Stone Installation</li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> Glass & Ceramic Waterline Tile</li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> Custom Water Features</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Service 3 */}
              <Card className="border-slate-100 bg-white hover:-translate-y-2 hover:shadow-xl hover:shadow-[#0F253F]/5 transition-all duration-300 rounded-2xl">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-[#0F253F]/5 rounded-2xl flex items-center justify-center mb-6 text-[#0F253F]">
                    <Settings className="w-7 h-7" />
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-xl text-[#0F253F] mb-3">Equipment Upgrades</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">Modernize your pool with smart, energy-efficient equipment including variable-speed pumps, heaters, and automation.</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> Variable-Speed Pumps</li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> Smart Automation Systems</li>
                    <li className="flex items-center gap-2 text-sm text-slate-500"><CheckCircle2 className="w-4 h-4 text-[#06B6D4]" /> Saltwater Conversions</li>
                  </ul>
                </CardContent>
              </Card>
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
                  <img src="/__mockup/images/rivera-opt.jpg" alt="Rivera Pools Riverside Crew" className="w-full h-auto aspect-[4/5] object-cover" />
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
                  <Button variant="outline" className="border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4] hover:text-white h-12 px-8 rounded-xl font-medium transition-colors">
                    Our Process
                  </Button>
                  <div className="flex items-center gap-3 text-[#0F253F] font-bold">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                      <Phone className="w-5 h-5 text-[#06B6D4]" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-normal">Call us directly</p>
                      <p>(951) 345-9276</p>
                    </div>
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
                    <p className="text-sm text-white/50">Murrieta, CA</p>
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
                    <p className="text-sm text-white/50">Temecula, CA</p>
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
                    <p className="text-sm text-white/50">Menifee, CA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. PARTNERS & CERTIFICATIONS */}
        <section className="py-12 border-b border-slate-100 bg-white">
          <div className="container mx-auto px-6 max-w-7xl text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Trusted Brands We Install & Service</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="font-['Montserrat'] font-bold text-2xl text-slate-800">PENTAIR</span>
              <span className="font-['Montserrat'] font-bold text-2xl text-slate-800">Jandy</span>
              <span className="font-['Montserrat'] font-bold text-2xl text-slate-800">HAYWARD</span>
              <span className="font-['Montserrat'] font-bold text-2xl text-slate-800">Stone Scapes</span>
              <span className="font-['Montserrat'] font-bold text-2xl text-slate-800 border border-slate-800 px-3 py-1">NPC</span>
            </div>
          </div>
        </section>

        {/* 10. CONTACT FORM */}
        <section className="py-24 bg-white relative">
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
                      <div>
                        <p className="text-sm text-white/50">Call Us</p>
                        <p className="font-medium">(951) 345-9276</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-white/10 p-3 rounded-full"><Mail className="w-5 h-5 text-[#06B6D4]" /></div>
                      <div>
                        <p className="text-sm text-white/50">Email Us</p>
                        <p className="font-medium">claudio@contractor.net</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-white/10 p-3 rounded-full"><MapPin className="w-5 h-5 text-[#06B6D4]" /></div>
                      <div>
                        <p className="text-sm text-white/50">Service Area</p>
                        <p className="font-medium">Riverside County, CA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form Side */}
              <div className="w-full lg:w-[60%] bg-white p-10 lg:p-14">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Full Name</label>
                      <Input placeholder="John Doe" className="bg-slate-50 border-slate-200 h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Phone</label>
                      <Input placeholder="(951) 345-9276" className="bg-slate-50 border-slate-200 h-12" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email Address</label>
                      <Input type="email" placeholder="john@example.com" className="bg-slate-50 border-slate-200 h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">City</label>
                      <Select>
                        <SelectTrigger className="bg-slate-50 border-slate-200 h-12 text-slate-700">
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="temecula">Temecula</SelectItem>
                          <SelectItem value="murrieta">Murrieta</SelectItem>
                          <SelectItem value="menifee">Menifee</SelectItem>
                          <SelectItem value="lake-elsinore">Lake Elsinore</SelectItem>
                          <SelectItem value="corona">Corona</SelectItem>
                          <SelectItem value="riverside">Riverside</SelectItem>
                          <SelectItem value="other">Other (Riverside County)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Project Type</label>
                    <Select>
                      <SelectTrigger className="bg-slate-50 border-slate-200 h-12 text-slate-700">
                        <SelectValue placeholder="What do you need help with?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Remodel</SelectItem>
                        <SelectItem value="resurfacing">Plaster / Stone Scapes Resurfacing</SelectItem>
                        <SelectItem value="stone">Stone Coping & Tile</SelectItem>
                        <SelectItem value="equipment">Equipment Upgrade</SelectItem>
                        <SelectItem value="other">Other / Not Sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Project Details</label>
                    <Textarea 
                      placeholder="Tell us a bit about your pool and what you're looking to do..." 
                      className="bg-slate-50 border-slate-200 min-h-[120px] resize-none"
                    />
                  </div>
                  
                  <Button type="button" className="w-full bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-bold h-14 text-lg rounded-xl shadow-lg shadow-[#06B6D4]/20">
                    Request My Free Estimate
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 11. FOOTER */}
      <footer className="bg-[#0A0A0A] pt-16 pb-8 text-white/80">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 border-b border-white/10 pb-12">
            
            <div className="lg:col-span-2">
              <a href="#" className="flex items-center gap-2 mb-6">
                <div className="bg-[#06B6D4] p-1.5 rounded-md">
                  <Droplets className="w-4 h-4 text-white" />
                </div>
                <span className="font-['Montserrat'] font-bold text-xl tracking-tight text-white">
                  RIVERA POOLS <span className="font-medium text-slate-400 text-xs block -mt-1 tracking-widest">RIVERSIDE</span>
                </span>
              </a>
              <p className="text-sm text-white/60 max-w-sm mb-6">
                Professional Pool Construction, Remodeling, & Restoration in Riverside County. We build outdoor living spaces that last a lifetime.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#06B6D4] hover:text-white transition-colors">
                  <Star className="w-4 h-4" /> {/* Stand in for Google icon */}
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#06B6D4] hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Services</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li><a href="#" className="hover:text-[#06B6D4] transition-colors">Pool Remodeling</a></li>
                <li><a href="#" className="hover:text-[#06B6D4] transition-colors">Plaster & Stone Scapes</a></li>
                <li><a href="#" className="hover:text-[#06B6D4] transition-colors">Stone Coping & Tile</a></li>
                <li><a href="#" className="hover:text-[#06B6D4] transition-colors">Equipment Upgrades</a></li>
                <li><a href="#" className="hover:text-[#06B6D4] transition-colors">Energy Efficiency</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                  <span>Serving Temecula, Murrieta, Menifee, Winchester, Wildomar, Corona, and surrounding areas.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#06B6D4]" />
                  <span>(951) 345-9276</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#06B6D4]" />
                  <span>claudio@contractor.net</span>
                </li>
              </ul>
            </div>
            
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>Copyright © {new Date().getFullYear()} Rivera Pools Riverside. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><Award className="w-3 h-3" /> Licensed, Bonded, & Insured. CA Contractor License #1234567</span>
            </div>
          </div>
        </div>
      </footer>
      
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
