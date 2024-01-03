import { Router } from "express";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { checkRole } from "../../middlewares/checkRole.middleware.js";
import { authentication } from "../../auth/authUtils.js";
import ReportController from "../../controllers/report.controller.js"

const reportRoute = Router();

reportRoute.use(authentication);

reportRoute.post(
    "/inventoryD/new",
    checkRole(["staff"]),
    asyncHandler(ReportController.createDInvReport)
);
reportRoute.post(
    "/incomeD/new",
    checkRole(["staff"]),
    asyncHandler(ReportController.createDIncReport)
);
reportRoute.post(
    "/incomeM/new",
    checkRole(["staff"]),
    asyncHandler(ReportController.createMIncReport)
);
reportRoute.get(
    "/inventoryD/all",
    checkRole(["staff","admin"]),
    asyncHandler(ReportController.getAllDInvReport)
);
reportRoute.get(
    "/incomeD/all",
    checkRole(["staff","admin"]),
    asyncHandler(ReportController.getAllDIncReport)
);
reportRoute.get(
    "/incomeM/all",
    checkRole(["staff","admin"]),
    asyncHandler(ReportController.getAllMIncReport)
);
export default reportRoute;