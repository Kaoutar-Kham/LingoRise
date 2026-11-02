require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const languageRoutes = require("./routes/languageRoutes");

const app = express();

// Middleware to parse incoming JSON requests (Required before routes)
app.use(express.json());

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/languages", languageRoutes);

module.exports = app;
