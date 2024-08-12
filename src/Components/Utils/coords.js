import axios from "axios";

export async function coords(lat, lon) {
	console.log("kys");
	if (lat && lon) {
		const data = await axios.get(
			`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,&current=cloud_cover,relative_humidity_2m,apparent_temperature,weather_code,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&wind_speed_unit=ms&timezone=auto`
		);
		return data.data;
	}
}