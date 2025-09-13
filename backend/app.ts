import express, { type Application, type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js"
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
console.log("JWT_SECRET from env:", process.env.JWT_SECRET);
connectDB();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("api/posts/:postId/comments", commentRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
