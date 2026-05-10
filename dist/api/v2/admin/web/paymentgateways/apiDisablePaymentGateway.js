"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const responseLogs_1 = require("../../../general/responseLogs");
const paymentGatewayBranches_1 = require("../../../../../model/paymentGatewayBranches/paymentGatewayBranches");
exports.apiDisablePaymentGateway = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Update Payment Gateway...", req, res);
    const PaymentGatewayId = req.body.payment_gateway_id;
    const branchId = req.body.branch_id;
    var sqlQuery = "UPDATE payment_gateway_vs_branches SET status = 0 WHERE payment_gateway_id = ? AND branch_id = ?";
    var queryData = [PaymentGatewayId, branchId];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        if (rows.changedRows == 0) {
            responseLogs_1.responseLogger.print("Completed Update Payment Gateway But no row updated...", req, res);
            res.json(messages_1.PublicInfo.infoNotUpdated({ info: "No Rows updated." }));
        }
        else {
            sqlQuery = "SELECT * FROM payment_gateway_vs_branches WHERE payment_gateway_id = ? AND branch_id = ?";
            queryData = [PaymentGatewayId, branchId];
            const paymentgateway = await db_1.executeQuery(sqlQuery, queryData);
            responseLogs_1.responseLogger.print("Completed Update Payment Gateway...", req, res);
            res.json(messages_1.PublicInfo.infoUpdated({ paymentgateways: new paymentGatewayBranches_1.paymentGatewayBranches(paymentgateway[0]) }));
        }
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Update Payment Gateway...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
