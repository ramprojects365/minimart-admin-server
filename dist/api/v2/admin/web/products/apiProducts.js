"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser_1 = require("../../../general/bodyParser");
const apiGetProducts_1 = require("./apiGetProducts");
const apiCreateProduct_1 = require("./apiCreateProduct");
const apiUpdateProduct_1 = require("./apiUpdateProduct");
const apiDeleteProduct_1 = require("./apiDeleteProduct");
const apiGetProductsCount_1 = require("./apiGetProductsCount");
exports.productsRouter = express_1.Router();
exports.productsRouter.route("/count")
    .get(apiGetProductsCount_1.ApiGetProductsCount);
exports.productsRouter.route("/")
    .get(apiGetProducts_1.ApiGetProducts)
    .post(bodyParser_1.jsonParser, apiCreateProduct_1.ApiCreateProduct);
exports.productsRouter.route("/:product_id")
    .delete(apiDeleteProduct_1.ApiDeleteProducts)
    .patch(bodyParser_1.jsonParser, apiUpdateProduct_1.ApiUpdateProduct);
