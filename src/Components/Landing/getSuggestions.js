// import { GoogleGenerativeAI } from "@google/generative-ai";
import { cities_list } from "./vars";
// export async function Suggestion(city) {
//   console.log(city);
//   const genAI = new GoogleGenerativeAI("AIzaSyCpSvYvxAYQEGFtfBBMEI4R-9M6V-H_uwM");
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   let prompt = `here is a word, give me 3 city names whose first letters match with this word , the word is "${city}", give the city names seperated by comma`;

//   const result = await model.generateContent(prompt);
//   return(result.response.text());
// }


export async function Suggestion(toSearch){
  const cities=cities_list.split(",");
  let res=[];
  for (let i=0;i<cities.length;i++){
    
    if (cities[i].trim().toLowerCase().startsWith(toSearch.toLowerCase())){
      res.push(cities[i]);
    }
  }
  if (res[0]===res[1] || res[0]===res[2] || res[1]===res[2]){
    return res.splice(0,1);
  }
  else{

    return (res.splice(0,3));
  }
};