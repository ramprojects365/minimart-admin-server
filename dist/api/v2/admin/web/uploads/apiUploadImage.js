"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const static_1 = require("../../../general/static");
const responseLogs_1 = require("../../../general/responseLogs");
const messages_1 = require("../../../../../model/shared/messages");
exports.ApiUploadImage = (req, res, next) => {
    const upload = static_1.getFileUploader(req.app.get("env"));
    upload(req, res, (error) => {
        if (error) {
            responseLogs_1.responseLogger.print("Error Get Shops Count...", req, res);
            return next(messages_1.ApiError.errUploadImageFailed(error));
        }
        else {
            if (req.file) {
                // To change image to full image path
                res.json(messages_1.PublicInfo.infoSendData({ image: static_1.fileMapper(req.app.get("env"), req.file.filename, "cache") }));
            }
            else {
                return next(messages_1.ApiError.errMissingBody("File missing in request"));
            }
        }
    });
};
