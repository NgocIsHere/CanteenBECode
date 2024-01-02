import { Router } from "express";
import ItemController from "../../controllers/items.controller.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import { checkRole } from "../../middlewares/checkRole.middleware.js";
import { authentication } from "../../auth/authUtils.js";

const itemsRoute = Router();

itemsRoute.use(authentication);

itemsRoute.post(
  "/new",
  checkRole(["staff"]),
  asyncHandler(ItemController.createItems)
);

itemsRoute.get("/:type", asyncHandler(ItemController.getItems));

itemsRoute.patch(
  "/:id",
  checkRole(["staff", "admin"]),
  asyncHandler(ItemController.updateItem)
);

itemsRoute.delete(
  "/:id",
  checkRole(["staff", "admin"]),
  asyncHandler(ItemController.deleteItem)
);

export default itemsRoute;
