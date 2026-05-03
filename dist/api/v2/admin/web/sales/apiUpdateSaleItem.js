"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const salesFilter_1 = require("../../../../../model/sales/salesFilter");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const saleItem_1 = require("../../../../../model/sales/saleItem");
exports.ApiUpdateSaleItem = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Update Sales Items...", req, res);
    const sales_details_id = req.params.sales_details_id;
    const filters = new salesFilter_1.SalesItemUpdateFilters(req.body);
    var sqlQuery = "UPDATE sales_details SET " + filters.getCondition() + " WHERE sales_details_id = ?; UPDATE sales SET total = ? WHERE sales_id = ?;";
    var queryData = [sales_details_id, req.body.total, req.body.sales_id];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Update Sales Items But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        }
        else {
            sqlQuery = "SELECT * FROM sales_details WHERE sales_details_id = ?";
            queryData = [sales_details_id];
            const product = await db_1.executeQuery(sqlQuery, queryData);
            responseLogs_1.responseLogger.print("Completed Update Sales Items...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ product: new saleItem_1.SaleItem(product[0]) }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Update Sales Items...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
