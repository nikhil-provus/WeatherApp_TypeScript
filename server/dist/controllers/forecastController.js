"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forecastController = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const forecastService_1 = require("../services/forecastService");
const cacheService_1 = require("../services/cacheService");
const appError_1 = require("../utils/appError");
exports.forecastController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { city } = req.params;
    const days = Number(req.query.days) || 3;
    if (!city || typeof city !== "string") {
        throw new appError_1.AppError("City parameter is required", 400);
    }
    const cacheKey = `forecast-${city}-${days}`;
    if (cacheService_1.forecastCache.has(cacheKey)) {
        return res.json({
            source: "cache",
            data: cacheService_1.forecastCache.get(cacheKey),
        });
    }
    const forecast = await (0, forecastService_1.getForecast)(city, days);
    // Cache for 30 minutes
    cacheService_1.forecastCache.set(cacheKey, forecast, 1800);
    res.status(200).json({
        status: "success",
        data: forecast,
    });
});
