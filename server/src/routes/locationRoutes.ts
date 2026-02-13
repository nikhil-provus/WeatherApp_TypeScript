// routes/locationRoutes.ts
import { Router } from "express";
import { locationSearchController } from "../controllers/locationController";

const router = Router();

router.get("/search", locationSearchController);

export default router;