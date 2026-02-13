import { Router } from "express";
import { forecastController } from "../controllers/forecastController";

const router = Router();

router.get("/:city", forecastController);

export default router;