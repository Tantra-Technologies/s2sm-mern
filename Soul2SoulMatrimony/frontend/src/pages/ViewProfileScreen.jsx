import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Paper,
  Divider,
  Avatar,
  Button,
  Chip,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import axios from "../utils/axiosConfig";
import Layout from "../layouts/Layout";
import { useParams } from "react-router-dom";

const ViewProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const { id: profileId } = useParams();

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/profiles/${profileId}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [profileId]);

  // Export profile as PDF
  const handleExportPDF = async () => {
    try {
      const response = await axios.get(`/profiles/export/pdf/${profileId}`, {
        responseType: "blob", // Important for downloading files
      });

      // Create a link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `profile_${profile.firstName}_${profile.lastName}_${profileId.slice(
        -4
      )}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. Please try again.");
    }
  };

  // Email profile as PDF
  const handleEmailProfile = async () => {
    const recipientEmail = prompt("Enter recipient email address:");
    if (!recipientEmail) return;

    try {
      const response = await axios.post(`/profiles/export/email/${profileId}`, {
        email: recipientEmail,
      });

      if (response.status === 200) {
        alert("Profile emailed successfully.");
      } else {
        throw new Error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error emailing profile:", error);
      alert("Failed to email profile. Please try again.");
    }
  };


  if (!profile) {
    return (
      <Layout pageTitle="View Profile">
        <Typography align="center" variant="h6" sx={{ mt: 4 }}>
          Loading profile...
        </Typography>
      </Layout>
    );
  }

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <Layout pageTitle="View Profile">
      <Box sx={{ p: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: profile.gender === "Male" ? "blue" : "pink",
                  color: "white",
                  width: 100,
                  height: 100,
                  mr: 3,
                }}
              >
                {profile.gender === "Male" ? <MaleIcon /> : <FemaleIcon />}
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {profile.firstName} {profile.middleName} {profile.lastName}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {profile.religion} • {profile.caste} {profile.subCaste && `• ${profile.subCaste}`}
                </Typography>
              </Box>
            </Box>
            <Box>
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: "none", margin:4 }}
              onClick={handleExportPDF}
            >
              Export PDF
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ textTransform: "none" }}
              onClick={handleEmailProfile}
            >
              Email Profile
            </Button>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Personal Details */}
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Personal Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Date of Birth:</strong> {formatDate(profile.dateOfBirth)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Place of Birth:</strong> {profile.placeOfBirth}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Height:</strong> {profile.height} cm
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Weight:</strong> {profile.weight || "Not specified"} kg
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Complexion:</strong> {profile.complexion}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Mother Tongue:</strong> {profile.motherTongue}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Marital Status:</strong> {profile.maritalStatus}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Mangalik:</strong> {profile.mangalik}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Gotra:</strong> {profile.gotra || "Not specified"}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Contact Information */}
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Contact Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Mobile:</strong> {profile.mobileNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Email:</strong> {profile.email || "Not specified"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Address:</strong> {profile.contactAddress}, {profile.city},{" "}
                {profile.state}, {profile.country}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Professional Details */}
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Professional Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Highest Degree:</strong> {profile.highestDegree}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Company:</strong> {profile.companyName || "Not specified"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Annual Income:</strong> {profile.annualIncome}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Family Details */}
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Family Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Father's Name:</strong> {profile.fatherName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Father's Occupation:</strong> {profile.fatherOccupation}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Mother's Name:</strong> {profile.motherName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Mother's Occupation:</strong> {profile.motherOccupation || "Not specified"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Family Type:</strong> {profile.familyType}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Family Values:</strong> {profile.familyValues || "Moderate"}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Lifestyle Preferences */}
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Lifestyle Preferences
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Diet:</strong> {profile.diet}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Smoke:</strong> {profile.smoke}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                <strong>Drink:</strong> {profile.drink}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Hobbies:</strong> {profile.hobbies?.join(", ") || "Not specified"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Interests:</strong> {profile.interests?.join(", ") || "Not specified"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Layout>
  );
};

export default ViewProfileScreen;
