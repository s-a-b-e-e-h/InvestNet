const mongoose = require("mongoose");

// Profile Sub-Schema
const ProfileSchema = new mongoose.Schema({
  bio: String, // Short bio or description of the user
  preferences: {
    industries: [String], // List of preferred industries for funding
    locations: [String], // Preferred locations for investments
    fundingRange: { min: Number, max: Number }, // Funding range for investors
  },
  documents: [String], // URLs for uploaded documents (businesses only)
  registrationStatus: {
    type: String,
    enum: ["Approved", "Rejected", "Waiting"],
  }, // Registration status for businesses
  metrics: {
    profileViews: { type: Number, default: 0 }, // Total profile views
    postEngagement: { type: Number, default: 0 }, // Engagement metrics for posts
  },
});

// Chat Sub-Schema
const ChatSchema = new mongoose.Schema({
  chatId: mongoose.Schema.Types.ObjectId, // Unique chat session ID
  participants: [mongoose.Schema.Types.ObjectId], // List of participants in the chat
  lastMessage: {
    content: String, // Last message content
    timestamp: Date, // When the last message was sent
  },
  createdAt: { type: Date, default: Date.now }, // Chat creation date
});

// Notification Sub-Schema
const NotificationSchema = new mongoose.Schema({
  message: String, // Notification content
  timestamp: { type: Date, default: Date.now }, // Notification creation timestamp
  isRead: { type: Boolean, default: false }, // Read status of the notification
});

// Main User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Full name of the user
  email: { type: String, unique: true, required: true }, // User's email, used for login
  password: { type: String, required: true }, // Hashed password
  role: {
    type: String,
    enum: ["Admin", "Investor", "Business", "General User"], // User roles
    required: true,
  },
  registrationDate: { type: Date, default: Date.now }, // Date of account creation
  lastLogin: Date, // Timestamp of the last login
  profile: ProfileSchema, // Profile information (nested schema)
  chats: [ChatSchema], // Array of chats
  notifications: [NotificationSchema], // Array of notifications
});

module.exports = mongoose.model("User", UserSchema);
