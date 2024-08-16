import { createClient } from "pexels";
const cache = {};
const rateLimit = 1000; // Adjust rate limit in milliseconds
let pendingRequests = [];
// const client = createClient('YOUR_API_KEY');

export async function GettingPictures(place){
  if (cache[place]) {
    return cache[place];
  }


  const client = createClient('UnAEAJOmvin6ezWwZ9FA8yplnMt9oHFOVfU3Ms4woY62XrsLJ49pzWSc');
    const query = place;
    

    // const response= await client.photos.search({ query, per_page: 1 });
    // // console.log(response);
    // const pictureUrl= response.photos[0].src.tiny;
    // // console.log(pictureUrl);
    // cache[place] = pictureUrl;
    // return (pictureUrl);
    return new Promise((resolve, reject) => {
      const request = { place, resolve, reject };
      pendingRequests.push(request);
  
      const processRequest = () => {
        const request = pendingRequests.shift();
        if (!request) {
          return;
        }
  
        const { place, resolve, reject } = request;
  
        client.photos.search({ query: place, per_page: 1 })
          .then(response => {
            const pictureUrl = response.photos[0].src.tiny;
            cache[place] = pictureUrl;
            resolve(pictureUrl);
          })
          .catch(error => {
            console.error(`Error fetching picture for ${place}:`, error);
            reject(error);
          });
  
        setTimeout(processRequest, rateLimit);
      };
  
      if (pendingRequests.length === 1) {
        processRequest();
      }
    });

}
