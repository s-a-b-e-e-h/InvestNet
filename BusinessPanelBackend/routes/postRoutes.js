const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const protect = require("../middlewares/auth");

const router = express.Router();

// Post routes
router.post("/", protect, createPost); // Create a new post
router.get("/", protect, getAllPosts); // Get all posts
router.get("/:id", protect, getPostById); // Get a specific post by ID
router.put("/:id", protect, updatePost); // Update a specific post
router.delete("/:id", protect, deletePost); // Delete a specific post

module.exports = router;
