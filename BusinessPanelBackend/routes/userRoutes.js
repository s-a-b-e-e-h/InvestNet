const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController");

const protect = require("../middlewares/auth");

const router = express.Router();

// User routes
router.post("/register", registerUser); // Register new user
router.post("/login", loginUser); // Login user
router.get("/profile", protect, getUserProfile); // Get user profile
router.put("/profile", protect, updateUserProfile); // Update user profile
router.delete("/delete", protect, deleteUser); // Delete user account

module.exports = router;
