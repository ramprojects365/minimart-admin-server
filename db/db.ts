import mysql from "mysql2/promise";

/**
 * Create MySQL Pool
 */
export const mySqlPool = mysql.createPool({
  host: process.env.DB_HOST || process.env.MYSQLHOST || "localhost",
  user: process.env.DB_USER || process.env.MYSQLUSER || "root",
  password: process.env.DB_PASS || process.env.MYSQLPASSWORD || "NewPassword123!",
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || "minimart",
  port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
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
