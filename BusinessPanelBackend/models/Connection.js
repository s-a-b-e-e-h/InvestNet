const mongoose = require("mongoose");

const ConnectionSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User ID of the requester
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User ID of the recipient
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" }, // Status of the connection
  createdAt: { type: Date, default: Date.now }, // Date when the connection request was sent
  updatedAt: Date, // Last update date for the connection
});

module.exports = mongoose.model("Connection", ConnectionSchema);
