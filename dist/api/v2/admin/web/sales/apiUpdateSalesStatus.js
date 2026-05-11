"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const responseLogs_1 = require("../../../general/responseLogs");
const saleStatus_1 = require("../../../../../model/sales/saleStatus");
exports.ApiUpdateSalesStatus = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Update Sales Status...", req, res);
    const sales_id = req.params.sales_id;
    const statusMap = {
        accepted: "Accepted",
        delivered: "Delivered",
        cancelled: "Cancelled",
        delivering: "Delivering"
    };
    const status = statusMap[String(req.body.status || "").toLowerCase()];
    console.log(status);
    if (status) {
        // newStatus = "Accepted";
        // Continue...
    }
    else {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : Proper Status" }));
    }
    var sqlQuery = "INSERT INTO sales_status(sales_id, status) VALUES(?, ?)";
    var queryData = [sales_id, status];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Update Sales Status But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        }
        else {
            sqlQuery = "SELECT * FROM sales_status WHERE sales_id = ?";
            queryData = [sales_id];
            const status = await db_1.executeQuery(sqlQuery, queryData);
            responseLogs_1.responseLogger.print("Completed Update Sales Status...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ status: status.map((item) => new saleStatus_1.SaleStatus(item)) }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Update Sales Items...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
