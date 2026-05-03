"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser_1 = require("../../../general/bodyParser");
const apiGetShopItems_1 = require("./apiGetShopItems");
const apiUpdateShopItem_1 = require("./apiUpdateShopItem");
const apiCreateShopItem_1 = require("./apiCreateShopItem");
exports.shopItemsRouter = express_1.Router();
exports.shopItemsRouter.route("/count");
// .get(ApiGetProductsCount);
exports.shopItemsRouter.route("/")
    .get(apiGetShopItems_1.ApiGetShopItems)
    .post(bodyParser_1.jsonParser, apiCreateShopItem_1.ApiCreateShopItem);
exports.shopItemsRouter.route("/:item_id")
    // .delete(ApiDeleteProducts)
    .patch(bodyParser_1.jsonParser, apiUpdateShopItem_1.ApiUpdateShopItem);
