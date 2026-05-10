"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser_1 = require("../../../general/bodyParser");
const apiUpdateShopItems_1 = require("./apiUpdateShopItems");
exports.shopItemsRouter = express_1.Router();
exports.shopItemsRouter.route("/")
    .patch(bodyParser_1.jsonParser, apiUpdateShopItems_1.ApiUpdateShopItems);
