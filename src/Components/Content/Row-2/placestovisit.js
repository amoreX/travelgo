import { Visit } from "../../Utils/getplaces";
import { Details } from "../../Utils/getdetails";
import { motion } from "framer-motion";
import {GettingPictures} from "../../Utils/gettingpictures";
import { useState, useEffect } from "react";
export default function Placestovisit({ city,changeD }) {
  const loading = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612"
        stroke="#204629"
        strokeWidth="3.55556"
        strokeLinecap="round"
      />
    </svg>
  );
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
                <motion.img src={pictureUrl} alt="loading..." 
                                initial={{scale:0.1,opacity:0}}
                                transition={{type:"tween",delay:ind*0.1,duration:0.28}}
                                animate={{scale:1,opacity:1}}
                                onClick={()=>{changeD(name,description)}}
                />
                <motion.div id="cook"
                initial={{y:20,opacity:0}}
                transition={{type:"tween",delay:0.4+ind*0.1,duration:0.28}}
                animate={{y:0,opacity:1}}
                >
                <div id="name" style={{fontSize:"20px"}}>{name.toLowerCase().substring(0,20)} {(name.length > 20 ? "..." : null)}</div>
                <div id="desc" style={{color:"grey",fontSize:"16px"}} >{description.substring(0,45)} {(description.length > 70 ? "...more" : null)}</div>

                </motion.div>
              </div>
            );
          })
        :
        <div id="loading">{loading}</div>
        }
      </div>
      <div id="title" style={{ color: "rgba(32, 70, 41, 0.45)", fontSize: "18px",letterSpacing:"-1px" }}>places to visit</div>
    </div>
  );
}
