import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/movies-db";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    console.warn(
      "⚠️  Server will start but database operations will fail until MongoDB is connected."
    );
    console.warn(
      "💡 Make sure MongoDB is running or update MONGODB_URI in db.env"
    );
    // Don't exit - allow server to start for better debugging
  }
};
