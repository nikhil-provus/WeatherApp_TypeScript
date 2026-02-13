"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationSearchController = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const locationService_1 = require("../services/locationService");
const appError_1 = require("../utils/appError");
exports.locationSearchController = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { q } = req.query;
    if (!q || typeof q !== "string") {
        throw new appError_1.AppError("Query parameter 'q' is required", 400);
    }
    const locations = await (0, locationService_1.searchLocations)(q);
    res.status(200).json({
        status: "success",
        results: locations.length,
        data: locations,
    });
});
