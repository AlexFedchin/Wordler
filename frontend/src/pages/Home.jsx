import React from "react";
import { Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import FilledButton from "../components/FilledButton";
import SectionSubheading from "../components/SectionSubheading";
import WordLists from "@mui/icons-material/AssignmentOutlined";
import Game from "@mui/icons-material/PsychologyAltOutlined";
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
      }}
    >
      {/* Website title */}
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

      {/* Website slogan */}
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
        <Box width={"100%"}>
          <SectionSubheading text={"Hello, " + user.nickname + "!"} />
          <Typography
            align="center"
            sx={{
              width: "100%",
              fontSize: "x-large",
              color: "var(--accent-color)",
              fontFamily: "TextFont",
            }}
          >
            What are you up to?
          </Typography>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              width: "fit-content",
              gap: 16,
              padding: "24px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                height: "280px",
                width: "250px",
                cursor: "pointer",
                transition: "color 0.3s ease, filter 0.3s ease",
                "&:hover": {
                  color: "var(--accent-color)",
                  filter:
                    "drop-shadow(0 0 4px var(--accent-color)) drop-shadow(0 0 16px var(--accent-color))",
                },
              }}
              onClick={() => {
                navigate("/wordlists");
              }}
            >
              <WordLists
                sx={{
                  color: "var(--off-white-color)",
                  fontSize: "240px",
                }}
              />
              <Typography
                align="center"
                sx={{
                  width: "100%",
                  fontSize: "x-large",
                  color: "var(--off-white-color)",
                  fontFamily: "TextFont",
                }}
              >
                Write down words
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                height: "280px",
                width: "250px",
                cursor: "pointer",
                transition: "color 0.3s ease, filter 0.3s ease",
                "&:hover": {
                  color: "var(--accent-color)",
                  filter:
                    "drop-shadow(0 0 4px var(--accent-color)) drop-shadow(0 0 16px var(--accent-color))",
                },
              }}
              onClick={() => {
                navigate("/play");
              }}
            >
              <Game
                sx={{
                  color: "var(--off-white-color)",
                  fontSize: "240px",
                }}
              />
              <Typography
                align="center"
                sx={{
                  width: "100%",
                  fontSize: "x-large",
                  color: "var(--off-white-color)",
                  fontFamily: "TextFont",
                }}
              >
                Practice knowledge
              </Typography>
            </Box>
          </Container>
        </Box>
      )}

      <SectionSubheading text={"How does it work?"} mt="100px" />

      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "fit-content",
          gap: 20,
          padding: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "280px",
            width: "260px",
            cursor: "default",
            transition: "color 0.3s ease, filter 0.3s ease",
          }}
        >
          <SectionSubheading text={"1"} color={"var(--accent-color)"} />
          <Typography
            align="center"
            sx={{
              fontSize: "x-large",
              color: "var(--off-white-color)",
              fontFamily: "TextFont",
            }}
          >
            Create an account on Wordler. Remember the password!
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "280px",
            width: "260px",
            cursor: "default",
            transition: "color 0.3s ease, filter 0.3s ease",
          }}
        >
          <SectionSubheading text={"2"} color={"var(--accent-color)"} />
          <Typography
            align="center"
            sx={{
              fontSize: "x-large",
              color: "var(--off-white-color)",
              fontFamily: "TextFont",
            }}
          >
            Create a list {"("}or many of them?
            {")"} of words that you need to learn.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "280px",
            width: "260px",
            cursor: "default",
            transition: "color 0.3s ease, filter 0.3s ease",
          }}
        >
          <SectionSubheading text={"3"} color={"var(--accent-color)"} />
          <Typography
            align="center"
            sx={{
              fontSize: "x-large",
              color: "var(--off-white-color)",
              fontFamily: "TextFont",
            }}
          >
            Choose a list that you want to practice and play fun games to
            remember them!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
