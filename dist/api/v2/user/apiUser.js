"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiMobile_1 = require("./mobile/apiMobile");
const apiWeb_1 = require("./web/apiWeb");
exports.userRouter = express_1.Router();
exports.userRouter.use("/mobile", apiMobile_1.userMobileRouter);
exports.userRouter.use("/web", apiWeb_1.userWebRouter);
