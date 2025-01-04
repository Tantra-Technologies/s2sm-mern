// backend/routes/exportRoutes.js

const express = require("express");
const { exportProfile } = require("../controllers/exportController");

const router = express.Router();

router.get("/export/:type/:id", exportProfile);

module.exports = router;
