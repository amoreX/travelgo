import { GoogleGenerativeAI } from "@google/generative-ai";
const cache = {};

export async function Etiq(city) {
//   console.log(city);
  // const genAI = new GoogleGenerativeAI("AIzaSyBYm_TyKpW2rrhyOZSekvc1BlUP9_SKJYA");
  const genAI = new GoogleGenerativeAI("AIzaSyBerHhY82HxUFAC5xSd5_kiYolPlKA8eQI");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  if (cache[city]) {
    return cache[city];
  }
  let prompt = `give few things to carry while going to ${city}, give the response seperated by commas`;

  const result = await model.generateContent(prompt);
  cache[city] = result.response.text();
  return(result.response.text());
}
