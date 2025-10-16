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

export async function Etiq(city) {
  const apiKey = await getOpenAIKey();
  const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  if (cache[city]) {
    return cache[city];
  }

  const prompt = `give few things to carry while going to ${city}, give the response seperated by commas`;
  const result = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  const text = extractTextFromResponse(result);
  cache[city] = text;
  return text;
}
