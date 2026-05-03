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
    host: "localhost",
    user: "root",
    password: "NewPassword123!",
    database: "minimart",
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
