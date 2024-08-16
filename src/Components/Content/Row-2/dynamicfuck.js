import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Travel } from "../../Utils/gettingTravel";
import { GettingPictures } from "../../Utils/gettingCitypicture";
export default function Dynamic({ city,dynamic,changeD }) {
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
  const [travelDetails, setTravelDetails] = useState(null);
  const [picUrl, setPicUrl] = useState(null);
  const [newpic,setNew]=useState(null);
  const [newTravel,setNewTravel]=useState(null);

  useEffect(() => {
    const gettingTravelDetails = async () => {
      let h = await Travel(city);
      setTravelDetails(h);
      let q = await GettingPictures(city);
      setPicUrl(q);
    };
    gettingTravelDetails();
  });

  useEffect(()=>{
    if(dynamic){
      setNew(dynamic[0]);
      setNewTravel(dynamic[1]);
    }
  },[dynamic]);


  return (
    <div id="dynamic">
      {travelDetails && (
        <div id="history">
          <motion.img src={newpic==null?picUrl:newpic} alt="getting"
          initial={{scale:1,opacity:0}}
          transition={{type:"tween",duration:0.19}}
          animate={{scale:1,opacity:1}}
          onClick={()=>{
            setNew(picUrl);
            setNewTravel(travelDetails);
          }}
          />
          <motion.div id="context"
          initial={{y:30,scale:0.1}}
          transition={{type:"tween",delay:0.5,duration:0.29}}
          animate={{y:0,scale:1}}

          >{newTravel==null?travelDetails:newTravel}</motion.div>

        </div>
      )}
      {!travelDetails &&
      
      <div id="loading">{loading}</div>
      }
    </div>
  );
}
