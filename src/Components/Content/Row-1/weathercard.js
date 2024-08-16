import { ss } from "../svgs";
import { motion } from "framer-motion";

export default function WeatherCard({ transition, data }) {
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
  return (
    <div id="weather" onClick={() => transition()}>
      {data && (
        <div id="info">
          <span style={{ zIndex: "2", transform: "translatey(20px)" }}>
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
      )}
      {!data && <div id="loading">{loading}</div>}
      <div
        id="title"
        style={{ color: "rgba(32, 70, 41, 0.45)", fontSize: "1.1vw" }}
      >
        weather
      </div>
    </div>
  );
}
