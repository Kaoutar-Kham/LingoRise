const express = require("express");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/authRoutes");
const languageRoutes = require("./routes/languageRoutes");
const studySessionRoutes = require("./routes/studySessionRoutes");
const goalRoutes = require("./routes/goalRoutes"); // Import Goals routes

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/languages", languageRoutes);
app.use("/api/v1/study-sessions", studySessionRoutes);
app.use("/api/v1/goals", goalRoutes); // Use Goals routes

module.exports = app;
