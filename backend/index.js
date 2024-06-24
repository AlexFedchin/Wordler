const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const BACKEND_PORT = 8000;

// Allow requests from the frontend domain
app.use(cors({ origin: "http://localhost:3000" }));

// Middleware to parse JSON
app.use(express.json());

// Helper function to read users from the file
const readUsers = (callback) => {
  const filePath = path.join(__dirname, "data", "users.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading users.json file:", err);
      callback(err, null);
    } else {
      try {
        const users = JSON.parse(data);
        callback(null, users);
      } catch (parseError) {
        console.error("Error parsing users.json file:", parseError);
        callback(parseError, null);
      }
    }
  });
};

// Helper function to write users to the file
const writeUsers = (users, callback) => {
  const filePath = path.join(__dirname, "data", "users.json");
  fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error("Error writing to users.json file:", err);
      callback(err);
    } else {
      callback(null);
    }
  });
};

// API Routes
app.listen(BACKEND_PORT, () => {
  console.log("Server is running on port " + BACKEND_PORT);
});

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

// Route to get a list of all users
app.get("/api/users", (req, res) => {
  readUsers((err, users) => {
    if (err) {
      res.status(500).json({ error: "Failed to read user data" });
    } else {
      res.json(users);
    }
  });
});

const generateUniqueId = (users) => {
  const generateId = () => Math.floor(100000 + Math.random() * 900000);
  let newId = generateId();
  while (users.some((user) => user.id === newId)) {
    newId = generateId();
  }
  return newId;
};

// Route to register a new user
app.post("/api/register", (req, res) => {
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
    const newUser = { id: newUserId, nickname, password };
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
app.patch("/api/users/:id/nickname", (req, res) => {
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
app.patch("/api/users/:id/password", (req, res) => {
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
