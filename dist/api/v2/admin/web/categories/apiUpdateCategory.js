"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const categoryFilters_1 = require("../../../../../model/categories/categoryFilters");
const categorySummary_1 = require("../../../../../model/categories/categorySummary");
exports.ApiUpdateCategory = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Update Category...", req, res);
    const categoryID = req.params.category_id;
    const filters = new categoryFilters_1.CategoryUpdateFilters(req.body);
    var sqlQuery = "UPDATE product_category SET " + filters.getCondition() + " WHERE category_id = ?";
    var queryData = [categoryID];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Update Category But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        }
        else {
            sqlQuery = "SELECT * FROM product_category WHERE category_id = ?";
            queryData = [categoryID];
            const category = await db_1.executeQuery(sqlQuery, queryData);
            responseLogs_1.responseLogger.print("Completed Update Category...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ category: new categorySummary_1.CategorySummary(category[0]) }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Update Category...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
