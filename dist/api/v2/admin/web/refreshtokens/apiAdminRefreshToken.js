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
const messages_1 = require("../../../../../model/shared/messages");
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
exports.apiAdminRefreshToken = (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken) {
        jwt.verify(refreshToken, sessionConfig_1.refreshTokenSecret, async (err, decoded) => {
            if (err) {
                next(messages_1.ApiError.errUnauthorizedError());
            }
            else {
                // TODO Check if Token has expired.
                const adminUserId = decoded.userID;
                var sqlQuery = "SELECT id, status, user_type, displayName, email, password FROM adminusers WHERE id = ? AND status = 'active'";
                var queryData = [adminUserId];
                try {
                    const result = await db_1.executeQuery(sqlQuery, queryData);
                    const userFromDB = result[0];
                    if (userFromDB != undefined) {
                        req.user = userFromDB;
                        responseLogs_1.responseLogger.print("User - " + req.user.displayName, req, res);
                        const token = jwt.sign({ userID: req.user.id }, sessionConfig_1.sessionTokenSecret, { expiresIn: sessionConfig_1.sessionTokenLifetime });
                        res.json(messages_1.PublicInfo.infoSendData({ "loggedIn": true, "token": token }));
                    }
                    else {
                        next();
                    }
                }
                catch (error) {
                    responseLogs_1.responseLogger.print("Error Fetching User in admin web api Refresh Token...", req, res);
                    return next(messages_1.ApiError.errInDatabase(error));
                }
            }
        });
    }
    else {
        next(messages_1.ApiError.errMissingBody);
    }
};
