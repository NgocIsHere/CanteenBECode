import { Router } from "express";
import inventoryItemController from "../../controllers/inventoryItems.controller.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { checkRole } from "../../middlewares/checkRole.middleware.js";
import { authentication } from "../../auth/authUtils.js";

const inventoryItemsRoute = Router();

inventoryItemsRoute.use(authentication);

inventoryItemsRoute.post(
  "/new",
  checkRole(["staff"]),
  asyncHandler(inventoryItemController.createinventoryItems)
);
inventoryItemsRoute.get(
  "/all", asyncHandler(inventoryItemController.getAllinventoryItem)
)

inventoryItemsRoute.patch(
  "/:id",
  checkRole(["staff", "admin"]),
  asyncHandler(inventoryItemController.updateinventoryItem)
);

inventoryItemsRoute.delete(
  "/:id",
  checkRole(["staff", "admin"]),
  asyncHandler(inventoryItemController.deleteinventoryItem)
);

export default inventoryItemsRoute;
