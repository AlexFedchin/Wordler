import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext";
import FilledButton from "../components/FilledButton";
import CustomTextField from "../components/CustomTextField";
import SectionSubheading from "../components/SectionSubheading";
import API_BASE_URL from "../config";

function Login() {
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(API_BASE_URL + "users/");
      const existingUsers = response.data;
      console.log("Existing users:", existingUsers);
      const foundUser = existingUsers.find(
        (user) => user.nickname === nickname && user.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        setError("Login successful");
        console.log("Logged in as:", foundUser);
        navigate("/");
      } else {
        setError("Wrong nickname or password");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
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
      <SectionSubheading text={"Login to Play"} />

      {/* Box for the form */}
      <Box padding={2} width={"500px"}>
        <form onSubmit={handleSubmit}>
          {/* Nickname TextField */}
          <CustomTextField
            label="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* Password TextField */}
          <CustomTextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            showPassword={showPassword}
            onToggleShowPassword={handleClickShowPassword}
            mb="16px"
            onKeyDown={handleKeyDown}
          />

          {/* Error message display */}
          {error && (
            <Typography
              align="center"
              fullWidth
              sx={{
                mt: 0,
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
            type="submit"
            width="100%"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            mt="16px"
            disabled={nickname === "" || password === ""}
            isLoading={loading}
            text={"Login"}
          />

          {/* Row with registration suggestion */}
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
                  textShadow:
                    "0 0 4px var(--accent-color), 0 0 8px var(--accent-color), 0 0 16px var(--accent-color)",
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
