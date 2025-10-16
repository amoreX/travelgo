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

export async function Details(place) {
  const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  if (cache[place]) {
    return cache[place];
  }

  const prompt = `give short description about ${place} within 240 characters exact`;
  const result = await client.responses.create({
    model: "gpt-4o-mini",
    input: prompt,
  });
  const text =
    result.output_text ||
    (result.output &&
      result.output[0]?.content?.map((c) => c.text || "").join("")) ||
    "";
  cache[place] = text;
  return text;
}
