import { RequestHandler } from "express-serve-static-core";
import multer from "multer";
import path from "path";
import uuid from "uuid/v4";

const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || process.env.S3_BUCKET;
const AWS_S3_REGION = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || "us-east-1";
const AWS_S3_PREFIX = normalizePrefix(process.env.AWS_S3_PREFIX || "");
let s3Client: any;

function normalizePrefix(prefix: string) {
    if (!prefix) {
        return "";
    }
    return prefix.replace(/^\/+|\/+$/g, "") + "/";
}

function getS3Client() {
    if (!s3Client) {
        const AWS = require("aws-sdk");
        const options: any = { region: AWS_S3_REGION };
        if (process.env.AWS_S3_ENDPOINT) {
            options.endpoint = process.env.AWS_S3_ENDPOINT;
            options.s3ForcePathStyle = true;
        }
        s3Client = new AWS.S3(options);
    }
    return s3Client;
}

function getS3Key(folder: string, filename: string) {
    return AWS_S3_PREFIX + folder + "/" + filename;
}

function getPublicS3Home(folder: string) {
    const customUrl = process.env.AWS_S3_PUBLIC_URL;
    if (customUrl) {
        return customUrl.replace(/\/+$/g, "") + "/" + AWS_S3_PREFIX + folder + "/";
    }
    return "https://" + AWS_S3_BUCKET + ".s3." + AWS_S3_REGION + ".amazonaws.com/" + AWS_S3_PREFIX + folder + "/";
}

function getS3PutOptions(contentType?: string) {
    const options: any = {};
    if (contentType) {
        options.ContentType = contentType;
    }
    if (process.env.AWS_S3_ACL) {
        options.ACL = process.env.AWS_S3_ACL;
    }
    return options;
}

export function isS3StorageEnabled() {
    return !!AWS_S3_BUCKET;
}

export function getStaticHome(env: string, folder: string) {
    if (isS3StorageEnabled()) {
        return getPublicS3Home(folder);
    }
    if (folder === 'product_images') {
        switch (env) {
            case "development":
                return "http://localhost:3000/public/product_images/"
            case "production":
                return "https://minimart.app/public/product_images/"
            default:
                return "https://minimart.app/public/product_images/"
        }
    } else if (folder === 'shop_images') {
        switch (env) {
            case "development":
                return "http://localhost:3000/public/shop_images/"
            case "production":
                return "https://minimart.app/public/shop_images/"
            default:
                return "https://minimart.app/public/shop_images/"
        }
    } else if (folder === 'cache') {
        switch (env) {
            case "development":
                return "http://localhost:3000/public/cache/"
            case "production":
                return "https://minimart.app/public/cache/"
            default:
                return "https://minimart.app/public/cache/"
        }
    }
}

export function fileMapper(env: string, filename: string, folder: string) {
    if (!filename) {
        return "";
    }
    if (filename.indexOf("http://") === 0 || filename.indexOf("https://") === 0) {
        return filename;
    }
    return getStaticHome(env, folder) + filename;
}

export function getFileUploader(env: string): RequestHandler {
    const fileID = uuid();
    if (isS3StorageEnabled()) {
        return multer({ storage: multer.memoryStorage() }).single("file");
    }
    switch (env) {
        case "development":
            const fileStore = multer.diskStorage({
                destination: function (req, file, callback) {
                    callback(null, path.resolve("./", "public", "cache"));
                },
                filename: function (req, file, callback) {
                    callback(null, fileID + path.extname(file.originalname));
                }
            });
            return multer({ storage: fileStore }).single("file");
        case "production":
            const prodStore = multer.diskStorage({
                destination: function (req, file, callback) {
                    callback(null, path.resolve("./", "public", "cache"));
                },
                filename: function (req, file, callback) {
                    callback(null, fileID + path.extname(file.originalname));
                }
            });
            return multer({ storage: prodStore }).single("file");
        default:
            return (req, res, next) => { next() };
    }
}

export async function uploadImageToCache(file: Express.Multer.File): Promise<string> {
    const filename = file.filename || uuid() + path.extname(file.originalname);
    if (!isS3StorageEnabled()) {
        return filename;
    }
    await getS3Client().putObject({
        Bucket: AWS_S3_BUCKET,
        Key: getS3Key("cache", filename),
        Body: file.buffer,
        ...getS3PutOptions(file.mimetype),
    }).promise();
    return filename;
}

export async function moveImageFromCache(filename: string, folder: "product_images" | "shop_images"): Promise<void> {
    if (!isS3StorageEnabled()) {
        await new Promise<void>((resolve, reject) => {
            fsCopyFile("public/cache/" + filename, "public/" + folder + "/" + filename, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        fsUnlink("public/cache/" + filename, () => undefined);
        return;
    }
    const sourceKey = getS3Key("cache", filename);
    const targetKey = getS3Key(folder, filename);
    await getS3Client().copyObject({
        Bucket: AWS_S3_BUCKET,
        CopySource: AWS_S3_BUCKET + "/" + sourceKey,
        Key: targetKey,
        ...getS3PutOptions(),
    }).promise();
    await getS3Client().deleteObject({
        Bucket: AWS_S3_BUCKET,
        Key: sourceKey,
    }).promise();
}

const fsCopyFile = require("fs").copyFile;
const fsUnlink = require("fs").unlink;
