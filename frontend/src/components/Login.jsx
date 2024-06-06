import React, { useState } from "react";
import { Button, Container, Typography, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import axios from "axios";

function Login() {
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8000/api/";

  const handleSubmit = (event) => {
    event.preventDefault();
    // Fetch existing users
    axios
      .get(API_BASE_URL + "users/")
      .then((response) => {
        const existingUsers = response.data;
        // Find user with matching nickname and password
        const user = existingUsers.find(
          (user) => user.nickname === nickname && user.password === password
        );
        if (user) {
          // User found, assign currentUser to user data
          // Here you can use the user data as needed
          console.log("Logged in as:", user);
          setError("");
        } else {
          // User not found, clear form data and show error message
          setPassword("");
          setError("Wrong nickname or password");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Something went wrong. Try again later.");
      });
  };

  return (
    <Container className="container">
      <Typography className="subheading" align="center">
        Login to your account to play
      </Typography>
      <Box display="flex" justifyContent="center" mt={2}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nickname"
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="text-field"
            InputProps={{
              classes: {
                input: "text-field-input",
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="text-field"
            InputProps={{
              classes: {
                input: "text-field-input",
              },
            }}
          />
          {error && (
            <Typography className="error" align="center" sx={{ mt: 4 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            className="button contained"
            sx={{ mt: 4 }}
            fullWidth
          >
            Login
          </Button>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              mt: 2,
              gap: 1,
            }}
          >
            <Typography className="typography" align="center">
              Don't have an account?
            </Typography>
            <Typography
              className="clickable-highlight"
              align="center"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
