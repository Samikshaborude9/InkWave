import express,{type Application, type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import "../backend/config/db.js"; // Import MongoDB connection

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running...");
});

// Example: attach routes here
// import postRoutes from "./routes/postRoutes";
// app.use("/api/posts", postRoutes);

const PORT = process.env.PORT;;

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
