import { GoogleGenerativeAI } from "@google/generative-ai";

export async function Suggestion(city) {
  console.log(city);
  const genAI = new GoogleGenerativeAI("AIzaSyCpSvYvxAYQEGFtfBBMEI4R-9M6V-H_uwM");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  let prompt = `here is a word, give me 3 city names whose first letters match with this word , the word is "${city}", give the city names seperated by comma`;

  const result = await model.generateContent(prompt);
  return(result.response.text());
}
