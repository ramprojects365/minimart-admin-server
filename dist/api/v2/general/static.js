"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const v4_1 = __importDefault(require("uuid/v4"));
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || process.env.AWS_S3_BUCKET_NAME || process.env.S3_BUCKET;
const AWS_S3_REGION = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "us-east-1";
const AWS_S3_PREFIX = normalizePrefix(process.env.AWS_S3_PREFIX || "");
let s3Client;
function normalizePrefix(prefix) {
    if (!prefix) {
        return "";
    }
    return prefix.replace(/^\/+|\/+$/g, "") + "/";
}
function getS3Client() {
    if (!s3Client) {
        const AWS = require("aws-sdk");
        const options = { region: AWS_S3_REGION };
        if (process.env.AWS_S3_ENDPOINT) {
            options.endpoint = process.env.AWS_S3_ENDPOINT;
            options.s3ForcePathStyle = true;
        }
        s3Client = new AWS.S3(options);
    }
    return s3Client;
}
function getS3Key(folder, filename) {
    return AWS_S3_PREFIX + folder + "/" + filename;
}
function getPublicS3Home(folder) {
    const customUrl = process.env.AWS_S3_PUBLIC_URL;
    if (customUrl) {
        return customUrl.replace(/\/+$/g, "") + "/" + AWS_S3_PREFIX + folder + "/";
    }
    return "https://" + AWS_S3_BUCKET + ".s3." + AWS_S3_REGION + ".amazonaws.com/" + AWS_S3_PREFIX + folder + "/";
}
function getS3PutOptions(contentType) {
    const options = {};
    if (contentType) {
        options.ContentType = contentType;
    }
    if (process.env.AWS_S3_ACL) {
        options.ACL = process.env.AWS_S3_ACL;
    }
    return options;
}
function isS3StorageEnabled() {
    return !!AWS_S3_BUCKET;
}
exports.isS3StorageEnabled = isS3StorageEnabled;
function getStaticHome(env, folder) {
    if (isS3StorageEnabled()) {
        return getPublicS3Home(folder);
    }
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
    if (!filename) {
        return "";
    }
    if (filename.indexOf("http://") === 0 || filename.indexOf("https://") === 0) {
        return filename;
    }
    return getStaticHome(env, folder) + filename;
}
exports.fileMapper = fileMapper;
function getFileUploader(env) {
    const fileID = v4_1.default();
    if (isS3StorageEnabled()) {
        return multer_1.default({ storage: multer_1.default.memoryStorage() }).single("file");
    }
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
async function uploadImageToCache(file) {
    const filename = file.filename || v4_1.default() + path_1.default.extname(file.originalname);
    if (!isS3StorageEnabled()) {
        return filename;
    }
    await getS3Client().putObject(Object.assign({ Bucket: AWS_S3_BUCKET, Key: getS3Key("cache", filename), Body: file.buffer }, getS3PutOptions(file.mimetype))).promise();
    return filename;
}
exports.uploadImageToCache = uploadImageToCache;
async function moveImageFromCache(filename, folder) {
    if (!isS3StorageEnabled()) {
        await new Promise((resolve, reject) => {
            fsCopyFile("public/cache/" + filename, "public/" + folder + "/" + filename, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
        fsUnlink("public/cache/" + filename, () => undefined);
        return;
    }
    const sourceKey = getS3Key("cache", filename);
    const targetKey = getS3Key(folder, filename);
    await getS3Client().copyObject(Object.assign({ Bucket: AWS_S3_BUCKET, CopySource: AWS_S3_BUCKET + "/" + sourceKey, Key: targetKey }, getS3PutOptions())).promise();
    await getS3Client().deleteObject({
        Bucket: AWS_S3_BUCKET,
        Key: sourceKey,
    }).promise();
}
exports.moveImageFromCache = moveImageFromCache;
const fsCopyFile = require("fs").copyFile;
const fsUnlink = require("fs").unlink;
