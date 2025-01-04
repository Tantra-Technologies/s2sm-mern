const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const Profile = require("../models/Profile");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

function maskDetails(input) {
  if (!input) {
    return null;
  }

  if (/^\+?\d{10,13}$/.test(input)) {
    // Mask phone number
    const countryCode = input.startsWith("+") ? input.slice(0, 3) : "+91";
    const lastTwoDigits = input.slice(-2);
    return `${countryCode}-xxxxxxxx${lastTwoDigits}`;
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
    // Mask email address
    const [localPart, domain] = input.split("@");
    const maskedLocal = `${localPart[0]}${"*".repeat(
      localPart.length - 2
    )}${localPart.slice(-1)}`;
    return `${maskedLocal}@${domain}`;
  } else {
    return null;
  }
}

const exportProfile = async (req, res) => {
  const { type, id } = req.params;
  const { email } = req.body;

  try {
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

    let isAdmin = false;
    if (user.role === "admin") {
      isAdmin = true;
    } else {
      isAdmin = false;
    }

    // Fetch the profile by ID
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    // Generate PDF
    const pdfPath = path.join(
      __dirname,
      `../exports/profile_${profile.firstName}_${profile.lastName}_${id.slice(
        -4
      )}.pdf`
    );
    const doc = new PDFDocument({ margin: 40 });

    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    // Header Section with Logo and Tagline
    doc
      .image(path.join(__dirname, "../assets/logo.png"), 50, 20, {
        width: 500,
        align: "center",
      })
      .moveDown(1);

    doc.y += 50;
    doc.moveTo(40, doc.y).lineTo(570, doc.y).stroke("#e0e0e0");

    doc.moveDown(1);

    // Section Header Function
    const sectionHeader = (title) => {
      doc
        .moveDown(0.5)
        .fontSize(14)
        .fillColor("#2a9d8f")
        .font("Helvetica-Bold")
        .text(title, { align: "center" });
      doc
        .moveTo(200, doc.y + 5)
        .lineTo(400, doc.y + 5)
        .stroke("#2a9d8f")
        .moveDown(2);
    };

    const addDetails = (details) => {
      const leftMargin = 50; // Left column for keys
      const rightMargin = 300; // Right column for values
      const rowHeight = 20; // Height for each row
      const tableWidth = 500; // Width of the table
      const borderColor = "#D3D3D3"; // Light grey for borders
      const rowColor1 = "#F9F9F9"; // Alternate row color (light grey)
      const rowColor2 = "#FFFFFF"; // Default row color (white)
      const pageHeight = doc.page.height - 50; // Height of the page minus margins

      // Draw the overall table border (around the entire table)
      doc
        .rect(
          leftMargin - 10,
          doc.y - 10,
          tableWidth + 20,
          details.length * (rowHeight + 20)
        )
        .strokeColor(borderColor)
        .lineWidth(1)
        .stroke();

      const l = details.length;
      console.log(l);
      details.forEach((detail, index) => {
        let key;
        let value;
        if (detail.search("Time of Birth") === 0) {
          key = "Time of Birth";
          value = detail.slice(14, detail.length);
        } else {
          [key, value] = detail.split(":").map((str) => str.trim());
        }

        // Check if we need to move to the next page
        if (doc.y + rowHeight > pageHeight) {
          doc.addPage(); // Add a new page if content overflows
          doc.y = 50; // Reset the vertical position after the page break
        }

        // Alternate row background color
        const rowColor = index % 2 === 0 ? rowColor1 : rowColor2;

        // Draw row background color
        doc
          .rect(leftMargin - 10, doc.y - 10, tableWidth + 20, rowHeight + 20)
          .fillColor(rowColor)
          .fill();

        // Draw left column (Key)
        doc
          .font("Helvetica-Bold")
          .fontSize(10)
          .fillColor("#000")
          .text(key, leftMargin, doc.y + 2, {
            width: rightMargin - leftMargin - 10, // Limit width to prevent overflow
            align: "left",
            lineHeight: 1, // Ensures better vertical alignment if the content is tall
            ellipsis: true, // Prevent overflow by truncating
          });

        // Draw right column (Value)
        doc
          .font("Helvetica")
          .fontSize(10)
          .fillColor("#333")
          .text(value, rightMargin, doc.y - rowHeight / 2, {
            width: tableWidth - rightMargin - 10, // Limit width to prevent overflow
            align: "left",
            lineHeight: 1, // Ensures better vertical alignment if the content is tall
            ellipsis: true, // Prevent overflow by truncating
          });

        // Draw the bottom border for the row (horizontal line)
        // while (index < details.length) {
        if (index + 1 === l) {
        } else {
          doc
            .moveTo(leftMargin - 10, doc.y + 10)
            .lineTo(leftMargin + tableWidth + 10, doc.y + 10)
            .strokeColor(borderColor)
            .lineWidth(0.5)
            .stroke();
        }

        // Move down to the next row
        if (index + 1 === l) {
          return;
        } else {
          doc.y += rowHeight;
        } // Move to the next row
        // }
      });

      // Draw the bottom border for the entire table
      doc.moveDown();
    };
    // Divider
    const addDivider = () => {
      doc.moveTo(40, doc.y).lineTo(570, doc.y).stroke("#e0e0e0").moveDown(1);
    };

    doc.x = 20;
    // Basic Information Section
    sectionHeader("Basic Information");
    addDetails([
      `Name: ${profile.firstName} ${profile.middleName || ""} ${
        profile.lastName
      }`,
      `Gender: ${profile.gender}`,
      `Age: ${profile.age}`,
      `Mobile Number: ${
        isAdmin
          ? "+91-" + profile.mobileNumber
          : maskDetails(`+91${profile.mobileNumber}`)
      }`,
      `Email: ${
        isAdmin ? profile.email : maskDetails(profile.email) || "Not specified"
      }`,
      `Address: ${
        isAdmin
          ? profile.contactAddress +
            ", " +
            profile.city +
            ", " +
            profile.state +
            ", " +
            profile.country
          : profile.state + ", " + profile.country
      }`,
    ]);
    addDivider();

    doc.moveDown(2);
    doc.x = 20;
    // Professional Details Section
    sectionHeader("Professional Details");
    addDetails([
      `Highest Degree: ${profile.highestDegree}`,
      `Company Name: ${profile.companyName || "Not specified"}`,
      `Employed In: ${profile.employedIn}`,
      `Annual Income: ${profile.annualIncome} INR`,
    ]);
    addDivider();
    doc.moveDown(2);
    doc.addPage();
    doc.y = 50;
    doc.x = 20;
    // Personal Details Section
    sectionHeader("Personal Details");
    addDetails([
      `Date of Birth: ${new Date(profile.dateOfBirth).toLocaleDateString()}`,
      `Time of Birth: ${profile.timeOfBirth}`,
      `Place of Birth: ${profile.placeOfBirth || "Not specified"}`,
      `Height: ${profile.height} cm`,
      `Weight: ${profile.weight || "Not specified"} kg`,
      `Complexion: ${profile.complexion}`,
      `Mother Tongue: ${profile.motherTongue}`,
      `Religion: ${profile.religion}`,
      `Caste: ${profile.caste}`,
      `Sub-Caste: ${profile.subCaste || "Not specified"}`,
      `Mangalik: ${profile.mangalik}`,
      `Marital Status: ${profile.maritalStatus}`,
      `Gotra: ${profile.gotra || "Not specified"}`,
    ]);
    addDivider();
    doc.moveDown(2);
    doc.addPage();
    doc.y = 50;
    doc.x = 20;
    // Family Details Section
    sectionHeader("Family Details");
    addDetails([
      `Father's Name: ${profile.fatherName}`,
      `Father's Occupation: ${profile.fatherOccupation}`,
      `Mother's Name: ${profile.motherName}`,
      `Mother's Occupation: ${profile.motherOccupation || "Not specified"}`,
      `Family Type: ${profile.familyType}`,
      `Family Values: ${profile.familyValues}`,
      `Native Place: ${profile.nativePlace || "Not specified"}`,
    ]);
    addDivider();
    doc.moveDown(2);
    doc.x = 20;
    // Lifestyle Preferences Section
    sectionHeader("Lifestyle Preferences");
    addDetails([
      `Diet: ${profile.diet}`,
      `Smoke: ${profile.smoke}`,
      `Drink: ${profile.drink}`,
      `Hobbies: ${profile.hobbies?.join(", ") || "Not specified"}`,
      `Interests: ${profile.interests?.join(", ") || "Not specified"}`,
    ]);
    addDivider();
    doc.moveDown(2);
    // Finalizing PDF
    doc.end();

    // Handle different export types
    writeStream.on("finish", async () => {
      if (type === "pdf") {
        return res.download(
          pdfPath,
          `profile_${profile.firstName}_${profile.lastName}_${id.slice(-4)}`,
          (err) => {
            if (err) console.error("Error downloading file:", err);
            fs.unlinkSync(pdfPath); // Clean up
          }
        );
      } else if (type === "email") {
        if (!email) {
          return res
            .status(400)
            .json({ message: "Recipient email is required." });
        }

        // Configure email transporter
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          service: "Gmail",
          auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        // Send email
        const mailOptions = {
          from: '"Soul 2 Soul Matrimony" <noreply@soul2soul.com>',
          to: email,
          subject: "Matrimony Profile Details",
          text: `Please find attached the matrimony profile for ${profile.firstName} ${profile.lastName}.`,
          attachments: [{ filename: `profile_${id}.pdf`, path: pdfPath }],
        };

        transporter.sendMail(mailOptions, (error, info) => {
          fs.unlinkSync(pdfPath); // Clean up
          if (error) {
            return res
              .status(500)
              .json({ message: "Error sending email.", error });
          }
          res.status(200).json({ message: "Email sent successfully.", info });
        });
      } else {
        fs.unlinkSync(pdfPath); // Clean up
        res.status(400).json({ message: "Invalid export type." });
      }
    });
  } catch (error) {
    console.error("Error exporting profile:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { exportProfile };
