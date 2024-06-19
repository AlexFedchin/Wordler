import React from "react";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import FilledButton from "../components/FilledButton";
import SectionSubheading from "../components/SectionSubheading";
import { keyframes } from "@mui/system";

const glow = keyframes`
  0% {
    text-shadow: 0 0 2px var(--accent-color), 0 0 4px var(--accent-color);
  }
  50% {
    text-shadow: 0 0 4px var(--accent-color), 0 0 12px var(--accent-color), 0 0 16px var(--accent-color);
  }
  100% {
    text-shadow: 0 0 2px var(--accent-color), 0 0 6px var(--accent-color), 0 0 8px var(--accent-color);
  }
`;

function Home() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <Box
      sx={{
        padding: "24px",
        margin: "0px",
        bgcolor: "transparent",
        borderRadius: "10px",
        width: "100wv",
      }}
    >
      <Typography
        align="left"
        sx={{
          fontSize: "800%",
          fontWeight: 500,
          color: "var(--off-white-color)",
          fontFamily: "AccentFont",
        }}
      >
        WORDLER
      </Typography>
      <Typography
        align="left"
        sx={{
          fontSize: "x-large",
          color: "var(--off-white-color)",
          fontFamily: "TextFont",
          "& .glowing-text:hover": {
            transition: "all 0,3s ease",
            animation: `${glow} 1.5s infinite alternate`,
          },
        }}
      >
        An{" "}
        <span
          className="glowing-text"
          style={{
            fontSize: "x-large",
            color: "var(--accent-color)",
            fontFamily: "TextFont",
          }}
        >
          easy
        </span>{" "}
        way to learn{" "}
        <span
          className="glowing-text"
          style={{
            fontSize: "x-large",
            color: "var(--accent-color)",
            fontFamily: "TextFont",
          }}
        >
          difficult
        </span>{" "}
        words.
      </Typography>

      <FilledButton
        text="Play"
        onClick={() => {
          if (user == null) {
            navigate("/login");
          } else {
            navigate("/play");
          }
        }}
        width={300}
        fontSize="20px"
        mt="40px"
      />
      {user && (
        <SectionSubheading
          text={"Hello, " + user.nickname + "!"}
        ></SectionSubheading>
      )}
    </Box>
  );
}

export default Home;
