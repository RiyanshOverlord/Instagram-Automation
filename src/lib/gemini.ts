
import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";

export const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export type ChatMessage = {
  role: "assistant" | "user" | "system";
  content: string;
};

export class GeminiQuotaError extends Error {
  retryAfterSeconds?: number;
  status = 429;
  constructor(message: string, retryAfterSeconds?: number) {
    super(message);
    this.name = "GeminiQuotaError";
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

function extractTextFromResponse(res: any) {
  // Common shapes we handle (in order):
  // 1) Primitive string
  // 2) object with text() function (older SDK helper)
  // 3) { response: { candidates: [ { content: { parts: [ { text } ] } } ] } }
  // 4) { candidates: [ { content: [ { text } ] } ] }
  // 5) { output: [ { content: [ { text } ] } ] }
  // 6) message-like shapes

  if (!res) return null;
  if (typeof res === "string") return sanitize(res);

  if (typeof res.text === "function") {
    try {
      const t = res.text();
      if (typeof t === 'string') return sanitize(t);
    } catch (e) {
      // fall through
    }
  }

  // Check for response.candidates[].content.parts[].text (observed in logs)
  const respCandidatesPartsText = res?.response?.candidates?.[0]?.content?.parts;
  if (Array.isArray(respCandidatesPartsText) && respCandidatesPartsText.length) {
    const full = respCandidatesPartsText.map((p: any) => p?.text).filter(Boolean).join(' ');
    if (full) return sanitize(full);
  }

  // Check for candidates[].content.parts (alternate shape)
  const candidatesParts = res?.candidates?.[0]?.content?.parts || res?.candidates?.[0]?.content;
  if (Array.isArray(candidatesParts) && candidatesParts.length) {
    const full = candidatesParts.map((p: any) => p?.text || (typeof p === 'string' ? p : '')).filter(Boolean).join(' ');
    if (full) return sanitize(full);
  }

  // Older style
  const outputText = res?.output?.[0]?.content?.[0]?.text || res?.candidates?.[0]?.content?.[0]?.text || res?.candidates?.[0]?.message?.content || res?.message || null;
  if (outputText && typeof outputText === "string") return sanitize(outputText);

  // As a last resort, try to stringify a small part of the object (but avoid sending large JSON blobs to users)
  try {
    const small = JSON.stringify(res, getCircularReplacer()).slice(0, 1000);
    return sanitize(small);
  } catch (e) {
    return null;
  }
}

function sanitize(text: string, max = 1000) {
  // basic sanitization: trim, collapse whitespace, limit length
  const collapsed = text.replace(/\s+/g, ' ').trim();
  if (collapsed.length <= max) return collapsed;
  return collapsed.slice(0, max).trim() + '...';
}

function getCircularReplacer() {
  const seen = new WeakSet();
  return (_key: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
}

function parseRetrySeconds(err: any): number | undefined {
  try {
    const details = err?.errorDetails || err?.details || [];
    for (const d of details) {
      if (d && d['@type'] && String(d['@type']).includes('RetryInfo') && d.retryDelay) {
        // retryDelay could be like '26s'
        const m = String(d.retryDelay).match(/(\d+)/);
        if (m) return parseInt(m[1], 10);
      }
    }
  } catch (e) {
    // ignore
  }
  return undefined;
}

export async function chatCompletion(messages: ChatMessage[], modelArg?: string) {
  const apiKey = process.env.GEMINI_API_KEY!;
  const envPrimary = process.env.GEMINI_MODEL;
  const primaryModel = envPrimary || modelArg || "models/gemini-2.5-flash";
  const fallbackModels = (process.env.GEMINI_FALLBACK_MODELS || "models/gemini-pro-latest").split(",").map(m => m.trim()).filter(Boolean);

  const prompt = messages.map((m) => `${m.role}: ${m.content}`).join("\n");

  // Try primary and configured fallbacks in order
  const attempts = [primaryModel, ...fallbackModels];
  let lastErr: any = null;

  for (const m of attempts) {
    try {
      const session = new ChatSession(apiKey, m);
      const res = await session.sendMessage(prompt);
      const text = extractTextFromResponse(res);
      if (text) return text;
      // If no text found, but no error, return stringified portion
      return JSON.stringify(res).slice(0, 1000);
    } catch (err: any) {
      lastErr = err;
      // Handle quota errors explicitly
      if (err?.status === 429 || String(err).toLowerCase().includes('quota') || String(err).toLowerCase().includes('too many requests')) {
        const retryAfter = parseRetrySeconds(err);
        throw new GeminiQuotaError(`Quota exceeded for model ${m}: ${err?.message || String(err)}`, retryAfter);
      }

      console.warn(`⚠️ Gemini attempt failed for model ${m}:`, err?.message || err);
      // try next fallback
    }
  }

  // If we get here all attempts failed — try to list models for debugging
  try {
    const models = await listModels();
    throw new Error(`All Gemini attempts failed. Last error: ${lastErr?.message || String(lastErr)}. Available models: ${JSON.stringify(models)}`);
  } catch (listErr) {
    // If listing fails, throw the last attempt error so stack is preserved
    throw lastErr || listErr;
  }
}

export async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY!;
  const endpoints = [
    "https://generativelanguage.googleapis.com/v1beta/models",
    "https://generativelanguage.googleapis.com/v1/models",
  ];
  const results: any[] = [];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
      });
      const json = await res.json();
      results.push({ url, status: res.status, ok: res.ok, json });
      if (res.ok) return { url, json };
    } catch (e: any) {
      results.push({ url, error: e?.message || String(e) });
    }
  }

  return results;
}