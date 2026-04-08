import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

// Detect environment to avoid connection leaks in dev
const globalForDb = globalThis as unknown as {
  conn: mysql.Pool | undefined;
};

function createPool() {
  return mysql.createPool({
    uri: process.env.DATABASE_URL!,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

const pool = globalForDb.conn ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = pool;
}

export const db = drizzle(pool, { schema, mode: "default" });
export type Db = typeof db;
