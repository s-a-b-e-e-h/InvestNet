const Post = require("../models/Post");

// Create a post
const createPost = async (req, res) => {
  const { content, type } = req.body;

  try {
    const post = await Post.create({
      authorId: req.user._id,
      content,
      type,
      createdAt: new Date(),
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// Get post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

// Update post
const updatePost = async (req, res) => {
  const { content } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (post && post.authorId.toString() === req.user._id.toString()) {
      post.content = content || post.content;

      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(403).json({ message: "Unauthorized to update this post" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

// Delete post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post && post.authorId.toString() === req.user._id.toString()) {
      await post.remove();
      res.json({ message: "Post deleted successfully" });
    } else {
      res.status(403).json({ message: "Unauthorized to delete this post" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };
