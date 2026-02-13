import axios from "axios";
import { WeatherResponse } from "../types/weatherTypes";
import { AppError } from "../utils/appError";

import dotenv from "dotenv";
dotenv.config();

export const getWeather = async (
  city: string
): Promise<WeatherResponse> => {
  try {
    const API_KEY = process.env.WEATHER_API_KEY;
    if (!API_KEY) {
      throw new AppError("Weather API key not configured", 500);
    }

    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );

    const data = response.data;

    return {
      city: data.location.name,
      temperature: data.current.temp_c,
      description: data.current.condition.text,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph,
      icon: data.current.condition.icon,
      uv: data.current.uv,
      feelslike: data.current.feelslike_c,
      last_updated: data.current.last_updated
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 400) {
          throw new AppError("City not found", 404);
        }

        if (error.response.status === 401 || error.response.status === 403) {
          throw new AppError("Invalid or expired API key", 401);
        }
      }
    }


    throw new AppError("Weather service unavailable", 500);
  }
};