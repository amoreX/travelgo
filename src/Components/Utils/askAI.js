import OpenAI from "openai";
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

export async function askAI(question, city) {
  const cacheKey = `${city}::${question}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const prompt = `Answer the following question about ${city}: ${question}`;
  const result = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  const text = extractTextFromResponse(result);
  cache[cacheKey] = text;
  return text;
}
