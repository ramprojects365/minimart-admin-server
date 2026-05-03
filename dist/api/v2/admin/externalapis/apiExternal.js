"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiShopItems_1 = require("./shopitems/apiShopItems");
const apiSessionVerify_1 = require("../web/login/apiSessionVerify");
const messages_1 = require("../../../../model/shared/messages");
// import { reportsRouter } from "./reports/reports";
exports.externalRouter = express_1.Router();
exports.externalRouter.use(apiSessionVerify_1.apiSessionVerify);
const checkSession = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        next(messages_1.ApiError.errUnauthorizedError());
    }
};
exports.externalRouter.use("/items", checkSession, apiShopItems_1.shopItemsRouter);
// adminRouter.use("/reports", reportsRouter);
