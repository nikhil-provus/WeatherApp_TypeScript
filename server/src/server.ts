import express from "express";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weatherRoutes";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./utils/appError";
import locationRoutes from "./routes/locationRoutes";
import forecastRoutes from "./routes/forecastRoutes";
import cors from "cors";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000"
}));

// const weatherCache: Record<string, any> = {};
// const locationCache: Record<string, any> = {};

app.use("/api/weather", weatherRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/forecast", forecastRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("ERROR:", err);

  if (err instanceof AppError) {
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
  throw new AppError("Port is missing in the env", 500);
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});