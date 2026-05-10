"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
exports.ApiDeleteProducts = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Delete Product...", req, res);
    const productID = req.params.product_id;
    var sqlQuery = "DELETE FROM products WHERE product_id = ?";
    var queryData = [productID];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        if (rows.affectedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Delete Product But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        }
        else {
            responseLogs_1.responseLogger.print("Completed Delete Product...", req, res);
            res.json(messages_1.PublicInfo.infoDeleted({ deleted_id: productID }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Delete Product...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
