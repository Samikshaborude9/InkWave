import express from "express";
import { createPost, getPost, getPosts, updatePost, deletePost } from "../controllers/postController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//public Routes 
router.get("/", getPosts);
router.get("/:id", getPost);

//protected Routes
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
