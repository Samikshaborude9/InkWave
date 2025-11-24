import express, { type Application, type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js"
import followingRoutes from "./routes/followingRoutes.js";
import usersRoutes from "./routes/userRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
console.log("JWT_SECRET from env:", process.env.JWT_SECRET);
connectDB();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
