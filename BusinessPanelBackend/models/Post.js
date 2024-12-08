const mongoose = require("mongoose");

// Comment Sub-Schema
const CommentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the commenting user
  content: String, // Comment content
  timestamp: { type: Date, default: Date.now }, // Comment timestamp
});

// Main Post Schema
const PostSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the post author
  content: { type: String, required: true }, // Post content
  type: {
    type: String,
    enum: ["Update", "Funding Opportunity", "Announcement"],
    required: true,
  }, // Post type
  createdAt: { type: Date, default: Date.now }, // Post creation timestamp
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of users who liked the post
  comments: [CommentSchema], // Array of comments (nested schema)
});

module.exports = mongoose.model("Post", PostSchema);
