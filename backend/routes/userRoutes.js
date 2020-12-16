import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes below hooked to /api/users route.
// protect middleware requires a token in order to proceed to a "api/users/profile" route.
// admin middleware is valid for req.user.isAdmin.

// User registration. Get all registered users as admin.
router.route("/").post(registerUser).get(protect, admin, getUsers);
// Login.
router.post("/login", authUser);
router
  .route("/profile")
  // Watch own profile.
  .get(protect, getUserProfile)
  // Update own profile.
  .put(protect, updateUserProfile);
router
  .route("/:id")
  // Delete user as an admin.
  .delete(protect, admin, deleteUser)
  // Get user as admin.
  .get(protect, admin, getUserById)
  // Update user as an admin.
  .put(protect, admin, updateUser);
export default router;
