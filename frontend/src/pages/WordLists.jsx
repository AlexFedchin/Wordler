import React, { useState, useEffect } from "react";
import { Container, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { useUser } from "../UserContext";
import config from "../config";
import SectionSubheading from "../components/SectionSubheading";
import WordListCard from "../components/WordListCard";

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

  return (
    // Global container for vertical alignment
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

      {/* Container for cards*/}
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-center",
          justifyContent: "flex-center",
          flexWrap: "wrap",
          width: "fit-content",
          gap: 4,
          padding: "24px",
        }}
      >
        {wordLists.map((list) => (
          <WordListCard key={list.id} list={list} />
        ))}

        {/* Plus icon to add a new list */}
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
