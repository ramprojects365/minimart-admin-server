"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("../../../general/responseLogs");
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const paymentGatewayBranches_1 = require("../../../../../model/paymentGatewayBranches/paymentGatewayBranches");
exports.apiAddPaymentGateway = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Add Payment Gateway to Shop Branch...", req, res);
    const requiredFields = ["payment_gateway_id", "branch_id"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    const newPaymentGatewayBranch = {
        payment_gateway_branchid: 0,
        payment_gateway_id: req.body.payment_gateway_id || 0,
        branch_id: req.body.branch_id || 0
    };
    var sqlQuery = "INSERT INTO payment_gateway_vs_branches (payment_gateway_id, branch_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE status = 1;";
    var queryData = [newPaymentGatewayBranch.payment_gateway_id, newPaymentGatewayBranch.branch_id];
    try {
        const rows = await db_1.executeQuery(sqlQuery, queryData);
        newPaymentGatewayBranch.payment_gateway_branchid = rows.insertId;
        responseLogs_1.responseLogger.print("Completed Add Payment Gateway to Shop Branch...", req, res);
        res.json(messages_1.PublicInfo.infoCreated({ shop: new paymentGatewayBranches_1.paymentGatewayBranches(newPaymentGatewayBranch) }));
    }
    catch (error) {
        responseLogs_1.responseLogger.print("Error Add Payment Gateway to Shop Branch...", req, res);
        return next(messages_1.ApiError.errInDatabase(error));
    }
};
