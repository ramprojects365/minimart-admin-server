"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const responseLogs_1 = require("../../../general/responseLogs");
const adminUserFilters_1 = require("../../../../../model/adminuser/adminUserFilters");
const adminUserSummary_1 = require("../../../../../model/adminuser/adminUserSummary");
exports.apiGetUsers = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Users...", req, res);
    const filters = new adminUserFilters_1.AdminUserGetFilters(req.query);
    // var sqlQuery = 'SELECT a.*, b.branch_name FROM adminusers AS a INNER JOIN branches AS b ON a.branch_id = b.branch_id WHERE ' + filters.getCondition();
    var sqlQuery = 'SELECT a.*, b.branch_name FROM adminusers AS a INNER JOIN branches AS b ON a.branch_id = b.branch_id WHERE ' + filters.getCondition() + ' UNION SELECT a.*, s.shop_name FROM adminusers AS a INNER JOIN shops AS s ON a.id = s.user_id WHERE ' + filters.getCondition() + ' UNION SELECT a.*, s.shop_name FROM adminusers AS a INNER JOIN shops AS s ON a.shop_id = s.shop_id WHERE ' + filters.getCondition() + ' AND a.branch_id = 0';
    try {
        const users = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Users...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ users: users.map((item) => new adminUserSummary_1.AdminUserSummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Users...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
