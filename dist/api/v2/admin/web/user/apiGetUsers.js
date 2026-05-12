"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const responseLogs_1 = require("../../../general/responseLogs");
const adminUserFilters_1 = require("../../../../../model/adminuser/adminUserFilters");
const adminUserSummary_1 = require("../../../../../model/adminuser/adminUserSummary");
exports.apiGetUsers = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Users...", req, res);
    const currentUser = req.user;
    const queryData = [];
    var sqlQuery = "";
    if (currentUser && currentUser.user_type !== "sadmin" && currentUser.user_type !== "padmin") {
        sqlQuery = "SELECT a.*, COALESCE(b.branch_name, s.shop_name, '') AS branch_name FROM adminusers AS a LEFT JOIN branches AS b ON a.branch_id = b.branch_id LEFT JOIN shops AS s ON a.shop_id = s.shop_id WHERE ";
        if (currentUser.branch_id) {
            sqlQuery += "a.id = ? OR a.branch_id = ?";
            queryData.push(currentUser.id, currentUser.branch_id);
        }
        else if (currentUser.shop_id) {
            sqlQuery += "a.id = ? OR a.shop_id = ? OR a.branch_id IN (SELECT branch_id FROM branches WHERE shop_id = ?)";
            queryData.push(currentUser.id, currentUser.shop_id, currentUser.shop_id);
        }
        else {
            sqlQuery += "a.id = ? OR a.shop_id IN (SELECT shop_id FROM shops WHERE user_id = ?) OR a.branch_id IN (SELECT b.branch_id FROM branches AS b INNER JOIN shops AS s ON b.shop_id = s.shop_id WHERE s.user_id = ?)";
            queryData.push(currentUser.id, currentUser.id, currentUser.id);
        }
    }
    else {
        const filters = new adminUserFilters_1.AdminUserGetFilters(req.query);
        // var sqlQuery = 'SELECT a.*, b.branch_name FROM adminusers AS a INNER JOIN branches AS b ON a.branch_id = b.branch_id WHERE ' + filters.getCondition();
        sqlQuery = 'SELECT a.*, b.branch_name FROM adminusers AS a INNER JOIN branches AS b ON a.branch_id = b.branch_id WHERE ' + filters.getCondition() + ' UNION SELECT a.*, s.shop_name FROM adminusers AS a INNER JOIN shops AS s ON a.id = s.user_id WHERE ' + filters.getCondition() + ' UNION SELECT a.*, s.shop_name FROM adminusers AS a INNER JOIN shops AS s ON a.shop_id = s.shop_id WHERE ' + filters.getCondition() + ' AND a.branch_id = 0';
    }
    try {
        const users = await db_1.executeQuery(sqlQuery, queryData);
        responseLogs_1.responseLogger.print("Completed Get Users...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ users: users.map((item) => new adminUserSummary_1.AdminUserSummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Users...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
