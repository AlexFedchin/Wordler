import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { useUser } from "../UserContext";
import config from "../config";
import SectionSubheading from "../components/SectionSubheading";

const WordLists = () => {
  const { user } = useUser();
  const [wordLists, setWordLists] = useState([]);

  useEffect(() => {
    const fetchWordLists = async () => {
      try {
        const response = await axios.get(
          `${config.API_BASE_URL}users/${user.id}/wordlists`
        );
        setWordLists(response.data);
      } catch (error) {
        console.error("Error fetching word lists:", error);
      }
    };

    fetchWordLists();
  }, [user.id]);

  const handleCardClick = (listId) => {
    // Navigate to the edit page for the specific list
    // history.push(`/wordLists/${listId}/edit`);
  };

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
      <SectionSubheading text="Word Lists" />
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: 4,
          padding: "24px",
        }}
      >
        {wordLists.map((list) => (
          <Card
            key={list.id}
            sx={{
              width: "300px",
              cursor: "pointer",
              bgcolor: "var(--off-white-color)",
              borderRadius: "10px",
              transition: "all 0.3s ease",
              "&:hover": {
                opacity: 0.9,
              },
            }}
            onClick={() => handleCardClick(list.id)}
          >
            <CardContent sx={{ mx: 2 }}>
              <Typography
                align="center"
                sx={{
                  fontSize: "x-large",
                  color: "var(--off-black-color)",
                  fontFamily: "AccentFont",
                  fontWeight: 900,
                }}
              >
                {list.title}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <Typography
                  sx={{
                    color: "var(--accent-color)",
                    fontFamily: "TextFont",
                    fontSize: "x-large",
                    fontWeight: 700,
                  }}
                >
                  {list.originLanguage}
                </Typography>
                <Typography
                  sx={{
                    color: "var(--accent-color)",
                    fontFamily: "TextFont",
                    fontSize: "x-large",
                    fontWeight: 700,
                  }}
                >
                  {list.targetLanguage}
                </Typography>
              </Box>
              <Box>
                {list.words.slice(0, 5).map((word, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "TextFont",
                        fontSize: "large",
                        fontWeight: 600,
                      }}
                    >
                      {word.originWord}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "TextFont",
                        fontSize: "large",
                        fontWeight: 600,
                      }}
                    >
                      {word.targetWord}
                    </Typography>
                  </Box>
                ))}
                {list.words.length > 5 && (
                  <Typography
                    sx={{
                      mt: 2,
                      textAlign: "center",
                      color: "var(--accent-color)",
                      fontFamily: "TextFont",
                      fontSize: "large",
                    }}
                  >
                    + {list.words.length - 5} more
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}

        <IconButton
          sx={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
          }}
          onClick={() => {
            // Handle adding a new list
          }}
        >
          <AddCircleOutlineIcon
            sx={{
              color: "var(--accent-color)",
              fontSize: "64px",
              transition: "all 0.3s ease",
              "&:hover": {
                filter:
                  "drop-shadow(0 0 4px var(--accent-color)) drop-shadow(0 0 18px var(--accent-color))",
              },
            }}
          />
        </IconButton>
      </Container>
    </Container>
  );
};

export default WordLists;
