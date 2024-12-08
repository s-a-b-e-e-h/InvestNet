const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User ID of the sender (investor)
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User ID of the receiver (business)
  amount: { type: Number, required: true }, // Transaction amount
  status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" }, // Status of the transaction
  paymentMethod: { type: String, enum: ["Stripe", "PayPal", "Bank Transfer"], required: true }, // Payment method
  createdAt: { type: Date, default: Date.now }, // Transaction creation timestamp
  dealDetails: String, // Additional information about the transaction
});

module.exports = mongoose.model("Transaction", TransactionSchema);
