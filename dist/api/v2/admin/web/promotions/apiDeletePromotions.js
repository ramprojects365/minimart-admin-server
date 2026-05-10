"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../../../db/db");
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
exports.apiDeletePromotions = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Delete Promotions...", req, res);
    const promoId = req.params.promo_id;
    var sqlQuery = "UPDATE promotions SET status = 2 WHERE promo_id = ?";
    var queryData = [promoId];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        if (rows.affectedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Delete Promotions But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        }
        else {
            responseLogs_1.responseLogger.print("Completed Delete Promotions...", req, res);
            res.json(messages_1.PublicInfo.infoDeleted({ deleted_id: promoId }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Delete Promotions...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
