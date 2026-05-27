import { Router } from "express";
import { RequestHandler } from "express-serve-static-core";
import * as bcrypt from "bcryptjs";

import { jsonParser } from "../../general/bodyParser";
import { ApiError, PublicInfo } from "../../../../model/shared/messages";
import { executeQuery } from "../../../../db/db";
import { saltRounds } from "../../../../config/server/bcript";

const SADMIN_EMAIL = "sadmin@gmail.com";
const SADMIN_DISPLAY_NAME = "Super Admin";
const SADMIN_USER_TYPE = "sadmin";
const SADMIN_STATUS = "active";
const SADMIN_SHOP_ID = 0;
const SADMIN_BRANCH_ID = 0;

const setupSadminHandler: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return next(
            ApiError.errMissingBody({
                details: "Required fields: email, password",
            })
        );
    }

    if (email !== SADMIN_EMAIL) {
        return next(
            ApiError.errMissingBody({
                details: `This endpoint only provisions the sadmin account (${SADMIN_EMAIL})`,
            })
        );
    }

    try {
        const hash = await bcrypt.hash(password, saltRounds);

        // Upsert: update if the email already exists, otherwise insert
        const upsertQuery = `
            INSERT INTO adminusers
                (email, password, user_type, status, shop_id, branch_id, displayName)
            VALUES
                (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                password    = VALUES(password),
                user_type   = VALUES(user_type),
                status      = VALUES(status),
                shop_id     = VALUES(shop_id),
                branch_id   = VALUES(branch_id),
                displayName = VALUES(displayName)
        `;

        const queryData = [
            SADMIN_EMAIL,
            hash,
            SADMIN_USER_TYPE,
            SADMIN_STATUS,
            SADMIN_SHOP_ID,
            SADMIN_BRANCH_ID,
            SADMIN_DISPLAY_NAME,
        ];

        await executeQuery(upsertQuery, queryData);

        res.status(200).json(
            PublicInfo.infoSendData({
                message:
                    "sadmin user provisioned successfully. " +
                    "Remove the /setup-sadmin endpoint once login is confirmed.",
                email: SADMIN_EMAIL,
                user_type: SADMIN_USER_TYPE,
                status: SADMIN_STATUS,
            })
        );
    } catch (error) {
        return next(ApiError.errInDatabase(error));
    }
};

export let setupSadminRouter = Router();

setupSadminRouter.route("/").post(jsonParser, setupSadminHandler);
