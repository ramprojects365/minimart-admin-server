"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = __importStar(require("nodemailer"));
const messages_1 = require("../../../../../model/shared/messages");
const responseLogs_1 = require("../../../general/responseLogs");
var transporter = nodemailer.createTransport(`smtps://sales%40convoxy.com:Sunoj@123@smtp.gmail.com`);
exports.apiContactUs = async (req, res, next) => {
    responseLogs_1.responseLogger.print("Calling contact us send email..", req, res);
    var mailOptions = {
        from: 'sales@minimart.com',
        to: 'sunoj.vijayan@gmail.com, nagaramaganga@gmail.com',
        subject: req.body.subject,
        text: "\n\nNew message from " + req.body.name + "\n\nNumber " + req.body.number + "\n\nEmail " + req.body.email + "\n\n Message " + req.body.message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            responseLogs_1.responseLogger.print("Error in contact us send email...", req, res);
            return next(messages_1.ApiError.contactUsError(error));
        }
        console.log(`Message Sent ${info.response}`);
        responseLogs_1.responseLogger.print("Completed contact us send email...", req, res);
        res.json(messages_1.PublicInfo.infoSendData({}));
    });
};
