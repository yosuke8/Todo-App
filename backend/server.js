const express = require("express");
const cors = require("cors");
const db = require("./db"); // SQLite のデータベースを読み込む

const app = express();
const PORT = process.env.PORT || 3001;  // Render では PORT を環境変数で設定

app.use(cors());
app.use(express.json());

// 📌 GET /todos - Todo一覧を取得（データベースから取得）
app.get("/todos", (req, res) => {
    db.all("SELECT * FROM todos", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 📌 POST /todos - Todoを追加
app.post("/todos", (req, res) => {
    const { text } = req.body;
    db.run("INSERT INTO todos (text, completed) VALUES (?, ?)", [text, false], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, text, completed: false });
    });
});

// 📌 PATCH /todos/:id - 完了/未完了を更新
app.patch("/todos/:id", (req, res) => {
    const { completed } = req.body;
    const id = req.params.id;
    db.run("UPDATE todos SET completed = ? WHERE id = ?", [completed, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, completed });
    });
});

// 📌 DELETE /todos/:id - Todoを削除
app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM todos WHERE id = ?", id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Todo deleted" });
    });
});

// 📌 サーバーを起動
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
