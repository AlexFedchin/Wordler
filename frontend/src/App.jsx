import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Play from "./pages/Play";
import Registration from "./pages/Registration";
import { Box } from "@mui/material";
import { UserProvider } from "./UserContext";
import CustomAppBar from "./components/CustomAppBar";
import "./styles/app.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <Box>
          <CustomAppBar />
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
              <Route path="/play" element={<Play />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </UserProvider>
  );
}

export default App;
