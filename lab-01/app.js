
const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to CampusTrack API!");
});

// API status route
app.get("/api/status", (req, res) => {
    res.json({
        message: "CampusTrack API is running",
        status: "success"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
