"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getForecast = void 0;
const axios_1 = __importDefault(require("axios"));
const appError_1 = require("../utils/appError");
const getForecast = async (city, days = 5) => {
    const API_KEY = process.env.WEATHER_API_KEY;
    if (!API_KEY)
        throw new appError_1.AppError("Weather API key not configured", 500);
    try {
        const response = await axios_1.default.get(`https://api.weatherapi.com/v1/forecast.json`, {
            params: {
                key: API_KEY,
                q: city,
                days,
            },
        });
        const data = response.data;
        const dailyForecast = data.forecast.forecastday.map((day) => ({
            date: day.date,
            maxTemp: day.day.maxtemp_c,
            minTemp: day.day.mintemp_c,
            avgTemp: day.day.avgtemp_c,
            condition: day.day.condition.text,
            humidity: day.day.avghumidity,
            windSpeed: day.day.maxwind_kph,
            hours: day.hour.map((hour) => ({
                time: hour.time,
                temp: hour.temp_c,
                condition: hour.condition.text,
                windSpeed: hour.wind_kph,
                humidity: hour.humidity,
                icon: hour.condition.icon,
            })),
            icon: day.day.condition.icon,
        }));
        return {
            city: data.location.name,
            daily: dailyForecast,
        };
    }
    catch (error) {
        if (error.response?.status === 400) {
            throw new appError_1.AppError("City not found", 404);
        }
        throw new appError_1.AppError("Failed to fetch forecast", 500);
    }
};
exports.getForecast = getForecast;
