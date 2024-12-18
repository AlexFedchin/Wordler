import React from "react";
import { Typography, Box, Container } from "@mui/material";
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
        bgcolor: "transparent",
        borderRadius: "10px",
        mb: 10,
      }}
    >
      <Box ml={4}>
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
            if (!user) {
              navigate("/login");
            } else {
              navigate("/play");
            }
          }}
          width={300}
          fontSize="20px"
          mt="40px"
        />
      </Box>

      {user && (
        <Box width={"100%"}>
          <SectionSubheading text={`Hello, ${user.nickname}!`} />

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
            {/* Write down words */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                gap: 2,
                p: 4,
                width: "245px",
                transition: "color 0.3s ease, filter 0.3s ease",
                "&:hover": {
                  filter:
                    "drop-shadow(0 0 4px var(--accent-color)) drop-shadow(0 0 16px var(--accent-color))",
                },
                background: "rgba( 64, 204, 45, 0.15 )",
                backdropFilter: "blur(6px)",
                "-webkit-backdrop-filter": "blur(6px)",
                borderRadius: "10px",
                overflow: "hidden",
              }}
              onClick={() => {
                navigate("/wordlists");
              }}
            >
              <Box
                component="img"
                src="/images/notes_icon.png"
                draggable="false"
                sx={{
                  filter:
                    "invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(85%) contrast(101%)",
                  width: "100px",
                  height: "100px",
                  ml: "10px",
                }}
              />
              <Typography
                align="center"
                sx={{
                  width: "100%",
                  fontSize: "x-large",
                  color: "var(--off-white-color)",
                  fontFamily: "TextFont",
                  userSelect: "none",
                }}
              >
                Write down words
              </Typography>
            </Box>

            {/* Practice knowledge */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                gap: 2,
                p: 4,
                width: "245px",
                transition: "color 0.3s ease, filter 0.3s ease",
                "&:hover": {
                  filter:
                    "drop-shadow(0 0 4px var(--accent-color)) drop-shadow(0 0 16px var(--accent-color))",
                },
                background: "rgba( 64, 204, 45, 0.15 )",
                backdropFilter: "blur(6px)",
                "-webkit-backdrop-filter": "blur(6px)",
                borderRadius: "10px",
                overflow: "hidden",
              }}
              onClick={() => {
                navigate("/play");
              }}
            >
              <Box
                component="img"
                src="/images/brain_icon.png"
                draggable="false"
                sx={{
                  filter:
                    "invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(85%) contrast(101%)",
                  width: "100px",
                  height: "100px",
                }}
              />
              <Typography
                align="center"
                sx={{
                  width: "100%",
                  fontSize: "x-large",
                  color: "var(--off-white-color)",
                  fontFamily: "TextFont",
                  userSelect: "none",
                }}
              >
                Practice knowledge
              </Typography>
            </Box>
          </Container>
        </Box>
      )}

      {/* Explanation section */}
      <Box
        sx={{ width: "100vw", bgcolor: "var(--accent-color)", py: 2, mt: 12 }}
      >
        <SectionSubheading
          text={"How does it work?"}
          mt="0px"
          mb="0px"
          color="var(--off-black-color)"
        />
      </Box>

      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "fit-content",
          gap: 20,
          mt: 8,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
            width: "260px",
            cursor: "default",
          }}
        >
          <SectionSubheading
            text="1"
            color="var(--accent-color)"
            sx={{ m: 0 }}
          />
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
            width: "260px",
            cursor: "default",
            gap: 4,
          }}
        >
          <SectionSubheading
            text="2"
            color="var(--accent-color)"
            sx={{ m: 0 }}
          />
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
            gap: 4,
            width: "260px",
            cursor: "default",
            transition: "color 0.3s ease, filter 0.3s ease",
          }}
        >
          <SectionSubheading
            text="3"
            color="var(--accent-color)"
            sx={{ m: 0 }}
          />
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
