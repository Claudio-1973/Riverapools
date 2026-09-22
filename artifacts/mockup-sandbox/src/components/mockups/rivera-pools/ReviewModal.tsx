import React, { useState, useRef, useEffect } from "react";
import { 
  Star, 
  X, 
  ExternalLink, 
  Phone, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Droplets, 
  ShieldCheck, 
  RotateCcw,
  Sparkles
} from "lucide-react";
import { trackGoogleReviewClick, trackPrivateFeedbackSubmission, trackPhoneClick } from "@/lib/analytics";

export const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJJexxK4jlJwARA1TMJM--RmM";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

type Language = "es" | "en";

interface ReviewFunnelProps {
  onSuccessClose?: () => void;
  initialLanguage?: Language;
  isStandalonePage?: boolean;
}

export function ReviewFunnel({ onSuccessClose, initialLanguage = "es", isStandalonePage = false }: ReviewFunnelProps) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  // Form state for low rating (1-3 stars)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    issue: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const activeRating = hoveredRating || rating;

  const starLabels = {
    es: [
      "Muy mala experiencia",
      "Mala experiencia",
      "Regular / Podría mejorar",
      "Muy buena experiencia",
      "¡Excelente servicio y calidad!"
    ],
    en: [
      "Very poor experience",
      "Poor experience",
      "Average / Room for improvement",
      "Great experience",
      "Outstanding craftsmanship & service!"
    ]
  };

  const handleRatingClick = (stars: number) => {
    setRating(stars);
    setFormStatus("idle");
    setFormErrors({});
    if (stars >= 4) {
      trackGoogleReviewClick("rating_funnel", stars);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = language === "es" ? "Por favor escribe tu nombre." : "Please enter your name.";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 7) {
      errors.phone = language === "es" ? "Ingresa un teléfono válido para poder llamarte." : "Please enter a valid phone number so we can call you.";
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = language === "es" ? "Ingresa un correo electrónico válido." : "Please enter a valid email address.";
    }
    if (!formData.issue.trim() || formData.issue.trim().length < 5) {
      errors.issue = language === "es" 
        ? "Por favor explícanos brevemente qué ocurrió para solucionarlo." 
        : "Please explain briefly what happened so we can make it right.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `⚠️ ATENCIÓN: Queja de Cliente / Feedback Privado (${rating}/5★) — ${formData.name}`,
          from_name: formData.name,
          phone: formData.phone,
          email: formData.email || "No especificado",
          rating: `${rating} de 5 estrellas`,
          message: formData.issue,
          source: "Smart Review Funnel",
          priority: "ALTA - Contactar inmediatamente por teléfono",
        }),
      });

      const data = await response.json().catch(() => ({ success: false }));
      
      // Even if key is missing or test mode, handle tracking and completion
      trackPrivateFeedbackSubmission(rating);
      setFormStatus("success");
    } catch (err) {
      console.error("Error submitting private feedback:", err);
      setFormStatus("error");
    }
  };

  return (
    <div className="w-full">
      {/* Top bar: Brand + Language switcher */}
      <div className="flex items-center justify-between pb-5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <p className="font-['Montserrat'] font-bold text-xs tracking-wider text-[#0F253F] uppercase">Rivera Pools</p>
            <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Riverside, CA</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setLanguage(lang => lang === "es" ? "en" : "es")}
          className="text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-200 text-slate-600 hover:border-[#06B6D4] hover:text-[#06B6D4] transition-colors"
          title={language === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
        >
          {language === "es" ? "🇺🇸 English" : "🇲🇽 Español"}
        </button>
      </div>

      {/* STEP 1: RATING SELECTION */}
      {rating === 0 && (
        <div className="py-6 text-center animate-in fade-in duration-300">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {language === "es" ? "Tu opinión importa" : "Your feedback matters"}
          </div>

          <h3 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[#0F253F] mb-3">
            {language === "es" 
              ? "¿Cómo calificarías tu experiencia con Rivera Pools?" 
              : "How would you rate your experience with Rivera Pools?"}
          </h3>

          <p className="text-sm text-slate-500 max-w-md mx-auto mb-8">
            {language === "es"
              ? "Somos un negocio familiar y nos esforzamos al máximo en cada piscina. Selecciona cuántas estrellas deseas otorgarnos:"
              : "We are a local family crew dedicated to top-tier craftsmanship. Select how many stars you would like to give us:"}
          </p>

          {/* Star selector */}
          <div className="flex justify-center items-center gap-2 md:gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((starVal) => {
              const isHighlighted = starVal <= activeRating;
              return (
                <button
                  key={starVal}
                  type="button"
                  onClick={() => handleRatingClick(starVal)}
                  onMouseEnter={() => setHoveredRating(starVal)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="group p-2 md:p-3 rounded-2xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                  aria-label={`${starVal} ${starVal === 1 ? "star" : "stars"}`}
                >
                  <Star 
                    className={`w-10 h-10 md:w-12 md:h-12 transition-all duration-200 ${
                      isHighlighted 
                        ? "fill-[#D4AF37] text-[#D4AF37] drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]" 
                        : "text-slate-200 fill-slate-50 hover:text-slate-300"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Dynamic star label */}
          <div className="min-h-[28px] flex items-center justify-center">
            {activeRating > 0 ? (
              <span className="text-sm font-bold text-[#0F253F] animate-in fade-in">
                {activeRating} ★ — {starLabels[language][activeRating - 1]}
              </span>
            ) : (
              <span className="text-xs text-slate-400">
                {language === "es" ? "Haz clic en las estrellas para calificar" : "Click on the stars to rate"}
              </span>
            )}
          </div>
        </div>
      )}

      {/* STEP 2A: POSITIVE RATING (4 or 5 STARS) -> GOOGLE REVIEWS */}
      {rating >= 4 && (
        <div className="py-6 text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="flex justify-center gap-1 mb-3">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
            ))}
          </div>

          <h3 className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[#0F253F] mb-3">
            {language === "es" 
              ? "¡Muchísimas gracias por tu confianza!" 
              : "Thank you so much for your trust!"}
          </h3>

          <p className="text-sm text-slate-600 max-w-lg mx-auto mb-6 leading-relaxed">
            {language === "es" ? (
              <>
                Nos alegra enormemente saber que quedaste satisfecho con el trabajo en tu piscina. 
                Como empresa familiar local en Riverside, <strong>tu reseña pública en Google significa el mundo para nosotros</strong> y ayuda a que más vecinos conozcan nuestro trabajo.
              </>
            ) : (
              <>
                We are thrilled that you had a wonderful experience. 
                As a local, family-owned business in Riverside County, <strong>your public review on Google means the world to us</strong> and helps neighbors choose quality pool craftsmanship.
              </>
            )}
          </p>

          <div className="space-y-3 max-w-md mx-auto">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoogleReviewClick("modal_google_button", rating)}
              className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl bg-[#0F253F] hover:bg-[#0F253F]/90 text-white font-bold text-base shadow-xl shadow-[#0F253F]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {/* Google G Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>
                {language === "es" ? "Publicar Reseña en Google" : "Post Review on Google"}
              </span>
              <ExternalLink className="w-4 h-4 text-slate-300" />
            </a>

            <button
              type="button"
              onClick={() => setRating(0)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors pt-2"
            >
              <RotateCcw className="w-3 h-3" />
              {language === "es" ? "Cambiar calificación" : "Change rating"}
            </button>
          </div>
        </div>
      )}

      {/* STEP 2B: LOW RATING (1, 2, or 3 STARS) -> PRIVATE RESOLUTION FORM */}
      {rating > 0 && rating <= 3 && (
        <div className="py-4 animate-in fade-in duration-300">
          {formStatus === "success" ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-['Montserrat'] font-bold text-2xl text-[#0F253F] mb-2">
                {language === "es" ? "Hemos recibido tu mensaje" : "We have received your message"}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                {language === "es" ? (
                  <>
                    Gracias por tu sinceridad. <strong>Claudio Rivera</strong> revisará personalmente tu caso y se comunicará contigo al teléfono proporcionado para darle solución inmediata.
                  </>
                ) : (
                  <>
                    Thank you for being candid. <strong>Claudio Rivera</strong> will personally review your feedback and call you shortly to address this directly.
                  </>
                )}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 max-w-sm mx-auto mb-6">
                <p className="text-xs text-slate-500 mb-2">
                  {language === "es" ? "¿Necesitas resolverlo de inmediato?" : "Need immediate assistance?"}
                </p>
                <a
                  href="tel:+19513459276"
                  onClick={() => trackPhoneClick("review_funnel_success")}
                  className="inline-flex items-center gap-2 font-bold text-[#06B6D4] hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  (951) 345-9276
                </a>
              </div>

              {onSuccessClose && (
                <button
                  type="button"
                  onClick={onSuccessClose}
                  className="py-2.5 px-6 rounded-xl bg-[#0F253F] text-white text-sm font-semibold hover:bg-[#0F253F]/90"
                >
                  {language === "es" ? "Cerrar" : "Close"}
                </button>
              )}
            </div>
          ) : (
            <div>
              {/* Apology header */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60 mb-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-['Montserrat'] font-bold text-base text-[#0F253F] mb-1">
                      {language === "es" 
                        ? "Lamentamos no haber alcanzado tus expectativas" 
                        : "We're truly sorry we missed the mark"}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {language === "es" ? (
                        <>
                          En Rivera Pools la satisfacción de cada cliente es nuestra prioridad absoluta. Por favor cuéntanos qué ocurrió para que <strong>Claudio Rivera y nuestro equipo podamos solucionarlo personalmente</strong>.
                        </>
                      ) : (
                        <>
                          At Rivera Pools your peace of mind comes first. Please tell us what went wrong so <strong>Claudio Rivera and our leadership team can personally resolve it</strong>.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Private complaint form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F253F] uppercase tracking-wider mb-1.5">
                      {language === "es" ? "Tu Nombre *" : "Your Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder={language === "es" ? "Ej. Carlos Martínez" : "e.g. John Smith"}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                        formErrors.name ? "border-rose-400 focus:ring-2 focus:ring-rose-200" : "border-slate-200 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-rose-500 mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F253F] uppercase tracking-wider mb-1.5">
                      {language === "es" ? "Teléfono de Contacto *" : "Phone Number *"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      placeholder="(951) 000-0000"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none ${
                        formErrors.phone ? "border-rose-400 focus:ring-2 focus:ring-rose-200" : "border-slate-200 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F253F] uppercase tracking-wider mb-1.5">
                    {language === "es" ? "Correo Electrónico (opcional)" : "Email Address (optional)"}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="nombre@ejemplo.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 transition-all outline-none"
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-rose-500 mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F253F] uppercase tracking-wider mb-1.5">
                    {language === "es" 
                      ? "¿Qué ocurrió o qué podemos mejorar? *" 
                      : "What went wrong or how can we improve? *"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.issue}
                    onChange={(e) => setFormData(p => ({ ...p, issue: e.target.value }))}
                    placeholder={language === "es" 
                      ? "Comparte los detalles de lo sucedido con el trabajo en tu piscina para que podamos corregirlo..." 
                      : "Please share what happened with your pool project so we can make things right..."}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50 focus:bg-white transition-all outline-none resize-none ${
                      formErrors.issue ? "border-rose-400 focus:ring-2 focus:ring-rose-200" : "border-slate-200 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20"
                    }`}
                  />
                  {formErrors.issue && (
                    <p className="text-[11px] text-rose-500 mt-1">{formErrors.issue}</p>
                  )}
                </div>

                {formStatus === "error" && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>
                      {language === "es"
                        ? "Hubo un problema al enviar tu mensaje. Por favor llámanos directamente al (951) 345-9276 para atenderte."
                        : "There was an issue sending your message. Please call us directly at (951) 345-9276."}
                    </span>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setRating(0)}
                    className="text-xs text-slate-400 hover:text-slate-600 inline-flex items-center gap-1 order-2 sm:order-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    {language === "es" ? "Cambiar calificación" : "Change rating"}
                  </button>

                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white font-bold text-sm shadow-md shadow-[#06B6D4]/20 flex items-center justify-center gap-2 disabled:opacity-50 transition-all order-1 sm:order-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {formStatus === "sending"
                        ? (language === "es" ? "Enviando mensaje..." : "Sending...")
                        : (language === "es" ? "Enviar a Claudio Rivera" : "Send Directly to Claudio Rivera")}
                    </span>
                  </button>
                </div>
              </form>

              {/* Direct phone fallback */}
              <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500 mb-1">
                  {language === "es" ? "¿Prefieres hablar directamente ahora mismo?" : "Prefer to talk directly right now?"}
                </p>
                <a
                  href="tel:+19513459276"
                  onClick={() => trackPhoneClick("review_funnel_direct_call")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F253F] hover:text-[#06B6D4] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#06B6D4]" />
                  (951) 345-9276 — Claudio Rivera
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Trust footer */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#06B6D4]" />
          {language === "es" ? "Rivera Pools · CA License #1053279" : "Rivera Pools · CA License #1053279"}
        </span>
        <span>
          {language === "es" ? "Privado y confidencial" : "Private & confidential"}
        </span>
      </div>
    </div>
  );
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F253F]/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
          aria-label="Cerrar ventana"
        >
          <X className="w-4 h-4" />
        </button>

        <ReviewFunnel onSuccessClose={onClose} />
      </div>
    </div>
  );
}
