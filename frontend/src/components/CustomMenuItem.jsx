import React from "react";
import { MenuItem, Typography } from "@mui/material";

const CustomMenuItem = ({ title, onClick, color, icon }) => {
  return (
    <MenuItem
      onClick={onClick}
      sx={{
        fontFamily: "TextFont",
        fontSize: "20px",
        display: "flex",
        alignItems: "center",
        color: color || "inherit",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "var(--off-black-color)",
        },
      }}
    >
      {icon &&
        React.cloneElement(icon, {
          sx: { fontSize: "20px", marginRight: "8px" },
        })}
      <Typography sx={{ fontFamily: "TextFont", fontSize: "20px" }}>
        {title}
      </Typography>
    </MenuItem>
  );
};

export default CustomMenuItem;
