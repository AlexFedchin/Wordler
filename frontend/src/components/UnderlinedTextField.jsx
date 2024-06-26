import React from "react";
import { TextField } from "@mui/material";

const UnderlinedTextField = ({
  label,
  value,
  onChange,
  centered = false,
  ...props
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      variant="standard"
      InputLabelProps={
        centered
          ? {
              style: {
                transform: "translate(255%, -5px) scale(1)",
                display: "flex",
                alignItems: "center",
                fontFamily: "AccentFont",
              },
            }
          : {}
      }
      inputProps={
        centered
          ? {
              style: {
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                height: "2rem",
                fontSize: "x-large",
                fontFamily: "AccentFont",
              },
            }
          : {}
      }
      sx={{
        // Underline styles
        "& .MuiInput-underline:before": {
          borderBottomColor: "var(--off-white-color)",
          borderBottomWidth: "default",
        },
        "&:hover .MuiInput-underline:before": {
          borderBottomColor: "var(--darker-accent-color)",
          borderBottomWidth: "1px",
          transition: "0.3s ease",
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "var(--accent-color)",
        },
        "& .MuiInput-underline.Mui-disabled:before": {
          borderBottomColor: "var(--off-white-color)",
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
      {...props}
    />
  );
};

export default UnderlinedTextField;
