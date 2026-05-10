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
const adminUserFilters_1 = require("../../../../../model/adminuser/adminUserFilters");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const bcript_1 = require("../../../../../config/server/bcript");
const adminUserSummary_1 = require("../../../../../model/adminuser/adminUserSummary");
exports.apiUpdateUser = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Update User...", req, res);
    const userID = req.params.id;
    const password = req.body.password || "";
    bcrypt.hash(password, bcript_1.saltRounds, async (err, hash) => {
        if (err || !hash) {
            responseLogs_1.responseLogger.print("Error hashing password...", req, res);
            res.status(500).json(messages_1.ApiError.errServerError({ error: "Error updating user" }).publicVersion());
            return;
        }
        const filters = new adminUserFilters_1.UserUpdateFilters(req.body, req.body.password, hash);
        var sqlQuery = "UPDATE adminusers SET " + filters.getCondition() + " WHERE id = ?";
        var queryData = [userID];
        try {
            const rows = await db_1.executeQuery(sqlQuery, queryData);
            if (rows.changedRows == 0) {
                responseLogs_1.responseLogger.print("Completed Update User But no row updated...", req, res);
                res.json(messages_1.PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
            }
            else {
                sqlQuery = "SELECT id, displayName, user_type, email, status FROM adminusers WHERE id = ?";
                queryData = [userID];
                const user = await db_1.executeQuery(sqlQuery, queryData);
                responseLogs_1.responseLogger.print("Completed Update Shop...", req, res);
                res.json(messages_1.PublicInfo.infoUpdated({ user: new adminUserSummary_1.AdminUserSummary(user[0]) }));
            }
        }
        catch (error) {
            responseLogs_1.responseLogger.print("Error Update Shop...", req, res);
            return next(messages_1.ApiError.errInDatabase(error));
        }
    });
};
