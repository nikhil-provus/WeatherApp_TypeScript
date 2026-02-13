"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchLocations = void 0;
// services/locationService.ts
const axios_1 = __importDefault(require("axios"));
const appError_1 = require("../utils/appError");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const searchLocations = async (query) => {
    const API_KEY = process.env.RAPID_API_KEY;
    const API_HOST = "wft-geo-db.p.rapidapi.com";
    if (!API_KEY)
        throw new appError_1.AppError("Rapid API key not configured", 500);
    if (!query || query.length < 3)
        return [];
    if (!query || query.trim() === "")
        throw new appError_1.AppError("Query cannot be empty", 400);
    try {
        const response = await axios_1.default.get("https://wft-geo-db.p.rapidapi.com/v1/geo/cities", {
            headers: {
                "X-RapidAPI-Key": API_KEY,
                "X-RapidAPI-Host": API_HOST,
            },
            params: {
                namePrefix: query,
                limit: 10,
                sort: "-population",
                languageCode: "en",
                types: "CITY"
            },
        });
        console.log(response);
        const rawCities = response.data.data;
        const suggestions = rawCities
            // Optional: Filter out places with 0 population if you want strict relevance
            .filter((city) => city.type === 'CITY' && city.population > 0)
            .map((city) => ({
            id: city.id,
            name: city.name,
            region: city.region,
            country: city.country,
            lat: city.latitude,
            lon: city.longitude,
            // Helper string for the frontend dropdown
            label: `${city.name}, ${city.region}, ${city.country}`
        }));
        return suggestions;
    }
    catch (error) {
        console.error("GeoDB Service Error:", error.message);
        return [];
    }
};
exports.searchLocations = searchLocations;
