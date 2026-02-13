"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const appError_1 = require("../utils/appError");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getWeather = async (city) => {
    try {
        const API_KEY = process.env.WEATHER_API_KEY;
        if (!API_KEY) {
            throw new appError_1.AppError("Weather API key not configured", 500);
        }
        const response = await axios_1.default.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
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
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 400) {
                    throw new appError_1.AppError("City not found", 404);
                }
                if (error.response.status === 401 || error.response.status === 403) {
                    throw new appError_1.AppError("Invalid or expired API key", 401);
                }
            }
        }
        throw new appError_1.AppError("Weather service unavailable", 500);
    }
};
exports.getWeather = getWeather;
