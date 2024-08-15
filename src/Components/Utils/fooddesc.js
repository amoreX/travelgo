import { GoogleGenerativeAI } from "@google/generative-ai";
const cache = {};

export async function Details(place) {
  const genAI = new GoogleGenerativeAI("AIzaSyBYm_TyKpW2rrhyOZSekvc1BlUP9_SKJYA");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  if (cache[place]) {
    return cache[place];
  }

  let prompt = `give short description about ${place} within 10 to 16 words`;
  const result = await model.generateContent(prompt);
  cache[place] = result.response.text();
  return(result.response.text());
}
