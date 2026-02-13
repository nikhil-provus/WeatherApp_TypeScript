import { Router } from "express";
import { getWeatherController } from "../controllers/weatherController";

const router = Router();

router.get("/:city", getWeatherController);


export default router;