import "./Content.scss";
import Weather from "./weather.js";
import { useState, useEffect } from "react";
import { coords } from "../Utils/coords.js";
import { getcoords } from "../Utils/gettingCoords.js";
export default function Content() {
  let pp = localStorage.getItem("location");
  const [isweather, setIsweather] = useState(false);
  const [weatherData, setWeatherdata] = useState(null);
  const setWeather = () => {
    setIsweather(!isweather);
  };

  const gettingdataweather = async () => {
      const vale = await getcoords(pp);
      setWeatherdata(await coords(vale?.lat, vale?.lon));
  };

  useEffect(()=>{
    gettingdataweather();
  },[]);

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
            <div id="row-1">
              <div id="weather" onClick={() => setWeather()}> {weatherData?.current.apparent_temperature} </div>
              <div id="weather-2"></div>
              <div id="weather-3"></div>
            </div>
            <div id="row-2">
              <div id="weather"></div>
              <div id="weather-2"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
