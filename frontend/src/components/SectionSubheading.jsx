import React from "react";
import { Typography } from "@mui/material";

const SectionSubheading = ({
  text,
  color = "var(--off-white-color)",
  sx = {},
}) => {
  return (
    <Typography
      align="center"
      sx={{
        fontSize: "40px",
        fontWeight: 500,
        color: color,
        fontFamily: "AccentFont",
        marginBottom: "24px",
        marginTop: "48px",
        marginLeft: "0px",
        marginRight: "0px",
        ...sx,
      }}
    >
      {text}
    </Typography>
  );
};

export default SectionSubheading;
