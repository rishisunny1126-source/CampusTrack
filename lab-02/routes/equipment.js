
const express = require("express");
const router = express.Router();

const { db, dbReady } = require("../database/database");

// CREATE equipment
router.post("/", async (req, res) => {
  try {
    await dbReady;

    const { name, category, quantity, location, status } = req.body;

    if (
      !name || !category || quantity === undefined ||
      !location || !Number.isInteger(quantity) || quantity < 0
    ) {
      return res.status(400).json({
        message: "Please provide valid equipment details"
      });
    }

    const result = await db.execute({
      sql: `INSERT INTO equipment
            (name, category, quantity, location, status)
            VALUES (?, ?, ?, ?, ?)`,
      args: [name, category, quantity, location, status || "Available"]
    });

    res.status(201).json({
      message: "Equipment added successfully",
      id: Number(result.lastInsertRowid)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ all equipment
router.get("/", async (req, res) => {
  try {
    await dbReady;

    const result = await db.execute("SELECT * FROM equipment");

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ equipment by ID
router.get("/:id", async (req, res) => {
  try {
    await dbReady;

    const result = await db.execute({
      sql: "SELECT * FROM equipment WHERE id = ?",
      args: [req.params.id]
    });

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE equipment
router.put("/:id", async (req, res) => {
  try {
    await dbReady;

    const { name, category, quantity, location, status } = req.body;

    if (
      !name || !category || quantity === undefined ||
      !location || !status ||
      !Number.isInteger(quantity) || quantity < 0
    ) {
      return res.status(400).json({
        message: "Please provide valid equipment details"
      });
    }

    const result = await db.execute({
      sql: `UPDATE equipment
            SET name = ?, category = ?, quantity = ?,
                location = ?, status = ?
            WHERE id = ?`,
      args: [name, category, quantity, location, status, req.params.id]
    });

    if (result.rowsAffected === 0) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    res.json({ message: "Equipment updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE equipment
router.delete("/:id", async (req, res) => {
  try {
    await dbReady;

    const result = await db.execute({
      sql: "DELETE FROM equipment WHERE id = ?",
      args: [req.params.id]
    });

    if (result.rowsAffected === 0) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    res.json({ message: "Equipment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
