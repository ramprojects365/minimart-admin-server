"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const branchFilters_1 = require("../../../../../model/branch/branchFilters");
const branchSummary_1 = require("../../../../../model/branch/branchSummary");
exports.ApiGetBranchesCategories = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Branches Category...", req, res);
    const filters = new branchFilters_1.BranchGetFilters(req.query);
    var sqlQuery = 'SELECT * FROM branches_category';
    try {
        const branches = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Branches Category...", req, res);
        // To change image to full image path
        // branches.map(item => item.image = fileMapper(req.app.get("env"), item.image, 'shop_images').toString());
        res.json(messages_1.PublicInfo.infoSendData({ categories: branches.map((item) => new branchSummary_1.BranchCategorySummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Branches Category...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
