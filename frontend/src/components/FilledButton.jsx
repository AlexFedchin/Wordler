import React from "react";
import { Button, CircularProgress } from "@mui/material";

const FilledButton = ({
  text,
  onClick,
  width = 300,
  height,
  fontSize = "20px",
  mt = "8px",
  mr = "0px",
  ml = "0px",
  mb = "0px",
  children,
  mainColor = "var(--accent-color)",
  isLoading = false,
  disabled = false,
}) => {
  return (
    <Button
      variant="outlined"
      onClick={!disabled ? onClick : undefined}
      sx={{
        mt: 7,
        height: height && height,
        width: width,
        fontFamily: "ButtonFont",
        fontSize: fontSize,
        fontWeight: 700,
        borderRadius: "5px",
        padding: "10px 20px",
        marginTop: mt,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        cursor: disabled ? "auto" : "pointer",
        color: disabled ? "var(--off-black-color)" : mainColor,
        backgroundColor: "transparent",
        border: `1px solid ${disabled ? "var(--off-black-color)" : mainColor}`,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: disabled ? "transparent" : mainColor,
          border: `1px solid ${
            disabled ? "var(--off-black-color)" : mainColor
          }`,
          color: disabled ? "var(--off-black-color)" : "var(--off-white-color)",
          boxShadow:
            !disabled &&
            `0 0 2px ${mainColor}, 0 0 8px ${mainColor}, 0 0 18px ${mainColor}`,
        },
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <CircularProgress
          size={35}
          sx={{
            color: mainColor,
          }}
        />
      ) : (
        children || text
      )}
    </Button>
  );
};

export default FilledButton;
