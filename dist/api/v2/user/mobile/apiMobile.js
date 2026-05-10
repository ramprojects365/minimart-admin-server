"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiBranches_1 = require("./branches/apiBranches");
const apiLogin_1 = require("./login/apiLogin");
exports.userMobileRouter = express_1.Router();
exports.userMobileRouter.use("/branches", apiBranches_1.branchRouter);
exports.userMobileRouter.use("/login", apiLogin_1.loginRouter);
