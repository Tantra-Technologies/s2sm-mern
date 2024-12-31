import React, { useState, useEffect } from "react";
import { Modal, TextField, Button, Grid, Typography, Box } from "@mui/material";
import Layout from "../../layouts/Layout";
import axios from "../../utils/axiosConfig";

// Fetch Employee Data
const fetchEmployees = async () => {
  try {
    const response = await axios.get("/employees"); // Backend endpoint to fetch employees
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

const AdminEmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    aadhaar: "",
    mobile: "",
  });

  useEffect(() => {
    // Fetch initial employee data from the backend
    const getEmployees = async () => {
      const employees = await fetchEmployees();
      setEmployeeList(employees);
    };
    getEmployees();
  }, []);

  // Filter employee list based on search term
  const filteredEmployees = employeeList.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBlockUnblock = async (email, currentStatus) => {
    try {
      const updatedStatus = currentStatus === false ? true : false;
      await axios.put(`/employees/status`, { email: email, status: updatedStatus }); // API call to update status
      setEmployeeList((prevList) =>
        prevList.map((emp) =>
          emp.email === email ? { ...emp, isActive: updatedStatus } : emp
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (email) => {
    try {
      await axios.delete(`/employees/${email}`); // API call to delete employee
      setEmployeeList((prevList) => prevList.filter((emp) => emp.email !== email));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setNewEmployee({ name: "", email: "", password: "", age: "", aadhaar: "" });
  };

  const handleAddEmployee = async () => {
    try {
      const response = await axios.post("/employees", newEmployee); // API call to add new employee
      setEmployeeList((prevList) => [...prevList, response.data]);
      handleCloseModal();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <Layout pageTitle="Employees Management">
      <div className="mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <TextField
            fullWidth
            label="Search Employee"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              mb: 3,
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#d32f2f", // Red Border
                },
                "&:hover fieldset": {
                  borderColor: "#d32f2f", // Red Border Hover
                },
              },
            }}
          />
        </div>

        {/* Add New Employee Button */}
        <div className="mb-6 text-center">
          <Button
            variant="contained"
            color="error"
            sx={{
              borderRadius: 2,
              padding: "10px 20px",
              fontWeight: "bold",
              textTransform: "none",
              backgroundColor: "#d32f2f",
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
            }}
            onClick={handleOpenModal}
          >
            Add New Employee
          </Button>
        </div>

        {/* Employee List */}
        <div className="grid grid-cols-1 gap-6 overflow-y-auto max-h-full">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <div
                key={employee.email}
                className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
              >
                <div className="flex items-center space-x-4">
                  <Typography variant="h6" color="primary" className="font-semibold">
                    {employee.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {employee.email}
                  </Typography>
                </div>

                <Typography
                  variant="body2"
                  className={`font-semibold ${employee.status === "Blocked" ? "text-red-600" : "text-green-600"}`}
                >
                  {employee.status}
                </Typography>

                <div className="flex gap-4 mt-4">
                  {/* Block/Unblock Button */}
                  <Button
                    variant="outlined"
                    color={employee.isActive === false ? "success" : "warning"}
                    onClick={() => handleBlockUnblock(employee.email, employee.isActive)}
                    sx={{
                      textTransform: "none",
                      padding: "6px 20px",
                      fontWeight: "bold",
                      borderColor: employee.isActive === false ? "#388e3c" : "#f57c00",
                      color: employee.isActive === false ? "#388e3c" : "#f57c00",
                      "&:hover": {
                        borderColor: employee.isActive === false ? "#388e3c" : "#f57c00",
                        color: employee.isActive === false ? "#388e3c" : "#f57c00",
                      },
                    }}
                  >
                    {employee.isActive === false ? "Unblock" : "Block"}
                  </Button>

                  {/* Delete Employee Button */}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(employee.email)}
                    sx={{
                      textTransform: "none",
                      padding: "6px 20px",
                      fontWeight: "bold",
                      borderColor: "#d32f2f",
                      color: "#d32f2f",
                      "&:hover": {
                        borderColor: "#b71c1c",
                        color: "#b71c1c",
                      },
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">No employees found.</div>
          )}
        </div>

        {/* Add Employee Modal */}
        <Modal open={open} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
              width: 400,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Add New Employee
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#d32f2f" } } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#d32f2f" } } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={newEmployee.password}
                  onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                  sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#d32f2f" } } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Age"
                  variant="outlined"
                  type="number"
                  value={newEmployee.age}
                  onChange={(e) => setNewEmployee({ ...newEmployee, age: e.target.value })}
                  sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#d32f2f" } } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Aadhaar"
                  variant="outlined"
                  value={newEmployee.aadhaar}
                  onChange={(e) => setNewEmployee({ ...newEmployee, aadhaar: e.target.value })}
                  sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#d32f2f" } } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mobile Number"
                  variant="outlined"
                  value={newEmployee.mobile}
                  onChange={(e) => setNewEmployee({ ...newEmployee, mobile: e.target.value })}
                  sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#d32f2f" } } }}
                />
              </Grid>
            </Grid>

            <div className="mt-4 flex justify-end gap-4">
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleAddEmployee}
                sx={{
                  padding: "6px 20px",
                  fontWeight: "bold",
                  textTransform: "none",
                  backgroundColor: "#d32f2f",
                  "&:hover": { backgroundColor: "#b71c1c" },
                }}
              >
                Add
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </Layout>
  );
};

export default AdminEmployeeManagement;
