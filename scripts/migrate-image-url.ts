import "dotenv/config";
import mysql from "mysql2/promise";

async function run() {
  const { DATABASE_URL, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const conn = await (DATABASE_URL
    ? mysql.createConnection(DATABASE_URL)
    : mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
      }));

  try {
    console.log("Menjalankan migration: ALTER TABLE posts MODIFY COLUMN image_url longtext ...");
    await conn.execute("ALTER TABLE `posts` MODIFY COLUMN `image_url` longtext");
    console.log("✓ Selesai. Kolom image_url sekarang longtext (max 4 GB).");
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("doesn't exist")) {
      console.error("✗ Tabel posts tidak ditemukan. Pastikan migration awal sudah dijalankan.");
    } else {
      console.error("✗ Error:", msg);
    }
    process.exit(1);
  } finally {
    await conn.end();
  }
}

run();
