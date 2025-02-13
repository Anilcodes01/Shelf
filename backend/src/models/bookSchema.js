import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      reqired: true,
      unique: true,
    },
    publishedYear: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);
