import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useUser } from "../UserContext";
import FilledButton from "../components/FilledButton";
import CustomTextField from "../components/CustomTextField";
import SectionSubheading from "../components/SectionSubheading";
import config from "../config";

const Profile = () => {
  const { user, setUser } = useUser();
  const [newNickname, setNewNickname] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Function to send a request for updating nickname
  const handleUpdateNickname = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.patch(
        config.API_BASE_URL + `users/${user.id}/nickname`,
        {
          newNickname: newNickname,
        }
      );

      if (response.status === 200) {
        setUser({ ...user, nickname: newNickname });
        setSuccess("Nickname updated successfully.");
        setNewNickname("");
      }
    } catch (error) {
      console.error("Error updating nickname:", error);
      setError("Failed to update nickname.");
    } finally {
      setLoading(false);
    }
  };

  // Function to send a request for updating password
  const handleUpdatePassword = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.patch(
        config.API_BASE_URL + `users/${user.id}/`,
        {
          currentPassword,
          newPassword,
        }
      );

      if (response.status === 200) {
        setSuccess("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
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
      <SectionSubheading text={"My Profile"} />

      <Box padding={2} width={"30vw"} maxWidth={"600px"} minWidth={"300px"}>
        <form>
          <Typography
            sx={{
              fontSize: "large",
              fontWeight: 500,
              marginBottom: "16px",
              color: "var(--off-white-color)",
              fontFamily: "TextFont",
            }}
          >
            Change Nickname
          </Typography>
          <CustomTextField
            label="New Nickname"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            mb="16px"
          />
          {newNickname !== "" &&
            (newNickname.length < config.nicknameMinLength ||
              newNickname.length > config.nicknameMaxLength) && (
              <Typography
                align="left"
                width={"100%"}
                sx={{
                  fontSize: "large",
                  color: "var(--error-color)",
                  fontFamily: "TextFont",
                }}
              >
                Nickname should be between {config.nicknameMinLength} and{" "}
                {config.nicknameMaxLength} characters long
              </Typography>
            )}
          <FilledButton
            onClick={handleUpdateNickname}
            width="100%"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            mt="16px"
            disabled={
              newNickname === "" ||
              newNickname.length < config.nicknameMinLength ||
              newNickname.length > config.nicknameMaxLength
            }
            isLoading={loading}
            text={"Update Nickname"}
          />

          <Typography
            sx={{
              fontSize: "large",
              fontWeight: 500,
              marginTop: "24px",
              marginBottom: "16px",
              color: "var(--off-white-color)",
              fontFamily: "TextFont",
            }}
          >
            Change Password
          </Typography>
          <CustomTextField
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type={showCurrentPassword ? "text" : "password"}
            showPassword={showCurrentPassword}
            onToggleShowPassword={handleClickShowCurrentPassword}
            mb="16px"
          />
          <CustomTextField
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type={showNewPassword ? "text" : "password"}
            showPassword={showNewPassword}
            onToggleShowPassword={handleClickShowNewPassword}
            mb="16px"
          />
          <FilledButton
            onClick={handleUpdatePassword}
            width="100%"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            mt="16px"
            disabled={loading}
            isLoading={loading}
            text={"Update Password"}
          />

          {error && (
            <Typography
              align="center"
              width={"100%"}
              sx={{
                mt: 2,
                fontSize: "x-large",
                color: "var(--error-color)",
                fontFamily: "TextFont",
              }}
            >
              {error}
            </Typography>
          )}

          {success && (
            <Typography
              align="center"
              width={"100%"}
              sx={{
                mt: 2,
                fontSize: "x-large",
                color: "var(--accent-color)",
                fontFamily: "TextFont",
              }}
            >
              {success}
            </Typography>
          )}
        </form>
      </Box>
    </Container>
  );
};

export default Profile;
