"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
exports.ApiDeleteSalesItem = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Delete Sales Item...", req, res);
    const salesDetailsID = req.params.sales_details_id;
    var sqlQuery = "DELETE FROM sales_details WHERE sales_details_id = ?; UPDATE sales SET total = ? WHERE sales_id = ?;";
    var queryData = [salesDetailsID, req.params.total, req.params.sales_id];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        if (rows.affectedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Delete Sales Item But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        }
        else {
            responseLogs_1.responseLogger.print("Completed Delete Sales Item...", req, res);
            res.json(messages_1.PublicInfo.infoDeleted({ deleted_id: salesDetailsID }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Delete Sales Item...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
