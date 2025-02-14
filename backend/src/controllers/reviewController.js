import { Book } from "../models/bookSchema.js";
import { Review } from "../models/reviewSchema.js";
import { User } from "../models/userSchema.js";

export const reviewController = {
  async getReviews(req, res) {
    try {
      const reviews = await Review.find({ bookId: req.params.bookId })
        .populate("userId", "name rating timestamp")
        .sort({ timeStamp: -1 });

      res.json(reviews);
    } catch (error) {
      res.status(500).json({
        message: "Error while retreiving reviews...!",
        error: error.message,
      });
    }
  },

  async addReview(req, res) {
    try {
      const { bookId, userId, rating, comment } = req.body;
      const bookExists = await Book.findById(bookId);
      const userExists = await User.findById(userId);

      if (!bookExists || !userExists) {
        return res.status(404).json({
          error: "Book or user with this id not found...!",
        });
      }

      const addReview = new Review({
        bookId,
        userId,
        rating,
        comment,
      });

      await addReview.save();

      res.status(200).json({
        message: "Review posted successfully...!",
        addReview,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while posting review...!",
        error: error.message,
      });
    }
  },
};
