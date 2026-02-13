import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { getForecast } from "../services/forecastService";
import { forecastCache } from "../services/cacheService";
import { AppError } from "../utils/appError";

export const forecastController = catchAsync(
  async (req: Request, res: Response) => {
    const { city } = req.params;
    const days = Number(req.query.days) || 3;

    if (!city || typeof city !== "string") {
      throw new AppError("City parameter is required", 400);
    }

    const cacheKey = `forecast-${city}-${days}`;
    if (forecastCache.has(cacheKey)) {
      return res.json({
        source: "cache",
        data: forecastCache.get(cacheKey),
      });
    }

    const forecast = await getForecast(city, days);

    // Cache for 30 minutes
    forecastCache.set(cacheKey, forecast, 1800);

    res.status(200).json({
      status: "success",
      data: forecast,
    });
  }
);