const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    // Basic Information
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    age: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String },
    contactAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },

    // Personal Details
    motherTongue: { type: String, required: true },
    religion: {
      type: String,
      required: true,
      enum: [
        "Hindu",
        "Muslim",
        "Christian",
        "Sikh",
        "Buddhist",
        "Jain",
        "Parsi",
        "Other",
      ],
    },
    caste: { type: String, required: true },
    subCaste: { type: String },
    gotra: { type: String },
    mangalik: { type: String, enum: ["Yes", "No", "Partial"], default: "No" },
    horoscope: { type: String }, // Optional for uploading a file path or link
    maritalStatus: {
      type: String,
      required: true,
      enum: ["Never Married", "Divorced", "Widowed", "Separated"],
    },
    haveChildren: { type: String, default: "No", enum: ["Yes", "No"] },
    physicalStatus: {
      type: String,
      enum: ["Normal", "Disabled"],
      default: "Normal",
    },
    height: { type: String, required: true },
    weight: { type: String },
    dateOfBirth: { type: Date, required: true },
    timeOfBirth: { type: String },
    placeOfBirth: { type: String },
    complexion: {
      type: String,
      enum: ["Fair", "Wheatish", "Dark"],
      default: "Wheatish",
    },

    // Professional Details
    highestDegree: { type: String, required: true },
    companyName: { type: String },
    employedIn: {
      type: String,
      required: true,
      enum: [
        "Private Sector",
        "Government Sector",
        "Business",
        "Self-Employed",
        "Not Working",
      ],
    },
    annualIncome: { type: String, required: true },

    // Family Details
    familyType: {
      type: String,
      enum: ["Nuclear", "Joint", "Extended"],
      required: true,
    },
    familyStatus: {
      type: String,
      enum: ["Middle Class", "Upper Middle Class", "Rich", "Affluent"],
    },
    familyValues: {
      type: String,
      enum: ["Traditional", "Moderate", "Liberal"],
      default: "Moderate",
    },
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String },
    siblings: {
      brothers: { type: Number, default: 0 },
      marriedBrothers: { type: Number, default: 0 },
      sisters: { type: Number, default: 0 },
      marriedSisters: { type: Number, default: 0 },
    },
    nativePlace: { type: String },
    familyLivingIn: { type: String },

    // Lifestyle Preferences
    diet: {
      type: String,
      enum: ["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan"],
      default: "Vegetarian",
    },
    drink: { type: String, enum: ["No", "Occasionally", "Yes"], default: "No" },
    smoke: { type: String, enum: ["No", "Occasionally", "Yes"], default: "No" },
    hobbies: { type: [String] },
    interests: { type: [String] },

    // Miscellaneous
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Employee/Admin ID
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
