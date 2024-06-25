const express = require("express");
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

module.exports = router;
