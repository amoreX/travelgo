import { GoogleGenerativeAI } from "@google/generative-ai";
const cache = {};
export async function Travel(city) {
  // console.log(city);
  // const genAI = new GoogleGenerativeAI("AIzaSyCpSvYvxAYQEGFtfBBMEI4R-9M6V-H_uwM");
  const genAI = new GoogleGenerativeAI("AIzaSyBerHhY82HxUFAC5xSd5_kiYolPlKA8eQI");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  if (cache[city]) {
    return cache[city];
  }
  let prompt = `Tell me about ${city} in 250 characters exact, dont give anything extra in response`;

  const result = await model.generateContent(prompt);
  cache[city] = result.response.text();
  return(result.response.text());
}
