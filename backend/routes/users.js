const express = require("express");
const { readUsers, writeUsers } = require("../utils/fileUtils");
const { generateUniqueId } = require("../utils/userUtils");
const users = require("../data/users.json");
const wordLists = require("../data/wordLists.json");

const router = express.Router();

// Route to get word lists of a user
router.get("/:id/wordlists", (req, res) => {
  const userId = parseInt(req.params.id);

  readUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: "Failed to read user data" });
      return;
    }

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const userWordLists = wordLists.filter((list) =>
      user.wordLists.includes(list.id)
    );

    res.json(userWordLists);
  });
});

// Route to log in a user
router.post("/login", (req, res) => {
  const { nickname, password } = req.body;

  readUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: "Failed to read user data" });
      return;
    }

    const user = users.find(
      (user) => user.nickname === nickname && user.password === password
    );
    if (!user) {
      return res.status(401).json({ error: "Wrong nickname or password" });
    }

    res.json({ id: user.id, nickname: user.nickname });
  });
});

// Route to register a new user
router.post("/register", (req, res) => {
  const { nickname, password } = req.body;

  readUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: "Failed to read user data" });
      return;
    }

    const existingUser = users.find((user) => user.nickname === nickname);
    if (existingUser) {
      res.status(400).json({ error: "Nickname already taken" });
      return;
    }

    const newUserId = generateUniqueId(users);
    const newUser = { id: newUserId, nickname, password, wordLists: [] };
    users.push(newUser);

    writeUsers(users, (writeErr) => {
      if (writeErr) {
        res.status(500).json({ error: "Failed to save user data" });
      } else {
        res.status(201).json({ message: "User registered successfully" });
      }
    });
  });
});

// Update nickname
router.patch("/:id/nickname", (req, res) => {
  const { id } = req.params;
  const { newNickname } = req.body;

  readUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: "Failed to read user data" });
      return;
    }

    const userIndex = users.findIndex((user) => user.id === parseInt(id));
    if (userIndex === -1) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const existingUser = users.find((user) => user.nickname === newNickname);
    if (existingUser) {
      res.status(400).json({ error: "Nickname already taken" });
      return;
    }

    users[userIndex].nickname = newNickname;

    writeUsers(users, (writeErr) => {
      if (writeErr) {
        res.status(500).json({ error: "Failed to update user data" });
      } else {
        res.json({ message: "Nickname updated successfully" });
      }
    });
  });
});

// Update password
router.patch("/:id/password", (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  readUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: "Failed to read user data" });
      return;
    }

    const userIndex = users.findIndex((user) => user.id === parseInt(id));
    if (userIndex === -1) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    users[userIndex].password = newPassword;

    writeUsers(users, (writeErr) => {
      if (writeErr) {
        res.status(500).json({ error: "Failed to update user data" });
      } else {
        res.json({ message: "Password updated successfully" });
      }
    });
  });
});

module.exports = router;
