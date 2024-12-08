const express = require("express");
const {
  sendConnectionRequest,
  getConnections,
  updateConnectionStatus,
} = require("../controllers/connectionController");
const protect  = require("../middlewares/auth");

const router = express.Router();

// Connection routes
router.post("/", protect, sendConnectionRequest); // Send connection request
router.get("/", protect, getConnections); // Get all connections for the logged-in user
router.put("/:id", protect, updateConnectionStatus); // Update connection status (accept/reject)

module.exports = router;
