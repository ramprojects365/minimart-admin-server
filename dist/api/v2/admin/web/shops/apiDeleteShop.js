"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../../../db/db");
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
exports.apiDeleteShop = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Delete Shop...", req, res);
    const shopID = req.params.shop_id;
    var sqlQuery = "DELETE FROM shops WHERE shop_id = ?";
    var queryData = [shopID];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        if (rows.affectedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Delete Shop But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        }
        else {
            responseLogs_1.responseLogger.print("Completed Delete Shop...", req, res);
            res.json(messages_1.PublicInfo.infoDeleted({ deleted_id: shopID }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Delete Shop...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
