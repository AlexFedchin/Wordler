const express = require('express');
const cors = require('cors');

const app = express();

const BACKEND_PORT = 8000;

// Allow requests from the frontend domain
app.use(cors({ origin: 'http://localhost:5173' }));

// API Routes
app.listen(BACKEND_PORT, () => {
  console.log('Server is running on port ' + BACKEND_PORT);
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});
