const express = require("express");
const fs = require("fs");
const path = require("path");
const wordLists = require("../data/wordLists.json");

const router = express.Router();

// Route to get data for a specific word list
router.get("/:id", (req, res) => {
  const wordListId = parseInt(req.params.id);
  const wordList = wordLists.find((list) => list.id === wordListId);

  if (!wordList) {
    return res.status(404).send("Word list not found");
  }

  res.json(wordList);
});

// Route to save data for a specific word list
router.put("/:id", (req, res) => {
  const wordListId = parseInt(req.params.id);
  const { title, nativeLanguage, foreignLanguage, words } = req.body;

  // Find the word list
  const wordListIndex = wordLists.findIndex((list) => list.id === wordListId);

  if (wordListIndex === -1) {
    return res.status(404).send("Word list not found");
  }

  // Update the word list
  wordLists[wordListIndex] = {
    ...wordLists[wordListIndex],
    title,
    nativeLanguage,
    foreignLanguage,
    words,
  };

  // Save the updated word lists back to the file
  fs.writeFile(
    path.join(__dirname, "../data/wordLists.json"),
    JSON.stringify(wordLists, null, 2),
    (err) => {
      if (err) {
        return res.status(500).send("Error saving word list");
      }

      res.json(wordLists[wordListIndex]);
    }
  );
});

module.exports = router;
