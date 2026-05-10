"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser_1 = require("../../../general/bodyParser");
const apiLoginUser_1 = require("./apiLoginUser");
exports.loginRouter = express_1.Router();
exports.loginRouter.route("/")
    .post(bodyParser_1.jsonParser, apiLoginUser_1.apiLoginUser);
