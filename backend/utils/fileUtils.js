const fs = require("fs");
const path = require("path");

// Helper function to read users from the file
const readUsers = (callback) => {
  const filePath = path.join(__dirname, "../data", "users.json");
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
  const filePath = path.join(__dirname, "../data", "users.json");
  fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error("Error writing to users.json file:", err);
      callback(err);
    } else {
      callback(null);
    }
  });
};

module.exports = { readUsers, writeUsers };
