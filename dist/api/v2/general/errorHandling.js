"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseLogs_1 = require("./responseLogs");
exports.apiErrorHandler = (err, req, res, next) => {
    switch (req.app.get("env")) {
        case "development":
            responseLogs_1.responseLogger.outputLog();
            console.log("Error dev - " + err);
            return res.status(err.status).json(err);
        case "production":
            responseLogs_1.responseLogger.outputLog();
            console.log("Error prod - " + JSON.stringify(err));
            return res.status(err.status).json(err);
    }
};
