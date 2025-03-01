import { GoogleGenerativeAI } from "@google/generative-ai";
const cache = {};

export async function Details(place) {
	// const genAI = new GoogleGenerativeAI("AIzaSyCpSvYvxAYQEGFtfBBMEI4R-9M6V-H_uwM");
	const genAI = new GoogleGenerativeAI("AIzaSyDsbmoRIMVz6e5iCs41dbgPblrj4IlTnyU");
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

	if (cache[place]) {
		return cache[place];
	}

	let prompt = `give short description about ${place} within 240 characters exact`;
	const result = await model.generateContent(prompt);
	cache[place] = result.response.text();
	return result.response.text();
}
