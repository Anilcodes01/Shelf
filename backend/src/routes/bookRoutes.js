import express from "express";
import { bookController } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", bookController.getAllBooks);
router.post("/", bookController.addBook);
router.get("/:id", bookController.getOneBook);

export default router;
