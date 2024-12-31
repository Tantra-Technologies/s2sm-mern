import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import Layout from "../layouts/Layout";
import axios from "../utils/axiosConfig";

// Steps for the stepper
const steps = [
  "Basic Information",
  "Personal Details",
  "Professional Details",
  "Family Details",
  "Lifestyle Details",
];

// Dropdown options
const genders = ["Male", "Female", "Other"];

const CreateMatrimonyProfile = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [profileData, setProfileData] = useState({
    // Step 1: Basic Information
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    age: "",
    mobileNumber: "",
    email: "",
    contactAddress: "",
    country: "",
    state: "",
    city: "",
    // Step 2: Personal Details
    motherTongue: "",
    religion: "",
    caste: "",
    subCaste: "",
    gotra: "",
    mangalik: "",
    horoscope: "",
    maritalStatus: "",
    haveChildren: "No",
    physicalStatus: "",
    height: "",
    weight: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    complexion: "",
    // Step 3: Professional Details
    highestDegree: "",
    companyName: "",
    employedIn: "",
    annualIncome: "",
    // Step 4: Family Details
    familyType: "",
    familyStatus: "",
    familyValues: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    siblings: {
      brothers: 0,
      marriedBrothers: 0,
      sisters: 0,
      marriedSisters: 0,
    },
    nativePlace: "",
    familyLivingIn: "",
    // Step 5: Lifestyle Details
    diet: "",
    drink: "",
    smoke: "",
    hobbies: "",
    interests: "",
  });

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        console.log(profileData);
        const response = await axios.post("/profiles", profileData);
        alert("Profile created successfully!");
        setProfileData({});
        setActiveStep(0);
      } catch (error) {
        console.error("Error creating profile:", error);
        alert("Failed to create profile.");
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (field, value) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0: // Personal Details
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                fullWidth
                value={profileData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Middle Name"
                fullWidth
                value={profileData.middleName}
                onChange={(e) => handleChange("middleName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name"
                fullWidth
                value={profileData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Gender"
                select
                fullWidth
                value={profileData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Age"
                type="number"
                fullWidth
                value={profileData.age}
                onChange={(e) => handleChange("age", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Mobile Number"
                type="number"
                fullWidth
                // InputLabelProps={{ shrink: true }}
                value={profileData.mobileNumber}
                onChange={(e) => handleChange("mobileNumber", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={profileData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contact Address"
                fullWidth
                value={profileData.contactAddress}
                onChange={(e) => handleChange("contactAddress", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Country"
                fullWidth
                value={profileData.country}
                onChange={(e) => handleChange("country", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="State"
                fullWidth
                value={profileData.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="City"
                type="text"
                fullWidth
                value={profileData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </Grid>
          </Grid>
          );
      case 1:
        return (
          <Grid container spacing={3}>
          {/* Mother Tongue */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Mother Tongue"
              fullWidth
              value={profileData.motherTongue}
              onChange={(e) => handleChange("motherTongue", e.target.value)}
            />
          </Grid>

          {/* Religion */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Religion"
              select
              fullWidth
              value={profileData.religion}
              onChange={(e) => handleChange("religion", e.target.value)}
            >
              {["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Parsi", "Other"].map(
                (religion) => (
                  <MenuItem key={religion} value={religion}>
                    {religion}
                  </MenuItem>
                )
              )}
            </TextField>
          </Grid>

          {/* Caste */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Caste"
              fullWidth
              value={profileData.caste}
              onChange={(e) => handleChange("caste", e.target.value)}
            />
          </Grid>

          {/* Sub-Caste */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Sub Caste"
              fullWidth
              value={profileData.subCaste}
              onChange={(e) => handleChange("subCaste", e.target.value)}
            />
          </Grid>

          {/* Gotra */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Gotra"
              fullWidth
              value={profileData.gotra}
              onChange={(e) => handleChange("gotra", e.target.value)}
            />
          </Grid>

          {/* Mangalik */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Mangalik"
              select
              fullWidth
              value={profileData.mangalik}
              onChange={(e) => handleChange("mangalik", e.target.value)}
            >
              {["Yes", "No", "Partial"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Horoscope */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Horoscope"
              fullWidth
              value={profileData.horoscope}
              onChange={(e) => handleChange("horoscope", e.target.value)}
            />
          </Grid>

          {/* Marital Status */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Marital Status"
              select
              fullWidth
              value={profileData.maritalStatus}
              onChange={(e) => handleChange("maritalStatus", e.target.value)}
            >
              {["Never Married", "Divorced", "Widowed", "Separated"].map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Have Children */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Have Children"
              select
              fullWidth
              value={profileData.haveChildren}
              onChange={(e) => handleChange("haveChildren", e.target.value)}
            >
              {["Yes", "No"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Physical Status */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Physical Status"
              select
              fullWidth
              value={profileData.physicalStatus}
              onChange={(e) => handleChange("physicalStatus", e.target.value)}
            >
              {["Normal", "Disabled"].map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Height */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Height (in cm)"
              fullWidth
              value={profileData.height}
              onChange={(e) => handleChange("height", e.target.value)}
            />
          </Grid>

          {/* Weight */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Weight (in kg)"
              fullWidth
              value={profileData.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
            />
          </Grid>

          {/* Date of Birth */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={profileData.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            />
          </Grid>

          {/* Time of Birth */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Time of Birth"
              fullWidth
              value={profileData.timeOfBirth}
              onChange={(e) => handleChange("timeOfBirth", e.target.value)}
            />
          </Grid>

          {/* Place of Birth */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Place of Birth"
              fullWidth
              value={profileData.placeOfBirth}
              onChange={(e) => handleChange("placeOfBirth", e.target.value)}
            />
          </Grid>

          {/* Complexion */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Complexion"
              select
              fullWidth
              value={profileData.complexion}
              onChange={(e) => handleChange("complexion", e.target.value)}
            >
              {["Fair", "Wheatish", "Dark"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        );
      
      case 2: 
        return (
          <Grid container spacing={3}>
  {/* Highest Degree */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Highest Degree"
      fullWidth
      value={profileData.highestDegree}
      onChange={(e) => handleChange("highestDegree", e.target.value)}
    />
  </Grid>

  {/* Company Name */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Company Name"
      fullWidth
      value={profileData.companyName}
      onChange={(e) => handleChange("companyName", e.target.value)}
    />
  </Grid>

  {/* Employed In */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Employed In"
      select
      fullWidth
      value={profileData.employedIn}
      onChange={(e) => handleChange("employedIn", e.target.value)}
    >
      {[
        "Private Sector",
        "Government Sector",
        "Business",
        "Self-Employed",
        "Not Working",
      ].map((employment) => (
        <MenuItem key={employment} value={employment}>
          {employment}
        </MenuItem>
      ))}
    </TextField>
  </Grid>

  {/* Annual Income */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Annual Income"
     
      fullWidth
      value={profileData.annualIncome}
      onChange={(e) => handleChange("annualIncome", e.target.value)}
    />
  </Grid>
</Grid>

        );
      
      case 3:
        return (
          <Grid container spacing={3}>
  {/* Family Type */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Family Type"
      select
      fullWidth
      value={profileData.familyType}
      onChange={(e) => handleChange("familyType", e.target.value)}
    >
      {["Nuclear", "Joint", "Extended"].map((type) => (
        <MenuItem key={type} value={type}>
          {type}
        </MenuItem>
      ))}
    </TextField>
  </Grid>

  {/* Family Status */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Family Status"
      select
      fullWidth
      value={profileData.familyStatus}
      onChange={(e) => handleChange("familyStatus", e.target.value)}
    >
      {["Middle Class", "Upper Middle Class", "Rich", "Affluent"].map(
        (status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        )
      )}
    </TextField>
  </Grid>

  {/* Family Values */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Family Values"
      select
      fullWidth
      value={profileData.familyValues}
      onChange={(e) => handleChange("familyValues", e.target.value)}
    >
      {["Traditional", "Moderate", "Liberal"].map((value) => (
        <MenuItem key={value} value={value}>
          {value}
        </MenuItem>
      ))}
    </TextField>
  </Grid>

  {/* Father's Name */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Father's Name"
      fullWidth
      value={profileData.fatherName}
      onChange={(e) => handleChange("fatherName", e.target.value)}
    />
  </Grid>

  {/* Father's Occupation */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Father's Occupation"
      fullWidth
      value={profileData.fatherOccupation}
      onChange={(e) => handleChange("fatherOccupation", e.target.value)}
    />
  </Grid>

  {/* Mother's Name */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Mother's Name"
      fullWidth
      value={profileData.motherName}
      onChange={(e) => handleChange("motherName", e.target.value)}
    />
  </Grid>

  {/* Mother's Occupation */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Mother's Occupation"
      fullWidth
      value={profileData.motherOccupation}
      onChange={(e) => handleChange("motherOccupation", e.target.value)}
    />
  </Grid>

  {/* Siblings */}
  <Grid item xs={12} md={3}>
    <TextField
      label="Brothers"
      type="number"
      fullWidth
      value={profileData.siblings.brothers}
      onChange={(e) =>
        handleChange("siblings", {
          ...profileData.siblings,
          brothers: parseInt(e.target.value),
        })
      }
    />
  </Grid>
  <Grid item xs={12} md={3}>
    <TextField
      label="Married Brothers"
      type="number"
      fullWidth
      value={profileData.siblings.marriedBrothers}
      onChange={(e) =>
        handleChange("siblings", {
          ...profileData.siblings,
          marriedBrothers: parseInt(e.target.value),
        })
      }
    />
  </Grid>
  <Grid item xs={12} md={3}>
    <TextField
      label="Sisters"
      type="number"
      fullWidth
      value={profileData.siblings.sisters}
      onChange={(e) =>
        handleChange("siblings", {
          ...profileData.siblings,
          sisters: parseInt(e.target.value),
        })
      }
    />
  </Grid>
  <Grid item xs={12} md={3}>
    <TextField
      label="Married Sisters"
      type="number"
      fullWidth
      value={profileData.siblings.marriedSisters}
      onChange={(e) =>
        handleChange("siblings", {
          ...profileData.siblings,
          marriedSisters: parseInt(e.target.value),
        })
      }
    />
  </Grid>

  {/* Native Place */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Native Place"
      fullWidth
      value={profileData.nativePlace}
      onChange={(e) => handleChange("nativePlace", e.target.value)}
    />
  </Grid>

  {/* Family Living In */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Family Living In"
      fullWidth
      value={profileData.familyLivingIn}
      onChange={(e) => handleChange("familyLivingIn", e.target.value)}
    />
  </Grid>
</Grid>

        );

      case 4: return (
        <Grid container spacing={3}>
  {/* Diet */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Diet"
      select
      fullWidth
      value={profileData.diet}
      onChange={(e) => handleChange("diet", e.target.value)}
    >
      {["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan"].map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  </Grid>

  {/* Drink */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Drink"
      select
      fullWidth
      value={profileData.drink}
      onChange={(e) => handleChange("drink", e.target.value)}
    >
      {["No", "Occasionally", "Yes"].map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  </Grid>

  {/* Smoke */}
  <Grid item xs={12} md={6}>
    <TextField
      label="Smoke"
      select
      fullWidth
      value={profileData.smoke}
      onChange={(e) => handleChange("smoke", e.target.value)}
    >
      {["No", "Occasionally", "Yes"].map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  </Grid>

  {/* Hobbies */}
  <Grid item xs={12}>
    <TextField
      label="Hobbies"
      placeholder="Enter hobbies, separated by commas"
      fullWidth
      value={profileData.hobbies}
      onChange={(e) => handleChange("hobbies", e.target.value.split(","))}
    />
  </Grid>

  {/* Interests */}
  <Grid item xs={12}>
    <TextField
      label="Interests"
      placeholder="Enter interests, separated by commas"
      fullWidth
      value={profileData.interests}
      onChange={(e) => handleChange("interests", e.target.value.split(","))}
    />
  </Grid>
</Grid>

      );

      default:
        return null;
    }
  };
  

  return (
    <Layout pageTitle="Create Matrimony Profile">
      <Box sx={{ maxWidth: 900, mx: "auto", my: 5 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{
            "& .MuiStepIcon-root": {
              color: "#f44336", // Default color for step icons (red)
            },
            "& .MuiStepIcon-root.Mui-active": {
              color: "#b71c1c", // Active step color (darker red)
            },
            "& .MuiStepIcon-root.Mui-completed": {
              color: "#f44336", // Completed step color (red)
            },
          }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box my={4}>{renderStepContent(activeStep)}</Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            sx={{ 
              color: "red",
              borderColor: "red",
             }}
          >
            Back
          </Button>
          <Button onClick={handleNext} variant="contained" sx={{
            backgroundColor: "red", // Primary color changed to red
            "&:hover": { backgroundColor: "#b71c1c" }, // Hover effect for the button
          }}>
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default CreateMatrimonyProfile;
