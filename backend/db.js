const { Pool } = require("pg");

// PostgreSQL の接続文字列が設定されているかチェック
if (!process.env.DATABASE_URL) {
  console.error('\nERROR: environment variable DATABASE_URL is not set.');
  console.error('Set DATABASE_URL in your host (Railway/Heroku/Supabase) or locally before starting the server.');
  console.error('On Railway: add the PostgreSQL plugin or copy the plugin\'s DATABASE_URL into this service environment.\n');
  // Exit early so logs clearly show the cause instead of an ambiguous ECONNREFUSED
  process.exit(1);
}

// Use the host-provided DATABASE_URL (Railway/Supabase, etc.)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // 多くのクラウドPostgresで必要
  },
});

// 起動時に接続確認を行い、わかりやすいログを出す
const maskDatabaseUrl = (url) => {
  try {
    const u = new URL(url);
    return `${u.protocol}//${u.hostname}:*****@${u.host.split(':')[0]}`;
  } catch (e) {
    return 'masked-database-url';
  }
};

console.log('Checking database connection...');
console.log('DATABASE_URL (masked):', maskDatabaseUrl(process.env.DATABASE_URL));

pool.connect()
  .then((client) => {
    client.release();
    console.log('Database connection OK. Creating table if not exists...');

    // テーブルを作成
    pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT false
      )
    `)
      .then(() => console.log('Table check/create completed.'))
      .catch((err) => {
        console.error('Error creating/checking table:', err.message || err);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error('Failed to connect to database. Error:');
    console.error(err && err.message ? err.message : err);
    console.error('\nEnsure the DATABASE_URL is correct and that your Postgres service is running and accessible from Railway.');
    process.exit(1);
  });

module.exports = pool;
