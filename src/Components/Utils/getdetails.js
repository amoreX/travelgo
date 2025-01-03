import { GoogleGenerativeAI } from "@google/generative-ai";
const cache = {};

export async function Details(place) {
  // const genAI = new GoogleGenerativeAI("AIzaSyCpSvYvxAYQEGFtfBBMEI4R-9M6V-H_uwM");
  const genAI = new GoogleGenerativeAI("AIzaSyCLzjo4Ka7YQhZW3sNJgWCPUmlZJCPt9R4");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  if (cache[place]) {
    return cache[place];
  }

  let prompt = `give short description about ${place} within 240 characters exact`;
  const result = await model.generateContent(prompt);
  cache[place] = result.response.text();
  return(result.response.text());
}
