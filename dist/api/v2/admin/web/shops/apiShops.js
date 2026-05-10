"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiGetShops_1 = require("./apiGetShops");
const bodyParser_1 = require("../../../general/bodyParser");
const apiCreateShop_1 = require("./apiCreateShop");
const apiUpdateShop_1 = require("./apiUpdateShop");
const apiDeleteShop_1 = require("./apiDeleteShop");
const apiGetShopsCount_1 = require("./apiGetShopsCount");
exports.shopsRouter = express_1.Router();
exports.shopsRouter.route("/count")
    .get(apiGetShopsCount_1.ApiGetShopsCount);
exports.shopsRouter.route("/")
    .get(apiGetShops_1.apiGetShops)
    .post(bodyParser_1.jsonParser, apiCreateShop_1.apiCreateShop);
exports.shopsRouter.route("/:shop_id")
    .delete(apiDeleteShop_1.apiDeleteShop)
    .patch(bodyParser_1.jsonParser, apiUpdateShop_1.apiUpdateShop);
