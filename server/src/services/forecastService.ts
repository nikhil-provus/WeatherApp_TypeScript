import axios from "axios";
import { AppError } from "../utils/appError";
import { DailyForecast, ForecastResponse } from "../types/weatherTypes"

export const getForecast = async (
    city: string,
    days: number = 5
): Promise<ForecastResponse> => {
    const API_KEY = process.env.WEATHER_API_KEY;

    if (!API_KEY) throw new AppError("Weather API key not configured", 500);

    try {
        const response = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json`,
            {
                params: {
                    key: API_KEY,
                    q: city,
                    days,
                },
            }
        );

        const data = response.data;

        const dailyForecast: DailyForecast[] = data.forecast.forecastday.map(
            (day: any) => ({
                date: day.date,
                maxTemp: day.day.maxtemp_c,
                minTemp: day.day.mintemp_c,
                avgTemp: day.day.avgtemp_c,
                condition: day.day.condition.text,
                humidity: day.day.avghumidity,
                windSpeed: day.day.maxwind_kph,
                hours: day.hour.map((hour: any) => ({
                    time: hour.time,
                    temp: hour.temp_c,
                    condition: hour.condition.text,
                    windSpeed: hour.wind_kph,
                    humidity: hour.humidity,
                    icon: hour.condition.icon,
                })),
                icon: day.day.condition.icon,
            })
        );

        return {
            city: data.location.name,
            daily: dailyForecast,
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
                throw new AppError("City not found", 404);
            }
        }

        throw new AppError("Failed to fetch forecast", 500);
    }
};