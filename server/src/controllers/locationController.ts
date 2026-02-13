// controllers/locationController.ts
import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { searchLocations } from "../services/locationService";
import { AppError } from "../utils/appError";

export const locationSearchController = catchAsync(
    async (req: Request, res: Response) => {
        const { q } = req.query;

        if (!q || typeof q !== "string") {
            throw new AppError("Query parameter 'q' is required", 400);
        }

        const locations = await searchLocations(q as string);

        res.status(200).json({
            status: "success",
            results: locations.length,
            data: locations,
        });
    }
);