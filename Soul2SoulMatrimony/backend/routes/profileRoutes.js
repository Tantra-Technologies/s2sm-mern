// backend/routes/profileRoutes.js

const express = require("express");
const {
  createProfile,
  fetchAllProfile,
} = require("../controllers/profileController");

const router = express.Router();

router.post("/", createProfile);
router.get("/", fetchAllProfile);

module.exports = router;
