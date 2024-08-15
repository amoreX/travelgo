import { GoogleGenerativeAI } from "@google/generative-ai";
const cache = {};

export async function FoodTry(city) {
//   console.log(city);
  const genAI = new GoogleGenerativeAI("AIzaSyCpSvYvxAYQEGFtfBBMEI4R-9M6V-H_uwM");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  if (cache[city]) {
    return cache[city];
  }
  let prompt = `give 3 foods to try in  ${city}, give only the names and seperate them by comma`;

  const result = await model.generateContent(prompt);
  cache[city] = result.response.text();
  return(result.response.text());
}
