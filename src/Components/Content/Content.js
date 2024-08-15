import "./Content.scss";
import { motion } from "framer-motion";
import Weather from "./weather.js";
import WeatherCard from "./Row-1/weathercard.js";
import Placestovisit from "./Row-2/placestovisit.js";
import Food from "./Row-1/fooddetails.js";
import { useState, useEffect } from "react";
import { coords } from "../Utils/coords.js";
import { getcoords } from "../Utils/gettingCoords.js";
import Things from "./Row-1/thingstocarry.js";
export default function Content() {
  let pp = localStorage.getItem("location");
   const search_icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40px"
      height="40px"
      viewBox="0 0 24 24"
      fill="none"
    >
  
      <path
        d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke="#204629"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const [isweather, setIsweather] = useState(false);
  const [weatherData, setWeatherdata] = useState(null);
  const [transition, setTransition] = useState(false);
  const setWeather = () => {
    if (transition) {
      setTimeout(() => {
        setTransition(!transition);
      }, 400);
    } else {
      setTransition(!transition);
    }
    setTimeout(() => {
      setIsweather(!isweather);
    }, 500);
  };

  const gettingdataweather = async () => {
    const vale = await getcoords(pp);
    setWeatherdata(await coords(vale?.lat, vale?.lon));
  };

  useEffect(() => {
    gettingdataweather();
  }, []);

  useEffect(()=>{
    console.log(weatherData);
  },[weatherData])
  return (
    <div id="main-container-content">
      <div id="container">
        <div id="noti">
          <div id="left">{pp.toLowerCase()}</div>
          <div id="right">{search_icon}</div>
        </div>
        {isweather === true ? (
          <Weather toggle={setWeather} data={weatherData} />
        ) : (
          <div id="content">
            <motion.div
              id="row-1"
              initial={{ x: transition === false ? -2000 : 0 }}
              transition={{ type: "tween", duration: 0.38 }}
              animate={{ x: transition === false ? 0 : -2000 }}
            >
              <WeatherCard transition={setWeather} data={weatherData}/>
              
              <Food city={pp}/>
              <Things city={pp}/>
            </motion.div>
            <motion.div id="row-2"
            initial={{ x: transition === false ? 2000 : 0 }}
            transition={{ type: "tween", duration: 0.38 }}
            animate={{ x: transition === false ? 0 : 2000 }}
            >
              <div id="weather"></div>
              <Placestovisit city={pp} />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
