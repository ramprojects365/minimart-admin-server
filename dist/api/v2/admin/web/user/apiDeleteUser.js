"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
exports.apiDeleteUser = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Delete User...", req, res);
    const userID = req.params.id;
    var sqlQuery = "DELETE FROM adminusers WHERE id = ?";
    var queryData = [userID];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        if (rows.affectedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Delete User But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ info: "No Rows Deleted." }));
        }
        else {
            responseLogs_1.responseLogger.print("Completed Delete User...", req, res);
            res.json(messages_1.PublicInfo.infoDeleted({ deleted_id: userID }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Delete Shop...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
