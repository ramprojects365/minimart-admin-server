"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const branchDetails_1 = require("../../../../../model/branch/branchDetails");
exports.apiGetBranchDetails = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Branch Details...", req, res);
    const branchId = req.params.branch_id;
    var sqlQuery = 'SELECT * FROM branches WHERE branch_id = ' + branchId;
    try {
        const branch = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Branch Details...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ shop: branch.map((item) => new branchDetails_1.BranchDetails(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Branch Details...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
