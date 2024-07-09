import { Container } from "@mui/material";
import React from "react";
import SectionSubheading from "../components/SectionSubheading";

function Play() {
  return (
    <Container
      sx={{
        padding: "24px",
        backgroundColor: "transparent",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Subheading of the section */}
      <SectionSubheading text={"Coming Soon..."} />;
    </Container>
  );
}

export default Play;
