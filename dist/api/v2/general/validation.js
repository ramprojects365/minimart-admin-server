"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../../../model/shared/messages");
exports.apiValidation = (req, res, next) => {
    if (req.accepts("application/json")) {
        next();
    }
    else {
        next(new messages_1.ApiError("Content Type Not Supported", "This Api only supports application/json", 400));
        next();
    }
};
