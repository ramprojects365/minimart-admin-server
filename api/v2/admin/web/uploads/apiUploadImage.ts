import { RequestHandler } from "express-serve-static-core";

import { getFileUploader, fileMapper, uploadImageToCache } from "../../../general/static";
import { responseLogger } from "../../../general/responseLogs";
import { ApiError, PublicInfo } from "../../../../../model/shared/messages";

export const ApiUploadImage: RequestHandler = (req, res, next) => {
    const upload = getFileUploader(req.app.get("env"));
    upload(req, res, async (error) => {
        if (error) {
            responseLogger.print("Error Get Shops Count...", req, res);
            return next(ApiError.errUploadImageFailed(error));
        } else {
            if (req.file) {
                try {
                    const filename = await uploadImageToCache(req.file);
                    // To change image to full image path
                    res.json(PublicInfo.infoSendData({ image: fileMapper(req.app.get("env"), filename, "cache") }));
                } catch (uploadError) {
                    responseLogger.print("Error Upload Image...", req, res);
                    return next(ApiError.errUploadImageFailed(uploadError));
                }
            } else {
                return next(ApiError.errMissingBody("File missing in request"));
            }
        }
    });
}
