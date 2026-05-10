"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const deliveryVendorsListSummary_1 = require("../../../../../model/deliveryVendorsList/deliveryVendorsListSummary");
const deliveryVendorsListFilters_1 = require("../../../../../model/deliveryVendorsList/deliveryVendorsListFilters");
exports.apiGetDeliveryVendorsList = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Delivery Vendor List...", req, res);
    const filters = new deliveryVendorsListFilters_1.deliveryvendorsListFilters(req.query);
    // var sqlQuery = 'SELECT * FROM shops WHERE ' + filters.getCondition();
    var sqlQuery = 'SELECT * FROM delivery_vendors WHERE ' + filters.getCondition() + ';';
    try {
        const services = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Delivery Vendor List...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ vendors: services.map((item) => new deliveryVendorsListSummary_1.deliveryVendorsListSummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Delivery Vendor List...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
