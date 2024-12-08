const Connection = require("../models/Connection");

// Send connection request
const sendConnectionRequest = async (req, res) => {
  const { recipientId } = req.body;

  try {
    const connection = await Connection.create({
      requesterId: req.user._id,
      recipientId,
      status: "Pending",
      createdAt: new Date(),
    });

    res.status(201).json(connection);
  } catch (error) {
    res.status(500).json({ message: "Error sending connection request", error });
  }
};

// Get connections for a user
const getConnections = async (req, res) => {
  try {
    const connections = await Connection.find({
      $or: [{ requesterId: req.user._id }, { recipientId: req.user._id }],
    });
    res.json(connections);
  } catch (error) {
    res.status(500).json({ message: "Error fetching connections", error });
  }
};

// Update connection status
const updateConnectionStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const connection = await Connection.findById(req.params.id);

    if (connection && connection.recipientId.toString() === req.user._id.toString()) {
      connection.status = status || connection.status;
      connection.updatedAt = new Date();

      const updatedConnection = await connection.save();
      res.json(updatedConnection);
    } else {
      res.status(403).json({ message: "Unauthorized to update this connection" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating connection", error });
  }
};

module.exports = { sendConnectionRequest, getConnections, updateConnectionStatus };
