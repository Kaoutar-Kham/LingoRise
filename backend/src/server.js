require("dotenv").config();
const { sequelize } = require("./config/database");
const app = require("./app");

// Import models to ensure associations and tables are loaded
require("./models/user");
require("./models/language");
require("./models/studySession");

const PORT = process.env.PORT || 5000;

// Function to authenticate database connection, synchronize models, and start the server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Database connected successfully.");

    // Synchronize all Sequelize models with the database
    await sequelize.sync({ alter: true });
    console.log("Database models synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database or sync models:", error);
  }
};

startServer();
