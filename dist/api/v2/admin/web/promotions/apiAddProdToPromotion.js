"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require('moment');
const v4_1 = __importDefault(require("uuid/v4"));
const db_1 = require("../../../../../db/db");
const messages_1 = require("../../../../../model/shared/messages");
const responseLogs_1 = require("../../../general/responseLogs");
const promotionSummary_1 = require("../../../../../model/promotions/promotionSummary");
exports.ApiAddProdToPromotion = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling Add Product To Promotions...", req, res);
    const requiredFields = ["product_id", "percentage"];
    const givenFields = Object.getOwnPropertyNames(req.body);
    const promoId = req.params.promo_id;
    let promoItemsId = v4_1.default().toString();
    if (!requiredFields.every(field => givenFields.includes(field))) {
        return next(messages_1.ApiError.errMissingBody({ "details": "Required Fields are : " + requiredFields }));
    }
    console.log(promoId);
    const newPromotionItem = {
        promo_items_id: promoItemsId,
        promo_id: promoId || 0,
        shop_items_id: req.body.product_id || "",
        percentage: req.body.percentage || "",
    };
    let sqlQuery = "INSERT INTO  promotion_items (promo_items_id, promo_id, shop_items_id, discount_percentage) VALUES(?, ?, ?, ?);";
    let queryData = [newPromotionItem.promo_items_id, newPromotionItem.promo_id, newPromotionItem.shop_items_id, newPromotionItem.percentage];
    const rows = await db_1.executeQuery(sqlQuery, queryData);
    responseLogs_1.responseLogger.print("Completed Add Product To Promotions...", req, res);
    res.json(messages_1.PublicInfo.infoCreated({ promoItem: new promotionSummary_1.PromotionItemSummary(newPromotionItem) }));
};
