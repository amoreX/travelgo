import { GoogleGenerativeAI } from "@google/generative-ai";
const cache = {};
export async function Visit(city) {
  // console.log(city);
  // const genAI = new GoogleGenerativeAI("AIzaSyCpSvYvxAYQEGFtfBBMEI4R-9M6V-H_uwM");
  const genAI = new GoogleGenerativeAI("AIzaSyBerHhY82HxUFAC5xSd5_kiYolPlKA8eQI");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  if (cache[city]) {
    return cache[city];
  }
  let prompt = `give 4 places to visit in ${city}, give only the names and seperate them by comma`;

  const result = await model.generateContent(prompt);
  cache[city] = result.response.text();
  return(result.response.text());
}
