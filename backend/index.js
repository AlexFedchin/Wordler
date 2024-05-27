const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { log } = require('console');

const app = express();

const BACKEND_PORT = 8000;

// Allow requests from the frontend domain
app.use(cors({ origin: 'http://localhost:3000' }));

// API Routes
app.listen(BACKEND_PORT, () => {
  console.log('Server is running on port ' + BACKEND_PORT);
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

app.get('/api/users', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'users.json');
  log(filePath);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json file:', err);
      res.status(500).json({ error: 'Failed to read user data' });
      return;
    }

    try {
      const users = JSON.parse(data);
      res.json(users);
    } catch (parseError) {
      console.error('Error parsing users.json file:', parseError);
      res.status(500).json({ error: 'Failed to parse user data' });
    }
  });
});
