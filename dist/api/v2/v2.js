"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const corrs_1 = require("./general/corrs");
const requestLogger_1 = require("./general/requestLogger");
const validation_1 = require("./general/validation");
const apiUser_1 = require("./user/apiUser");
const apiAdmin_1 = require("./admin/apiAdmin");
const errorHandling_1 = require("./general/errorHandling");
const responseLogs_1 = require("./general/responseLogs");
exports.routerV2 = express_1.Router();
// const authenticator: CustomRquestHandler = (req, res, next) => {
//     // const userName = "Sunoj Vijayan";
//     // req.user = userName;
//     next();
// }
exports.routerV2.use(corrs_1.apiCorrs);
exports.routerV2.use(responseLogs_1.responseLogs);
//routerV2.use(authenticator);
exports.routerV2.use(requestLogger_1.requestLogger);
exports.routerV2.use(validation_1.apiValidation);
exports.routerV2.get("/", (req, res, next) => {
    res.send("Welcome to Minimart Api Version 2.0 - " + req.app.get("env"));
});
exports.routerV2.use("/user", apiUser_1.userRouter);
exports.routerV2.use("/admin", apiAdmin_1.adminRouter);
exports.routerV2.use(errorHandling_1.apiErrorHandler);
