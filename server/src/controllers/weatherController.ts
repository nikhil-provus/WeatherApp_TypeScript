import { Request, Response } from "express";
import { getWeather } from "../services/weatherService";

import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import { weatherCache} from "../services/cacheService";

export const getWeatherController = catchAsync(
  async (req: Request, res: Response) => {
    const { city } = req.params;

    if (!city || (typeof city == 'string' && city.trim() === "")) {
      throw new AppError("City parameter is required", 400);
    }

    if (weatherCache.has(city as string)) {
      return res.json({ source: "cache", data: weatherCache.get(city as string) });
    }
    
    const data = await getWeather(city as string);

     weatherCache.set(city as string, data, 600);

    res.status(200).json(data);
  }
);