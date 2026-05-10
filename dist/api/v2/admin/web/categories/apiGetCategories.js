"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const categorySummary_1 = require("../../../../../model/categories/categorySummary");
exports.ApiGetCategories = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Categories...", req, res);
    var sqlQuery = 'SELECT * FROM product_category';
    try {
        const categories = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Categories...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ categories: categories.map((item) => new categorySummary_1.CategorySummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Categories...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
