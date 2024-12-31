import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  Typography,
  Box,
  Avatar,
  MenuItem,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import Layout from "../../layouts/Layout";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig"; // Ensure axios is configured with baseURL and interceptors

const AdminSearchProfile = () => {
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("All Employees");
  const [employees, setEmployees] = useState([]); // Employee list with ID and name mapping

  // Fetch profiles and employees from the backend
  useEffect(() => {
    const fetchProfilesAndEmployees = async () => {
      try {
        // Fetch all profiles
        const profileResponse = await axios.get("/profiles");
        setProfiles(profileResponse.data);
        setFilteredProfiles(profileResponse.data);

        // Fetch employee list
        const employeeResponse = await axios.get("/employees");
        const allEmployees = [
          { _id: "All Employees", name: "All Employees" },
          ...employeeResponse.data,
        ];
        setEmployees(allEmployees);
      } catch (error) {
        console.error("Error fetching profiles or employees:", error);
        alert("Failed to fetch data. Please try again.");
      }
    };

    fetchProfilesAndEmployees();
  }, []);

  // Map employee IDs to names
  const getEmployeeName = (employeeId) => {
    const employee = employees.find((emp) => emp._id === employeeId);
    return employee ? employee.name : "Unknown Employee";
  };

  // Filter profiles based on search query and selected employee
  const filterProfiles = () => {
    let result = profiles;

    // Filter by employee
    if (selectedEmployee !== "All Employees") {
      result = result.filter((profile) => profile.createdBy === selectedEmployee);
    }

    // Filter by search query
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter((profile) => {
        return (
          profile.firstName.toLowerCase().includes(lowerCaseQuery) ||
          profile.lastName.toLowerCase().includes(lowerCaseQuery) ||
          profile.caste.toLowerCase().includes(lowerCaseQuery) ||
          profile.religion.toLowerCase().includes(lowerCaseQuery) ||
          profile.mobileNumber.includes(lowerCaseQuery)
        );
      });
    }

    setFilteredProfiles(result);
  };

  useEffect(() => {
    filterProfiles();
  }, [searchQuery, selectedEmployee]);

  const handleExport = (profileId) => {
    alert(`Exporting profile with ID: ${profileId}`);
  };

  return (
    <Layout pageTitle="Admin Matrimony Profiles">
      <Box sx={{ p: 4 }}>
        {/* Search Section */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                label="Search by Name, Caste, Religion, or Mobile"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Filter by Employee"
                select
                fullWidth
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                {employees.map((employee) => (
                  <MenuItem key={employee._id} value={employee._id}>
                    {employee.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "red", "&:hover": { backgroundColor: "#b71c1c" } }}
                fullWidth
                onClick={filterProfiles}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Profiles Display Section */}
        <Grid container spacing={2}>
          {filteredProfiles.map((profile) => (
            <Grid item xs={12} key={profile._id}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  "&:hover": { boxShadow: 5 },
                }}
              >
                {/* Gender Icon */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      bgcolor: profile.gender === "Male" ? "blue" : "pink",
                      color: "white",
                      mr: 2,
                    }}
                  >
                    {profile.gender === "Male" ? <MaleIcon /> : <FemaleIcon />}
                  </Avatar>
                  <Typography variant="h6" color="error">
                    {profile.firstName} {profile.lastName}
                  </Typography>
                </Box>

                {/* Profile Details */}
                <Box sx={{ flex: 1, ml: 4 }}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Mobile:</strong> {profile.mobileNumber}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Caste:</strong> {profile.caste}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Religion:</strong> {profile.religion}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Created By:</strong> {getEmployeeName(profile.createdBy)}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Created On:</strong>{" "}
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Box>
                  <Button
                    variant="outlined"
                    sx={{ mr: 1 }}
                    onClick={() => handleExport(profile._id)}
                  >
                    Export
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "red",
                      "&:hover": { backgroundColor: "#b71c1c" },
                    }}
                    onClick={() => navigate(`/profiles/${profile._id}`)}
                  >
                    View
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* No Results Message */}
        {filteredProfiles.length === 0 && (
          <Typography
            variant="h6"
            color="textSecondary"
            align="center"
            sx={{ mt: 4 }}
          >
            No profiles found matching your search criteria.
          </Typography>
        )}
      </Box>
    </Layout>
  );
};

export default AdminSearchProfile;
