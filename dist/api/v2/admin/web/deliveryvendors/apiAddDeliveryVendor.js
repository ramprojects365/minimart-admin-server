"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const deliveryShops_1 = require("../../../../../model/deliveryshops/deliveryShops");
exports.apiAddDeliveryVendor = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Add Delivery Vendor to Shop...", req, res);
    const requiredFields = ["vendor_id", "branch_id"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newDevliveryShop = {
        delivery_shop_id: 0,
        vendor_id: req.body.vendor_id || 0,
        branch_id: req.body.branch_id || 0
    };
    var sqlQuery = "INSERT INTO delivery_shops (vendor_id, branch_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE status = 1;";
    var queryData = [newDevliveryShop.vendor_id, newDevliveryShop.branch_id];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        newDevliveryShop.delivery_shop_id = rows.insertId;
        responseLogs_1.responseLogger.print("Completed Add Delivery Vendor to Shop...", req, res);
        res.json(messages_1.PublicInfo.infoCreated({ shop: new deliveryShops_1.deliveryShops(newDevliveryShop) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Add Delivery Vendor to Shop...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
