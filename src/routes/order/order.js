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
  checkRole(["staff","admin"]),
  asyncHandler(OrderController.getAllOrders)
);
orderRoute.get(
  "/pending",
  checkRole(["staff","admin"]),
  asyncHandler(OrderController.getPendingOrders)
);
orderRoute.get("/details", asyncHandler(OrderController.getOrderDetail));

orderRoute.get("/search", asyncHandler(OrderController.searchOrder));

orderRoute.post("/cancle/:orderId", asyncHandler(OrderController.cancleOrder));

orderRoute.delete(
  "/:orderId",
  asyncHandler(OrderController.deleteOrder)
);

orderRoute.post(
  "/confirm-payment/:orderId",
  checkRole(["staff","admin"]),
  asyncHandler(OrderController.confirmPayment)
);
orderRoute.post(
  "/completeOrder/:orderId",
  checkRole(["staff","admin"]),
  asyncHandler(OrderController.completeOrder)
);

orderRoute.get(
  "/:userId",
  checkRole(["staff", "user"]),
  asyncHandler(OrderController.getAllOrdersOfUser)
);

export default orderRoute;
