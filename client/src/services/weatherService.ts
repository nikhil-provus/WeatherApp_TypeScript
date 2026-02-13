import axios from "axios";
import { WeatherResponse } from "../types/weatherTypes";

const API_BASE = "http://localhost:5000/api"; // your backend URL

export const fetchWeather = async (city: string): Promise<{ current: WeatherResponse; hourly: any[] }> => {
  const response = await axios.get(`${API_BASE}/weather/${city}`);
  return response.data;
};