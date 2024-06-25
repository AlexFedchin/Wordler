import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, TextField, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import config from "../config";

const WordListEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wordList, setWordList] = useState(null);
  const [title, setTitle] = useState("");
  const [originLanguage, setOriginLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchWordList = async () => {
      try {
        const response = await axios.get(
          `${config.API_BASE_URL}wordlists/${id}`
        );
        const list = response.data;
        setWordList(list);
        setTitle(list.title);
        setOriginLanguage(list.originLanguage);
        setTargetLanguage(list.targetLanguage);
        setWords(list.words);
      } catch (error) {
        console.error("Error fetching word list:", error);
      }
    };

    fetchWordList();
  }, [id]);

  const handleAddWord = () => {
    setWords([...words, { originWord: "", targetWord: "" }]);
  };

  const handleWordChange = (index, field, value) => {
    const newWords = [...words];
    newWords[index][field] = value;
    setWords(newWords);
  };

  const handleSave = async () => {
    try {
      await axios.put(`${config.API_BASE_URL}wordlists/${id}`, {
        title,
        originLanguage,
        targetLanguage,
        words,
      });
      navigate("/wordLists");
    } catch (error) {
      console.error("Error saving word list:", error);
    }
  };

  const handleCancel = () => {
    navigate("/wordLists");
  };

  if (!wordList) return <Typography>Loading...</Typography>;

  return (
    <Container
      sx={{
        padding: "24px",
        backgroundColor: "transparent",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        label="List Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Origin Language"
        value={originLanguage}
        onChange={(e) => setOriginLanguage(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Target Language"
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box sx={{ width: "100%", marginTop: 2 }}>
        {words.map((word, index) => (
          <Box key={index} sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
            <TextField
              label="Origin Word"
              value={word.originWord}
              onChange={(e) =>
                handleWordChange(index, "originWord", e.target.value)
              }
              fullWidth
            />
            <TextField
              label="Target Word"
              value={word.targetWord}
              onChange={(e) =>
                handleWordChange(index, "targetWord", e.target.value)
              }
              fullWidth
            />
          </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddWord}
        sx={{ marginTop: 2 }}
      >
        Add Word
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 4,
        }}
      >
        <Button variant="contained" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Container>
  );
};

export default WordListEditPage;
