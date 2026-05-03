"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const userFilters_1 = require("../../../../../model/user/userFilters");
const userSummary_1 = require("../../../../../model/user/userSummary");
// Not Used as Delete user happens in Firebase
exports.apiRemoveAccount = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Delete User Account...", req, res);
    const filters = new userFilters_1.UserGetFilters(req.query);
    var sqlQuery = 'SELECT * FROM users WHERE ' + filters.getCondition();
    try {
        const user = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Delete User Account...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ user: user.map((item) => new userSummary_1.UserSummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Delete User Account...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
