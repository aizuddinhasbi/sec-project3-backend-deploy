// routes/tasks.js

import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import pool from "../db.js";

const router = express.Router();

// Create a new task
router.post("/", verifyToken, async (req, res) => {
  const { title, description, category, priority } = req.body;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, category, priority, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, category, priority, user_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Update an existing task
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, category, priority, completed } = req.body;

  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, category = $3, priority = $4, completed = $5 WHERE id = $6 RETURNING *",
      [title, description, category, priority, completed, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
