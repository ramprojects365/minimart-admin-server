import mysql from "mysql2/promise";

const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
const databaseUrlConfig = databaseUrl ? new URL(databaseUrl) : undefined;
const databaseUrlDatabase = databaseUrlConfig ? databaseUrlConfig.pathname.replace(/^\//, "") : undefined;

/**
 * Create MySQL Pool
 */
export const mySqlPool = mysql.createPool({
  host: process.env.DB_HOST || process.env.MYSQLHOST || (databaseUrlConfig && databaseUrlConfig.hostname) || "localhost",
  user: process.env.DB_USER || process.env.MYSQLUSER || process.env.MYSQL_USER || (databaseUrlConfig && databaseUrlConfig.username) || "root",
  password: process.env.DB_PASS || process.env.MYSQLPASSWORD || process.env.MYSQL_PASSWORD || (databaseUrlConfig && databaseUrlConfig.password) || "NewPassword123!",
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || process.env.MYSQL_DATABASE || databaseUrlDatabase || "minimart",
  port: Number(process.env.DB_PORT || process.env.MYSQLPORT || (databaseUrlConfig && databaseUrlConfig.port) || 3306),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
/**
 * Execute Query Helper
 */
export async function executeQuery<T = any>(
  query: string,
  params: any[] = [],
): Promise<T> {
  try {
    const [rows] = await (mySqlPool as any).execute(query, params);
    return rows as T;
  } catch (error) {
    console.error("DB Query Error:", error);
    throw error;
  }
}

// // Add at the end of db.ts for testing
// mySqlPool.getConnection()
//   .then((conn: { release: () => void; }) => {
//     console.log('✅ Railway DB connected successfully!');
//     conn.release();
//   })
//   .catch((err: { message: any; }) => {
//     console.error('❌ Railway DB connection failed:', err.message);
//   });
