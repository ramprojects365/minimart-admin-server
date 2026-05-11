"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcryptjs"));
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const adminUserSummary_1 = require("../../../../../model/adminuser/adminUserSummary");
const bcript_1 = require("../../../../../config/server/bcript");
exports.apiCreateUser = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Create User...", req, res);
    var sqlQuery = '';
    var queryData;
    const scopedUserTypes = ["manager", "employee", "api"];
    const isScopedUser = scopedUserTypes.includes(req.body.user_type);
    // Check if all required fields are there
    const requiredFields = ["user_type", "displayName", "email", "password"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newUser = {
        id: 0,
        status: 'active',
        user_type: req.body.user_type || "",
        shop_id: isScopedUser ? req.body.shop_id || "" : "",
        branch_id: isScopedUser ? req.body.branch_id || "" : "",
        displayName: req.body.displayName || "",
        email: req.body.email || "",
        password: req.body.password || "",
    };
    // Check if data is not empty
    if (newUser.user_type == "" || newUser.displayName == "" || newUser.email == "" || newUser.password == "") {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    else if (scopedUserTypes.includes(newUser.user_type) && (!newUser.shop_id || !newUser.branch_id)) {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields for " + newUser.user_type + " are : shop_id, branch_id" }));
    }
    else if (newUser.user_type === 'sadmin') {
        sqlQuery = "INSERT INTO adminusers (user_type, displayName, email, password) VALUES ('sadmin', ?, ?, ?);";
        queryData = [newUser.displayName, newUser.email];
    }
    else if (newUser.user_type === 'nadmin') {
        sqlQuery = "INSERT INTO adminusers (user_type, displayName, email, password) VALUES ('nadmin', ?, ?, ?);";
        queryData = [newUser.displayName, newUser.email];
    }
    else if (newUser.user_type === 'manager') {
        sqlQuery = "INSERT INTO adminusers (user_type, shop_id, branch_id, displayName, email, password) VALUES ('manager', ?, ?, ?, ?, ?);";
        queryData = [newUser.shop_id, newUser.branch_id, newUser.displayName, newUser.email];
    }
    else if (newUser.user_type === 'employee') {
        sqlQuery = "INSERT INTO adminusers (user_type, shop_id, branch_id, displayName, email, password) VALUES ('employee', ?, ?, ?, ?, ?);";
        queryData = [newUser.shop_id, newUser.branch_id, newUser.displayName, newUser.email];
    }
    else if (newUser.user_type === 'api') {
        sqlQuery = "INSERT INTO adminusers (user_type, shop_id, branch_id, displayName, email, password) VALUES ('api', ?, ?, ?, ?, ?);";
        queryData = [newUser.shop_id, newUser.branch_id, newUser.displayName, newUser.email];
    }
    else if (newUser.user_type === 'padmin') {
        sqlQuery = "INSERT INTO adminusers (user_type, displayName, email, password) VALUES ('padmin', ?, ?, ?);";
        queryData = [newUser.displayName, newUser.email];
    }
    else {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    bcrypt.hash(newUser.password, bcript_1.saltRounds, async (err, hash) => {
        try {
            queryData.push(hash);
            const rows = await db_1.executeQuery(sqlQuery, queryData);
            newUser.id = rows.insertId;
            responseLogs_1.responseLogger.print("Completed Create User...", req, res);
            res.json(messages_1.PublicInfo.infoCreated({ admin_user: new adminUserSummary_1.AdminUserSummary(newUser) }));
        }
        catch (error) {
            const dbError = error;
            responseLogs_1.responseLogger.print("Error Create User...", req, res);
            if (dbError.code === 'ER_DUP_ENTRY') {
                return next(messages_1.ApiError.errInDatabaseDuplicate(error));
            }
            return next(messages_1.ApiError.errInDatabase(error));
        }
    });
};
