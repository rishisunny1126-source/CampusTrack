
const express = require("express");

const app = express();

const { db, dbReady } = require("./lab-02/database/database");
const equipmentRoutes = require("./lab-02/routes/equipment");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CampusTrack API!",
    version: "1.0.0"
  });
});

app.get("/api/status", async (req, res) => {
  try {
    await dbReady;
    await db.execute("SELECT 1 AS connected");

    res.json({
      status: "Online",
      database: "Connected"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "Error",
      database: "Disconnected"
    });
  }
});

app.use("/api/equipment", equipmentRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found"
  });
});

module.exports = app;
