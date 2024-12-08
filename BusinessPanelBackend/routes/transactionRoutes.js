const express = require("express");
const {
  createTransaction,
  getTransactionsByUser,
  updateTransactionStatus,
} = require("../controllers/transactionController");
const protect = require("../middlewares/auth");

const router = express.Router();

// Transaction routes
router.post("/", protect, createTransaction); // Initiate a transaction
router.get("/", protect, getTransactionsByUser); // Get transactions for the logged-in user
router.put("/:id", protect, updateTransactionStatus); // Update transaction status

module.exports = router;
