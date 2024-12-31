const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const { protect } = require("./middlewares/authMiddleware");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const profileRoutes = require("./routes/profileRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Public routes
app.use("/api/notifications", notificationRoutes); // Public routes
app.use("/api/profiles", protect, profileRoutes); // Protected routes
app.use("/api/employees", protect, employeeRoutes); // Protected routes
app.use("/api/dashboard", protect, dashboardRoutes);

// Serve React build files
const buildPath = path.join(__dirname, "../frontend", "dist"); // Adjust "client" to your React app's folder name
app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on http://0.0.0.0:${PORT}`)
);
