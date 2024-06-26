import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Box, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import config from "../config";
import SectionSubheading from "../components/SectionSubheading";
import UnderlinedTextField from "../components/UnderlinedTextField"; // Import the new component
import FilledButton from "../components/FilledButton";

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

  if (!wordList) return <SectionSubheading text={"Loading..."} />;

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
      <Box width={"40%"}>
        <UnderlinedTextField
          label="List Title"
          centered="true"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>

      <Box sx={{ width: "100%", marginTop: 2 }}>
        <Box sx={{ display: "flex", gap: 10, marginBottom: 2 }}>
          <UnderlinedTextField
            label="Origin Language"
            value={originLanguage}
            onChange={(e) => setOriginLanguage(e.target.value)}
          />
          <UnderlinedTextField
            label="Target Language"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          />
        </Box>
        {words.map((word, index) => (
          <Box key={index} sx={{ display: "flex", gap: 20, marginBottom: 2 }}>
            <UnderlinedTextField
              label=""
              value={word.originWord}
              onChange={(e) =>
                handleWordChange(index, "originWord", e.target.value)
              }
            />
            <UnderlinedTextField
              label=""
              value={word.targetWord}
              onChange={(e) =>
                handleWordChange(index, "targetWord", e.target.value)
              }
            />
          </Box>
        ))}
      </Box>
      {/* Plus icon to add a new list */}
      <IconButton
        sx={{
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
        }}
        onClick={handleAddWord}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 4,
        }}
      >
        <FilledButton
          onClick={handleCancel}
          width={"49%"}
          mainColor="var(--error-color)"
        >
          Cancel
        </FilledButton>
        <FilledButton onClick={handleSave} width={"49%"}>
          Save
        </FilledButton>
      </Box>
    </Container>
  );
};

export default WordListEditPage;
