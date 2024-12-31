import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import Layout from "../layouts/Layout";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig"; // Ensure axios is properly configured with baseURL and token interceptors

const SearchMatrimonyProfile = () => {
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  // Fetch profiles from the backend
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/profiles"); // Replace with your API endpoint
        setProfiles(response.data);
        setFilteredProfiles(response.data); // Initially display all profiles
      } catch (error) {
        console.error("Error fetching profiles:", error);
        alert("Failed to fetch profiles. Please try again.");
      }
    };

    fetchProfiles();
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    const filtered = profiles.filter((profile) => {
      return (
        profile.firstName.toLowerCase().includes(lowerCaseQuery) ||
        profile.lastName.toLowerCase().includes(lowerCaseQuery) ||
        profile.caste.toLowerCase().includes(lowerCaseQuery) ||
        profile.religion.toLowerCase().includes(lowerCaseQuery) ||
        profile.mobileNumber.includes(lowerCaseQuery)
      );
    });

    setFilteredProfiles(filtered);
  };

  // Export profile functionality (placeholder for now)
  const handleExport = (profileId) => {
    alert(`Exporting profile with ID: ${profileId}`);
  };

  return (
    <Layout pageTitle="Matrimony Profiles">
      <Box sx={{ p: 4 }}>
        {/* Search Section */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                label="Search by Name, Caste, Religion, or Mobile"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "red", "&:hover": { backgroundColor: "#b71c1c" } }}
                fullWidth
                onClick={handleSearch}
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

export default SearchMatrimonyProfile;
