import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import Circle from "@mui/icons-material/Circle";
import Logout from "@mui/icons-material/LogoutOutlined";
import Login from "@mui/icons-material/LoginOutlined";
import Register from "@mui/icons-material/AppRegistrationOutlined";
import ManageProfile from "@mui/icons-material/ManageAccountsOutlined";
import WordLists from "@mui/icons-material/AssignmentOutlined";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import CustomMenuItem from "./CustomMenuItem";

const CustomAppBar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState(null);

  // Test API call
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(API_BASE_URL + "test/")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setData(null); // Set to null if there's an error
        });
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

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
    navigate("/profile");
  };

  // Function for the "Word Lists" button
  const handleWordLists = () => {
    setAnchorEl(null);
    navigate("/wordlists");
  };

  // Function for the Logout button
  const handleLogout = () => {
    setAnchorEl(null);
    setUser(null);
    navigate("/");
  };

  // Function for the "Login" button
  const handleLogin = () => {
    setAnchorEl(null);
    navigate("/login");
  };

  // Function for the "Register" button
  const handleRegister = () => {
    setAnchorEl(null);
    navigate("/register");
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
        {/* Indicator that the API works fine */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            position: "absolute",
            left: "10%",
            transform: "translateX(-50%)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "TextFont",
              fontSize: "x-large",
              fontWeight: 500,
              marginRight: "4px",
              marginTop: "2px",
              cursor: "default",
            }}
          >
            API
          </Typography>
          <Circle
            sx={{
              color: data ? "var(--accent-color)" : "var(--error-color)",
              fontSize: "1.3rem",
            }}
          />
        </Box>

        {/* Website main heading */}
        <Typography
          onClick={() => {
            navigate("/");
          }}
          sx={{
            fontSize: "2.2rem",
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

        {/* Account button */}
        <IconButton
          onClick={handleDropdownOpen}
          sx={{
            marginLeft: "auto",
            marginRight: "15vw",
            padding: 1,
            "& .MuiSvgIcon-root": {
              fontSize: "2rem",
              color: "var(--off-white-color)",
            },
          }}
        >
          {user ? <AccountCircle /> : <AccountCircleOutlined />}

          {/* User's nickname */}
          {user && (
            <Typography
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

        {/* Dropdown menu */}
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
          {user ? (
            <>
              <CustomMenuItem
                title="My Profile"
                onClick={handleMyProfile}
                icon={<ManageProfile />}
              />
              <CustomMenuItem
                title="Word Lists"
                onClick={handleWordLists}
                icon={<WordLists />}
              />
              <CustomMenuItem
                title="Logout"
                onClick={handleLogout}
                color="var(--error-color)"
                icon={<Logout />}
              />
            </>
          ) : (
            <>
              <CustomMenuItem
                title="Login"
                onClick={handleLogin}
                icon={<Login />}
              />
              <CustomMenuItem
                title="Register"
                onClick={handleRegister}
                icon={<Register />}
              />
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
