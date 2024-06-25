import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here
    navigate("/");
  };

  return (
    <Box
      sx={{
        width: "200px",
        height: "70vh",
        backgroundColor: "var(--black-color)",
        opacity: 0.5,
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "absolute",
        top: "50%",
        left: "6%",
        transform: "translate(-50%, -50%)",
        transition: "all 0.3s ease",
        "&:hover": {
          opacity: 1,
        },
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "large",
          marginBottom: "16px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/profile")}
      >
        My Profile
      </Typography>
      <Typography
        sx={{
          color: "white",
          fontSize: "large",
          marginBottom: "16px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/word-lists")}
      >
        Word Lists
      </Typography>
      <Typography
        sx={{
          color: "white",
          fontSize: "large",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        Logout
      </Typography>
    </Box>
  );
};

export default Sidebar;
