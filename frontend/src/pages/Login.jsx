import React, { useState } from "react";
import { Container, Typography, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FilledButton from "../components/FilledButton";

function Login() {
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8000/api/";

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(API_BASE_URL + "users/")
      .then((response) => {
        const existingUsers = response.data;
        const user = existingUsers.find(
          (user) => user.nickname === nickname && user.password === password
        );
        if (user) {
          console.log("Logged in as:", user);
          setError("");
        } else {
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
    <Container
      sx={{
        padding: "24px",
        backgroundColor: "transparent",
        borderRadius: "10px",

        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center the items vertically
        justifyContent: "center", // Center the items horizontally
      }}
    >
      <Typography
        align="center"
        sx={{
          fontSize: "40px",
          fontWeight: 500,
          color: "var(--off-white-color)",
          fontFamily: "AccentFont",
          marginBottom: "32px",
          marginTop: "40px",
        }}
      >
        Login to your account to play
      </Typography>
      <Box maxWidth={"2000px"} mt={2} padding={2}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nickname"
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            sx={{
              // Border styles
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--accent-color)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--darker-accent-color)",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--off-white-color)",
                transition: "all 0.3s ease",
              },
              // Label styles
              "& .MuiInputLabel-root": {
                color: "var(--off-white-color)",
                fontFamily: "TextFont",
                fontSize: "large",
                transition: "all 0.3s ease",
              },
              "&:hover .MuiInputLabel-root": {
                color: "var(--darker-accent-color)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--accent-color)",
              },
              // Input text color
              "& .MuiInputBase-input": {
                color: "var(--off-white-color)",
                fontFamily: "TextFont",
                fontSize: "large",
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
            sx={{
              // Border styles
              "& .MuiOutlinedInput-root": {
                borderColor: "var(--off-white-color)",
                transition: "border-color 0.3s ease",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--accent-color)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--darker-accent-color)",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--off-white-color)",
              },
              // Label styles
              "& .MuiInputLabel-root": {
                color: "var(--off-white-color)",
                fontFamily: "TextFont",
                fontSize: "large",
                "&.Mui-focused": {
                  color: "var(--accent-color)",
                },
                "&:hover": {
                  color: "var(--darker-accent-color)",
                },
              },
              // Input text color
              "& .MuiInputBase-input": {
                color: "var(--off-white-color)",
                fontFamily: "TextFont",
                fontSize: "large",
              },
            }}
          />
          {error && (
            <Typography
              align="center"
              fullWidth
              sx={{
                my: 1,
                mx: 7,
                fontSize: "x-large",
                color: "var(--error-color)",
                fontFamily: "TextFont",
              }}
            >
              {error}
            </Typography>
          )}
          <FilledButton
            text="Login"
            onClick={handleSubmit}
            width="100%"
            fontSize="20px"
          />
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
            <Typography
              align="center"
              sx={{
                fontSize: "x-large",
                color: "var(--off-white-color)",
                fontFamily: "TextFont",
              }}
            >
              Don't have an account?
            </Typography>
            <Typography
              align="center"
              onClick={() => {
                navigate("/register");
              }}
              sx={{
                fontSize: "x-large",
                color: "var(--accent-color)",
                fontFamily: "TextFont",
                textDecoration: "none",
                cursor: "pointer",
                "&:hover": {
                  textShadow: "0 0 10px var(--accent-color)",
                  transition: "text-shadow 0.3s ease",
                },
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
