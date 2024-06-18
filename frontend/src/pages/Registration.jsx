import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import FilledButton from "../components/FilledButton";
import CustomTextField from "../components/CustomTextField";
import SectionSubheading from "../components/SectionSubheading";
import { useUser } from "../UserContext";
import axios from "axios";
import API_BASE_URL from "../config";

function Registration() {
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();
  const passwordMinLength = 7;
  const nicknameMinLength = 4;
  const nicknameMaxLength = 12;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}register/`, {
        nickname,
        password,
      });

      if (response.status === 201) {
        console.log("Registration successful");
        // Login as a newly created user
        try {
          const response = await axios.get(API_BASE_URL + "users/");
          const existingUsers = response.data;
          console.log("Existing users:", existingUsers);
          const foundUser = existingUsers.find(
            (user) => user.nickname === nickname && user.password === password
          );

          if (foundUser) {
            setUser(foundUser);
            console.log("Logged in as:", foundUser);
            navigate("/");
          } else {
            console.log("Error logging in as a created user");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Something went wrong. Try again later.");
        }
        setNickname("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError(
        error.response?.data?.error || "Something went wrong. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
      <SectionSubheading text={"Register a New User"} />
      <Box padding={2} width={"30vw"} maxWidth={"600px"} minWidth={"300px"}>
        <form onSubmit={handleSubmit}>
          {/* Nickname TextField */}
          <CustomTextField
            label="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          {nickname !== "" && nickname.length < nicknameMinLength && (
            <Typography
              align="left"
              fullWidth
              sx={{
                fontSize: "large",
                color: "var(--error-color)",
                fontFamily: "TextFont",
              }}
            >
              Nickname should be at least {nicknameMinLength} characters long
            </Typography>
          )}
          {nickname.length > nicknameMaxLength && (
            <Typography
              align="left"
              fullWidth
              sx={{
                fontSize: "large",
                color: "var(--error-color)",
                fontFamily: "TextFont",
              }}
            >
              Nickname should be no more than {nicknameMaxLength} characters
              long
            </Typography>
          )}
          {/* Password TextField */}
          <CustomTextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            showPassword={showPassword}
            onToggleShowPassword={handleClickShowPassword}
          />
          {password !== "" && password.length < passwordMinLength && (
            <Typography
              align="left"
              fullWidth
              sx={{
                fontSize: "large",
                color: "var(--error-color)",
                fontFamily: "TextFont",
              }}
            >
              Passwords should be at least {passwordMinLength} characters long
            </Typography>
          )}
          {/* Confirm Password TextField */}
          <CustomTextField
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={showConfirmPassword ? "text" : "password"}
            showPassword={showConfirmPassword}
            onToggleShowPassword={handleClickShowConfirmPassword}
            mb={
              password !== confirmPassword &&
              confirmPassword !== "" &&
              password !== ""
                ? "4px"
                : "16px"
            }
          />
          {password !== confirmPassword &&
            confirmPassword !== "" &&
            password !== "" && (
              <Typography
                align="left"
                fullWidth
                sx={{
                  fontSize: "large",
                  color: "var(--error-color)",
                  fontFamily: "TextFont",
                  marginBottom: "0px",
                }}
              >
                Passwords do not match
              </Typography>
            )}
          {error && (
            <Typography
              align="center"
              width={"100%"}
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
          <FilledButton
            onClick={handleSubmit}
            width="100%"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            mt="16px"
            disabled={
              nickname.length < nicknameMinLength ||
              password.length < passwordMinLength ||
              password !== confirmPassword ||
              password === "" ||
              confirmPassword === "" ||
              nickname === "" ||
              nickname.length > nicknameMaxLength
            }
            isLoading={loading}
            text={"Register"}
          />
        </form>
      </Box>
    </Container>
  );
}

export default Registration;
