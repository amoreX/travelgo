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

export async function FoodTry(city) {
  const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  if (cache[city]) {
    return cache[city];
  }
  let prompt = `give 3 foods to try in  ${city}, give only the names and seperate them by comma`;

  const result = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });

  const text = extractTextFromResponse(result);
  cache[city] = text;
  return text;
}
