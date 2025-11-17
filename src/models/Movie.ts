import mongoose, { Schema, Document } from "mongoose";

export interface IMovie extends Document {
  title: string;
  year: number;
  genre: string;
  mainActors: string[];
}

const MovieSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    mainActors: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IMovie>("Movie", MovieSchema);
