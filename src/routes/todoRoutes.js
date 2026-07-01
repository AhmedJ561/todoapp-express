import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log(req);
    const getTodos = db.prepare(`SELECT * FROM todos where user_id = ?`);
    const todos = getTodos.all(req.userId);
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
});
router.post("/", async (req, res) => {
  try {
    const { task } = req.body;
    const insertTodo = db.prepare(
      `INSERT INTO todos (user_id, task) VALUES (?, ?)`
    );
    const result = insertTodo.run(req.userId, task);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { task, completed } = req.body;
    const updateTodo = db.prepare(
      `UPDATE todos SET task = ?, completed = ? WHERE id = ?`
    );
    const result = updateTodo.run(task, completed, req.params.id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ?`);
    const result = deleteTodo.run(req.params.id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(503);
  }
});

export default router;
