"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const messages_1 = require("../../../../../model/shared/messages");
const adminUserSummary_1 = require("../../../../../model/adminuser/adminUserSummary");
const sessionConfig_1 = require("../../../../../config/server/sessionConfig");
exports.apiSessionGenerate = (req, res, next) => {
    if (req.user) {
        const token = jwt.sign({ userID: req.user.id }, sessionConfig_1.sessionTokenSecret, { expiresIn: sessionConfig_1.sessionTokenLifetime });
        const refreshToken = jwt.sign({ userID: req.user.id }, sessionConfig_1.refreshTokenSecret, { expiresIn: sessionConfig_1.refreshTokenLifetime });
        res.json(messages_1.PublicInfo.infoSendData({ "loggedIn": true, "token": token, "refreshToken": refreshToken, "admin_user": new adminUserSummary_1.AdminUserSummary(req.user) }));
    }
};
exports.apiTokenGenerate = (req, res, next) => {
    if (req.user) {
        const token = jwt.sign({ userID: req.user.id }, sessionConfig_1.sessionTokenSecret, { expiresIn: sessionConfig_1.sessionTokenLifetime });
        const refreshToken = jwt.sign({ userID: req.user.id }, sessionConfig_1.refreshTokenSecret, { expiresIn: sessionConfig_1.refreshTokenLifetime });
        res.json(messages_1.OauthInfo.loginSendToken(token));
    }
};
