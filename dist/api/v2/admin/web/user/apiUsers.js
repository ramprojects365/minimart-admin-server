"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser_1 = require("../../../general/bodyParser");
const apiCreateUser_1 = require("./apiCreateUser");
const apiGetUsers_1 = require("./apiGetUsers");
const apiDeleteUser_1 = require("./apiDeleteUser");
const apiUpdateUser_1 = require("./apiUpdateUser");
exports.usersRouter = express_1.Router();
exports.usersRouter.route("/")
    .get(apiGetUsers_1.apiGetUsers)
    .post(bodyParser_1.jsonParser, apiCreateUser_1.apiCreateUser);
exports.usersRouter.route("/:id")
    .delete(apiDeleteUser_1.apiDeleteUser)
    .patch(bodyParser_1.jsonParser, apiUpdateUser_1.apiUpdateUser);
