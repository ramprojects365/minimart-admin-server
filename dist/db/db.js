"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
/**
 * Create MySQL Pool
 */
exports.mySqlPool = promise_1.default.createPool({
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
async function executeQuery(query, params = []) {
    try {
        const [rows] = await exports.mySqlPool.execute(query, params);
        return rows;
    }
    catch (error) {
        console.error("DB Query Error:", error);
        throw error;
    }
}
exports.executeQuery = executeQuery;
// // Add at the end of db.ts for testing
// mySqlPool.getConnection()
//   .then((conn: { release: () => void; }) => {
//     console.log('✅ Railway DB connected successfully!');
//     conn.release();
//   })
//   .catch((err: { message: any; }) => {
//     console.error('❌ Railway DB connection failed:', err.message);
//   });
