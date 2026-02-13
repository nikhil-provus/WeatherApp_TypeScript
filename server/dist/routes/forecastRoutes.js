"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const forecastController_1 = require("../controllers/forecastController");
const router = (0, express_1.Router)();
router.get("/:city", forecastController_1.forecastController);
exports.default = router;
