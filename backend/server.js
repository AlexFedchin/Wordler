const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
const BACKEND_PORT = process.env.BACKEND_PORT || 8000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Allow requests from the frontend domain
app.use(cors({ origin: FRONTEND_URL }));

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use("/api", routes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

// Start the server
app.listen(BACKEND_PORT, () => {
  console.log("Server is running on http://localhost:" + BACKEND_PORT);
});
