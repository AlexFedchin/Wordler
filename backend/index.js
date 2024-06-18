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

// API Routes
app.listen(BACKEND_PORT, () => {
  console.log("Server is running on port " + BACKEND_PORT);
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

app.get("/api/users", (req, res) => {
  const filePath = path.join(__dirname, "data", "users.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading users.json file:", err);
      res.status(500).json({ error: "Failed to read user data" });
      return;
    }

    try {
      const users = JSON.parse(data);
      res.json(users);
    } catch (parseError) {
      console.error("Error parsing users.json file:", parseError);
      res.status(500).json({ error: "Failed to parse user data" });
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

app.post("/api/register", (req, res) => {
  const { nickname, password } = req.body;
  const filePath = path.join(__dirname, "data", "users.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading users.json file:", err);
      res.status(500).json({ error: "Failed to read user data" });
      return;
    }

    try {
      const users = JSON.parse(data);
      const existingUser = users.find((user) => user.nickname === nickname);

      if (existingUser) {
        res.status(400).json({ error: "Nickname already taken" });
        return;
      }

      const newUserId = generateUniqueId(users);
      const newUser = { id: newUserId, nickname, password };
      users.push(newUser);

      fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
        if (writeErr) {
          console.error("Error writing to users.json file:", writeErr);
          res.status(500).json({ error: "Failed to save user data" });
          return;
        }

        res.status(201).json({ message: "User registered successfully" });
      });
    } catch (parseError) {
      console.error("Error parsing users.json file:", parseError);
      res.status(500).json({ error: "Failed to parse user data" });
    }
  });
});
