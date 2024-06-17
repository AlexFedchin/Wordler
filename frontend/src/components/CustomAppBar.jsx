import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

const CustomAppBar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Function for account icon button when no user is logged in
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  // Function to open the Dropdown Menu
  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close Dropdown Menu
  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  // Function for the "My Profile" button
  const handleMyProfile = () => {
    setAnchorEl(null);
    navigate("/myprofile");
  };

  // Function for the Logout button
  const handleLogout = () => {
    setAnchorEl(null);
    setUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "var(--black-color)",
        borderRadius: "10px",
        width: "98%",
        left: "50%",
        transform: "translateX(-50%)",
        top: "18px",
        zIndex: 1000,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1 }} />
        <Typography
          onClick={() => {
            navigate("/");
          }}
          sx={{
            fontSize: "40px",
            fontWeight: 700,
            color: "var(--off-white-color)",
            marginTop: "10px",
            marginBottom: "10px",
            fontFamily: "AccentFont",
            textDecoration: "none",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            cursor: "pointer",
          }}
        >
          WORDLER
        </Typography>
        <IconButton
          onClick={!user ? handleLoginRedirect : handleDropdownOpen}
          sx={{
            marginLeft: "auto",
            marginRight: "20%",
            padding: 1,
            "& .MuiSvgIcon-root": {
              fontSize: "2rem",
              color: "var(--off-white-color)",
            },
          }}
        >
          <AccountCircle />
          {user && (
            <Typography
              onClick={handleDropdownOpen}
              sx={{
                fontSize: "x-large",
                fontWeight: 500,
                color: "var(--off-white-color)",
                fontFamily: "TextFont",
                marginLeft: "8px",
                cursor: "pointer",
              }}
            >
              {user.nickname}
            </Typography>
          )}
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleDropdownClose}
          PaperProps={{
            sx: {
              backgroundColor: "var(--black-color)",
              color: "var(--off-white-color)",
              borderRadius: "10px",
              width: "200px",
            },
          }}
        >
          <MenuItem
            onClick={handleMyProfile}
            sx={{ fontFamily: "TextFont", fontSize: "20px" }}
          >
            My Profile
          </MenuItem>
          <MenuItem
            onClick={() => navigate("/wordlists")}
            sx={{ fontFamily: "TextFont", fontSize: "20px" }}
          >
            Word Lists
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{
              display: "flex",
              alignItems: "center",
              color: "var(--error-color)",
              fontFamily: "TextFont",
              fontSize: "20px",
            }}
          >
            <Logout sx={{ fontSize: "20px", marginRight: "8px" }} />
            <Typography sx={{ fontFamily: "TextFont", fontSize: "20px" }}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
