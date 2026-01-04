import express, { type Application, type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import followingRoutes from "./routes/followingRoutes.js";
import usersRoutes from "./routes/userRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

// DB
connectDB();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", process.env.FRONTEND_ORIGIN || ""],
  credentials: true,
}));

// Base route
app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts/:postId/comments", commentRoutes);
app.use("/api/following", followingRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/lists", listRoutes);

// Error handler
app.use(errorHandler);

// Only listen locally (not in production on Vercel)
// const port = process.env.PORT || 5000;
// if (process.env.NODE_ENV !== "production") {
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// }

export default app;
