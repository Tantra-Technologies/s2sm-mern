const express = require("express");
const router = express.Router();
const {
  requestPasswordUpdate,
  getAllPasswordUpdateRequests,
  resolvePasswordUpdate,
} = require("../controllers/notificationController");

// POST: Request a password update (User request)
router.post("/request-password-update", requestPasswordUpdate);

// GET: Fetch all password update requests (Admin only)
router.get("/", getAllPasswordUpdateRequests);

// POST: Resolve a password update (Admin updates user's password)
router.post("/resolve-password-update", resolvePasswordUpdate);

// POST: Update user's password (Admin action)

module.exports = router;
