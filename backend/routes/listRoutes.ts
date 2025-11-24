import express from "express";
import { createList, getUserLists, getList, deleteList, updateList } from "../controllers/listController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);
router.post("/", createList);
router.get("/", getUserLists);
router.get("/:id", getList);
router.delete("/:id", deleteList);
router.put("/:id", updateList);

export default router;