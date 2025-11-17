import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/database";
import Movie from "./models/Movie";

const app = express();

// Load environment variables from db.env
dotenv.config({ path: "./db.env" });

app.use(express.json());

// Helper function to check database connection
const checkConnection = (): void => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error(
      "Database not connected. Please ensure MongoDB is running and check your connection string in db.env"
    );
  }
};

// Initialize server after DB connection
const startServer = async () => {
  try {
    await connectDB();

    app.get("/movies", async (req: Request, res: Response): Promise<void> => {
      try {
        checkConnection();
        const movies = await Movie.find();
        res.status(200).json(movies);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        res.status(500).json({
          message: "Error fetching movies",
          error: errorMessage,
        });
      }
    });

    app.get(
      "/movies/:id",
      async (req: Request, res: Response): Promise<void> => {
        try {
          checkConnection();
          const movie = await Movie.findById(req.params.id);
          if (movie) {
            res.status(200).json(movie);
          } else {
            res.status(404).json({ message: "Movie not found" });
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          res.status(500).json({
            message: "Error fetching movie",
            error: errorMessage,
          });
        }
      }
    );

    app.post("/movies", async (req: Request, res: Response): Promise<void> => {
      try {
        checkConnection();
        const { title, year, genre, mainActors } = req.body;
        const newMovie = new Movie({ title, year, genre, mainActors });
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        res.status(400).json({
          message: "Error creating movie",
          error: errorMessage,
        });
      }
    });

    app.put(
      "/movies/:id",
      async (req: Request, res: Response): Promise<void> => {
        try {
          checkConnection();
          const { title, year, genre, mainActors } = req.body;
          const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            { title, year, genre, mainActors },
            { new: true, runValidators: true }
          );
          if (updatedMovie) {
            res.status(200).json(updatedMovie);
          } else {
            res.status(404).json({ message: "Movie not found" });
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          res.status(400).json({
            message: "Error updating movie",
            error: errorMessage,
          });
        }
      }
    );

    app.delete(
      "/movies/:id",
      async (req: Request, res: Response): Promise<void> => {
        try {
          checkConnection();
          const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
          if (deletedMovie) {
            res.status(200).json({
              message: "Movie deleted successfully",
              movie: deletedMovie,
            });
          } else {
            res.status(404).json({ message: "Movie not found" });
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          res.status(500).json({
            message: "Error deleting movie",
            error: errorMessage,
          });
        }
      }
    );

    app.listen(8000, () => {
      console.log("Server is running on port 8000 http://localhost:8000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
