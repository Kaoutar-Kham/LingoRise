const app = require("./app");
const { sequelize } = require("./models");
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // Sync database models with alter to automatically update tables
    await sequelize.sync({ alter: true });
    console.log("Database synced.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
