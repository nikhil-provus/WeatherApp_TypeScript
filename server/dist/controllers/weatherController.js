"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherController = void 0;
const weatherService_1 = require("../services/weatherService");
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = require("../utils/appError");
const cacheService_1 = require("../services/cacheService");
exports.getWeatherController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { city } = req.params;
    if (!city || (typeof city == 'string' && city.trim() === "")) {
        throw new appError_1.AppError("City parameter is required", 400);
    }
    if (cacheService_1.weatherCache.has(city)) {
        return res.json({ source: "cache", data: cacheService_1.weatherCache.get(city) });
    }
    const data = await (0, weatherService_1.getWeather)(city);
    cacheService_1.weatherCache.set(city, data, 600);
    res.status(200).json(data);
});
