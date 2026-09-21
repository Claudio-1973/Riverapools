import { useEffect, useRef, useState } from "react";
import {
  Bot,
  ChevronDown,
  Loader2,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";

type Language = "en" | "es";
type MessageRole = "user" | "assistant";
type ChatMessage = { id: string; role: MessageRole; content: string };

const FAQS: Record<Language, Array<{ question: string; answer: string }>> = {
  en: [
    {
      question: "What services do you offer?",
      answer:
        "Rivera Pool Care provides weekly cleaning, chemical balancing, brushing and vacuuming, filter cleaning, equipment inspections, pump, filter and heater repair, leak troubleshooting, and green-pool recovery.",
    },
    {
      question: "Can you repair my pool equipment?",
      answer:
        "Yes. We troubleshoot and repair pool pumps, motors, filters, heaters, and automation systems. Send us the equipment brand, the symptoms, and a clear photo for a faster initial assessment.",
    },
    {
      question: "Do you offer free estimates?",
      answer:
        "Yes. Rivera Pool Care offers free estimates. You can request one through the form on this page or call (951) 383-9753.",
    },
  ],
  es: [
    {
      question: "¿Qué servicios ofrecen?",
      answer:
        "Rivera Pool Care ofrece limpieza semanal, balance químico, cepillado y aspirado, limpieza de filtros, inspección de equipos, reparación de bombas, filtros y calentadores, diagnóstico de fugas y recuperación de albercas verdes.",
    },
    {
      question: "¿Pueden reparar el equipo de mi alberca?",
      answer:
        "Sí. Diagnosticamos y reparamos bombas, motores, filtros, calentadores y sistemas de automatización. Envíanos la marca del equipo, una descripción del problema y una foto clara para una evaluación inicial.",
    },
    {
      question: "¿Ofrecen estimados gratis?",
      answer:
        "Sí. Rivera Pool Care ofrece estimados gratis. Puedes usar el formulario de esta página o llamar al (951) 383-9753.",
    },
  ],
};

function getEndpoint(): string {
  // The /api/chat serverless function lives in the same Vercel project,
  // so a relative path works in both development and production.
  return "/api/chat";
}

function getGreeting(language: Language): string {
  return language === "es"
    ? "Hola. Soy el asistente de Rivera Pool Care. Puedo ayudarte con limpieza, mantenimiento, reparaciones y un estimado gratis."
    : "Hi. I’m the Rivera Pool Care assistant. I can help with cleaning, maintenance, repairs, and your free estimate.";
}

function getUnavailableMessage(language: Language): string {
  return language === "es"
    ? "Puedo ayudarte con preguntas frecuentes sobre nuestros servicios. Para una respuesta personalizada, llama al (951) 383-9753 o solicita un estimado gratis."
    : "I can help with common questions about our services. For personalized help, call (951) 383-9753 or request a free estimate.";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "greeting", role: "assistant", content: getGreeting("en") },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const addAssistantMessage = (content: string) => {
    setMessages((current) => [
      ...current,
      { id: `assistant-${Date.now()}`, role: "assistant", content },
    ]);
  };

  const sendMessage = async (rawMessage: string) => {
    const message = rawMessage.trim();
    if (!message || pending) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");

    const localAnswer = FAQS[language].find(
      (faq) => faq.question.toLowerCase() === message.toLowerCase(),
    );
    if (localAnswer) {
      addAssistantMessage(localAnswer.answer);
      return;
    }

    const endpoint = getEndpoint();
    setPending(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          message,
          language,
          history: nextMessages
            .slice(-8)
            .map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) {
        throw new Error(data.error ?? "Chat service unavailable");
      }
      addAssistantMessage(data.reply);
    } catch {
      addAssistantMessage(getUnavailableMessage(language));
    } finally {
      setPending(false);
    }
  };

  const selectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setMessages((current) => [
      ...current,
      {
        id: `language-${Date.now()}`,
        role: "assistant",
        content: getGreeting(nextLanguage),
      },
    ]);
  };

  const requestEstimate = () => {
    setOpen(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-5 left-5 z-[60] font-['Inter']">
      {open && (
        <section
          className="mb-4 flex h-[min(620px,calc(100vh-110px))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-[#0F253F]/25"
          aria-label={language === "es" ? "Chat de Rivera Pool Care" : "Rivera Pool Care chat"}
          role="dialog"
          aria-modal="false"
        >
          <header className="bg-[#0F253F] px-5 py-4 text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#06B6D4]/20 text-[#67e8f9]">
                  <Bot className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-['Montserrat'] text-base font-bold">Rivera Pool Care Assistant</h2>
                  <p className="text-xs text-slate-300">
                    {language === "es" ? "Respuestas en español o inglés" : "English and Spanish support"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67e8f9]"
                aria-label={language === "es" ? "Cerrar chat" : "Close chat"}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 flex gap-1 rounded-lg bg-white/10 p-1" aria-label="Chat language">
              {(["en", "es"] as Language[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectLanguage(item)}
                  className={`flex-1 rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                    language === item ? "bg-white text-[#0F253F]" : "text-slate-300 hover:bg-white/10"
                  }`}
                  aria-pressed={language === item}
                >
                  {item === "en" ? "English" : "Español"}
                </button>
              ))}
            </div>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4" aria-live="polite">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-br-md bg-[#06B6D4] text-white"
                      : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="space-y-2 pt-1">
                <p className="px-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {language === "es" ? "Preguntas rápidas" : "Quick questions"}
                </p>
                {FAQS[language].map((faq) => (
                  <button
                    key={faq.question}
                    type="button"
                    onClick={() => void sendMessage(faq.question)}
                    className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs font-medium text-[#0F253F] transition-colors hover:border-[#06B6D4] hover:text-[#0891b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            )}

            {pending && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                {language === "es" ? "Escribiendo..." : "Writing..."}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <button
              type="button"
              onClick={requestEstimate}
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#06B6D4]/30 bg-[#ecfeff] px-3 py-2 text-xs font-bold text-[#0f7490] transition-colors hover:bg-[#cffafe] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {language === "es" ? "Solicitar un estimado gratis" : "Request a free estimate"}
            </button>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage(input);
              }}
              className="flex items-center gap-2"
            >
              <label className="sr-only" htmlFor="rivera-chat-message">
                {language === "es" ? "Escribe tu pregunta" : "Type your question"}
              </label>
              <input
                ref={inputRef}
                id="rivera-chat-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={language === "es" ? "Escribe tu pregunta..." : "Ask about your pool..."}
                maxLength={1200}
                disabled={pending}
                className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 disabled:bg-slate-50"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#06B6D4] text-white transition-colors hover:bg-[#0891b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F253F] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={language === "es" ? "Enviar mensaje" : "Send message"}
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
            <p className="mt-2 text-center text-[10px] leading-relaxed text-slate-400">
              {language === "es"
                ? "Para diagnóstico exacto o citas, llama al (951) 383-9753."
                : "For exact diagnosis or scheduling, call (951) 383-9753."}
            </p>
          </div>
        </section>
      )}

      {!open && (
        <div className="relative">
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#F97316] opacity-60 animate-ping" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative flex items-center gap-2 rounded-full bg-[#F97316] px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#F97316]/40 transition-all hover:-translate-y-0.5 hover:bg-[#ea6c00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] focus-visible:ring-offset-2"
            aria-label={language === "es" ? "Abrir chat de Rivera Pool Care" : "Open Rivera Pool Care chat"}
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            <span>{language === "es" ? "¿Preguntas?" : "Questions?"}</span>
            <ChevronDown className="h-4 w-4 rotate-180" aria-hidden="true" />
          </button>
        </div>
      )}

      {open && (
        <a
          href="tel:+19513839753"
          className="sr-only"
          aria-label={language === "es" ? "Llamar a Rivera Pool Care" : "Call Rivera Pool Care"}
        >
          <Phone />
        </a>
      )}
    </div>
  );
}