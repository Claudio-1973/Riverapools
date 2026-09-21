import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Droplets, 
  Wrench, 
  Clock, 
  Phone, 
  Mail, 
  Menu,
  X,
  CheckCircle2,
  Shield,
  MapPin,
  LifeBuoy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChatWidget } from "@/components/ChatWidget";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  // Contact form state
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
    if (!WEB3FORMS_ACCESS_KEY) {
      setFormStatus("error");
      toast({
        title: "Form Setup Incomplete",
        description: "Please call (951) 383-9753 while online requests are being configured.",
        variant: "destructive"
      });
      return;
    }
    setFormStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Service Request — ${formData.from_name}`,
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
        setFormStatus("success");
        setFormData({ from_name: "", phone: "", from_email: "", city: "", project_type: "", message: "" });
        toast({
          title: "Message Sent",
          description: "We have received your request and will contact you shortly.",
        });
      } else {
        setFormStatus("error");
        toast({
          title: "Submission Failed",
          description: "There was an error sending your request. Please call us directly.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Web3Forms error:", err);
      setFormStatus("error");
      toast({
        title: "Submission Failed",
        description: "There was an error sending your request. Please call us directly.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-secondary selection:text-white">
      
      {/* NAVIGATION */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border/50 py-3" 
            : "bg-transparent py-5"
        }`}
        data-testid="header-navigation"
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2 group" data-testid="link-home">
              <div className={`p-2 rounded-xl transition-colors duration-300 ${isScrolled ? 'bg-primary/5 text-primary' : 'bg-white/10 text-white backdrop-blur-sm'}`}>
                <Droplets className="w-6 h-6" />
              </div>
              <span className={`font-display font-extrabold text-xl tracking-tight leading-none transition-colors duration-300 ${isScrolled ? 'text-primary' : 'text-white'}`}>
                RIVERA
                <span className="font-medium text-sm block tracking-widest opacity-80">POOL CARE</span>
              </span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("services")} className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-slate-600 hover:text-secondary' : 'text-white/90 hover:text-white'}`} data-testid="nav-link-services">Services</button>
            <button onClick={() => scrollToSection("about")} className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-slate-600 hover:text-secondary' : 'text-white/90 hover:text-white'}`} data-testid="nav-link-about">About Us</button>
            <button onClick={() => scrollToSection("service-area")} className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-slate-600 hover:text-secondary' : 'text-white/90 hover:text-white'}`} data-testid="nav-link-area">Service Area</button>
            <a href="/blog" className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-slate-600 hover:text-secondary' : 'text-white/90 hover:text-white'}`} data-testid="nav-link-blog">Knowledge Center</a>
            
            <div className="flex items-center gap-4 ml-4">
              <a href="tel:+19513839753" className={`font-bold tracking-wide transition-colors flex items-center gap-2 ${isScrolled ? 'text-primary hover:text-secondary' : 'text-white hover:text-white/80'}`} data-testid="nav-link-phone">
                <Phone className="w-4 h-4" />
                (951) 383-9753
              </a>
              <Button onClick={() => scrollToSection("contact")} className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-6 font-bold shadow-lg shadow-secondary/20" data-testid="nav-button-estimate">
                Get an Estimate
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-primary bg-primary/5' : 'text-white bg-white/10 backdrop-blur-sm'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-2" data-testid="mobile-navigation-menu">
            <button onClick={() => scrollToSection("services")} className="px-4 py-3 text-left hover:bg-slate-50 rounded-lg font-semibold text-primary" data-testid="mobile-link-services">Services</button>
            <button onClick={() => scrollToSection("about")} className="px-4 py-3 text-left hover:bg-slate-50 rounded-lg font-semibold text-primary" data-testid="mobile-link-about">About Us</button>
            <button onClick={() => scrollToSection("service-area")} className="px-4 py-3 text-left hover:bg-slate-50 rounded-lg font-semibold text-primary" data-testid="mobile-link-area">Service Area</button>
            <a href="/blog" className="px-4 py-3 text-left hover:bg-slate-50 rounded-lg font-semibold text-primary" data-testid="mobile-link-blog">Knowledge Center</a>
            <div className="h-px bg-border my-2"></div>
            <a href="tel:+19513839753" className="px-4 py-3 text-left hover:bg-slate-50 rounded-lg font-bold text-primary flex items-center gap-2" data-testid="mobile-link-phone">
              <Phone className="w-5 h-5 text-secondary" /> (951) 383-9753
            </a>
            <Button onClick={() => scrollToSection("contact")} className="bg-secondary hover:bg-secondary/90 text-white w-full rounded-lg mt-2 py-6 text-lg font-bold" data-testid="mobile-button-estimate">
              Get an Estimate
            </Button>
          </div>
        )}
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <video
              src="/images/pool-service.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-40"
              data-testid="hero-video-background"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-primary/60" />
          </div>

          <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8" data-testid="badge-bilingual">
              <span className="flex h-2 w-2 rounded-full bg-secondary"></span>
              <span className="text-sm font-semibold text-white tracking-wide">Family Owned • Hablamos Español</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight mb-6" data-testid="hero-heading">
              Pool Cleaning &amp; Repair in Murrieta &amp; Temecula, CA
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-10 font-medium" data-testid="hero-subheading">
              Arrive home to a perfectly clear pool. We handle weekly maintenance, precise chemical balancing, and expert equipment repair so you can just swim.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Button onClick={() => scrollToSection("contact")} className="bg-secondary hover:bg-secondary/90 text-white h-14 px-8 rounded-xl font-bold shadow-xl shadow-secondary/20 text-base" data-testid="hero-button-quote">
                Request an Estimate
              </Button>
              <Button asChild variant="outline" className="h-14 px-8 rounded-xl font-bold border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent backdrop-blur-sm text-base" data-testid="hero-button-call">
                <a href="tel:+19513839753">
                  <Phone className="w-5 h-5 mr-2" /> (951) 383-9753
                </a>
              </Button>
            </div>
            
            <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12 text-white/80 text-sm font-semibold tracking-wide">
              <span className="flex items-center gap-2" data-testid="trust-murrieta"><MapPin className="w-4 h-4 text-secondary" /> Murrieta</span>
              <span className="flex items-center gap-2" data-testid="trust-temecula"><MapPin className="w-4 h-4 text-secondary" /> Temecula</span>
              <span className="flex items-center gap-2" data-testid="trust-elsinore"><MapPin className="w-4 h-4 text-secondary" /> Lake Elsinore</span>
              <span className="flex items-center gap-2" data-testid="trust-winchester"><MapPin className="w-4 h-4 text-secondary" /> Winchester</span>
              <span className="flex items-center gap-2" data-testid="trust-canyonlake"><MapPin className="w-4 h-4 text-secondary" /> Canyon Lake</span>
            </div>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section id="services" className="py-24 bg-white relative">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-secondary font-bold tracking-wider uppercase text-sm mb-3">Our Services</p>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl text-primary mb-6">Pool cleaning, maintenance &amp; equipment repair</h2>
              <p className="text-muted-foreground text-lg">We don't build pools; we keep them running perfectly. From routine scrubbing to complex heater repairs, our local team does it right the first time.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1: Cleaning */}
              <Card className="bg-slate-50 border-none shadow-none rounded-3xl overflow-hidden group hover:bg-slate-100 transition-colors" data-testid="card-service-cleaning">
                <div className="h-48 overflow-hidden relative">
                  <img src="/images/pool-cleaning.webp" alt="Weekly pool cleaning and brushing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm text-secondary">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-primary mb-4">Weekly Pool Cleaning &amp; Maintenance</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Thorough brushing &amp; vacuuming</li>
                    <li className="flex items-start gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Precise chemical balancing</li>
                    <li className="flex items-start gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Skimmer &amp; pump basket emptying</li>
                    <li className="flex items-start gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Preventative equipment checks</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Service 2: Repair */}
              <Card className="bg-slate-50 border-none shadow-none rounded-3xl overflow-hidden group hover:bg-slate-100 transition-colors" data-testid="card-service-repair">
                <div className="h-48 overflow-hidden relative">
                  <img src="/images/equipment-repair.webp" alt="Pool pump and filter repair" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm text-secondary">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-primary mb-4">Pool Equipment Repair</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Pump &amp; motor replacement</li>
                    <li className="flex items-start gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Filter cleaning &amp; grid replacement</li>
                    <li className="flex items-start gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Heater diagnostics &amp; repair</li>
                    <li className="flex items-start gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Automated system troubleshooting</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Service 3: Specialized */}
              <Card className="bg-primary text-white border-none shadow-xl rounded-3xl overflow-hidden group" data-testid="card-service-specialized">
                <CardContent className="p-8 h-full flex flex-col justify-center">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-secondary">
                    <LifeBuoy className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-4">Green Pool, Leak &amp; Filter Care</h3>
                  <p className="text-white/80 mb-6 leading-relaxed">
                    Beyond weekly care, we handle the tough jobs that restore your pool's health and safety.
                  </p>
                  <ul className="space-y-3 mt-auto">
                    <li className="flex items-start gap-3 text-white/90"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Green-pool recovery</li>
                    <li className="flex items-start gap-3 text-white/90"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Leak troubleshooting</li>
                    <li className="flex items-start gap-3 text-white/90"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Deep filter tear-downs</li>
                    <li className="flex items-start gap-3 text-white/90"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /> Seasonal preventative maintenance</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 bg-slate-50">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img src="/images/rivera-team.webp" alt="Rivera Pool Care local pool service team" width="1200" height="900" loading="lazy" className="w-full h-auto object-cover aspect-[4/3]" data-testid="image-team" />
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary/10 p-3 rounded-full text-secondary">
                        <Shield className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-primary text-xl">Fully Insured &amp; Local</p>
                        <p className="text-sm text-muted-foreground font-medium">Serving the community for years.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <p className="text-secondary font-bold tracking-wider uppercase text-sm mb-3">About Rivera Pool Care</p>
                <h2 className="font-display font-extrabold text-3xl md:text-5xl text-primary mb-6">Hardworking, dependable, and community-focused.</h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    We know that trusting someone with weekly access to your backyard is a big decision. That's why Rivera Pool Care was built on a foundation of absolute reliability and clear communication.
                  </p>
                  <p>
                    Led by Claudio and our family team, we focus strictly on what we do best: keeping your water crystal clear, your chemicals perfectly balanced, and your equipment running efficiently. When we say we'll be there, we arrive on time. When something breaks, we fix it right.
                  </p>
                  <p className="font-semibold text-primary flex items-center gap-2">
                    ¡Hablamos Español! Estamos aquí para servir a nuestra comunidad.
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-border">
                    <Clock className="w-5 h-5 text-secondary" />
                    <span className="font-bold text-primary">Consistent Schedules</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-border">
                    <Shield className="w-5 h-5 text-secondary" />
                    <span className="font-bold text-primary">Transparent Pricing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 rounded-l-[100px] pointer-events-none mix-blend-screen" />
          
          <div className="container mx-auto px-6 max-w-6xl relative z-10">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Contact Info */}
              <div className="w-full lg:w-[45%] text-white">
                <h2 className="font-display font-extrabold text-4xl md:text-5xl mb-6">Let's get your pool back in shape.</h2>
                <p className="text-white/80 text-lg mb-10 leading-relaxed">
                  Whether you need a reliable weekly cleaning service, a quick equipment repair, or help recovering a green pool, we're ready to help. Reach out today for a free estimate.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-4 rounded-full text-secondary shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 font-bold uppercase tracking-wider mb-1">Call Us Directly</p>
                      <a href="tel:+19513839753" className="font-display text-2xl font-bold hover:text-secondary transition-colors">(951) 383-9753</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-4 rounded-full text-secondary shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 font-bold uppercase tracking-wider mb-1">Email Us</p>
                      <a href="mailto:claudio@prospoolcare.com" className="font-display text-xl font-bold hover:text-secondary transition-colors">claudio@prospoolcare.com</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-4 rounded-full text-secondary shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 font-bold uppercase tracking-wider mb-1">Service Area</p>
                      <p className="font-medium text-white/90 leading-relaxed">
                        Murrieta, Temecula, Lake Elsinore,<br/>Winchester, and Canyon Lake.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form */}
              <div className="w-full lg:w-[55%]">
                <Card className="bg-white border-none shadow-2xl rounded-3xl overflow-hidden p-2 sm:p-4">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="font-display font-bold text-2xl text-primary mb-6">Request a Free Estimate</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-contact">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="from_name" className="text-sm font-semibold text-primary">Full Name</label>
                          <Input 
                            id="from_name" 
                            name="from_name" 
                            required 
                            value={formData.from_name} 
                            onChange={handleChange} 
                            placeholder="John Doe"
                            className="bg-slate-50 border-border h-12 rounded-xl"
                            data-testid="input-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-semibold text-primary">Phone Number</label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            type="tel" 
                            required 
                            value={formData.phone} 
                            onChange={handleChange} 
                            placeholder="(951) 555-0123"
                            className="bg-slate-50 border-border h-12 rounded-xl"
                            data-testid="input-phone"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="from_email" className="text-sm font-semibold text-primary">Email Address (Optional)</label>
                          <Input 
                            id="from_email" 
                            name="from_email" 
                            type="email" 
                            value={formData.from_email} 
                            onChange={handleChange} 
                            placeholder="john@example.com"
                            className="bg-slate-50 border-border h-12 rounded-xl"
                            data-testid="input-email"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="city" className="text-sm font-semibold text-primary">City</label>
                          <Select name="city" value={formData.city} onValueChange={(val) => handleSelect("city", val)}>
                            <SelectTrigger className="bg-slate-50 border-border h-12 rounded-xl" data-testid="select-city">
                              <SelectValue placeholder="Select your city" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Murrieta">Murrieta</SelectItem>
                              <SelectItem value="Temecula">Temecula</SelectItem>
                              <SelectItem value="Lake Elsinore">Lake Elsinore</SelectItem>
                              <SelectItem value="Winchester">Winchester</SelectItem>
                              <SelectItem value="Canyon Lake">Canyon Lake</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="project_type" className="text-sm font-semibold text-primary">Service Needed</label>
                        <Select name="project_type" value={formData.project_type} onValueChange={(val) => handleSelect("project_type", val)}>
                          <SelectTrigger className="bg-slate-50 border-border h-12 rounded-xl" data-testid="select-service">
                            <SelectValue placeholder="What do you need help with?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Weekly Maintenance">Weekly Pool Maintenance</SelectItem>
                            <SelectItem value="Equipment Repair">Equipment Repair</SelectItem>
                            <SelectItem value="Filter Cleaning">Filter Cleaning</SelectItem>
                            <SelectItem value="Green Pool Recovery">Green Pool Recovery</SelectItem>
                            <SelectItem value="Leak Troubleshooting">Leak Troubleshooting</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-semibold text-primary">How can we help?</label>
                        <Textarea 
                          id="message" 
                          name="message" 
                          required 
                          value={formData.message} 
                          onChange={handleChange} 
                          placeholder="Tell us a bit about your pool..."
                          className="bg-slate-50 border-border min-h-[120px] rounded-xl resize-none"
                          data-testid="input-message"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={formStatus === "sending"}
                        className="w-full bg-secondary hover:bg-secondary/90 text-white h-14 rounded-xl font-bold text-lg shadow-lg shadow-secondary/20"
                        data-testid="button-submit-quote"
                      >
                        {formStatus === "sending" ? "Sending Request..." : "Send Request"}
                      </Button>
                      
                      {formStatus === "success" && (
                        <p className="text-sm text-green-600 font-semibold text-center mt-2" data-testid="message-success">Thank you! We will be in touch shortly.</p>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
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
