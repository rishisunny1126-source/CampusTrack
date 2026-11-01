
const express = require("express");
const router = express.Router();

const db = require("../database/database");

// CREATE - Add new equipment
router.post("/", (req, res) => {
    const { name, category, quantity, location, status } = req.body;

    if (!name || !category || quantity === undefined || !location) {
        return res.status(400).json({
            message: "Please provide all required equipment details"
        });
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
        return res.status(400).json({
            message: "Quantity must be a non-negative integer"
        });
    }

    const sql = `
        INSERT INTO equipment (name, category, quantity, location, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [name, category, quantity, location, status || "Available"],
        function (err) {
            if (err) {
                return res.status(500).json({
                    message: "Failed to add equipment"
                });
            }

            res.status(201).json({
                message: "Equipment added successfully",
                id: this.lastID
            });
        }
    );
});

// READ - Get all equipment
router.get("/", (req, res) => {
    const sql = "SELECT * FROM equipment";

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                message: "Failed to retrieve equipment"
            });
        }

        res.status(200).json(rows);
    });
});

// READ - Get equipment by ID
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid equipment ID"
        });
    }

    db.get(
        "SELECT * FROM equipment WHERE id = ?",
        [id],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    message: "Failed to retrieve equipment"
                });
            }

            if (!row) {
                return res.status(404).json({
                    message: "Equipment not found"
                });
            }

            res.status(200).json(row);
        }
    );
});

// UPDATE - Modify equipment
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, category, quantity, location, status } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid equipment ID"
        });
    }

    if (
        !name ||
        !category ||
        quantity === undefined ||
        !location ||
        !status
    ) {
        return res.status(400).json({
            message: "Please provide all equipment details"
        });
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
        return res.status(400).json({
            message: "Quantity must be a non-negative integer"
        });
    }

    const sql = `
        UPDATE equipment
        SET name = ?, category = ?, quantity = ?, location = ?, status = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [name, category, quantity, location, status, id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    message: "Failed to update equipment"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Equipment not found"
                });
            }

            res.status(200).json({
                message: "Equipment updated successfully"
            });
        }
    );
});

// DELETE - Remove equipment
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            message: "Invalid equipment ID"
        });
    }

    db.run(
        "DELETE FROM equipment WHERE id = ?",
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    message: "Failed to delete equipment"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Equipment not found"
                });
            }

            res.status(200).json({
                message: "Equipment deleted successfully"
            });
        }
    );
});

module.exports = router;
