"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const responseLogs_1 = require("../../../general/responseLogs");
const deliveryShops_1 = require("../../../../../model/deliveryshops/deliveryShops");
exports.apiDisableDeliveryVendor = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Update Delivery Vendor...", req, res);
    const vendorId = req.body.vendor_id;
    const branchId = req.body.branch_id;
    // const filters = new ShopUpdateFilters(req.body);
    var sqlQuery = "UPDATE delivery_shops SET status = 0 WHERE vendor_id = ? AND branch_id = ?";
    var queryData = [vendorId, branchId];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Update Delivery Vendor But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        }
        else {
            sqlQuery = "SELECT * FROM delivery_shops WHERE vendor_id = ? AND branch_id = ?";
            queryData = [vendorId, branchId];
            const vendor = await db_1.executeQuery(sqlQuery, queryData);
            responseLogs_1.responseLogger.print("Completed Update Delivery Vendor...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ vendor: new deliveryShops_1.deliveryShops(vendor[0]) }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Update Delivery Vendor...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
