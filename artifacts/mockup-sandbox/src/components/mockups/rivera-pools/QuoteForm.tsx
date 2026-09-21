import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Loader2, Phone, Mail, User, MessageSquare, Droplets, ChevronDown } from "lucide-react";
import { trackPhoneClick, trackQuoteSubmission } from "@/lib/analytics";

const services = [
  "Pool Resurfacing / Replaster",
  "Stone Scapes Finish",
  "Pebble Tec Finish",
  "Pool Tile Replacement",
  "Coping & Decking",
  "Full Pool Renovation",
  "Pool Leak Detection",
  "Other / Not sure yet",
];

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      trackQuoteSubmission({
        formLocation: "quote_form",
        service: form.service || undefined,
      });
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div className={`${compact ? "bg-[#0F253F] py-16 px-6" : "min-h-screen bg-gradient-to-br from-[#0F253F] via-[#163352] to-[#0F253F] flex items-center justify-center p-6"}`}>
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#06B6D4]/20 mb-4">
            <Droplets className="w-7 h-7 text-[#06B6D4]" />
          </div>
          <h2 className="text-3xl font-['Montserrat'] font-extrabold text-white tracking-tight mb-2">
            Get Your Free Estimate
          </h2>
          <p className="text-slate-400 text-sm">
            We'll get back to you within <span className="text-[#06B6D4] font-semibold">24 hours</span>. No commitment required.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
          {submitted ? (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-5">
                <CheckCircle2 className="w-9 h-9 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">¡Message Sent!</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Thank you, <span className="text-white font-medium">{form.name}</span>.<br />
                Claudio will contact you shortly at <span className="text-[#06B6D4]">{form.phone || form.email}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <Input
                  required
                  placeholder="Full name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="pl-10 bg-white/10 border-white/15 text-white placeholder:text-slate-500 focus:border-[#06B6D4] focus:ring-[#06B6D4]/30 rounded-xl h-12"
                />
              </div>

              {/* Phone + Email row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <Input
                    required
                    type="tel"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="pl-10 bg-white/10 border-white/15 text-white placeholder:text-slate-500 focus:border-[#06B6D4] focus:ring-[#06B6D4]/30 rounded-xl h-12"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <Input
                    type="email"
                    placeholder="Email (optional)"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="pl-10 bg-white/10 border-white/15 text-white placeholder:text-slate-500 focus:border-[#06B6D4] focus:ring-[#06B6D4]/30 rounded-xl h-12"
                  />
                </div>
              </div>

              {/* Service dropdown */}
              <div className="relative">
                <select
                  value={form.service}
                  onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  className="w-full h-12 pl-4 pr-10 rounded-xl bg-white/10 border border-white/15 text-sm appearance-none focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/30 text-slate-300"
                >
                  <option value="" className="bg-[#0F253F]">What service do you need?</option>
                  {services.map(s => (
                    <option key={s} value={s} className="bg-[#0F253F]">{s}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Message */}
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                <Textarea
                  placeholder="Tell us a little about your pool and what you're looking for... (optional)"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={3}
                  className="pl-10 bg-white/10 border-white/15 text-white placeholder:text-slate-500 focus:border-[#06B6D4] focus:ring-[#06B6D4]/30 rounded-xl resize-none"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-13 bg-[#06B6D4] hover:bg-[#0891B2] text-white font-bold text-base rounded-xl shadow-lg shadow-[#06B6D4]/30 transition-all hover:shadow-[#06B6D4]/50 hover:-translate-y-0.5 mt-2"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                ) : (
                  "Request Free Estimate →"
                )}
              </Button>

              {/* Trust line */}
              <p className="text-center text-xs text-slate-500 pt-1">
                🔒 Your info is private. We never spam.
              </p>
            </form>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-600 mt-5">
          Prefer to call?{" "}
          <a href="tel:+19513459276" onClick={() => trackPhoneClick("quote_form_footer")} className="text-[#06B6D4] underline underline-offset-2">
            (951) 345-9276
          </a>
        </p>
      </div>
    </div>
  );
}
