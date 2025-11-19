import { Request, Response } from "express";
import mongoose from "mongoose";
import Movie from "../models/Movie";

// Helper function to check database connection
const checkConnection = (): void => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error(
      "Database not connected. Please ensure MongoDB is running and check your connection string in db.env"
    );
  }
};

// Get all movies
export const getAllMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    checkConnection();
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      message: "Error fetching movies",
      error: errorMessage,
    });
  }
};

// Get movie by ID
export const getMovieById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    checkConnection();
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      message: "Invalid ID",
      error: errorMessage,
    });
  }
};

// Create a new movie
export const createMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    checkConnection();
    const { title, year, genre, mainActors } = req.body;
    const newMovie = new Movie({ title, year, genre, mainActors });
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({
      message: "Invalid request body",
      error: errorMessage,
    });
  }
};

// Update a movie
export const updateMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(400).json({
      message: "Invalid request body",
      error: errorMessage,
    });
  }
};

// Delete a movie
export const deleteMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      message: "Invalid ID",
      error: errorMessage,
    });
  }
};
