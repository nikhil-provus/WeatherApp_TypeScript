"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/locationRoutes.ts
const express_1 = require("express");
const locationController_1 = require("../controllers/locationController");
const router = (0, express_1.Router)();
router.get("/search", locationController_1.locationSearchController);
exports.default = router;
