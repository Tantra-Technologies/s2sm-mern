// backend/routes/dashboardRoutes.js

const express = require("express");
const {
  getLatestProfiles,
  getDashboardStats,
  getAdminDashboardStats,
} = require("../controllers/profileController");
const { changePassword } = require("../controllers/authController");

const router = express.Router();

router.get("/latest-profiles", getLatestProfiles);
router.get("/stats", getDashboardStats);
router.get("/admin-stats", getAdminDashboardStats);
router.post("/change-password", changePassword);

module.exports = router;
