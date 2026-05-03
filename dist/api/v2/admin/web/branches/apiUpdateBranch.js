"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const db_1 = require("../../../../../db/db");
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const branchFilters_1 = require("../../../../../model/branch/branchFilters");
const branchDetails_1 = require("../../../../../model/branch/branchDetails");
const static_1 = require("../../../general/static");
exports.ApiUpdateBranch = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Update Branch...", req, res);
    const branchID = req.params.branch_id;
    const image = req.body.image.slice(req.body.image.lastIndexOf("/") + 1, req.body.image.length);
    responseLogs_1.responseLogger.print("image..." + image, req, res);
    responseLogs_1.responseLogger.print("req.body.image..." + req.body.image, req, res);
    responseLogs_1.responseLogger.print("req.body.image_changed..." + req.body.image_changed, req, res);
    if (req.body.image_changed === false) {
        //Image has not changed
        req.body.image = image;
        const filters = new branchFilters_1.BranchUpdateFilters(req.body);
        var sqlQuery = "UPDATE branches SET " + filters.getCondition() + " WHERE branch_id = ?";
        var queryData = [branchID];
        try {
            const rows = await db_1.executeQuery(sqlQuery, queryData);
            if (rows.changedRows == 0) {
                responseLogs_1.responseLogger.print("Completed Update Branch But no row updated...", req, res);
                res.json(messages_1.PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
            }
            else {
                sqlQuery = "SELECT * FROM branches WHERE branch_id = ?";
                queryData = [branchID];
                const branches = await db_1.executeQuery(sqlQuery, queryData);
                // To change image to full image path
                branches.map(item => item.image = static_1.fileMapper(req.app.get("env"), item.image, 'shop_images').toString());
                responseLogs_1.responseLogger.print("Completed Update Branch...", req, res);
                res.json(messages_1.PublicInfo.infoUpdated({ branch: new branchDetails_1.BranchDetails(branches[0]) }));
            }
        }
        catch (error) {
            responseLogs_1.responseLogger.print("Error Update Branch...", req, res);
            return next(messages_1.ApiError.errInDatabase(error));
        }
    }
    else {
        //Image changed
        req.body.image = image;
        fs.copyFile('public/cache/' + image, 'public/shop_images/' + image, async (err) => {
            if (err) {
                return next(messages_1.ApiError.errCopyImageFailed({ "details": "Image copy failed" }));
            }
            fs.unlink('public/cache/' + image, (err) => {
                if (err) {
                    responseLogs_1.responseLogger.print("Image Delete from cache failed...", req, res);
                    return;
                }
                responseLogs_1.responseLogger.print("Image Delete from cache sucess...", req, res);
            });
            responseLogs_1.responseLogger.print('Image was moved.........', req, res);
            const filters = new branchFilters_1.BranchUpdateFilters(req.body);
            var sqlQuery = "UPDATE branches SET " + filters.getCondition() + " WHERE branch_id = ?";
            var queryData = [branchID];
            try {
                const rows = await db_1.executeQuery(sqlQuery, queryData);
                if (rows.changedRows == 0) {
                    responseLogs_1.responseLogger.print("Completed Update Branch But no row updated...", req, res);
                    res.json(messages_1.PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
                }
                else {
                    sqlQuery = "SELECT * FROM branches WHERE branch_id = ?";
                    queryData = [branchID];
                    const branches = await db_1.executeQuery(sqlQuery, queryData);
                    // To change image to full image path
                    branches.map(item => item.image = static_1.fileMapper(req.app.get("env"), item.image, 'shop_images').toString());
                    responseLogs_1.responseLogger.print("Completed Update Branch...", req, res);
                    res.json(messages_1.PublicInfo.infoUpdated({ branch: new branchDetails_1.BranchDetails(branches[0]) }));
                }
            }
            catch (error) {
                responseLogs_1.responseLogger.print("Error Update Branch...", req, res);
                return next(messages_1.ApiError.errInDatabase(error));
            }
        });
    }
};
