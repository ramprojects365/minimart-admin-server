"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const sessionConfig_1 = require("../../../../../config/server/sessionConfig");
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
exports.apiSessionVerify = (req, res, next) => {
    // console.log("TOKEN " + req.headers.authorization)
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, sessionConfig_1.sessionTokenSecret, async (err, decoded) => {
            if (err) {
                next(messages_1.ApiError.errUnauthorizedError());
            }
            else {
                // TODO Check if Token has expired.
                const adminUserId = decoded.userID;
                var sqlQuery = "SELECT id, status, user_type, shop_id, branch_id, displayName, email, password FROM adminusers WHERE id = ? AND status = 'active'";
                var queryData = [adminUserId];
                try {
                    const result = await db_1.executeQuery(sqlQuery, queryData);
                    const userFromDB = result[0];
                    if (userFromDB != undefined) {
                        req.user = userFromDB;
                        responseLogs_1.responseLogger.print("User - " + req.user.displayName, req, res);
                        next();
                    }
                    else {
                        next();
                    }
                }
                catch (error) {
                    responseLogs_1.responseLogger.print("Error Fetching User in admin web api Session Verify...", req, res);
                    return next(messages_1.ApiError.errInDatabase(error));
                }
            }
        });
    }
    else {
        next();
    }
};
