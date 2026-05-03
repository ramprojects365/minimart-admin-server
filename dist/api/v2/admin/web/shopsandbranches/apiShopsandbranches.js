"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiGetShopsAndBranches_1 = require("./apiGetShopsAndBranches");
exports.shopsAndBranchesRouter = express_1.Router();
exports.shopsAndBranchesRouter.route("/")
    .get(apiGetShopsAndBranches_1.apiGetShopsAndBranches);
