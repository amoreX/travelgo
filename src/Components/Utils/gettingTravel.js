import OpenAI from "openai";
const cache = {};

function extractTextFromResponse(res) {
  // safe extraction for multiple possible response shapes
  if (!res) return "";
  if (res.output_text) return res.output_text;
  if (res.output && Array.isArray(res.output)) {
    const parts = res.output.flatMap((o) =>
      (o.content || []).map((c) => c.text || c.message || "")
    );
    return parts.join("");
  }
  if (res.output?.[0]?.content?.[0]?.text) return res.output[0].content[0].text;
  return "";
}

export async function Travel(city) {
  const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  if (cache[city]) {
    return cache[city];
  }
  let prompt = `Tell me about ${city} in 250 characters exact, dont give anything extra in response`;

  const result = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  const text = extractTextFromResponse(result);
  cache[city] = text;
  return text;
}
