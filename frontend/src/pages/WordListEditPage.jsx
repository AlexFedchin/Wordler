import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Box, IconButton, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import config from "../config";
import SectionSubheading from "../components/SectionSubheading";
import UnderlinedTextField from "../components/UnderlinedTextField";
import FilledButton from "../components/FilledButton";
import {
  validateWordListForm,
  validateWordListLanguage,
  validateWordListTitle,
} from "../utils/validation";

const WordListEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wordList, setWordList] = useState(null);
  const [title, setTitle] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [foreignLanguage, setForeignLanguage] = useState("");
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
        setNativeLanguage(list.nativeLanguage);
        setForeignLanguage(list.foreignLanguage);
        setWords(list.words);
      } catch (error) {
        console.error("Error fetching word list:", error);
      }
    };

    fetchWordList();
  }, [id]);

  const handleAddWord = () => {
    setWords([...words, { nativeWord: "", foreignWord: "" }]);
  };

  const handleWordChange = (index, field, value) => {
    const newWords = [...words];
    newWords[index][field] = value;
    setWords(newWords);
  };

  const handleDeleteWord = (index) => {
    const newWords = words.filter((_, wordIndex) => wordIndex !== index);
    setWords(newWords);
  };

  const handleSave = async () => {
    try {
      await axios.put(`${config.API_BASE_URL}wordlists/${id}`, {
        title,
        nativeLanguage,
        foreignLanguage,
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
      {/* Title of the list */}
      <Box width={"40%"}>
        <UnderlinedTextField
          label="List Title"
          centered={true}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {validateWordListTitle(title) !== "" && (
          <Typography
            align="left"
            width={"100%"}
            sx={{
              fontSize: "large",
              color: "var(--error-color)",
              fontFamily: "TextFont",
            }}
          >
            {validateWordListTitle(title)}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Native and foreign languages */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "3%",
            alignItems: "center",
          }}
        >
          <Box width="50%">
            <UnderlinedTextField
              label="Native Language"
              value={nativeLanguage}
              centered={true}
              onChange={(e) => setNativeLanguage(e.target.value)}
            />
            {validateWordListLanguage(nativeLanguage) !== "" && (
              <Typography
                align="left"
                width="100%"
                sx={{
                  fontSize: "large",
                  color: "var(--error-color)",
                  fontFamily: "TextFont",
                }}
              >
                {validateWordListLanguage(nativeLanguage)}
              </Typography>
            )}
          </Box>

          <Box width="50%">
            <UnderlinedTextField
              label="Foreign Language"
              value={foreignLanguage}
              centered={true}
              onChange={(e) => setForeignLanguage(e.target.value)}
            />
            {validateWordListLanguage(foreignLanguage) !== "" && (
              <Typography
                align="left"
                width="100%"
                sx={{
                  fontSize: "large",
                  color: "var(--error-color)",
                  fontFamily: "TextFont",
                }}
              >
                {validateWordListLanguage(foreignLanguage)}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Rows for every word pair in the list */}
        {words.map((word, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "3%",
              "&:hover .delete-icon": {
                opacity: 1,
              },
            }}
          >
            <UnderlinedTextField
              label=""
              value={word.nativeWord}
              onChange={(e) =>
                handleWordChange(index, "nativeWord", e.target.value)
              }
            />
            <IconButton
              className="delete-icon"
              onClick={() => handleDeleteWord(index)}
              sx={{
                opacity: 0,
                transition: "all 0.3s ease",
                color: "var(--off-white-color)",
                "&:hover": {
                  color: "var(--error-color)",
                  filter:
                    "drop-shadow(0 0 4px var(--error-color)) drop-shadow(0 0 16px var(--error-color))",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
            <UnderlinedTextField
              label=""
              value={word.foreignWord}
              onChange={(e) =>
                handleWordChange(index, "foreignWord", e.target.value)
              }
            />
          </Box>
        ))}
      </Box>

      {/* Plus icon to add a new list */}
      {words.length < config.wordListMaxLength && (
        <IconButton
          sx={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            mt: 2,
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
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          mt: 4,
          mb: 8,
        }}
      >
        <FilledButton
          onClick={handleCancel}
          width={"49%"}
          height={"60px"}
          mainColor="var(--error-color)"
        >
          Cancel
        </FilledButton>
        <Box
          sx={{
            width: "49%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FilledButton
            onClick={handleSave}
            width={"100%"}
            height={"60px"}
            disabled={
              validateWordListForm(words) !== "" ||
              validateWordListTitle(title) !== "" ||
              validateWordListLanguage(nativeLanguage) !== "" ||
              validateWordListLanguage(foreignLanguage) !== ""
            }
          >
            Save
          </FilledButton>
          {validateWordListForm(words) !== "" && (
            <Typography
              align="left"
              width="100%"
              sx={{
                fontSize: "large",
                color: "var(--error-color)",
                fontFamily: "TextFont",
                mt: 2,
              }}
            >
              {validateWordListForm(words)}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default WordListEditPage;
