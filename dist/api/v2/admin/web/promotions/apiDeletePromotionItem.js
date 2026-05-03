"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require('moment');
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const responseLogs_1 = require("../../../general/responseLogs");
exports.ApiDeletePromotionItem = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Delete Promotion Item...", req, res);
    const itemId = req.params.item_id;
    var sqlQuery = "DELETE FROM promotion_items WHERE promo_items_id = ?;";
    var queryData = [itemId];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        if (rows.affectedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Delete Promotion Item But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        }
        else {
            responseLogs_1.responseLogger.print("Completed Delete Promotion Item...", req, res);
            res.json(messages_1.PublicInfo.infoDeleted({ deleted_id: itemId }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Delete Promotion Item...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
