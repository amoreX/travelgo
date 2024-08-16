import { createClient } from "pexels";
const cache = {};

export async function GettingPicturesFood(place) {
  if (cache[place] != undefined) {
    return cache[place];
  }

  const client = createClient(
    "UnAEAJOmvin6ezWwZ9FA8yplnMt9oHFOVfU3Ms4woY62XrsLJ49pzWSc"
  );
  const query = place;

  const response = await client.photos.search({ query, per_page: 1 });
  // console.log(response);

  const pictureUrl = response?.photos[0]?.src?.tiny;

  // console.log(pictureUrl);
  cache[place] = pictureUrl;
  if (pictureUrl == undefined) {
    return "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsalonlfc.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fimage-not-found-1-scaled-1150x647.png&f=1&nofb=1&ipt=7d1de25e4a416a6cd6851a512e96033ca7cc95bdcd2fda9667846af478941237&ipo=images";
  } else {
    return pictureUrl;
  }
}
