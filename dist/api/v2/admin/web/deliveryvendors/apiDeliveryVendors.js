"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiGetDeliveryVendorsList_1 = require("./apiGetDeliveryVendorsList");
const apiAddDeliveryVendor_1 = require("./apiAddDeliveryVendor");
const bodyParser_1 = require("../../../general/bodyParser");
const apiDisableDeliveryVendor_1 = require("./apiDisableDeliveryVendor");
const apiGetDeliveryVendorListForBranch_1 = require("./apiGetDeliveryVendorListForBranch");
exports.shopsDeliveryRouter = express_1.Router();
exports.shopsDeliveryRouter.route("/")
    .post(bodyParser_1.jsonParser, apiAddDeliveryVendor_1.apiAddDeliveryVendor);
exports.shopsDeliveryRouter.route("/disable")
    .post(bodyParser_1.jsonParser, apiDisableDeliveryVendor_1.apiDisableDeliveryVendor);
exports.shopsDeliveryRouter.route("/list")
    .get(apiGetDeliveryVendorsList_1.apiGetDeliveryVendorsList);
exports.shopsDeliveryRouter.route("/:branch_id")
    .get(apiGetDeliveryVendorListForBranch_1.apiGetDeliveryVendorListForBranch);
// shopsDeliveryRouter.route("/details")
//     .get(apiGetShopServiceDetails);
