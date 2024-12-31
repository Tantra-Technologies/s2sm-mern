import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from "@mui/material";

const Unauthorized = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = React.useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Clean up on component unmount
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "#f9f9f9",
        p: 4,
      }}
    >
      {/* Unauthorized Message */}
      <Typography variant="h3" color="error" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        You do not have permission to view this page.
        <br />
        Redirecting to the login page in {countdown} seconds.
      </Typography>

      {/* Circular Progress */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <CircularProgress color="error" sx={{ mr: 2 }} />
        <Typography variant="body2" color="textSecondary">
          Please wait...
        </Typography>
      </Box>

      {/* Manual Redirect Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{
          bgcolor: "red",
          "&:hover": { bgcolor: "#b71c1c" },
        }}
        onClick={() => navigate("/")}
      >
        Go to Login
      </Button>
    </Box>
  );
};

export default Unauthorized;
