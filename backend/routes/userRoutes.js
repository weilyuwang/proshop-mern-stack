import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/login").post(authUser);

// Protected Route - add protect auth middleware before the controller
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/:id").delete(protect, admin, deleteUser);

export default router;
