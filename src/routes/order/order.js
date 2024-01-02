import { Router } from "express";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import OrderController from "../../controllers/order.controller.js";
import { authentication } from "../../auth/authUtils.js";
import { checkRole } from "../../middlewares/checkRole.middleware.js";

const orderRoute = Router();

orderRoute.use(authentication);

orderRoute.post("/new", asyncHandler(OrderController.createOrder));

orderRoute.get(
  "/",
  checkRole(["staff"]),
  asyncHandler(OrderController.getAllOrders)
);

orderRoute.get("/details", asyncHandler(OrderController.getOrderDetail));

orderRoute.get("/search", asyncHandler(OrderController.searchOrder));

orderRoute.patch("/cancle/:orderId", asyncHandler(OrderController.cancleOrder));

orderRoute.delete(
  "/:orderId",
  checkRole(["staff"]),
  asyncHandler(OrderController.deleteOrder)
);

orderRoute.patch(
  "/confirm-payment/:orderId",
  checkRole(["staff"]),
  asyncHandler(OrderController.confirmPayment)
);

orderRoute.get(
  "/:userId",
  checkRole(["staff", "user"]),
  asyncHandler(OrderController.getAllOrdersOfUser)
);

export default orderRoute;
