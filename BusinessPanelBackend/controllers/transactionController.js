const Transaction = require("../models/Transaction");

// Create a new transaction
const createTransaction = async (req, res) => {
  const { receiverId, amount, paymentMethod, dealDetails } = req.body;

  try {
    const transaction = await Transaction.create({
      senderId: req.user._id,
      receiverId,
      amount,
      status: "Pending",
      paymentMethod,
      createdAt: new Date(),
      dealDetails,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction", error });
  }
};

// Get transactions for the logged-in user
const getTransactionsByUser = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ senderId: req.user._id }, { receiverId: req.user._id }],
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};

// Update transaction status
const updateTransactionStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const transaction = await Transaction.findById(req.params.id);

    if (transaction) {
      transaction.status = status || transaction.status;
      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating transaction status", error });
  }
};

module.exports = {
  createTransaction,
  getTransactionsByUser,
  updateTransactionStatus,
};
