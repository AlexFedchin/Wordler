import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
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
import Register from "@mui/icons-material/PersonAddOutlined";
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
        .get(config.API_BASE_URL + "test/")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setData(null);
        });
    };

    fetchData();
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

  // Function to navigate user according to menu options chosen
  const handleNavigate = (path) => {
    handleDropdownClose();
    navigate(path);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "var(--black-color)",
        height: "80px",
        zIndex: 1000,
      }}
    >
      <Toolbar
        sx={{
          height: "100%",
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
            marginRight: "10%",
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
          {user
            ? [
                <CustomMenuItem
                  key="profile"
                  title="My Profile"
                  onClick={() => {
                    handleNavigate("/profile");
                  }}
                  icon={<ManageProfile />}
                />,
                <CustomMenuItem
                  key="wordlists"
                  title="Word Lists"
                  onClick={() => {
                    handleNavigate("/wordlists");
                  }}
                  icon={<WordLists />}
                />,
                <CustomMenuItem
                  key="logout"
                  title="Logout"
                  onClick={() => {
                    handleNavigate("/");
                    setUser(null);
                  }}
                  color="var(--error-color)"
                  icon={<Logout />}
                />,
              ]
            : [
                <CustomMenuItem
                  key="login"
                  title="Login"
                  onClick={() => {
                    handleNavigate("/login");
                  }}
                  icon={<Login />}
                />,
                <CustomMenuItem
                  key="register"
                  title="Register"
                  onClick={() => {
                    handleNavigate("/register");
                  }}
                  icon={<Register />}
                />,
              ]}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
