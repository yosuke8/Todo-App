const { Pool } = require("pg");

// Render の環境変数 `DATABASE_URL` を使用
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // Render の PostgreSQL では必要
  },
});

// テーブルを作成
pool.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false
  )
`);

module.exports = pool;
