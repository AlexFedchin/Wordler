import React from "react";
import { Typography } from "@mui/material";

const SectionSubheading = ({
  text,
  mt = "48px",
  mr = "0px",
  ml = "0px",
  mb = "24px",
}) => {
  return (
    <Typography
      align="center"
      sx={{
        fontSize: "40px",
        fontWeight: 500,
        color: "var(--off-white-color)",
        fontFamily: "AccentFont",
        marginBottom: "24px",
        marginTop: "48px",
      }}
    >
      {text}
    </Typography>
  );
};

export default SectionSubheading;
