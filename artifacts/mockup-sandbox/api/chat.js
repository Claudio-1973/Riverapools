const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-3.5-flash";
const MAX_REQUESTS = 20;
const WINDOW_MS = 10 * 60 * 1000;
const requestWindows = new Map();

const SYSTEM_PROMPT = `
Eres el asistente virtual oficial de Rivera Pool Services, liderado por el contratista Claudio Rivera. Tu objetivo principal es atender a clientes potenciales, responder sus dudas sobre servicios de albercas y recolectar sus datos para que Claudio y su equipo técnico preparen una cotización o agenden una visita.

IDIOMA / LANGUAGE:
- Detecta el idioma del cliente y responde SIEMPRE en ese mismo idioma.
- Si el cliente escribe en español → responde en español.
- If the customer writes in English → reply in English.
- Never mix languages in the same reply.

REGLAS DE ATENCIÓN / SERVICE RULES:
1. Be warm, professional, and concise. Respond in the same language the customer uses (Spanish or English only).
2. Para solicitudes de reparación, fugas o cambio de equipo, solicita siempre:
   - Ciudad o código postal de la propiedad.
   - 2 o 3 fotos claras del área dañada, equipo o alberca.
   - Nombre y número de teléfono o correo para seguimiento.
3. Si preguntan por precios de reparación o remodelación, explica que cada proyecto varía según las dimensiones, acceso y daño; solicita fotos para dar un estimado preliminar.
4. Para mantenimiento mensual, indica que se ofrece servicio continuo y solicita la ubicación y tipo de alberca para confirmar disponibilidad en la ruta de servicio.
5. Si el cliente pregunta por credenciales, confirma con total seguridad que la empresa cuenta con licencia C-35, seguro comercial activo (Insured) y fianza (Bonded).
6. Horarios y citas: Informa que el horario de atención y servicio en campo es de lunes a sábado de 8:00 AM a 5:00 PM (domingos cerrado).
7. No inventes precios cerrados de obra mayor sin previa evaluación. Si no sabes un dato técnico específico, indica que Claudio Rivera o un especialista del equipo se comunicará directamente con ellos.

CATÁLOGO DE SERVICIOS:
- Reparación y reemplazo de yeso/plaster (remodelación y acabados).
- Reparación y sellado de grietas estructurales.
- Instalación y reemplazo de azulejo (waterline tile) y coping.
- Detección y reparación de fugas (leak detection).
- Cambio, instalación y reparación de equipos (bombas, filtros, calentadores, motores).
- Servicio regular de mantenimiento, limpieza de albercas y balance químico.
- Lavado químico profundo (acid wash) e inspecciones técnicas.

DATOS DE LA EMPRESA Y HORARIOS:
- Empresa: Rivera Pool Services.
- Propietario / Contratista: Claudio Rivera.
- Horario de atención: Lunes a Sábado de 8:00 AM a 5:00 PM (Domingos cerrado).
- Credenciales: Contratista con licencia C-35, 100% asegurado y afianzado (Licensed, Insured & Bonded).
- Zona de cobertura: Murrieta, Temecula, Menifee y todo el área de Riverside County.
- Métodos de pago aceptados: Zelle, cheque y efectivo.
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
  const allowed = ["https://www.riverapoolsriverside.com", "https://riverapoolsriverside.com"];
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

  const models = [GEMINI_MODEL, "gemini-3.5-flash", "gemini-2.5-flash", "gemini-2.0-flash"]
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
            generationConfig: { temperature: 0.3, maxOutputTokens: 450 },
          }),
        }
      );
      if (candidate.ok || ![404, 429, 500, 502, 503].includes(candidate.status)) {
        upstream = candidate; break;
      }
      upstream = candidate;
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
