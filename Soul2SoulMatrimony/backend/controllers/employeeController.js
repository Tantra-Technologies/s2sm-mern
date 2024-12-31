// backend/controllers/employeeController.js

const User = require("../models/User");

// Create employee
const createEmployee = async (req, res) => {
  try {
    const { name, email, password, age, aadhaar, mobile } = req.body;
    const user = new User({ name, email, password, age, aadhaar, mobile });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const updateEmployeeStatus = async (req, res) => {
  try {
    const { email, status } = req.body;
    console.log(email, status);
    const employee = await User.findOne({ email: email });
    employee.isActive = status;
    employee.save();
    res.status(200).send({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { email } = req.params;
    await User.deleteOne({ email: email });
    res.status(200).send({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployeeStatus,
  deleteEmployee,
};
