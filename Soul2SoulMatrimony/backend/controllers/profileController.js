// backend/controllers/profileController.js
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createProfile = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Check if the user is an employee
    const user = await User.findById(userId);
    if (!user || user.role !== "employee") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Add createdBy to the profile data
    const profileData = {
      ...req.body,
      createdBy: userId,
    };

    // Create and save the profile
    const profile = new Profile(profileData);
    await profile.save();

    res.status(201).json({ message: "Profile created successfully", profile });
  } catch (error) {
    console.error("Error creating profile:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Search profiles
const fetchAllProfile = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Check if the user is an employee
    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({ message: "Access denied" });
    }

    let profiles = [];

    if (user.role === "admin") {
      profiles = await Profile.find();
    } else {
      profiles = await Profile.find({ createdBy: userId });
    }

    res.status(201).json(profiles);
  } catch (error) {
    console.error("Error creating profile:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller function to get the latest 5 profiles
const getLatestProfiles = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Check if the user is an employee
    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({ message: "Access denied" });
    }

    let latestProfiles = [];
    // Fetch the latest 5 profiles, sorted by createdAt in descending order
    if (user.role === "admin") {
      latestProfiles = await Profile.find()
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .limit(5); // Limit to 5 profiles
    } else {
      latestProfiles = await Profile.find({ createdBy: userId })
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .limit(5); // Limit to 5 profiles
    }

    // Respond with the fetched profiles
    return res.status(200).json(latestProfiles);
  } catch (error) {
    // Handle errors (e.g., database issues)
    console.error("Error fetching latest profiles:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch the latest profiles",
      error: error.message,
    });
  }
};

// Controller function to get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Check if the user is an employee
    const user = await User.findById(userId);
    if (!user || user.role !== "employee") {
      return res.status(403).json({ message: "Access denied" });
    }

    // Get total profiles count
    const totalProfiles = await Profile.countDocuments();

    // Get count of male profiles
    const maleProfiles = await Profile.countDocuments({
      gender: "Male",
      createdBy: userId,
    });

    // Get count of female profiles
    const femaleProfiles = await Profile.countDocuments({
      gender: "Female",
      createdBy: userId,
    });

    // Send the stats response
    return res.status(200).json({
      totalProfiles,
      maleProfiles,
      femaleProfiles,
    });
  } catch (error) {
    // Handle errors (e.g., database issues)
    console.error("Error fetching dashboard stats:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
};

const getAdminDashboardStats = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Check if the user is an employee
    const user = await User.findById(userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const totalEmployees = await User.countDocuments({ role: "employee" });
    const onlineEmployees = await User.countDocuments({
      role: "employee",
      isOnline: true,
    });
    // Get total profiles count
    const totalProfiles = await Profile.countDocuments();
    // Get count of male profiles
    const maleProfiles = await Profile.countDocuments({ gender: "Male" });
    // Get count of female profiles
    const femaleProfiles = await Profile.countDocuments({ gender: "Female" });

    // Send the stats response
    return res.status(200).json({
      totalEmployees,
      onlineEmployees,
      totalProfiles,
      maleProfiles,
      femaleProfiles,
    });
  } catch (error) {
    // Handle errors (e.g., database issues)
    console.error("Error fetching dashboard stats:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
};

module.exports = {
  createProfile,
  fetchAllProfile,
  getLatestProfiles,
  getDashboardStats,
  getAdminDashboardStats,
};
