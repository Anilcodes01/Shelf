import { Book } from "../models/bookSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

console.log(JWT_SECRET);

export const bookController = {
  async getAllBooks(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const totalBooks = await Book.countDocuments();

      const books = await Book.find().skip(skip).limit(limit).select("-__v");

      res.status(200).json({
        message: "Books retrieved successfully!",
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
        totalBooks,
        books,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while retrieving books",
        error: error.message,
      });
    }
  },

  async addBook(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          error: "No authentication token provided",
        });
      }

      const token = authHeader.split(" ")[1];

      let decodedToken;
      try {
        decodedToken = jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return res.status(401).json({
          error: "Invalid or expired token",
        });
      }

      if (decodedToken.role !== "admin") {
        return res.status(403).json({
          error: "Only administrators can add books",
        });
      }

      const { title, description, coverImage, author, isbn, publishedYear } = req.body;

      if (!title || !author || !isbn || !coverImage) {
        return res.status(400).json({
          error: "Title, author, coverImage, and ISBN are required fields",
        });
      }

      const existingBook = await Book.findOne({ isbn });
      if (existingBook) {
        return res.status(400).json({
          error: "A book with this ISBN already exists",
        });
      }

      const book = new Book({
        title,
        description,
        coverImage,
        author,
        isbn,
        publishedYear,
        addedBy: decodedToken.userId,
      });

      await book.save();

      res.status(201).json({
        message: "New book added successfully!",
        book,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while adding new book",
        error: error.message,
      });
    }
  },

  async getOneBook(req, res) {
    try {
      const book = await Book.findById(req.params.id).select("-__v");

      if (!book) {
        return res.status(404).json({
          error: "Book not found",
        });
      }

      res.status(200).json({
        message: "Book retrieved successfully!",
        book,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while retrieving book",
        error: error.message,
      });
    }
  },
};
