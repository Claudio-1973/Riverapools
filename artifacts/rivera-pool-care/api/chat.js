const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-3.5-flash";
const MAX_REQUESTS = 20;
const WINDOW_MS = 10 * 60 * 1000;
const requestWindows = new Map();

const SYSTEM_PROMPT = `
Eres el asistente virtual oficial de Rivera Pool Care, liderado por Claudio Rivera. Atiendes a clientes potenciales, respondes dudas sobre limpieza, mantenimiento y reparación de albercas, y recopilas los datos necesarios para preparar un estimado o agendar una visita.

IDIOMA / LANGUAGE:
- Detecta el idioma del cliente y responde SIEMPRE en ese mismo idioma.
- Si el cliente escribe en español → responde en español.
- If the customer writes in English → reply in English.
- Never mix languages in the same reply.

REGLAS DE ATENCIÓN / SERVICE RULES:
1. Be warm, professional, and concise. Respond in the same language the customer uses (Spanish or English only).
2. Para solicitudes de reparación, fugas, alberca verde o cambio de equipo, solicita:
   - Ciudad o código postal de la propiedad.
   - Fotos claras del equipo o alberca.
   - Nombre y número de teléfono o correo para seguimiento.
3. Si preguntan por precios, explica que dependen del tamaño de la alberca, condición del agua, equipo y frecuencia; solicita los datos necesarios para un estimado.
4. Para servicio semanal, solicita ciudad, tipo de alberca y condición actual para confirmar disponibilidad en la ruta.
5. No inventes precios ni diagnósticos. Si no sabes un dato técnico, indica que Claudio Rivera o un técnico se comunicará directamente.
6. Nunca ofrezcas remodelación, plaster, resurfacing, coping, azulejo ni construcción de albercas.

CATÁLOGO DE SERVICIOS:
- Limpieza semanal, cepillado, aspirado y vaciado de canastas.
- Balance químico y cuidado preventivo del agua.
- Limpieza y mantenimiento de filtros.
- Inspección, diagnóstico y reparación de bombas, motores, filtros, calentadores y automatización.
- Diagnóstico inicial de fugas.
- Recuperación de albercas verdes.

DATOS DE LA EMPRESA Y HORARIOS:
- Empresa: Rivera Pool Care.
- Contacto: (951) 383-9753 y claudio@prospoolcare.com.
- Zona de cobertura: Murrieta, Temecula, Lake Elsinore, Winchester y Canyon Lake, California.
`.trim();

function getClientKey(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress ?? "unknown";
}

function isRateLimited(key) {
  const now = Date.now();
  const current = requestWindows.get(key);
  if (!current || current.resetAt <= now) {
    requestWindows.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_REQUESTS;
}

function detectLanguage(text, requested) {
  if (requested === "en" || requested === "es") return requested;
  return /[¿¡]|\b(hola|buenas|piscina|alberca|reparar|precio|cotización|resurfacing|necesito)\b/i.test(text)
    ? "es"
    : "en";
}

function getReplyText(data) {
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  return parts.map((p) => p.text ?? "").join("").trim() || null;
}

export default async function handler(req, res) {
  const origin = req.headers.origin ?? "";
  const allowed = ["https://www.prospoolcare.com", "https://prospoolcare.com"];
  res.setHeader("Access-Control-Allow-Origin", allowed.includes(origin) ? origin : "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.status(204).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed." }); return; }

  const body = req.body ?? {};
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 1200) {
    res.status(400).json({ error: "Please send a message of 1,200 characters or fewer." });
    return;
  }

  if (isRateLimited(getClientKey(req))) {
    res.status(429).json({ error: "Please wait a few minutes before sending another message." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) { res.status(503).json({ error: "The assistant is temporarily unavailable." }); return; }

  const lang = detectLanguage(message, body.language);
  const history = (Array.isArray(body.history) ? body.history : []).slice(-8).map((item) => ({
    role: item.role === "assistant" ? "model" : "user",
    parts: [{ text: String(item.content ?? "") }],
  }));

  const models = [GEMINI_MODEL, "gemini-3.5-flash", "gemini-3.6-flash", "gemini-flash-latest"]
    .filter((m, i, arr) => arr.indexOf(m) === i);

  let upstream = null;
  for (const model of models) {
    try {
      const candidate = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(10_000),
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: `${SYSTEM_PROMPT}\nReply language: ${lang}.` }] },
            contents: [...history, { role: "user", parts: [{ text: message }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 800,
              thinkingConfig: { thinkingBudget: 0 },
            },
          }),
        }
      );
      upstream = candidate;
      if (candidate.ok) break;
    } catch { /* timeout — try next */ }
  }

  if (!upstream?.ok) {
    res.status(502).json({ error: "The assistant is temporarily unavailable." }); return;
  }

  const data = await upstream.json();
  const reply = getReplyText(data);
  if (!reply) { res.status(502).json({ error: "The assistant returned an empty response." }); return; }

  res.status(200).json({ reply, language: lang });
}
