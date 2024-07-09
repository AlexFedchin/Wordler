import React from "react";
import { Typography } from "@mui/material";

const SectionSubheading = ({
  text,
  mt = "48px",
  mr = "0px",
  ml = "0px",
  mb = "24px",
  color = "var(--off-white-color)",
}) => {
  return (
    <Typography
      align="center"
      sx={{
        fontSize: "40px",
        fontWeight: 500,
        color: color,
        fontFamily: "AccentFont",
        marginBottom: mb,
        marginTop: mt,
        marginLeft: ml,
        marginRight: mr,
      }}
    >
      {text}
    </Typography>
  );
};

export default SectionSubheading;
