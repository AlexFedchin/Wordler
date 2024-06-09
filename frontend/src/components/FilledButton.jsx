import React from "react";
import { Button } from "@mui/material";

const FilledButton = ({
  text,
  onClick,
  width = 300,
  fontSize = "20px",
  mt = "8px",
  mr = "0px",
  ml = "0px",
  mb = "0px",
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
        color: "var(--accent-color)",
        backgroundColor: "transparent",
        border: "1px solid var(--accent-color)",
        "&:hover": {
          backgroundColor: "var(--accent-color)",
          border: "1px solid var(--accent-color)",
          color: "var(--off-white-color)",
          boxShadow: "0 0 10px var(--accent-color)",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default FilledButton;
