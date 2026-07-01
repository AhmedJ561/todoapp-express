import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-change-me";

// --- REGISTER ROUTE ---
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcryptjs.hash(password, 8);

    const insertUser = db.prepare(
      `INSERT INTO users (username, password) VALUES (?, ?)`
    );
    const result = insertUser.run(username, hashedPassword);

    const defaultTodo = db.prepare(
      `INSERT INTO todos (user_id, task) VALUES (?, ?)`
    );
    const defaultTask = "Welcome to your todo list!";
    defaultTodo.run(result.lastInsertRowid, defaultTask);

    const token = jwt.sign({ id: result.lastInsertRowid }, JWT_SECRET, {
      expiresIn: "24h",
    });

    // FIXED: Combined response status and JSON payload
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
});

// --- LOGIN ROUTE ---
router.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    // FIXED: Changed from async 'db.get' to native synchronous statement execution
    const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
    const user = getUser.get(username);

    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "invalid password!" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
});

export default router;
