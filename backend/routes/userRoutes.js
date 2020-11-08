import express from "express";
import { authUser, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(authUser);

// Protected Route - add protect auth middleware before the controller
router.route("/profile").get(protect, getUserProfile);

export default router;
