import { useEffect } from "react";
import { CheckCircle2, Droplets, MapPin, Phone, Shield, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type ServiceArea = {
  slug: string;
  city: string;
  title: string;
  description: string;
  intro: string;
  localDetails: string;
  maintenance: string;
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "murrieta",
    city: "Murrieta",
    title: "Pool Cleaning & Repair in Murrieta, CA | Rivera Pool Care",
    description: "Reliable pool cleaning, chemical balancing, filter care, and equipment repair in Murrieta, CA. Call Rivera Pool Care for a free estimate.",
    intro: "Murrieta pool owners count on clear water and dependable equipment through long, warm summers. Our family-run team provides consistent weekly care and practical repairs throughout the city.",
    localDetails: "From established neighborhoods near Old Town and Alta Murrieta to homes around French Valley, we tailor service to pool use, sun exposure, landscaping, and the condition of your equipment.",
    maintenance: "Murrieta heat can increase chlorine demand and evaporation. We test and balance the water each visit, clear baskets, brush surfaces, and watch for early signs of pump, filter, or heater trouble.",
  },
  {
    slug: "temecula",
    city: "Temecula",
    title: "Pool Cleaning & Repair in Temecula, CA | Rivera Pool Care",
    description: "Weekly pool cleaning, water balancing, filter service, and pool equipment repair in Temecula, CA. Request a free estimate from our local team.",
    intro: "Temecula pools need steady attention during hot summers, windy days, and busy swim seasons. We keep residential pools clean, balanced, and ready to enjoy with reliable weekly service.",
    localDetails: "We serve homes across Temecula, including neighborhoods near Redhawk, Paloma del Sol, Harveston, and Wine Country. Service is adjusted for nearby landscaping, debris, shade, and pool usage.",
    maintenance: "Warm temperatures and organic debris can quickly affect water clarity. Our visits include chemical testing, brushing, basket cleaning, equipment checks, and clear communication if a repair is needed.",
  },
  {
    slug: "lake-elsinore",
    city: "Lake Elsinore",
    title: "Pool Cleaning in Lake Elsinore, CA | Rivera Pool Care",
    description: "Dependable pool cleaning, green-pool recovery, filter care, and equipment repair in Lake Elsinore, CA. Call today for a free service estimate.",
    intro: "Lake Elsinore's heat, wind, and airborne dust can make pool care demanding. Rivera Pool Care provides routine cleaning and equipment support that keeps water healthy and inviting.",
    localDetails: "We help homeowners throughout Lake Elsinore, from neighborhoods near Canyon Hills and Rosetta Canyon to communities around the lake. Each service plan reflects the property's exposure and pool needs.",
    maintenance: "Windblown debris can fill baskets and place extra demand on filtration. We clean carefully, balance water chemistry, inspect circulation, and offer green-pool recovery when conditions get ahead of routine care.",
  },
  {
    slug: "winchester",
    city: "Winchester",
    title: "Pool Cleaning & Repair in Winchester, CA | Rivera Pool Care",
    description: "Professional weekly pool cleaning, chemical balancing, filter service, and equipment repair for Winchester, CA homes. Get a free estimate today.",
    intro: "Winchester homeowners deserve pool service that arrives consistently and pays attention to the details. Our local family team handles weekly maintenance, water care, and equipment problems.",
    localDetails: "We serve Winchester communities including French Valley and surrounding residential areas. Newer pools, active family pools, and properties exposed to open land all receive care suited to their conditions.",
    maintenance: "Dust, wind, and heavy summer use can change a pool's needs from week to week. We monitor chemistry and circulation, remove debris, brush surfaces, and flag developing equipment issues early.",
  },
  {
    slug: "canyon-lake",
    city: "Canyon Lake",
    title: "Pool Cleaning & Repair in Canyon Lake, CA | Rivera Pool Care",
    description: "Local pool cleaning, chemical balancing, filter maintenance, and equipment repair in Canyon Lake, CA. Call Rivera Pool Care for a free estimate.",
    intro: "Canyon Lake homeowners use their outdoor spaces year-round, and a clean, dependable pool is part of that lifestyle. We provide careful weekly service and responsive equipment repair.",
    localDetails: "Pools near the lake and throughout the gated community can face wind, dust, leaves, and frequent use. We account for those conditions instead of applying the same checklist to every backyard.",
    maintenance: "Consistent circulation and filtration are essential when debris and warm weather increase demand. We balance chemicals, clean baskets, brush and inspect the pool, and diagnose pumps, filters, heaters, and automation.",
  },
];

const SITE_URL = "https://prospoolcare.com";

function setMeta(selector: string, attribute: string, value: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.setAttribute(attribute, value);
}

