"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiShops_1 = require("./shops/apiShops");
const apiUsers_1 = require("./user/apiUsers");
const apiLogin_1 = require("./login/apiLogin");
const apiSessionVerify_1 = require("./login/apiSessionVerify");
const messages_1 = require("../../../../model/shared/messages");
const apiRefreshToken_1 = require("./refreshtokens/apiRefreshToken");
const apiCategories_1 = require("./categories/apiCategories");
const apiProducts_1 = require("./products/apiProducts");
const apiUploads_1 = require("./uploads/apiUploads");
const apiBranches_1 = require("./branches/apiBranches");
const apiShopItems_1 = require("./shopitems/apiShopItems");
const apiSales_1 = require("./sales/apiSales");
const apiAddress_1 = require("./address/apiAddress");
const apiDeliveryVendors_1 = require("./deliveryvendors/apiDeliveryVendors");
const apiShopsandbranches_1 = require("./shopsandbranches/apiShopsandbranches");
const apiPromotions_1 = require("./promotions/apiPromotions");
const apiDeleteaccount_1 = require("./accountdelete/apiDeleteaccount");
const apiPaymentGateways_1 = require("./paymentgateways/apiPaymentGateways");
exports.adminWebRouter = express_1.Router();
exports.adminWebRouter.use(apiSessionVerify_1.apiSessionVerify);
const checkSession = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        next(messages_1.ApiError.errUnauthorizedError());
    }
};
exports.adminWebRouter.use("/login", apiLogin_1.loginRouter);
exports.adminWebRouter.use("/acountdelete", apiDeleteaccount_1.accountDeleteRouter);
exports.adminWebRouter.use("/refreshtoken", apiRefreshToken_1.tokenRefreshRouter);
exports.adminWebRouter.use("/upload", checkSession, apiUploads_1.uploadRouter);
exports.adminWebRouter.use("/user", checkSession, apiUsers_1.usersRouter);
exports.adminWebRouter.use("/shops", checkSession, apiShops_1.shopsRouter);
exports.adminWebRouter.use("/branches", checkSession, apiBranches_1.branchesRouter);
exports.adminWebRouter.use("/categories", checkSession, apiCategories_1.categoriesRouter);
exports.adminWebRouter.use("/products", checkSession, apiProducts_1.productsRouter);
exports.adminWebRouter.use("/promotions", checkSession, apiPromotions_1.prototionsRouter);
exports.adminWebRouter.use("/shopitems", checkSession, apiShopItems_1.shopItemsRouter);
exports.adminWebRouter.use("/sales", checkSession, apiSales_1.salesRouter);
exports.adminWebRouter.use("/address", checkSession, apiAddress_1.addressRouter);
exports.adminWebRouter.use("/shop/deliveryvendors", checkSession, apiDeliveryVendors_1.shopsDeliveryRouter);
exports.adminWebRouter.use("/shopsandbranches", checkSession, apiShopsandbranches_1.shopsAndBranchesRouter);
exports.adminWebRouter.use("/shop/paymentgateways", checkSession, apiPaymentGateways_1.shopsPaymentGatewayRouter);
