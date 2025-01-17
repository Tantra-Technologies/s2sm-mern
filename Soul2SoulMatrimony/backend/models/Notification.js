const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Resolved"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);
