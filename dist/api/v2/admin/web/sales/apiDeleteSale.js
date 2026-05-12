"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
exports.ApiDeleteSale = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Delete Sale...", req, res);
    const salesID = req.params.sales_id;
    try {
        const sales = await db_1.executeQuery("SELECT sales_id FROM sales WHERE sales_id = ? LIMIT 1", [salesID]);
        if (sales.length === 0) {
            responseLogs_1.responseLogger.print("Completed Delete Sale But sale was not found...", req, res);
            return next(messages_1.ApiError.errNotFound({ deleted_id: salesID }));
        }
        await db_1.executeQuery("UPDATE sales SET sales_status = 'Cancelled' WHERE sales_id = ?", [salesID]);
        await db_1.executeQuery("INSERT INTO sales_status(sales_id, status) VALUES(?, 'Cancelled') ON DUPLICATE KEY UPDATE status = VALUES(status)", [salesID]);
        responseLogs_1.responseLogger.print("Completed Delete Sale...", req, res);
        res.json(messages_1.PublicInfo.infoDeleted({ deleted_id: salesID }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Delete Sale...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
