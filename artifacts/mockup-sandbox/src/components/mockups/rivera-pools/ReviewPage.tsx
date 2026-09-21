import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, Droplets, ExternalLink, LockKeyhole, MessageCircle, Send, Star, X } from "lucide-react";
import { trackGoogleReviewClick, trackPrivateFeedbackSubmission } from "@/lib/analytics";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJJexxK4jlJwARA1TMJM--RmM";

type Language = "en" | "es";
type SubmitState = "idle" | "sending" | "success" | "error";

const copy = {
  en: {
    pageTitle: "Share Your Experience | Rivera Pool Services",
    pageDescription: "Share private feedback or leave a Google review for Rivera Pool Services.",
    visualKicker: "After the finish line",
    visualHeadingBefore: "Good work should",
    visualHeadingHighlight: "feel",
    visualHeadingAfter: "good.",
    visualBody: "We are a local, family-operated crew. Your honest words help us care for the next pool like it belongs in our own backyard.",
    serviceArea: "Serving Riverside County and the Inland Empire",
    eyebrow: "A quick note from the Rivera family",
    title: "How did your pool turn out?",
    intro: "Your experience matters to us. Tell us how we did — it takes less than a minute, and every note helps us keep raising the bar.",
    choose: "Choose a rating",
    chooseHint: "Use the arrow keys to move between stars, then press Enter.",
    star: "star",
    starsPlural: "stars",
    stars: ["Very poor", "Poor", "Okay", "Good", "Excellent"],
    responseTitle: "Thank you for sharing your experience.",
    responseIntro: "You can leave a public review on Google or send a private note directly to our team. Both options are available to every customer.",
    privateToggle: "Send a private note",
    privateToggleClose: "Close private form",
    closeDialog: "Close private feedback form",
    privateTitle: "Thank you for telling us.",
    privateIntro: "We’re sorry your experience missed the mark. Send us a private note and a member of our family will personally follow up.",
    googleCta: "Share on Google",
    change: "Change my rating",
    formTitle: "Help us make it right",
    name: "Your name",
    nameHint: "So we know who to call",
    phone: "Phone number",
    phoneHint: "The best number for a follow-up",
    email: "Email address",
    optional: "Optional",
    issue: "What could we have done better?",
    issueHint: "Please share a little detail so we can understand and respond thoughtfully.",
    send: "Send private feedback",
    sending: "Sending your note…",
    required: "Please share what went wrong so we can help.",
    invalidName: "Please enter your name.",
    invalidPhone: "Please enter a valid phone number.",
    invalidEmail: "Please enter a valid email address.",
    successTitle: "Your note is with us.",
    successText: "Thank you for giving us the chance to listen. We’ll review this personally and reach out soon.",
    error: "We couldn’t send your note just now. Please try again, or call us at (951) 345-9276.",
    retry: "Try again",
    privateLabel: "Private feedback",
    privateNote: "is only shared with our team.",
    privacyDisclosure: "Private feedback is processed by Web3Forms to deliver it to the Rivera team. It is not published on Google.",
    consent: "I agree to have Web3Forms process this feedback so the Rivera team can follow up with me.",
    consentError: "Please confirm that we may process your feedback.",
    secure: "Sent privately to the Rivera team",
    footer: "Rivera Pool Services · Riverside County & the Inland Empire",
  },
  es: {
    pageTitle: "Comparta su experiencia | Rivera Pool Services",
    pageDescription: "Comparta un comentario privado o deje una reseña en Google para Rivera Pool Services.",
    visualKicker: "Después de terminar el trabajo",
    visualHeadingBefore: "Un buen trabajo debe",
    visualHeadingHighlight: "sentirse",
    visualHeadingAfter: "bien.",
    visualBody: "Somos un equipo local y familiar. Sus palabras sinceras nos ayudan a cuidar la próxima piscina como si estuviera en nuestro propio patio.",
    serviceArea: "Sirviendo al condado de Riverside y el Inland Empire",
    eyebrow: "Una nota rápida de la familia Rivera",
    title: "¿Cómo quedó su piscina?",
    intro: "Su experiencia nos importa. Cuéntenos cómo lo hicimos — toma menos de un minuto y cada comentario nos ayuda a mejorar.",
    choose: "Elija una calificación",
    chooseHint: "Use las flechas para moverse entre estrellas y Enter para elegir.",
    star: "estrella",
    starsPlural: "estrellas",
    stars: ["Muy mala", "Mala", "Regular", "Buena", "Excelente"],
    responseTitle: "Gracias por compartir su experiencia.",
    responseIntro: "Puede dejar una reseña pública en Google o enviar una nota privada directamente a nuestro equipo. Las dos opciones están disponibles para cada cliente.",
    privateToggle: "Enviar una nota privada",
    privateToggleClose: "Cerrar formulario privado",
    closeDialog: "Cerrar formulario de comentario privado",
    privateTitle: "Gracias por contarnos.",
    privateIntro: "Lamentamos que su experiencia no haya sido la esperada. Envíenos una nota privada y alguien de nuestra familia se comunicará personalmente.",
    googleCta: "Compartir en Google",
    change: "Cambiar mi calificación",
    formTitle: "Ayúdenos a solucionarlo",
    name: "Su nombre",
    nameHint: "Para saber a quién llamar",
    phone: "Número de teléfono",
    phoneHint: "El mejor número para contactarle",
    email: "Correo electrónico",
    optional: "Opcional",
    issue: "¿Qué podríamos haber hecho mejor?",
    issueHint: "Comparta un poco de detalle para que podamos entender y responder con atención.",
    send: "Enviar comentario privado",
    sending: "Enviando su nota…",
    required: "Comparta qué salió mal para que podamos ayudarle.",
    invalidName: "Escriba su nombre.",
    invalidPhone: "Escriba un número de teléfono válido.",
    invalidEmail: "Escriba un correo electrónico válido.",
    successTitle: "Recibimos su nota.",
    successText: "Gracias por darnos la oportunidad de escucharle. La revisaremos personalmente y nos comunicaremos pronto.",
    error: "No pudimos enviar su nota. Intente de nuevo o llámenos al (951) 345-9276.",
    retry: "Intentar de nuevo",
    privateLabel: "Comentario privado",
    privateNote: "solo se comparte con nuestro equipo.",
    privacyDisclosure: "Web3Forms procesa el comentario privado para entregarlo al equipo Rivera. No se publica en Google.",
    consent: "Acepto que Web3Forms procese este comentario para que el equipo Rivera pueda contactarme.",
    consentError: "Confirme que podemos procesar su comentario.",
    secure: "Enviado de forma privada al equipo Rivera",
    footer: "Rivera Pool Services · Riverside County y el Inland Empire",
  },
};

