"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../../../../../model/shared/messages");
const db_1 = require("../../../../../db/db");
const branchSummary_1 = require("../../../../../model/branch/branchSummary");
const branchFilters_1 = require("../../../../../model/branch/branchFilters");
const responseLogs_1 = require("../../../general/responseLogs");
exports.apiGetBranches = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Branches...", req, res);
    const filters = new branchFilters_1.BranchGetFilters(req.query);
    var sqlQuery = 'SELECT * FROM branches WHERE ' + filters.getCondition() + ' AND active = 1';
    try {
        const branches = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Branches...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ shops: branches.map((item) => new branchSummary_1.BranchSummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Branches...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