export default function ServiceAreaPage({ area }: { area: ServiceArea }) {
  useEffect(() => {
    document.title = area.title;
    setMeta('meta[name="description"]', "content", area.description);
    setMeta('link[rel="canonical"]', "href", `${SITE_URL}/${area.slug}`);
    setMeta('meta[property="og:title"]', "content", area.title);
    setMeta('meta[property="og:description"]', "content", area.description);
    setMeta('meta[property="og:url"]', "content", `${SITE_URL}/${area.slug}`);
    setMeta('meta[name="twitter:title"]', "content", area.title);
    setMeta('meta[name="twitter:description"]', "content", area.description);
  }, [area]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <header className="bg-primary border-b border-white/10">
        <nav className="container mx-auto max-w-7xl px-6 py-5 flex items-center justify-between gap-4" aria-label="Main navigation">
          <a href="/" className="flex items-center gap-2 text-white">
            <span className="bg-white/10 p-2 rounded-xl text-secondary"><Droplets className="w-6 h-6" /></span>
            <span className="font-display font-extrabold text-xl leading-none">RIVERA<span className="font-medium text-sm block tracking-widest opacity-80">POOL CARE</span></span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/blog" className="hidden md:block text-white/90 hover:text-white font-semibold text-sm mr-4 transition-colors">Knowledge Center</a>
            <a href="tel:+19513839753" className="hidden sm:flex items-center gap-2 text-white font-bold"><Phone className="w-4 h-4" />(951) 383-9753</a>
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-white rounded-full font-bold">
              <a href="/#contact">Free Estimate</a>
            </Button>
          </div>
        </nav>
      </header>

      <main>
        <section className="bg-primary text-white py-20 md:py-28">
          <div className="container mx-auto max-w-5xl px-6">
            <p className="flex items-center gap-2 text-secondary font-bold uppercase tracking-wider text-sm mb-5"><MapPin className="w-4 h-4" />Serving {area.city}, California</p>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-tight max-w-4xl">Pool Cleaning &amp; Equipment Repair in {area.city}, CA</h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mt-6">{area.intro}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-9">
              <Button asChild className="h-14 px-8 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold"><a href="/#contact">Request a Free Estimate</a></Button>
              <Button asChild variant="outline" className="h-14 px-8 border-white/30 text-white hover:text-white hover:bg-white/10 bg-transparent rounded-xl font-bold"><a href="tel:+19513839753"><Phone className="w-5 h-5 mr-2" />Call (951) 383-9753</a></Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-6xl px-6 grid lg:grid-cols-[1.25fr_.75fr] gap-12">
            <article>
              <p className="text-secondary font-bold uppercase tracking-wider text-sm mb-3">Local pool care</p>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-primary mb-6">Dependable service for {area.city} pools</h2>
              <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                <p>{area.localDetails}</p>
                <p>{area.maintenance}</p>
                <p>Rivera Pool Care is fully insured, family owned, and bilingual. You get a consistent schedule, straightforward recommendations, and a team focused on pool maintenance and repair—not pool construction.</p>
              </div>
            </article>
            <Card className="bg-slate-50 border-none rounded-3xl">
              <CardContent className="p-8">
                <h2 className="font-display font-bold text-2xl text-primary mb-6">Pool services in {area.city}</h2>
                <ul className="space-y-4">
                  {["Weekly cleaning and brushing", "Chemical testing and balancing", "Pump, filter, and heater repair", "Filter cleaning and grid replacement", "Green-pool recovery", "Leak and automation troubleshooting"].map((service) => (
                    <li key={service} className="flex gap-3 text-muted-foreground"><CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />{service}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-primary mb-4">Complete pool maintenance and repair</h2>
              <p className="text-lg text-muted-foreground">Routine care prevents many expensive problems. When equipment does fail, we diagnose the cause and explain the practical repair options.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                [Droplets, "Weekly Pool Care", "Cleaning, brushing, basket service, water testing, and balanced chemicals on a dependable schedule."],
                [Wrench, "Equipment Repair", "Troubleshooting and repair for pumps, motors, filters, heaters, and automated pool systems."],
                [Shield, "Preventative Checks", "Regular inspection of circulation and equipment to catch small issues before they interrupt your pool."],
              ].map(([Icon, heading, copy]) => {
                const ServiceIcon = Icon as typeof Droplets;
                return <Card key={heading as string} className="border-none shadow-sm rounded-2xl"><CardContent className="p-7"><ServiceIcon className="w-8 h-8 text-secondary mb-5" /><h3 className="font-display font-bold text-xl text-primary mb-3">{heading as string}</h3><p className="text-muted-foreground leading-relaxed">{copy as string}</p></CardContent></Card>;
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="font-display font-bold text-2xl text-primary mb-6">Pool service near {area.city}</h2>
            <div className="flex flex-wrap gap-3">
              {serviceAreas.filter((item) => item.slug !== area.slug).map((item) => (
                <a key={item.slug} href={`/${item.slug}`} className="px-5 py-3 rounded-full bg-slate-100 text-primary font-semibold hover:bg-secondary hover:text-white transition-colors">Pool service in {item.city}</a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-white text-center">
          <div className="container mx-auto max-w-3xl px-6">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl mb-5">Need pool service in {area.city}?</h2>
            <p className="text-white/80 text-lg mb-8">Tell us what your pool needs. We will follow up with straightforward next steps and a free estimate.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="h-14 px-8 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold"><a href="/#contact">Use Our Estimate Form</a></Button>
              <Button asChild variant="outline" className="h-14 px-8 border-white/30 text-white hover:text-white hover:bg-white/10 bg-transparent rounded-xl font-bold"><a href="tel:+19513839753">Call (951) 383-9753</a></Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary border-t border-white/10 py-8 text-center text-white/60 text-sm">
        <p>© {new Date().getFullYear()} Rivera Pool Care · Family-owned pool service in Southwest Riverside County</p>
      </footer>
    </div>
  );
}