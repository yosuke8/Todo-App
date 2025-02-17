const Database = require("better-sqlite3");

// `database.db` というファイルを作成（なければ自動生成）
const db = new Database("./database.db");

// テーブル作成
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0
  )
`);

console.log("Connected to SQLite database.");

module.exports = db;
