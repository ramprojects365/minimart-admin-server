"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class paymentGatewayListSummary {
    constructor(data) {
        this.payment_gateway_id = data.payment_gateway_id;
        this.payment_gateway_name = data.payment_gateway_name;
        this.payment_currency = data.payment_currency;
        this.publish_token = data.publish_token;
        this.secret_key = data.secret_key;
    }
    ;
}
exports.paymentGatewayListSummary = paymentGatewayListSummary;
class paymentGatewaysOfBranch {
    constructor(data) {
        this.payment_gateway_id = data.payment_gateway_id;
        this.payment_gateway_name = data.payment_gateway_name;
        this.payment_currency = data.payment_currency;
        this.publish_token = data.publish_token;
        this.secret_key = data.secret_key;
        this.payment_gateway_branchid = data.payment_gateway_branchid;
        this.branch_id = data.branch_id;
        this.status = data.status;
    }
    ;
}
exports.paymentGatewaysOfBranch = paymentGatewaysOfBranch;
