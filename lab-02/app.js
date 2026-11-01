
const express = require("express");
const db = require("./database/database");

const equipmentRoutes = require("./routes/equipment");

const app = express();

const PORT = 3001;

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to CampusTrack Equipment Management API!");
});

// Database status
app.get("/api/status", (req, res) => {
    db.get("SELECT 1 AS connected", (err, row) => {
        if (err) {
            return res.status(500).json({
                status: "error",
                message: "Database connection failed"
            });
        }

        res.json({
            status: "success",
            message: "CampusTrack API is running",
            database: "connected"
        });
    });
});

// Equipment routes
app.use("/api/equipment", equipmentRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`CampusTrack API running at http://localhost:${PORT}`);
});
