import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FilledButton from "../components/FilledButton";

function Login() {
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8000/api/";

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
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
        setPassword("");
        setNickname("");
        setError("Something went wrong. Try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      sx={{
        padding: "24px",
        backgroundColor: "transparent",
        borderRadius: "10px",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Subheading of the section */}
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
      {/* Box for the form */}
      <Box
        maxWidth={"2000px"}
        mt={2}
        padding={2}
        minWidth={"500px"}
        minHeight={"500px"}
      >
        <form onSubmit={handleSubmit}>
          {/* Nickname TextField */}
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
              // Autofill background color fix
              "&:-webkit-autofill": {
                "-webkit-box-shadow":
                  "0 0 0 100px transparent inset !important",
                "-webkit-text-fill-color": "var(--off-white-color) !important",
              },
            }}
          />
          {/* Password TextField */}
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{
                      color: showPassword
                        ? "var(--accent-color)"
                        : "var(--off-white-color)",
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              // Border styles
              "& .MuiOutlinedInput-root": {
                borderColor: "var(--off-white-color)",
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
              // Autofill background color fix
              "&:-webkit-autofill": {
                "-webkit-box-shadow": "0 0 0 100px #121212 inset !important",
                "-webkit-text-fill-color": "var(--off-white-color) !important",
              },
            }}
          />
          {/* Error message display */}
          {error && (
            <Typography
              align="center"
              fullWidth
              sx={{
                my: 1,
                fontSize: "x-large",
                color: "var(--error-color)",
                fontFamily: "TextFont",
              }}
            >
              {error}
            </Typography>
          )}
          {/* Login button */}
          <FilledButton
            onClick={handleSubmit}
            width="100%"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            isLoading={loading}
            text={"Login"}
          />
          {/* {loading ? (
              <CircularProgress
                size={35}
                sx={{ color: "var(--off-white-color)" }}
              />
            ) : (
              "Login"
            )} */}
          {/* </FilledButton> */}
          {/* Registration text */}
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
