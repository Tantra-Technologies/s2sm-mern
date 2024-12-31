const Notification = require("../models/Notification"); // Example model for notifications

// Request a password update (User action)
exports.requestPasswordUpdate = async (req, res) => {
  const { email } = req.body;

  try {
    const newRequest = await Notification.create({ email, status: "Pending" });
    res.status(200).json({
      message: "Password update request submitted.",
      data: newRequest,
    });
  } catch (error) {
    console.error("Error creating password update request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Fetch all password update requests (Admin action)
exports.getAllPasswordUpdateRequests = async (req, res) => {
  try {
    const requests = await Notification.find({ status: "Pending" });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching password update requests:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Resolve a password update (Admin action)
exports.resolvePasswordUpdate = async (req, res) => {
  const { notificationId } = req.body;

  try {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { status: "Resolved" },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    res
      .status(200)
      .json({ message: "Notification resolved.", data: notification });
  } catch (error) {
    console.error("Error resolving password update:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
