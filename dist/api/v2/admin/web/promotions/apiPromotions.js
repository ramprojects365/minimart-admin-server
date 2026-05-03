"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser_1 = require("../../../general/bodyParser");
const apiAddProdToPromotion_1 = require("./apiAddProdToPromotion");
const apiAddPromotion_1 = require("./apiAddPromotion");
const apiDeletePromotionItem_1 = require("./apiDeletePromotionItem");
const apiDeletePromotions_1 = require("./apiDeletePromotions");
const apiGetPromotionItems_1 = require("./apiGetPromotionItems");
const apiGetPromotions_1 = require("./apiGetPromotions");
const apiUpdatePromotions_1 = require("./apiUpdatePromotions");
exports.prototionsRouter = express_1.Router();
exports.prototionsRouter.route("/")
    .get(apiGetPromotions_1.ApiGetPromotions)
    .post(bodyParser_1.jsonParser, apiAddPromotion_1.ApiAddPromotion);
exports.prototionsRouter.route("/:promo_id")
    .delete(apiDeletePromotions_1.apiDeletePromotions)
    .patch(bodyParser_1.jsonParser, apiUpdatePromotions_1.apiUpdatePromotions);
exports.prototionsRouter.route("/item")
    .get(apiGetPromotionItems_1.ApiGetPromotionItems);
exports.prototionsRouter.route("/item/:promo_id")
    .post(bodyParser_1.jsonParser, apiAddProdToPromotion_1.ApiAddProdToPromotion);
exports.prototionsRouter.route("/item/remove/:item_id")
    .delete(apiDeletePromotionItem_1.ApiDeletePromotionItem);
