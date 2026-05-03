"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
exports.ApiDeleteCategory = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Delete Category...", req, res);
    const categoryID = req.params.category_id;
    var sqlQuery = "DELETE FROM product_category WHERE category_id = ?";
    var queryData = [categoryID];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        if (rows.affectedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Delete Category But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        }
        else {
            responseLogs_1.responseLogger.print("Completed Delete Category...", req, res);
            res.json(messages_1.PublicInfo.infoDeleted({ deleted_id: categoryID }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Delete Category...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
