import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import movieRouter from "./api/router";

const app = express();

dotenv.config();

app.use(express.json());

// Initialize server after DB connection
const startServer = async () => {
  try {
    await connectDB();

    // Use movie routes
    app.use("/movies", movieRouter);

    app.listen(8000, () => {
      console.log("Server is running on port 8000 http://localhost:8000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
