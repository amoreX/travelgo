import "./Content.scss";
import { motion } from "framer-motion";
import Weather from "./weather.js";
import { useState, useEffect } from "react";
import { coords } from "../Utils/coords.js";
import { getcoords } from "../Utils/gettingCoords.js";
export default function Content() {
  let pp = localStorage.getItem("location");
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

  return (
    <div id="main-container-content">
      <div id="container">
        <div id="noti">
          <div id="left">{pp}</div>
          <div id="right">search</div>
        </div>
        {isweather === true ? (
          <Weather toggle={setWeather} />
        ) : (
          <div id="content">
            <motion.div
              id="row-1"
              initial={{ x: transition == false ? -2000 : 0 }}
              transition={{ type: "tween", duration: 0.38 }}
              animate={{ x: transition == false ? 0 : -2000 }}
            >
              <div id="weather" onClick={() => setWeather()}>
                {" "}
                {weatherData?.current.apparent_temperature}{" "}
              </div>
              <div id="weather-2"></div>
              <div id="weather-3"></div>
            </motion.div>
            <motion.div id="row-2"
            initial={{ x: transition == false ? 2000 : 0 }}
            transition={{ type: "tween", duration: 0.38 }}
            animate={{ x: transition == false ? 0 : 2000 }}
            >
              <div id="weather"></div>
              <div id="weather-2"></div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
