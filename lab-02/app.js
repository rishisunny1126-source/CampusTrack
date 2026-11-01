
const express = require("express");
const app = express();

const { db, dbReady } = require("./database/database");
const equipmentRoutes = require("./routes/equipment");

app.use(express.json());

// API welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CampusTrack API!",
    version: "1.0.0"
  });
});

// API status
app.get("/api/status", async (req, res) => {
  try {
    await dbReady;
    await db.execute("SELECT 1 AS connected");

    res.json({
      status: "Online",
      database: "Connected"
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      database: "Disconnected"
    });
  }
});

// Equipment CRUD routes
app.use("/api/equipment", equipmentRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found"
  });
});

// Export Express application for Vercel
module.exports = app;

// Start local server only when executed directly
if (require.main === module) {
  const PORT = process.env.PORT || 3001;

  app.listen(PORT, () => {
    console.log(`CampusTrack API running on port ${PORT}`);
  });
}
