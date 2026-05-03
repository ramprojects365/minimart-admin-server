"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const branchDetails_1 = require("../../../../../model/branch/branchDetails");
exports.ApiChangeBranchesStatus = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Update Branch Status...", req, res);
    const requiredFields = ["status"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const branchID = req.params.branch_id;
    const status = req.body.status;
    var sqlQuery = "UPDATE branches SET active = ? WHERE branch_id = ?";
    var queryData = [status, branchID];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Update Branch Status But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        }
        else {
            sqlQuery = "SELECT * FROM branches WHERE branch_id = ?";
            queryData = [branchID];
            const branches = await db_1.executeQuery(sqlQuery, queryData);
            responseLogs_1.responseLogger.print("Completed Update Branch Status...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ branch: new branchDetails_1.BranchDetails(branches[0]) }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Update Branch...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
