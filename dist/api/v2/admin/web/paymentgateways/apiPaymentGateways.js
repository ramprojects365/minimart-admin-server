"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiGetPaymentGatewaysList_1 = require("./apiGetPaymentGatewaysList");
const apiAddPaymentGateway_1 = require("./apiAddPaymentGateway");
const bodyParser_1 = require("../../../general/bodyParser");
const apiDisablePaymentGateway_1 = require("./apiDisablePaymentGateway");
const apiGetPaymentGatewayListForBranch_1 = require("./apiGetPaymentGatewayListForBranch");
exports.shopsPaymentGatewayRouter = express_1.Router();
exports.shopsPaymentGatewayRouter.route("/")
    .post(bodyParser_1.jsonParser, apiAddPaymentGateway_1.apiAddPaymentGateway);
exports.shopsPaymentGatewayRouter.route("/disable")
    .post(bodyParser_1.jsonParser, apiDisablePaymentGateway_1.apiDisablePaymentGateway);
exports.shopsPaymentGatewayRouter.route("/list")
    .get(apiGetPaymentGatewaysList_1.apiGetPaymentGatewaysList);
exports.shopsPaymentGatewayRouter.route("/:branch_id")
    .get(apiGetPaymentGatewayListForBranch_1.apiGetPaymentGatewayListForBranch);
