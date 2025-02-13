import express from "express";
import { userController } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:id", userController.getUserProfile);
router.put("/:id", userController.updateUserProfile);

export default router;