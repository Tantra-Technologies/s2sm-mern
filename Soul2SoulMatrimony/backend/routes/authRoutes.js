// backend/routes/authRoutes.js

const express = require("express");
const {
  login,
  logout,
  registerUser,
  updatePassword,
} = require("../controllers/authController");
const User = require("../models/User");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/update-password", updatePassword);
router.post("/register", registerUser);
router.get("/logout", logout);
router.get("/user", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
