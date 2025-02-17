const express = require("express");
const cors = require("cors");
const pool = require("./db");  // PostgreSQL に接続

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 📌 GET /todos - Todo一覧を取得（データベースから取得）
app.get("/todos", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM todos");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📌 POST /todos - Todoを追加
app.post("/todos", async (req, res) => {
    try {
        const { text } = req.body;
        const result = await pool.query(
            "INSERT INTO todos (text, completed) VALUES ($1, $2) RETURNING *",
            [text, false]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📌 PATCH /todos/:id - 完了/未完了を更新
app.patch("/todos/:id", async (req, res) => {
    try {
        const { completed } = req.body;
        const { id } = req.params;
        const result = await pool.query(
            "UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *",
            [completed, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📌 DELETE /todos/:id - Todoを削除
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM todos WHERE id = $1", [id]);
        res.json({ message: "Todo deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📌 サーバーを起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
