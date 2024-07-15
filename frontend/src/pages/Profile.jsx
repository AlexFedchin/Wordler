import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useUser } from "../UserContext";
import FilledButton from "../components/FilledButton";
import CustomTextField from "../components/CustomTextField";
import SectionSubheading from "../components/SectionSubheading";
import config from "../config";
import { validateNickname, validatePassword } from "../utils/validation";

const Profile = () => {
  const { user, setUser } = useUser();
  const [newNickname, setNewNickname] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [currentPasswordCorrect, setCurrentPasswordCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicknameSuccess, setNicknameSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Function to send a request for updating nickname
  const handleUpdateNickname = async () => {
    setLoading(true);
    setNicknameError("");
    setNicknameSuccess("");

    try {
      const response = await fetch(
        `${config.API_BASE_URL}users/${user.id}/nickname`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newNickname }),
        }
      );

      if (response.ok) {
        setUser({ ...user, nickname: newNickname });
        setNicknameSuccess("Nickname updated successfully.");
        setNewNickname("");
      } else if (response.status === 400) {
        const data = await response.json();
        setNicknameError(data.error);
      } else {
        throw new Error("Failed to update nickname.");
      }
    } catch (error) {
      console.error("Error updating nickname:", error);
      setNicknameError("Failed to update nickname.");
    } finally {
      setLoading(false);
    }
  };

  // Function to send a request for updating password
  const handleUpdatePassword = async () => {
    setLoading(true);
    setPasswordError("");
    setPasswordSuccess("");

    try {
      const response = await fetch(
        `${config.API_BASE_URL}users/${user.id}/password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (response.ok) {
        setPasswordSuccess("Password updated successfully.");
        setNewPassword("");
        setCurrentPasswordCorrect(false);
      } else {
        throw new Error("Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setPasswordError("Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  // Function to verify the current password
  const handleVerifyCurrentPassword = async () => {
    setLoading(true);
    setPasswordError("");
    setPasswordSuccess("");

    try {
      const response = await fetch(
        `${config.API_BASE_URL}users/${user.id}/verify-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currentPassword }),
        }
      );

      if (response.ok) {
        setCurrentPasswordCorrect(true);
        setCurrentPassword("");
        setPasswordError("");
      } else {
        throw new Error("Password incorrect.");
      }
    } catch (error) {
      console.error("Error verifying current password:", error);
      setPasswordError("Password incorrect.");
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

  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") {
      action();
    }
  };

  return (
    <Container>
      <Container
        sx={{
          padding: "24px",
          width: "100%",
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
          {/* Form to change nickname */}
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
              onKeyDown={
                newNickname !== "" && validateNickname(newNickname) === ""
                  ? (e) => handleKeyPress(e, handleUpdateNickname)
                  : undefined
              }
            />
            {newNickname !== "" && validateNickname(newNickname) !== "" && (
              <Typography
                align="left"
                width={"100%"}
                sx={{
                  fontSize: "large",
                  color: "var(--error-color)",
                  fontFamily: "TextFont",
                }}
              >
                {validateNickname(newNickname)}
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
                newNickname === "" || validateNickname(newNickname) !== ""
              }
              isLoading={loading}
              text={"Update Nickname"}
            />
            {nicknameError && (
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
                {nicknameError}
              </Typography>
            )}

            {nicknameSuccess && (
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
                {nicknameSuccess}
              </Typography>
            )}
          </form>

          {/* Form to change password */}
          <form>
            <Typography
              sx={{
                fontSize: "large",
                fontWeight: 500,
                marginTop: 10,
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
              disabled={currentPasswordCorrect ? true : false}
              onToggleShowPassword={handleClickShowCurrentPassword}
              onKeyDown={(e) => handleKeyPress(e, handleVerifyCurrentPassword)}
              mb="16px"
            />

            <CustomTextField
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type={showNewPassword ? "text" : "password"}
              disabled={currentPasswordCorrect ? false : true}
              showPassword={showNewPassword}
              onToggleShowPassword={handleClickShowNewPassword}
              onKeyDown={(e) => handleKeyPress(e, handleUpdatePassword)}
              mb="16px"
            />
            {newPassword !== "" && validatePassword(newPassword) !== "" && (
              <Typography
                align="left"
                width={"100%"}
                sx={{
                  fontSize: "large",
                  color: "var(--error-color)",
                  fontFamily: "TextFont",
                }}
              >
                {validatePassword(newPassword)}
              </Typography>
            )}
            {currentPasswordCorrect ? (
              <FilledButton
                onClick={handleUpdatePassword}
                width="100%"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                mt="16px"
                disabled={
                  newPassword === "" || validatePassword(newPassword) !== ""
                }
                isLoading={loading}
                text={"Update Password"}
              />
            ) : (
              <FilledButton
                onClick={handleVerifyCurrentPassword}
                width="100%"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                mt="16px"
                disabled={currentPassword === ""}
                isLoading={loading}
                text={"Submit"}
              />
            )}
            {passwordError && (
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
                {passwordError}
              </Typography>
            )}
            {passwordSuccess && (
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
                {passwordSuccess}
              </Typography>
            )}
          </form>
        </Box>
      </Container>
    </Container>
  );
};

export default Profile;
