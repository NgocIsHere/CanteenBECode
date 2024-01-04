import SuccessResponse from "../core/success.response.js";
import OrderService from "../services/order.service.js";

class OrderController {
  static async createOrder(req, res) {
    const data = await OrderService.createOrder({
      ...req.body,
      userId: req.user._id,
    });

    new SuccessResponse({
      message: "Created Order!",
      data,
    }).send(res);
  }

  static async getAllOrders(req, res) {
    const data = await OrderService.getAllOrders();

    new SuccessResponse({
      message: "All orders of user",
      data,
    }).send(res);
  }

  static async getAllOrdersOfUser(req, res) {
    const data = await OrderService.getAllOrdersOfUser(req.params.userId);

    new SuccessResponse({
      message: "All orders of a user",
      data,
    }).send(res);
  }

  static async getOrderDetail(req, res) {
    const data = await OrderService.getOrderDetail({
      orderId: req.query.orderId
    });

    new SuccessResponse({
      message: "Order detail of a user",
      data,
    }).send(res);
  }

  static async searchOrder(req, res) {
    const data = await OrderService.searchOrder({
      ...req.query,
      role: req.user.role,
      userId: req.user._id,
    });

    new SuccessResponse({
      message: "Resuls for searching orders",
      data,
    }).send(res);
  }

  static async cancleOrder(req, res) {
    const data = await OrderService.cancleOrder({
      orderId: req.params.orderId,
      userId: req.user._id,
    });

    new SuccessResponse({
      message: "Order has been cancled",
      data,
    }).send(res);
  }

  static async deleteOrder(req, res) {
    const data = await OrderService.deleteOrder({
      orderId: req.params.orderId,
    });

    new SuccessResponse({
      message: "Order has been deleted",
      data,
    }).send(res);
  }

  static async confirmPayment(req, res) {
    const data = await OrderService.confirmPayment(req.params);

    new SuccessResponse({
      message: "Order has been confirmed",
      data,
    }).send(res);
  }
}

export default OrderController;
