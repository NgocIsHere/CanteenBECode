import { Router } from "express";
import inventoryActivityController from "../../controllers/inventoryAct.controller.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { checkRole } from "../../middlewares/checkRole.middleware.js";
import { authentication } from "../../auth/authUtils.js";

const inventoryActRoute = Router();

inventoryActRoute.use(authentication);
// Come:
inventoryActRoute.post(
  "/come",  // Use a distinct path for come voucher
  checkRole(["staff"]),
  asyncHandler(inventoryActivityController.createComeVoucher),
);
inventoryActRoute.get(
  "/allcomevoucher",
  checkRole(["staff"]),
  asyncHandler(inventoryActivityController.getAllComeVoucher),
)
// Delete:
inventoryActRoute.post(
  "/delete",  // Use a distinct path for delete voucher
  checkRole(["staff"]),
  asyncHandler(inventoryActivityController.createDeleteVoucher),
);
inventoryActRoute.get(
  "/alldeletevoucher",
  checkRole(["staff"]),
  asyncHandler(inventoryActivityController.getAllDeleteVoucher),
)
// Leave:
inventoryActRoute.post(
  "/leave",  // Use a distinct path for leave voucher
  checkRole(["staff"]),
  asyncHandler(inventoryActivityController.createLeaveVoucher),
);
inventoryActRoute.get(
  "/allleavevoucher",
  checkRole(["staff"]),
  asyncHandler(inventoryActivityController.getAllLeaveVoucher),
)
export default inventoryActRoute;
