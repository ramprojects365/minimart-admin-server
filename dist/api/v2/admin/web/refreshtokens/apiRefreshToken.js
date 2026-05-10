"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser_1 = require("../../../general/bodyParser");
const apiAdminRefreshToken_1 = require("./apiAdminRefreshToken");
exports.tokenRefreshRouter = express_1.Router();
exports.tokenRefreshRouter.route("/admin")
    .post(bodyParser_1.jsonParser, apiAdminRefreshToken_1.apiAdminRefreshToken);
