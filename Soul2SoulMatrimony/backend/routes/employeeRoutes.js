// backend/routes/employeeRoutes.js

const express = require("express");
const {
  createEmployee,
  getEmployees,
  updateEmployeeStatus,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

router.post("/", createEmployee);
router.get("/", getEmployees);
router.put("/status", updateEmployeeStatus);
router.delete("/:email", deleteEmployee);
module.exports = router;
