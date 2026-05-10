"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const static_1 = require("../../../general/static");
const messages_1 = require("../../../../../model/shared/messages");
const branchDetails_1 = require("../../../../../model/branch/branchDetails");
exports.ApiGetMyBranchDetails = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get My Branch Details...", req, res);
    const userID = req.params.user_id;
    var sqlQuery = "SELECT b.* FROM branches AS b INNER JOIN adminusers AS a ON b.branch_id = a.branch_id WHERE a.id = ?;";
    var queryData = [userID];
    try {
        const branches = await db_1.executeQuery(sqlQuery, queryData);
        responseLogs_1.responseLogger.print("Completed Get My Branch Details...", req, res);
        // To change image to full image path
        branches.map(item => item.image = static_1.fileMapper(req.app.get("env"), item.image, 'shop_images').toString());
        res.json(messages_1.PublicInfo.infoSendData({ branchdetails: branches.map((item) => new branchDetails_1.BranchDetails(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get My Branch Details...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
