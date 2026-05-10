"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiGetSalesReport_1 = require("./apiGetSalesReport");
exports.salesReportRouter = express_1.Router();
exports.salesReportRouter.route("/")
    .get(apiGetSalesReport_1.ApiGetSalesReport);
// .post(jsonParser, ApiCreateProduct);
