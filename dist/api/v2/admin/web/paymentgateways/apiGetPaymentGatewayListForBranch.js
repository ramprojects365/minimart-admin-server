"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../../../db/db");
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
const paymentGatewaysListSummary_1 = require("../../../../../model/paymentGatewaysList/paymentGatewaysListSummary");
exports.apiGetPaymentGatewayListForBranch = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Get Payment Gateway List for shop...", req, res);
    const branchId = req.params.branch_id;
    var sqlQuery = 'SELECT * FROM payment_gateways AS pg LEFT JOIN payment_gateway_vs_branches AS pgv ON pg.payment_gateway_id = pgv.payment_gateway_id WHERE branch_id = ?;';
    var queryData = [branchId];
    try {
        const services = await db_1.executeQuery(sqlQuery, queryData);
        responseLogs_1.responseLogger.print("Completed Get Payment Gateway List for shop...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({ paymentgateways: services.map((item) => new paymentGatewaysListSummary_1.paymentGatewaysOfBranch(item)) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Get Payment Gateway List for shop...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
