import express from "express";
import { getUserProfile, updateUserProfile, followUser, unfollowUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id", getUserProfile);
router.put("/:id", authMiddleware, updateUserProfile);
router.post("/:id/follow", authMiddleware, followUser);
router.delete("/:id/unfollow", authMiddleware, unfollowUser);

export default router;
