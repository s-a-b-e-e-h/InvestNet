const express = require("express");
const {
  getNotifications,
  createNotification,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationController");
const protect = require("../middlewares/auth");

const router = express.Router();

// Get all notifications for a user
router.get("/", protect, getNotifications);

// Create a new notification
router.post("/", protect, createNotification);

// Mark a notification as read
router.put("/:id/read", protect, markAsRead);

// Delete a notification
router.delete("/:id", protect, deleteNotification);

module.exports = router;
