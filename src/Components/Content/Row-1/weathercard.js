import { ss } from "../svgs";

export default function WeatherCard({ transition, data }) {
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
              fontSize: "44px",
              fontWeight: "500",
              textShadow: "4px 4px 12px rgba(0, 0, 0, 0.25)",
              zIndex: "6",
            }}
          >
            {data?.current.temperature_2m}°c
          </span>
          <span style={{ color: "rgba(32, 70, 41, 0.45)" }}>
            {data?.daily.temperature_2m_max[0]}°c/
            {data?.daily.temperature_2m_min[0]}
            °c
          </span>
          <span
            style={{
              color: "rgba(32, 70, 41, 1)",
              fontSize: "32px",
              fontWeight: "500",
              textShadow: "4px 4px 12px rgba(0, 0, 0, 0.25)",
            }}
          >
            mostly cloudy
          </span>
          <span style={{ color: "rgba(32, 70, 41, 0.45)", fontSize: "20px" }}>
            feels like {data?.current.apparent_temperature}°c
          </span>
        </div>
      )}
      {!data && <div>loading...</div>}
      <div
        id="title"
        style={{ color: "rgba(32, 70, 41, 0.45)", fontSize: "18px" }}
      >
        weather
      </div>
    </div>
  );
}
