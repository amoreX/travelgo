import OpenAI from "openai";
import { getOpenAIKey } from "./getOpenAIKey";
const cache = {};

function extractTextFromResponse(res) {
  if (!res) return "";
  if (res.output_text) return res.output_text;
  if (res.output && Array.isArray(res.output)) {
    const parts = res.output.flatMap((o) =>
      (o.content || []).map((c) => c.text || c.message || "")
    );
    return parts.join("");
  }
  return "";
}

export async function Details(place) {
  const apiKey = await getOpenAIKey();
  const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  if (cache[place]) {
    return cache[place];
  }

  const prompt = `give short description about ${place} within 250 characters exact`;
  const result = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  const text = extractTextFromResponse(result);
  cache[place] = text;
  return text;
}
