"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
exports.ApiGetBranchesCount = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Branches Count...", req, res);
    if (req.query.user_id) {
        var sqlQuery = 'SELECT count(s.shop_name) AS branch_count FROM shops AS s INNER JOIN branches AS b ON s.shop_id = b.shop_id INNER JOIN adminusers AS a ON (s.user_id = a.id OR s.shop_id = a.shop_id) WHERE a.id = ' + db_1.mySqlPool.escape(req.query.user_id);
    }
    else {
        var sqlQuery = 'SELECT count(branch_id) as branch_count FROM branches';
    }
    try {
        const branchCount = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Branches Count...", req, res);
        responseLogs_1.responseLogger.print("Completed Get Branches count..." + branchCount[0].branch_count, req, res);
        res.json(messages_1.PublicInfo.infoSendData({ branch_count: branchCount[0].branch_count }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Branches Count...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
