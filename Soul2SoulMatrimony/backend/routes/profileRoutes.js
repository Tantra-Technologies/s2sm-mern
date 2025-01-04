// backend/routes/profileRoutes.js

const express = require("express");
const {
  createProfile,
  fetchAllProfile,
  getProfileById,
} = require("../controllers/profileController");

const { exportProfile } = require("../controllers/exportController");

const router = express.Router();

router.post("/", createProfile);
router.get("/", fetchAllProfile);
router.get("/:id", getProfileById);
router.get("/export/:type/:id", exportProfile);
router.post("/export/:type/:id", exportProfile);

module.exports = router;
