"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
exports.ApiDeleteSalesStatus = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Delete Sales Status...", req, res);
    const sales_id = req.params.sales_id;
    const status_id = req.params.status_id;
    const statusMap = {
        accepted: "Accepted",
        delivered: "Delivered",
        cancelled: "Cancelled",
        delivering: "Delivering"
    };
    const status = statusMap[String(req.params.status || "").toLowerCase()];
    let newStatus = '';
    if (status == "Delivered" || status == "Cancelled" || status == 'Delivering') {
        newStatus = "Accepted";
    }
    else if (status == "Accepted") {
        newStatus = "Ordered";
    }
    else {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : Proper Status" }));
    }
    var sqlQuery = "DELETE FROM sales_status WHERE status_id = ? AND sales_id = ? AND LOWER(status) = LOWER(?); UPDATE sales SET sales_status = ? WHERE sales_id = ?;";
    var queryData = [status_id, sales_id, status, newStatus, sales_id];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        console.log(rows);
        if (rows[0].affectedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Delete Sales Status But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        }
        else {
            responseLogs_1.responseLogger.print("Completed Delete Sales Status...", req, res);
            res.json(messages_1.PublicInfo.infoDeleted({ deleted_id: status_id }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Delete Sales Status...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
