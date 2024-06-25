import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import FilledButton from "../components/FilledButton";
import CustomTextField from "../components/CustomTextField";
import SectionSubheading from "../components/SectionSubheading";
import { useUser } from "../UserContext";
import axios from "axios";
import config from "../config";
import { validateNickname, validatePassword } from "../utils/validation";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${config.API_BASE_URL}users/register/`,
        {
          nickname,
          password,
        }
      );

      if (response.status === 201) {
        console.log("Registration successful");
        // Login as a newly created user
        try {
          const response = await axios.get(config.API_BASE_URL + "users/");
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
          {nickname !== "" && validateNickname(nickname) !== "" && (
            <Typography
              align="left"
              width={"100%"}
              sx={{
                fontSize: "large",
                color: "var(--error-color)",
                fontFamily: "TextFont",
              }}
            >
              {validateNickname(nickname)}
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
          {password !== "" && validatePassword(password) !== "" && (
            <Typography
              align="left"
              width={"100%"}
              sx={{
                fontSize: "large",
                color: "var(--error-color)",
                fontFamily: "TextFont",
              }}
            >
              {validatePassword(password)}
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
                width={"100%"}
                sx={{
                  fontSize: "large",
                  color: "var(--error-color)",
                  fontFamily: "TextFont",
                  marginBottom: "0px",
                }}
              >
                Passwords do not match.
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
              validateNickname(nickname) !== "" ||
              validatePassword(password) !== "" ||
              password !== confirmPassword ||
              password === "" ||
              confirmPassword === "" ||
              nickname === ""
            }
            isLoading={loading}
            text={"Register"}
          />
          {/* Row with login suggestion */}
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
              Already have an account?
            </Typography>
            <Typography
              align="center"
              onClick={() => {
                navigate("/login");
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
              Login
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default Registration;
