import React from "react";
import { Button, CircularProgress } from "@mui/material";

const FilledButton = ({
  text,
  onClick,
  width = 300,
  fontSize = "20px",
  mt = "8px",
  mr = "0px",
  ml = "0px",
  mb = "0px",
  children,
  mainColor = "var(--accent-color)",
  isLoading = false,
}) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        mt: 7,
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
        cursor: "pointer",
        color: mainColor,
        backgroundColor: "transparent",
        border: `1px solid ${mainColor}`,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: mainColor,
          border: `1px solid ${mainColor}`,
          color: "var(--off-white-color)",
          boxShadow: `0 0 10px ${mainColor}`,
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
