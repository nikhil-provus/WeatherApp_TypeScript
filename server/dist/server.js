"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const weatherRoutes_1 = __importDefault(require("./routes/weatherRoutes"));
const appError_1 = require("./utils/appError");
const locationRoutes_1 = __importDefault(require("./routes/locationRoutes"));
const forecastRoutes_1 = __importDefault(require("./routes/forecastRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000"
}));
// const weatherCache: Record<string, any> = {};
// const locationCache: Record<string, any> = {};
app.use("/api/weather", weatherRoutes_1.default);
app.use("/api/location", locationRoutes_1.default);
app.use("/api/forecast", forecastRoutes_1.default);
app.use((err, req, res, next) => {
    console.error("ERROR:", err);
    if (err instanceof appError_1.AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    res.status(500).json({
        status: "error",
        message: "Something went wrong",
    });
});
const PORT = process.env.PORT;
if (!PORT) {
    throw new appError_1.AppError("Port is missing in the env", 500);
}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
