"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const v4_1 = __importDefault(require("uuid/v4"));
function getStaticHome(env, folder) {
    if (folder === 'product_images') {
        switch (env) {
            case "development":
                return "http://localhost:3000/public/product_images/";
            case "production":
                return "https://minimart.app/public/product_images/";
            default:
                return "https://minimart.app/public/product_images/";
        }
    }
    else if (folder === 'shop_images') {
        switch (env) {
            case "development":
                return "http://localhost:3000/public/shop_images/";
            case "production":
                return "https://minimart.app/public/shop_images/";
            default:
                return "https://minimart.app/public/shop_images/";
        }
    }
    else if (folder === 'cache') {
        switch (env) {
            case "development":
                return "http://localhost:3000/public/cache/";
            case "production":
                return "https://minimart.app/public/cache/";
            default:
                return "https://minimart.app/public/cache/";
        }
    }
}
exports.getStaticHome = getStaticHome;
function fileMapper(env, filename, folder) {
    return getStaticHome(env, folder) + filename;
}
exports.fileMapper = fileMapper;
function getFileUploader(env) {
    const fileID = v4_1.default();
    switch (env) {
        case "development":
            const fileStore = multer_1.default.diskStorage({
                destination: function (req, file, callback) {
                    callback(null, path_1.default.resolve("./", "public", "cache"));
                },
                filename: function (req, file, callback) {
                    callback(null, fileID + path_1.default.extname(file.originalname));
                }
            });
            return multer_1.default({ storage: fileStore }).single("file");
        case "production":
            const prodStore = multer_1.default.diskStorage({
                destination: function (req, file, callback) {
                    callback(null, path_1.default.resolve("./", "public", "cache"));
                },
                filename: function (req, file, callback) {
                    callback(null, fileID + path_1.default.extname(file.originalname));
                }
            });
            return multer_1.default({ storage: prodStore }).single("file");
        default:
            return (req, res, next) => { next(); };
    }
}
exports.getFileUploader = getFileUploader;
