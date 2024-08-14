import { createClient } from "pexels";

export async function GettingPictures(place){
    const client = createClient('UnAEAJOmvin6ezWwZ9FA8yplnMt9oHFOVfU3Ms4woY62XrsLJ49pzWSc');
    const query = place;
    // client.photos.search({ query, per_page: 1 }).then(photos => {
    //     setUrl(photos.photos[0].url);
    //     return(photos.photos[0].url);
    // });
    const response= await client.photos.search({ query, per_page: 1 });
    console.log(response);
    const pictureUrl= response.photos[0].src.tiny;
    console.log(pictureUrl);
    return (pictureUrl);

}
