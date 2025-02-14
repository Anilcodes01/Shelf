import express from "express";
import { reviewController } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/:bookId", reviewController.getReviews);
router.post("/", reviewController.addReview);

export default router