"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const paymentGatewaysListSummary_1 = require("../../../../../model/paymentGatewaysList/paymentGatewaysListSummary");
exports.apiGetPaymentGatewaysList = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Payment Gateway List...", req, res);
    var sqlQuery = 'SELECT * FROM payment_gateways;';
    try {
        const services = await db_1.executeQuery(sqlQuery);
        responseLogs_1.responseLogger.print("Completed Get Payment Gateway List...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ paymentgateways: services.map((item) => new paymentGatewaysListSummary_1.paymentGatewayListSummary(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Payment Gateway List...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
