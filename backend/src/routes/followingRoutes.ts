import express from "express";
import { getFollowingFeed } from "../controllers/followingController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js"; // assuming JWT auth

const router = express.Router();

// GET /api/following
router.get("/", authMiddleware, getFollowingFeed);

export default router;
