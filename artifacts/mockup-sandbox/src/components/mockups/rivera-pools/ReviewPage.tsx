import React, { useEffect } from "react";
import { Droplets, LockKeyhole, Phone, Award } from "lucide-react";
import { ReviewFunnel } from "./ReviewModal";
import { trackPhoneClick } from "@/lib/analytics";

export function ReviewPage() {
  useEffect(() => {
    document.title = "Share Your Experience | Rivera Pools Riverside";
    let descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.name = "description";
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.content = "Share private feedback or leave a Google review for Rivera Pools Riverside.";
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-700 font-['Inter'] flex flex-col md:flex-row">
      {/* Visual Sidebar */}
      <aside className="w-full md:w-[420px] lg:w-[480px] bg-[#0F253F] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shrink-0">
        {/* Decorative blur circle */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#06B6D4] rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#D4AF37] rounded-full blur-[100px] opacity-10 pointer-events-none" />

        {/* Brand */}
        <div className="relative z-10">
          <a href="/" className="inline-flex items-center gap-3 group" aria-label="Rivera Pools Riverside home">
            <div className="w-10 h-10 rounded-xl bg-[#06B6D4] text-[#0F253F] flex items-center justify-center font-bold shadow-lg shadow-[#06B6D4]/30">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <span className="font-['Montserrat'] font-extrabold text-lg tracking-tight text-white block leading-tight">
                RIVERA POOLS
              </span>
              <span className="text-[10px] text-white/60 tracking-[0.2em] font-semibold block uppercase">
                RIVERSIDE, CA
              </span>
            </div>
          </a>
        </div>

        {/* Narrative Copy */}
        <div className="my-10 md:my-auto relative z-10 max-w-sm">
          <span className="text-[#06B6D4] text-xs font-bold uppercase tracking-widest block mb-2">
            After the finish line
          </span>
          <h1 className="font-['Montserrat'] font-bold text-3xl lg:text-4xl text-white leading-tight mb-4">
            Good work should <span className="text-[#D4AF37] italic font-serif">feel</span> good.
          </h1>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            We are a local, family-operated crew. Your honest words help us care for the next pool like it belongs in our own backyard.
          </p>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90 mb-1">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>Licensed, Bonded &amp; Insured</span>
            </div>
            <p className="text-[11px] text-white/60">
              CA C-35 Contractor License #1053279
            </p>
          </div>
        </div>

        {/* Footer info in sidebar */}
        <div className="relative z-10 pt-6 border-t border-white/10 text-xs text-white/60 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <LockKeyhole className="w-3.5 h-3.5 text-[#06B6D4]" />
            Direct to Rivera leadership
          </span>
          <a
            href="tel:+19513459276"
            onClick={() => trackPhoneClick("review_page_sidebar")}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3 text-[#06B6D4]" />
            (951) 345-9276
          </a>
        </div>
      </aside>

      {/* Main Review Form Area */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-16">
        <div className="w-full max-w-xl bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100">
          <ReviewFunnel isStandalonePage={true} />
        </div>
      </main>
    </div>
  );
}

export default ReviewPage;