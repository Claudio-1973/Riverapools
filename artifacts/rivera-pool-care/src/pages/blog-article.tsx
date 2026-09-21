import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, CircleAlert, Droplets, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWidget } from "@/components/ChatWidget";
import type { BlogTopic } from "@/data/blog-topics";

const SITE_URL = "https://prospoolcare.com";

function setMeta(selector: string, attribute: string, value: string) {
  const element = document.head.querySelector<HTMLElement>(selector);
  if (element) element.setAttribute(attribute, value);
}

export default function BlogArticle({ topic }: { topic: BlogTopic }) {
  useEffect(() => {
    const url = `${SITE_URL}/blog/${topic.id}`;
    document.title = topic.seoTitle;
    setMeta('meta[name="description"]', "content", topic.description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", topic.seoTitle);
    setMeta('meta[property="og:description"]', "content", topic.description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:type"]', "content", "article");
    setMeta('meta[name="twitter:title"]', "content", topic.seoTitle);
    setMeta('meta[name="twitter:description"]', "content", topic.description);
  }, [topic]);

  return (
    <div className="min-h-[100dvh] bg-slate-50 text-foreground">
      <header className="bg-primary border-b border-white/10">
        <nav className="container mx-auto max-w-6xl px-6 py-5 flex items-center justify-between gap-4" aria-label="Main navigation">
          <a href="/" className="flex items-center gap-2 text-white">
            <span className="bg-white/10 p-2 rounded-xl text-secondary"><Droplets className="w-6 h-6" /></span>
            <span className="font-display font-extrabold text-xl leading-none">RIVERA<span className="font-medium text-sm block tracking-widest opacity-80">POOL CARE</span></span>
          </a>
          <div className="flex items-center gap-4">
            <a href="/blog" className="hidden sm:block text-white/90 hover:text-white font-semibold text-sm">Knowledge Center</a>
            <a href="tel:+19513839753" className="hidden md:flex items-center gap-2 text-white font-bold"><Phone className="w-4 h-4" />(951) 383-9753</a>
            <Button asChild className="bg-secondary hover:bg-secondary/90 text-white rounded-full font-bold"><a href="/#contact">Free Estimate</a></Button>
          </div>
        </nav>
      </header>

      <main>
        <article>
          <header className="bg-primary px-6 py-16 md:py-24 text-white">
            <div className="mx-auto max-w-4xl">
              <a href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-white transition-colors"><ArrowLeft className="h-4 w-4" />All pool care guides</a>
              <p className="mt-10 text-xs font-bold uppercase tracking-[.18em] text-secondary">{topic.number} · {topic.kicker}</p>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-6xl">{topic.title}</h1>
              <p className="mt-7 max-w-3xl text-lg md:text-xl leading-relaxed text-white/80">{topic.intro}</p>
              <div className="mt-7 flex flex-wrap gap-2">{topic.tags.map((tag) => <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider">#{tag}</span>)}</div>
            </div>
          </header>

          <section className="px-6 py-14 md:py-20">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-display text-3xl font-extrabold text-primary">What pool owners should know</h2>
              <ul className="mt-9 space-y-6">
                {topic.facts.map((fact) => (
                  <li key={fact} className="flex gap-4 rounded-2xl border border-border bg-white p-6 text-lg leading-relaxed text-slate-700 shadow-sm">
                    <Check className="mt-1 h-6 w-6 shrink-0 text-secondary" />{fact}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex gap-4 rounded-2xl border-l-4 border-secondary bg-orange-50 p-6 text-lg leading-relaxed text-slate-800">
                <CircleAlert className="mt-1 h-6 w-6 shrink-0 text-secondary" />
                <p><strong className="text-primary">Rivera Pool Care takeaway:</strong> {topic.takeaway}</p>
              </div>
            </div>
          </section>
        </article>

        <section className="border-t border-border bg-white px-6 py-16">
          <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div><p className="text-xs font-bold uppercase tracking-[.18em] text-secondary">Need a professional look?</p><h2 className="mt-3 font-display text-3xl font-extrabold text-primary">Get clear answers about your pool.</h2></div>
            <Button asChild className="h-14 px-8 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold"><a href="/#contact">Request an assessment <ArrowRight className="ml-2 h-5 w-5" /></a></Button>
          </div>
        </section>
      </main>

      <footer className="bg-primary px-6 py-10 text-center text-sm text-white/60">
        <p>&copy; {new Date().getFullYear()} Rivera Pool Care. Weekly service and dependable repairs for Southwest Riverside County.</p>
      </footer>
      <ChatWidget />
    </div>
  );
}