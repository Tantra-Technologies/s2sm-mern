// backend/controllers/authController.js

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Notification = require("../models/Notification");

// Update user's password (Admin action)
const updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email: email });

    const notification = await Notification.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.password = newPassword; // Ensure you hash the password if necessary
    await user.save();

    notification.status = "Resolved";
    await notification.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const changePassword = async (req, res) => {
  const { newPassword } = req.body;

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

    user.password = newPassword; // Ensure you hash the password if necessary
    await user.save();
    res.status(200).json(true);
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, age, aadhaar, mobile } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role || !aadhaar || !mobile) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate role
    if (!["admin", "employee"].includes(role)) {
      return res.status(400).json({ message: "Invalid role specified." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
      role, // 'admin' or 'employee'
      age: age || 0, // Optional
      aadhaar,
      mobile,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      message: "Admin registered successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const registerEmployee = async (req, res) => {
  try {
    const { name, email, password, age, aadhaar, mobile } = req.body;

    // Validate request body
    if (!name || !email || !password || !aadhaar) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role, // 'admin' or 'employee'
      age,
      aadhaar,
      mobile,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(403).json({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    if (user.isActive == false) {
      return res
        .status(403)
        .json({ message: "User is Blocked. Kindly Contact Admin." });
    } else {
      user.isOnline = true;
      await user.save();
      res.status(200).send({ token, user });
    }
    // res.json({ token, role: user.role });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Logout user
const logout = async (req, res) => {
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
  user.isOnline = false;
  await user.save();
  res.clearCookie("token");
  res.json({ success: true });
};

module.exports = {
  login,
  logout,
  registerUser,
  updatePassword,
  changePassword,
};
