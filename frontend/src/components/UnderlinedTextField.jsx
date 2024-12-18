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
                transform: "translate(-50%, -5px) scale(1)",
                left: "50%",
                textAlign: "center",
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
        // Label styles
        "& .MuiInputLabel-root": {
          fontFamily: "TextFont",
          fontSize: "large",
          color: "var(--off-white-color)",
          transition: "color 0.3s ease",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "var(--accent-color)",
        },
        // Input text styles
        "& .MuiInputBase-input": {
          fontFamily: "TextFont",
          fontSize: "large",
          color: "var(--off-white-color)",
        },
        // Underline styles
        "& .MuiInput-underline:before": {
          borderBottom: "1px solid var(--off-white-color)",
          transition: "border-bottom-color 0.3s ease",
        },
        "&:hover .MuiInput-underline:before": {
          borderBottom: "1px solid var(--darker-accent-color)",
        },
        "&:hover .MuiInput-underline:after": {
          borderBottom: "1px solid var(--accent-color)",
        },
        ".MuiInput-underline:after": {
          borderBottom: "1px solid var(--accent-color)",
        },
      }}
      {...props}
    />
  );
};

export default UnderlinedTextField;
