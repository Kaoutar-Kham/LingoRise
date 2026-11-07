const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const languageRoutes = require("./routes/languageRoutes");
const studySessionRoutes = require("./routes/studySessionRoutes");
const goalRoutes = require("./routes/goalRoutes");
const userLanguageRoutes = require("./routes/userLanguageRoutes");
const vocabularyRoutes = require("./routes/vocabularyRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Mount Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/languages", languageRoutes);
app.use("/api/v1/study-sessions", studySessionRoutes);
app.use("/api/v1/goals", goalRoutes);
app.use("/api/v1/user-languages", userLanguageRoutes);
app.use("/api/v1/vocabulary", vocabularyRoutes); 
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/v1/user-settings", require("./routes/userSittingRoutes"));
app.use("/api/v1/users", require("./routes/userRoutes"));

app.get("/", (req, res) => {
  res.send({
    message: "LingoRise API is running...",
    craftedBy: "Kaoutar Kham",
  });
});

module.exports = app;
