"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser_1 = require("../../../general/bodyParser");
const apiGetSales_1 = require("./apiGetSales");
const apiGetSaleDetails_1 = require("./apiGetSaleDetails");
const apiAddSaleItem_1 = require("./apiAddSaleItem");
const apiGetSalesCount_1 = require("./apiGetSalesCount");
const apiGetSalesTotal_1 = require("./apiGetSalesTotal");
const apiDeleteSale_1 = require("./apiDeleteSale");
const apiDeleteSalesItem_1 = require("./apiDeleteSalesItem");
const apiUpdateSaleItem_1 = require("./apiUpdateSaleItem");
const apiGetSalesStatus_1 = require("./apiGetSalesStatus");
const apiDeleteSalesStatus_1 = require("./apiDeleteSalesStatus");
const apiUpdateSalesStatus_1 = require("./apiUpdateSalesStatus");
exports.salesRouter = express_1.Router();
exports.salesRouter.route("/count")
    .get(apiGetSalesCount_1.ApiGetSalesCount);
exports.salesRouter.route("/total")
    .get(apiGetSalesTotal_1.ApiGetSalesTotal);
exports.salesRouter.route("/")
    .get(apiGetSales_1.ApiGetSales);
// .post(jsonParser, ApiCreateProduct);
exports.salesRouter.route("/:sales_id")
    .get(apiGetSaleDetails_1.ApiGetSaleDetails)
    .post(bodyParser_1.jsonParser, apiAddSaleItem_1.ApiAddSaleItem)
    .delete(apiDeleteSale_1.ApiDeleteSale);
// .patch(jsonParser, ApiUpdateSaleItem);
exports.salesRouter.route("/item/:sales_details_id")
    // .get(ApiGetSaleDetails)
    // .post(jsonParser, ApiAddSaleItem)
    // .delete(ApiDeleteSalesItem)
    .patch(bodyParser_1.jsonParser, apiUpdateSaleItem_1.ApiUpdateSaleItem);
exports.salesRouter.route("/item/:sales_details_id/:total/:sales_id")
    // .get(ApiGetSaleDetails)
    // .post(jsonParser, ApiAddSaleItem)
    .delete(apiDeleteSalesItem_1.ApiDeleteSalesItem);
// .patch(jsonParser, ApiUpdateSaleItem);
exports.salesRouter.route("/status/:sales_id")
    .get(apiGetSalesStatus_1.ApiGetSalesStatus)
    // .post(jsonParser, ApiAddSaleItem)
    // .delete(ApiDeleteSale);
    .patch(bodyParser_1.jsonParser, apiUpdateSalesStatus_1.ApiUpdateSalesStatus);
exports.salesRouter.route("/status/:sales_id/:status_id/:status")
    // .get(ApiGetSalesStatus)
    // .post(jsonParser, ApiAddSaleItem)
    .delete(apiDeleteSalesStatus_1.ApiDeleteSalesStatus);
// .patch(jsonParser, ApiUpdateSaleItem)
