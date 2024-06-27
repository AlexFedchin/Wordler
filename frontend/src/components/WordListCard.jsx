import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WordListCard = ({ list }) => {
  const navigate = useNavigate();

  const handleCardClick = (listId) => {
    navigate(`/wordLists/${listId}/edit`);
  };

  return (
    <Card
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
            {list.nativeLanguage}
          </Typography>
          <Typography
            sx={{
              color: "var(--accent-color)",
              fontFamily: "TextFont",
              fontSize: "x-large",
              fontWeight: 700,
            }}
          >
            {list.foreignLanguage}
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
                {word.nativeWord}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "TextFont",
                  fontSize: "large",
                  fontWeight: 600,
                }}
              >
                {word.foreignWord}
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
  );
};

export default WordListCard;
