import { Router } from "express";

import { adminWebRouter } from "./web/apiWeb";
import { reportsRouter } from "./reports/reports";
import { externalRouter } from "./externalapis/apiExternal";
import { setupSadminRouter } from "./setup/apiSetupSadmin";

export let adminRouter = Router();

// TODO: Remove this endpoint once sadmin login is confirmed working
adminRouter.use("/setup-sadmin", setupSadminRouter);

adminRouter.use("/web", adminWebRouter);
adminRouter.use("/reports", reportsRouter);
adminRouter.use("/external", externalRouter);
