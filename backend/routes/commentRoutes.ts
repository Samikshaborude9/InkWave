import express from "express";
import { createComment, getCommentsForPost, deleteComment } from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router({ mergeParams: true });

// Public routes
router.get("/", getCommentsForPost);

// Protected routes
router.post("/", authMiddleware, createComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
