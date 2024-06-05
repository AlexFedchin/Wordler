import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { Typography, Box, AppBar, Toolbar } from "@mui/material";
import "./styles/app.css";

function App() {
  return (
    <Router>
      <Box>
        <AppBar position="fixed" className="app-bar">
          <Toolbar style={{ justifyContent: "center" }}>
            <Link to="/">
              <Typography className="global-header">WORDLER</Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Box className="content" sx={{ mt: 12 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/play" element={<Registration />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
