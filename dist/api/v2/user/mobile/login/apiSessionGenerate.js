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
const sessionConfig_1 = require("../../../../../config/server/sessionConfig");
const userSummary_1 = require("../../../../../model/user/userSummary");
exports.apiSessionGenerate = (req, res, next) => {
    if (req.user) {
        const token = jwt.sign({ userID: req.user.id }, sessionConfig_1.sessionTokenSecret, { expiresIn: sessionConfig_1.sessionTokenLifetime });
        const refreshToken = jwt.sign({ userID: req.user.id }, sessionConfig_1.refreshTokenSecret, { expiresIn: sessionConfig_1.refreshTokenLifetime });
        req.user.token = token;
        req.user.refreshToken = refreshToken;
        res.json(messages_1.PublicInfo.infoSendData({ "user": new userSummary_1.UserSummary(req.user) }));
    }
};
