const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const languageRoutes = require("./routes/languageRoutes");
const studySessionRoutes = require("./routes/studySessionRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/languages", languageRoutes);
app.use("/api/v1/study-sessions", studySessionRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Welcome to LingoRise API" });
});

module.exports = app;
