import { Visit } from "../../Utils/getplaces";
import { Details } from "../../Utils/getdetails";
import {GettingPictures} from "../../Utils/gettingpictures";
import { useState, useEffect } from "react";
export default function Placestovisit({ city }) {
  const [places, setPlaces] = useState(null);
  const [details,setDetails]=useState(null);
  useEffect(() => {
    const gettingplaces = async () => {
      let p = await Visit(city);
      setPlaces(p.split(","));
    };
    gettingplaces();
  }, []);

  useEffect(() => {
    if (places) {
        const getPlacesAndDetails = async () => {
            let placesList = await Visit(city);
            placesList = placesList.split(",");
      
            const promises = placesList.map(async (place) => {
              const description = await Details(place);
              const pictureUrl = await GettingPictures(place);
              return { name: place, description, pictureUrl }; // Combine data
            });
      
            const updatedPlaces = await Promise.all(promises);
            setDetails(updatedPlaces);
          };
      
          getPlacesAndDetails();

    }
  }, [places]);
  return (
    <div id="placestovisit">
      <div id="content-placestovisit">
      {details !=null?
          details.map((placeObj, ind) => {
            const { name, description,pictureUrl } = placeObj; 
            return (
              <div id="cit" key={ind}>
                <img src={pictureUrl} alt="loading..."/>
                <div id="cook">
                <div id="name" style={{fontSize:"20px"}}>{name}</div>
                <div id="desc" style={{color:"grey",fontSize:"16px"}} >{description.substring(0,60)} {(description.length > 70 ? "..." : null)}</div>

                </div>
              </div>
            );
          })
        :
        <div>loading...</div>
        }
      </div>
      <div id="title" style={{ color: "rgba(32, 70, 41, 0.45)", fontSize: "18px" }}>places to visit</div>
    </div>
  );
}