export function ReviewPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [privateFormOpen, setPrivateFormOpen] = useState(false);
  const [responsePopupOpen, setResponsePopupOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [form, setForm] = useState({ name: "", phone: "", email: "", issue: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const issueInputRef = useRef<HTMLTextAreaElement>(null);
  const consentInputRef = useRef<HTMLInputElement>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const t = copy[language];
  const shownRating = hoveredRating || rating;

  useEffect(() => {
    document.title = t.pageTitle;
    let descriptionTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.name = "description";
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.content = t.pageDescription;
  }, [t.pageDescription, t.pageTitle]);

  useEffect(() => {
    if (!privateFormOpen && !responsePopupOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPrivateFormOpen(false);
        setResponsePopupOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    requestAnimationFrame(() => modalCloseRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [privateFormOpen, responsePopupOpen]);

  const ratingLabel = useMemo(
    () => (shownRating ? `${shownRating} ${shownRating === 1 ? t.star : t.starsPlural} — ${t.stars[shownRating - 1]}` : t.choose),
    [shownRating, t],
  );

  const chooseRating = (value: number) => {
    setRating(value);
    setPrivateFormOpen(value > 0 && value < 4);
    setResponsePopupOpen(false);
    if (value >= 4) {
      trackGoogleReviewClick("rating_selection", value);
      const reviewWindow = window.open(GOOGLE_REVIEW_URL, "_blank");
      if (reviewWindow) reviewWindow.opener = null;
      setResponsePopupOpen(!reviewWindow);
    }
    setSubmitState("idle");
    setErrors({});
  };

  const handleStarKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      chooseRating(Math.min(5, index + 2));
      document.getElementById(`rating-${Math.min(5, index + 2)}`)?.focus();
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      chooseRating(Math.max(1, index));
      document.getElementById(`rating-${Math.max(1, index)}`)?.focus();
    }
  };

  const updateForm = (field: Exclude<keyof typeof form, "consent">, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: "" }));
  };

  const submitPrivateFeedback = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = t.invalidName;
    if (form.phone.replace(/\D/g, "").length < 7) nextErrors.phone = t.invalidPhone;
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = t.invalidEmail;
    if (!form.issue.trim()) nextErrors.issue = t.required;
    if (!form.consent) nextErrors.consent = t.consentError;
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      requestAnimationFrame(() => {
        if (nextErrors.name) nameInputRef.current?.focus();
        else if (nextErrors.phone) phoneInputRef.current?.focus();
        else if (nextErrors.email) emailInputRef.current?.focus();
        else if (nextErrors.issue) issueInputRef.current?.focus();
        else consentInputRef.current?.focus();
      });
      return;
    }
    setSubmitState("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Private Pool Feedback — ${form.name}`,
          from_name: form.name,
          email: form.email,
          phone: form.phone,
          rating: `${rating}/5`,
          consent: "Confirmed",
          message: form.issue,
        }),
      });
      const data = await response.json();
      if (!data.success) throw new Error("Submission failed");
       trackPrivateFeedbackSubmission(rating);
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="review-page">
      <style>{`
        .review-page { --navy:#0b2940; --ink:#16384d; --aqua:#06b6d4; --aqua-deep:#0789a2; --gold:#e5b84b; --mist:#eef8f7; --paper:#fbfcf9; min-height:100dvh; color:var(--ink); background:var(--paper); font-family:ui-sans-serif,system-ui,sans-serif; overflow-x:hidden; }
        .review-page * { box-sizing:border-box; }
        .review-shell { min-height:100dvh; display:grid; grid-template-columns:minmax(320px, .88fr) minmax(480px, 1.12fr); }
        .review-visual { position:relative; overflow:hidden; background:var(--navy); color:#fff; padding:clamp(28px,5vw,72px); display:flex; flex-direction:column; justify-content:space-between; min-height:100dvh; }
        .review-visual:before { content:""; position:absolute; width:620px; height:620px; border:1px solid rgba(6,182,212,.34); border-radius:50%; right:-300px; top:17%; box-shadow:0 0 0 38px rgba(6,182,212,.05),0 0 0 78px rgba(6,182,212,.035); }
        .review-visual:after { content:""; position:absolute; inset:0; opacity:.13; pointer-events:none; background-image:radial-gradient(rgba(255,255,255,.6) .6px,transparent .6px); background-size:9px 9px; mix-blend-mode:soft-light; }
        .review-brand, .review-mark, .review-visual-copy, .review-visual-foot { position:relative; z-index:1; }
        .review-brand { display:flex; align-items:center; gap:11px; color:#fff; text-decoration:none; }
        .review-mark { display:grid; place-items:center; width:42px; height:42px; border-radius:13px; color:var(--navy); background:var(--aqua); box-shadow:7px 7px 0 rgba(229,184,75,.9); }
        .review-brand-name { font-size:15px; line-height:1.05; font-weight:800; letter-spacing:.12em; }
        .review-brand-sub { display:block; margin-top:5px; color:rgba(255,255,255,.56); font-size:9px; letter-spacing:.2em; font-weight:700; }
        .review-visual-copy { max-width:440px; margin-top:auto; margin-bottom:auto; padding:70px 0 40px; }
        .review-kicker { color:var(--aqua); text-transform:uppercase; letter-spacing:.2em; font-size:11px; font-weight:800; }
        .review-visual h2 { font-family:Georgia,serif; font-size:clamp(42px,5vw,76px); font-weight:400; line-height:.98; letter-spacing:-.055em; margin:20px 0 24px; }
        .review-visual h2 em { color:var(--gold); font-style:normal; }
        .review-visual p { max-width:360px; margin:0; color:rgba(255,255,255,.7); font-size:15px; line-height:1.7; }
        .review-wave { margin:45px 0 26px; display:flex; align-items:end; gap:5px; height:54px; }
        .review-wave i { display:block; width:3px; border-radius:5px; background:var(--aqua); opacity:.8; animation:review-wave 2.8s ease-in-out infinite alternate; }
        .review-wave i:nth-child(1){height:19px}.review-wave i:nth-child(2){height:32px;animation-delay:.15s}.review-wave i:nth-child(3){height:47px;animation-delay:.3s}.review-wave i:nth-child(4){height:28px;animation-delay:.45s}.review-wave i:nth-child(5){height:40px;animation-delay:.6s}.review-wave i:nth-child(6){height:23px;animation-delay:.75s}.review-wave i:nth-child(7){height:50px;animation-delay:.9s}.review-wave i:nth-child(8){height:31px;animation-delay:1.05s}.review-wave i:nth-child(9){height:43px;animation-delay:1.2s}.review-wave i:nth-child(10){height:20px;animation-delay:1.35s}
        @keyframes review-wave { to { transform:scaleY(.55); opacity:.42; } }
        .review-visual-foot { display:flex; align-items:center; gap:10px; color:rgba(255,255,255,.58); font-size:12px; }
        .review-visual-foot span { width:6px; height:6px; border-radius:50%; background:var(--gold); }
        .review-main { display:flex; justify-content:center; align-items:center; padding:clamp(26px,6vw,86px); position:relative; }
        .review-main:before { content:""; position:absolute; top:0; right:0; width:190px; height:190px; background:var(--mist); border-radius:0 0 0 100%; }
        .review-content { width:min(100%,620px); position:relative; z-index:1; animation:review-in .7s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes review-in { from{opacity:0; transform:translateY(16px)} to{opacity:1; transform:none} }
        .review-topline { display:flex; justify-content:space-between; align-items:center; margin-bottom:clamp(48px,8vh,88px); }
        .review-secure { display:flex; gap:7px; align-items:center; color:#5a747b; font-size:11px; font-weight:700; letter-spacing:.02em; }
        .review-secure svg { color:var(--aqua-deep); }
        .review-language { border:0; background:transparent; color:var(--ink); cursor:pointer; font-size:12px; font-weight:800; letter-spacing:.06em; padding:8px 0; }
        .review-language:hover { color:var(--aqua-deep); }
        .review-eyebrow { color:var(--aqua-deep); font-size:12px; font-weight:800; letter-spacing:.12em; text-transform:uppercase; margin:0 0 18px; }
        .review-content h1 { color:var(--navy); font-family:Georgia,serif; font-weight:400; letter-spacing:-.055em; line-height:1.02; font-size:clamp(42px,5.4vw,70px); margin:0 0 22px; max-width:620px; }
        .review-lede { margin:0; color:#5c7479; font-size:16px; line-height:1.7; max-width:520px; }
        .review-rating-block { margin-top:clamp(38px,6vh,62px); padding:27px 0 31px; border-top:1px solid #d8e8e4; border-bottom:1px solid #d8e8e4; }
        .review-label { display:block; color:var(--navy); font-size:14px; font-weight:800; margin-bottom:15px; }
        .review-hint { color:#799095; display:block; font-size:11px; font-weight:500; margin-top:13px; }
        .review-stars { display:flex; gap:9px; }
        .review-star { border:0; background:transparent; color:#c5d6d7; cursor:pointer; padding:2px; border-radius:9px; transition:transform .2s, color .2s; }
        .review-star:hover, .review-star:focus-visible { transform:translateY(-4px) scale(1.08); color:var(--gold); outline:3px solid rgba(6,182,212,.2); outline-offset:3px; }
        .review-star.active { color:var(--gold); }
        .review-star svg { width:36px; height:36px; stroke-width:1.5; }
        .review-rating-name { display:block; color:var(--aqua-deep); font-size:12px; font-weight:800; margin-top:13px; min-height:16px; }
        .review-panel { margin-top:30px; animation:review-in .45s ease both; }
        .review-panel h3 { color:var(--navy); font-family:Georgia,serif; font-size:30px; font-weight:400; letter-spacing:-.04em; margin:0 0 9px; }
        .review-panel p { color:#60797e; font-size:14px; line-height:1.65; margin:0 0 24px; }
        .review-google { background:var(--navy); color:#fff; border-radius:18px; padding:25px; box-shadow:12px 14px 0 rgba(6,182,212,.14); }
        .review-google .review-panel h3 { color:#fff; }
        .review-google p { color:rgba(255,255,255,.7); }
        .review-google-button, .review-submit { border:0; border-radius:11px; min-height:49px; padding:0 18px; display:inline-flex; align-items:center; justify-content:center; gap:9px; cursor:pointer; font:inherit; font-size:13px; font-weight:800; transition:transform .2s, background .2s; }
        .review-google-button { background:var(--gold); color:var(--navy); }
        .review-google-button:hover, .review-submit:hover:not(:disabled) { transform:translateY(-2px); }
        .review-google-button svg { width:15px; }
        .review-private-toggle { border:1px solid rgba(255,255,255,.42); border-radius:11px; min-height:44px; margin-top:11px; padding:0 15px; background:transparent; color:#fff; cursor:pointer; font:inherit; font-size:12px; font-weight:800; }
        .review-private-toggle:hover { border-color:var(--aqua); color:var(--aqua); }
        .review-modal-backdrop { position:fixed; inset:0; z-index:100; display:grid; place-items:center; padding:24px; background:rgba(7,25,39,.68); backdrop-filter:blur(7px); animation:review-fade-in .18s ease both; }
        .review-modal { position:relative; width:min(100%,680px); max-height:calc(100dvh - 48px); overflow:auto; border-radius:21px; padding:clamp(27px,4vw,40px); background:var(--paper); box-shadow:0 24px 70px rgba(0,0,0,.34); animation:review-modal-in .25s cubic-bezier(.2,.8,.2,1) both; }
        .review-modal .review-panel { margin:0; animation:none; }
        .review-modal-close { position:absolute; top:15px; right:15px; display:grid; place-items:center; width:40px; height:40px; border:0; border-radius:50%; background:#e8f2f0; color:var(--navy); cursor:pointer; }
        .review-modal-close:hover,.review-modal-close:focus-visible { background:var(--aqua); outline:3px solid rgba(6,182,212,.25); outline-offset:2px; }
        .review-response-modal { padding:40px; background:var(--navy); color:#fff; }
        .review-response-modal .review-google { padding:0; background:transparent; box-shadow:none; }
        .review-response-modal h3 { color:#fff; }
        .review-response-modal p { color:rgba(255,255,255,.74); }
        .review-response-modal .review-modal-close { background:rgba(255,255,255,.13); color:#fff; }
        .review-response-modal .review-modal-close:hover,.review-response-modal .review-modal-close:focus-visible { background:var(--aqua); color:var(--navy); }
        @keyframes review-fade-in { from{opacity:0} to{opacity:1} }
        @keyframes review-modal-in { from{opacity:0;transform:translateY(18px) scale(.98)} to{opacity:1;transform:none} }
        .review-change { border:0; background:transparent; padding:13px 0 0; color:#88b9bd; cursor:pointer; font-size:12px; font-weight:700; }
        .review-change:hover { color:var(--aqua); }
        .review-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:17px 14px; }
        .review-field { display:flex; flex-direction:column; gap:8px; }
        .review-field.full { grid-column:1 / -1; }
        .review-field label { font-size:12px; font-weight:800; color:var(--navy); }
        .review-field label span { color:#8ba0a2; font-weight:500; margin-left:5px; }
        .review-field input, .review-field textarea { width:100%; border:1px solid #d5e5e2; background:#fff; color:var(--ink); border-radius:10px; padding:13px 14px; font:inherit; font-size:14px; outline:none; transition:border .2s, box-shadow .2s; }
        .review-field textarea { min-height:112px; resize:vertical; line-height:1.5; }
        .review-field input:focus, .review-field textarea:focus { border-color:var(--aqua); box-shadow:0 0 0 4px rgba(6,182,212,.12); }
        .review-field input[aria-invalid=true], .review-field textarea[aria-invalid=true] { border-color:#bf6259; }
        .review-error { color:#a8473e; font-size:11px; margin:0; }
        .review-submit { width:100%; background:var(--aqua); color:#073349; margin-top:19px; }
        .review-submit:disabled { cursor:not-allowed; opacity:.65; }
        .review-status { display:flex; align-items:flex-start; gap:9px; border-radius:11px; margin-top:16px; padding:13px; font-size:12px; line-height:1.5; }
        .review-status.error { color:#8e3f39; background:#fff0ed; }.review-status.success { color:#16645d; background:#e6f5ef; }
        .review-status svg { flex:0 0 auto; margin-top:1px; }.review-retry { border:0; background:none; text-decoration:underline; cursor:pointer; color:inherit; font-weight:800; padding:0; }
        .review-consent { display:flex; align-items:flex-start; gap:9px; margin-top:17px; color:#60797e; font-size:11px; line-height:1.45; }
        .review-consent input { appearance:none; width:17px; height:17px; margin:0; flex:0 0 auto; border:1px solid #a8c0c0; border-radius:4px; background:#fff; cursor:pointer; }
        .review-consent input:checked { border-color:var(--aqua-deep); background:var(--aqua-deep); box-shadow:inset 0 0 0 3px #fff; }
        .review-consent input:focus-visible { outline:3px solid rgba(6,182,212,.25); outline-offset:2px; }
        .review-public-option { margin-top:24px; padding-top:19px; border-top:1px solid #d8e8e4; }
        .review-public-option p { margin:0 0 10px; font-size:12px; }
        .review-public-option a { color:var(--aqua-deep); font-size:12px; font-weight:800; text-underline-offset:3px; }
        .review-page .review-footnote { color:#829699; font-size:11px; margin:42px 0 0; }
        @media (max-width: 800px) {
          .review-shell{display:block}
          .review-visual{min-height:360px;padding:22px 22px 20px}
          .review-mark{width:38px;height:38px;border-radius:11px}
          .review-brand-name{font-size:14px}
          .review-visual-copy{padding:30px 0 14px}
          .review-kicker{font-size:10px}
          .review-visual h2{font-size:41px;line-height:1;margin:12px 0 13px}
          .review-visual p{font-size:13px;line-height:1.55;max-width:340px}
          .review-wave{height:35px;margin:16px 0 12px;gap:4px}
          .review-wave i{width:3px}
          .review-visual-foot{font-size:11px}
          .review-main{padding:26px 20px calc(42px + env(safe-area-inset-bottom));align-items:flex-start}
          .review-topline{margin-bottom:34px}
          .review-secure,.review-language{font-size:11px}
          .review-content h1{font-size:41px;margin-bottom:17px}
          .review-lede{font-size:15px;line-height:1.6}
          .review-rating-block{margin-top:30px;padding:22px 0 25px}
          .review-stars{justify-content:space-between;max-width:320px;gap:0}
          .review-star{display:grid;place-items:center;min-width:46px;min-height:46px;padding:4px}
          .review-star svg{width:34px;height:34px}
          .review-hint{line-height:1.45}
          .review-panel{margin-top:24px}
          .review-panel h3{font-size:27px}
          .review-google{padding:21px;border-radius:15px;box-shadow:8px 10px 0 rgba(6,182,212,.14)}
          .review-google-button{width:100%}
          .review-private-toggle{width:100%;min-height:48px}
          .review-modal-backdrop{align-items:end;padding:0}
          .review-modal{width:100%;max-height:92dvh;border-radius:22px 22px 0 0;padding:30px 20px calc(28px + env(safe-area-inset-bottom))}
          .review-modal-close{top:12px;right:12px}
          .review-response-backdrop{align-items:center;padding:20px}
          .review-response-modal{width:100%;max-height:calc(100dvh - 40px);border-radius:18px;padding:34px 24px 26px}
          .review-form-grid{grid-template-columns:1fr}
          .review-field.full{grid-column:auto}
          .review-field input,.review-field textarea{font-size:16px;padding:14px}
          .review-field textarea{min-height:130px}
          .review-consent{font-size:12px}
          .review-consent input{width:20px;height:20px}
          .review-submit{min-height:52px;font-size:14px}
        }
        @media (max-width: 360px) {
          .review-visual{min-height:342px;padding-inline:18px}
          .review-visual h2{font-size:37px}
          .review-main{padding-inline:18px}
          .review-star{min-width:42px;min-height:42px}
          .review-star svg{width:31px;height:31px}
        }
        @media (prefers-reduced-motion: reduce) { .review-content,.review-wave i{animation:none}.review-star,.review-google-button,.review-submit{transition:none} }
      `}</style>
      <div className="review-shell">
        <aside className="review-visual">
          <a href="/" className="review-brand" aria-label="Rivera Pool Services home">
            <span className="review-mark"><Droplets size={22} aria-hidden="true" /></span>
            <span className="review-brand-name">RIVERA POOLS<span className="review-brand-sub">RIVERSIDE</span></span>
          </a>
          <div className="review-visual-copy">
            <span className="review-kicker">{t.visualKicker}</span>
            <h2>{t.visualHeadingBefore} <em>{t.visualHeadingHighlight}</em> {t.visualHeadingAfter}</h2>
            <p>{t.visualBody}</p>
            <div className="review-wave" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i key={index} />)}</div>
          </div>
          <div className="review-visual-foot"><span aria-hidden="true" /> {t.serviceArea}</div>
        </aside>
        <main className="review-main">
          <div className="review-content">
            <div className="review-topline">
              <div className="review-secure"><LockKeyhole size={14} aria-hidden="true" /> {t.secure}</div>
              <button className="review-language" type="button" onClick={() => setLanguage(language === "en" ? "es" : "en")} aria-label={language === "en" ? "Cambiar a español" : "Switch to English"}>{language === "en" ? "ES / Español" : "EN / English"}</button>
            </div>
            <p className="review-eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className="review-lede">{t.intro}</p>
            <section className="review-rating-block" aria-labelledby="rating-label">
              <span className="review-label" id="rating-label">{t.choose}</span>
              <div className="review-stars" role="radiogroup" aria-label={t.choose}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    id={`rating-${value}`}
                    className={`review-star ${value <= shownRating ? "active" : ""}`}
                    type="button"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={`${value} ${value === 1 ? t.star : t.starsPlural} — ${t.stars[value - 1]}`}
                    onClick={() => chooseRating(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onKeyDown={(event) => handleStarKeyDown(event, value - 1)}
                  ><Star fill="currentColor" aria-hidden="true" /></button>
                ))}
              </div>
              <span className="review-rating-name" aria-live="polite">{shownRating ? ratingLabel : ""}</span>
              <span className="review-hint">{t.chooseHint}</span>
            </section>
            {rating > 0 && (!responsePopupOpen || rating < 4) && (
              <section className="review-panel review-google" aria-live="polite">
                <h3>{t.responseTitle}</h3>
                <p>{t.responseIntro}</p>
                <a className="review-google-button" href={GOOGLE_REVIEW_URL} onClick={() => trackGoogleReviewClick("review_response", rating)} target="_blank" rel="noreferrer">{t.googleCta}<ExternalLink size={15} aria-hidden="true" /></a>
                <br />
                <button className="review-private-toggle" type="button" onClick={() => { setResponsePopupOpen(false); setPrivateFormOpen((open) => !open); }}>{privateFormOpen ? t.privateToggleClose : t.privateToggle}</button>
                <br />
                <button className="review-change" type="button" onClick={() => chooseRating(0)}>{t.change}</button>
              </section>
            )}
            {rating === 0 && <p className="review-footnote"><LockKeyhole size={12} aria-hidden="true" /> {t.privateLabel} {t.privateNote}</p>}
          </div>
        </main>
      </div>
      {responsePopupOpen && rating >= 4 && (
        <div className="review-modal-backdrop review-response-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setResponsePopupOpen(false); }}>
          <section className="review-modal review-response-modal" role="dialog" aria-modal="true" aria-labelledby="review-response-title">
            <button ref={modalCloseRef} className="review-modal-close" type="button" onClick={() => setResponsePopupOpen(false)} aria-label={t.closeDialog}><X size={19} aria-hidden="true" /></button>
            <div className="review-panel review-google" aria-live="polite">
              <h3 id="review-response-title">{t.responseTitle}</h3>
              <p>{t.responseIntro}</p>
               <a className="review-google-button" href={GOOGLE_REVIEW_URL} onClick={() => trackGoogleReviewClick("review_response_modal", rating)} target="_blank" rel="noreferrer">{t.googleCta}<ExternalLink size={15} aria-hidden="true" /></a>
              <br />
              <button className="review-private-toggle" type="button" onClick={() => { setResponsePopupOpen(false); setPrivateFormOpen(true); }}>{t.privateToggle}</button>
              <br />
              <button className="review-change" type="button" onClick={() => chooseRating(0)}>{t.change}</button>
            </div>
          </section>
        </div>
      )}
      {privateFormOpen && (
        <div className="review-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setPrivateFormOpen(false); }}>
          <section className="review-modal" role="dialog" aria-modal="true" aria-labelledby="private-feedback-title">
            <button ref={modalCloseRef} className="review-modal-close" type="button" onClick={() => setPrivateFormOpen(false)} aria-label={t.closeDialog}><X size={19} aria-hidden="true" /></button>
            {submitState !== "success" ? (
              <div className="review-panel" aria-live="polite">
                <h3 id="private-feedback-title">{t.privateTitle}</h3>
                <p>{t.privateIntro}</p>
                <form onSubmit={submitPrivateFeedback} noValidate>
                  <div className="review-form-grid">
                    <div className="review-field">
                      <label htmlFor="review-name">{t.name}</label>
                      <input ref={nameInputRef} id="review-name" value={form.name} onChange={(event) => updateForm("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "review-name-hint review-name-error" : "review-name-hint"} autoComplete="name" />
                      <span id="review-name-hint" className="review-hint">{t.nameHint}</span>
                      {errors.name && <p id="review-name-error" className="review-error">{errors.name}</p>}
                    </div>
                    <div className="review-field">
                      <label htmlFor="review-phone">{t.phone}</label>
                      <input ref={phoneInputRef} id="review-phone" type="tel" value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "review-phone-hint review-phone-error" : "review-phone-hint"} autoComplete="tel" />
                      <span id="review-phone-hint" className="review-hint">{t.phoneHint}</span>
                      {errors.phone && <p id="review-phone-error" className="review-error">{errors.phone}</p>}
                    </div>
                    <div className="review-field full">
                      <label htmlFor="review-email">{t.email}<span>{t.optional}</span></label>
                      <input ref={emailInputRef} id="review-email" type="email" value={form.email} onChange={(event) => updateForm("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "review-email-error" : undefined} autoComplete="email" />
                      {errors.email && <p id="review-email-error" className="review-error">{errors.email}</p>}
                    </div>
                    <div className="review-field full">
                      <label htmlFor="review-issue">{t.issue}</label>
                      <textarea ref={issueInputRef} id="review-issue" value={form.issue} onChange={(event) => updateForm("issue", event.target.value)} aria-invalid={Boolean(errors.issue)} aria-describedby={errors.issue ? "review-issue-hint review-issue-error" : "review-issue-hint"} placeholder={t.issueHint} />
                      <span id="review-issue-hint" className="review-hint">{t.issueHint}</span>
                      {errors.issue && <p id="review-issue-error" className="review-error">{errors.issue}</p>}
                    </div>
                  </div>
                  <label className="review-consent">
                    <input ref={consentInputRef} type="checkbox" checked={form.consent} onChange={(event) => { setForm((current) => ({ ...current, consent: event.target.checked })); if (errors.consent) setErrors((current) => ({ ...current, consent: "" })); }} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "review-consent-error" : undefined} />
                    <span>{t.consent}</span>
                  </label>
                  {errors.consent && <p id="review-consent-error" className="review-error">{errors.consent}</p>}
                  <button className="review-submit" type="submit" disabled={submitState === "sending"}>{submitState === "sending" ? t.sending : <><Send size={15} aria-hidden="true" />{t.send}</>}</button>
                  {submitState === "error" && <div className="review-status error" role="alert"><MessageCircle size={15} /><span>{t.error} <button type="button" className="review-retry" onClick={() => setSubmitState("idle")}>{t.retry}</button></span></div>}
                </form>
              </div>
            ) : (
              <div className="review-panel" aria-live="polite">
                <div className="review-status success"><Check size={17} /><span><strong>{t.successTitle}</strong><br />{t.successText}</span></div>
                <button className="review-change" type="button" onClick={() => { setSubmitState("idle"); setRating(0); setPrivateFormOpen(false); }}>{t.change}</button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;