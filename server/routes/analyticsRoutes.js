import express from "express";
import { getAnalytics } from "../controllers/analyticsController.js";
import { apiLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.get("/", apiLimiter, getAnalytics);

export default router;
