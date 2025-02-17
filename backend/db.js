const sqlite3 = require("sqlite3").verbose();

// `database.db` というファイルを作成（なければ自動生成）
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// テーブル作成
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0
    )
  `);
});

module.exports = db;
