import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { Typography, Box, AppBar, Toolbar } from "@mui/material";
import { UserProvider } from "./UserContext";
import "./styles/app.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <Box>
          <AppBar
            position="fixed"
            sx={{
              backgroundColor: "var(--black-color)",
              borderRadius: "10px",
              width: "98%",
              left: "50%",
              transform: "translateX(-50%)",
              top: "18px",
              position: "fixed",
              zIndex: 1000,
            }}
          >
            <Toolbar
              sx={{
                justifyContent: "center",
              }}
            >
              <Typography
                component="a"
                href="/"
                sx={{
                  fontSize: "40px",
                  fontWeight: 700,
                  color: "var(--off-white-color)",
                  marginTop: "10px",
                  marginBottom: "10px",
                  fontFamily: "AccentFont",
                  textDecoration: "none",
                }}
              >
                WORDLER
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            sx={{
              mt: 12,
              maxWidth: "100%",
              paddingLeft: "2%",
              paddingRight: "2%",
              alignContent: "center",
              boxSizing: "border-box",
            }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/play" element={<Registration />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </UserProvider>
  );
}

export default App;
