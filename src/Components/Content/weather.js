import { motion } from "framer-motion";
import { ss } from "./svgs";
import { useState,useEffect } from "react";

const weekdays = ["Sunday", "Monday", "Tuesday", "Wenzday", "Thursday", "Friday", "Saturday"];
export default function Weather({ toggle, data }) {
  const [transition, setTransition] = useState(true);
  const p = [0, 0, 0, 0, 0, 0];
  const [dayNames, setDayNames] = useState([]); // State for day names

  useEffect(() => {
    // Calculate day names based on current date
    const today = new Date();
    const dayOffsets = [0,1, 2, 3, 4, 5, 6]; // Offset for each day (0 for Sunday)
    const weekDays = dayOffsets.map((offset) => {
      const dayIndex = (today.getDay() + offset) % 7 ;
      return weekdays[dayIndex];
    });
    setDayNames(weekDays.slice(1)); // Exclude today (use slice(1))
  }, []); // Run only on initial render
  return (
    <motion.div
      id="weather-container"
      initial={{ scale: 0.1, opacity: 0 }}
      transition={{ type: "tween", delay: 0.38, duration: 0.38 }}
      animate={{
        scale: transition === true ? 1 : 0.1,
        opacity: transition === true ? 1 : 0,
      }}
    >
      <div id="back" onClick={() => {
        toggle();
        setTransition(!transition);
      }}> back</div>
      <div id="today">
        <div id="info">
          <span style={{ zIndex: "2", transform: "translatey(0px)" }}>
            {ss}
          </span>
          <span
            style={{
              color: "rgba(32, 70, 41, 1)",
              fontSize: "1.7vw",
              fontWeight: "500",
              textShadow: "4px 4px 12px rgba(0, 0, 0, 0.25)",
              zIndex: "6",
            }}
          >
            {data?.current.temperature_2m}°c
          </span>
          <span style={{ color: "rgba(32, 70, 41, 0.45)",fontSize:"1vw" }}>
            {data?.daily.temperature_2m_max[0]}°c/
            {data?.daily.temperature_2m_min[0]}
            °c
          </span>
          <span
            style={{
              color: "rgba(32, 70, 41, 1)",
              fontSize: "1.5vw",
              fontWeight: "500",
              textShadow: "4px 4px 12px rgba(0, 0, 0, 0.25)",
            }}
          >
            mostly cloudy
          </span>
          <span style={{ color: "rgba(32, 70, 41, 0.45)", fontSize: "1.1vw" }}>
            feels like {data?.current.apparent_temperature}°c
          </span>
        </div>
      </div>
      <div id="weeks">
        {dayNames.map((dayname, index) => {
          return <div id="card">
            <div id="information">

            <span style={{ zIndex: "2", transform: "translatey(10px)" }}>
            {ss}
          </span>
          <span
            style={{
              color: "rgba(32, 70, 41, 1)",
              fontSize: "1.7vw",
              fontWeight: "500",
              textShadow: "4px 4px 12px rgba(0, 0, 0, 0.25)",
              zIndex: "6",
            }}
          >
            {((data?.daily.temperature_2m_max[index+1]+data?.daily.temperature_2m_min[index+1])/2).toFixed(1)}°c
          </span>
          <span style={{ color: "rgba(32, 70, 41, 0.45)",fontSize:"1vw" }}>
            {data?.daily.temperature_2m_max[index+1]}°c/
            {data?.daily.temperature_2m_min[index+1]}
            °c
          </span>
          <span
            style={{
              color: "rgba(32, 70, 41, 1)",
              fontSize: "1.5vw",
              fontWeight: "500",
              textShadow: "4px 4px 12px rgba(0, 0, 0, 0.25)",
            }}
          >
            mostly cloudy
          </span>
          <span style={{ color: "rgba(32, 70, 41, 0.45)", fontSize: "1.1vw" }}>
            feels like {(data?.daily.temperature_2m_max[index+1]-(Math.floor(Math.random()*4))).toFixed(1)}°c
          </span>
            </div>
            <div id="title" style={{fontSize:"1.1vw"}}>{dayname}</div>
          </div>;
        })}
      </div>
    </motion.div>
  );
}
