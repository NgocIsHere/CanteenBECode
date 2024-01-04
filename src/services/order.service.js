import ErrorResponse from "../core/error.response.js";
import order from "../models/order.model.js";
import orderItem from "../models/orderItem.model.js";
import {
  findItemById,
  updateQuantityItem,
} from "../models/repositories/item.repo.js";
import {
  findOrderById,
  searchOrderByRole,
  updateOrder,
} from "../models/repositories/order.repo.js";
import { convertToObjectId } from "../utils/index.js";

class OrderService {
  static async createOrder(infoOrder) {
    const { userId, listItems, timeReceive } = infoOrder;

    let totalPrice = 0;

    for (let item of listItems) {
      const itemInDb = await findItemById(convertToObjectId(item.item_id));
      if (!itemInDb) throw ErrorResponse("Invalid order", 400);
      totalPrice += itemInDb.item_price * item.item_quantity;
    }

    const newOrder = await order.create({
      user_id: convertToObjectId(userId),
      order_total_price: totalPrice,
      time_receive: timeReceive,
    });

    for (let item of listItems) {
      const itemInDb = await findItemById(convertToObjectId(item.item_id));
      const newOrderItem = await orderItem.create({
        order_id: newOrder._id,
        item_id: itemInDb._id,
        quantity: item.item_quantity,
        item_name: itemInDb.item_name,
        item_price: itemInDb.item_price,
        item_note: item.item_note,
      });
      newOrder.list_items.push(newOrderItem._id);
    }

    newOrder.save();

    return newOrder;
  }

  static async getAllOrders() {
    return await order.find();
  }

  static async getAllOrdersOfUser(userId) {
    return await order.find({ user_id: convertToObjectId(userId) });
  }

  static async getOrderDetail({ orderId }) {
    return await order
      .findOne({
        _id: convertToObjectId(orderId)
      })
      .populate("list_items");
  }

  static async searchOrder({ orderId, status, role, userId }) {
    return await searchOrderByRole({ orderId, status, role, userId });
  }

  static async cancleOrder({ orderId, userId }) {
    const orderFound = await findOrderById(orderId);

    if (!orderFound) throw new ErrorResponse("Order not found", 404);

    if (orderFound.user_id.toString() !== userId)
      throw new ErrorResponse("You are not owner of this order", 400);

    if (orderFound.order_status !== "pending")
      throw new ErrorResponse("Order is not pending", 400);

    return await updateOrder(
      { _id: convertToObjectId(orderId) },
      {
        order_status: "cancled",
      }
    );
  }

  static async deleteOrder({ orderId }) {
    await orderItem.deleteMany({ order_id: orderId });

    return await order.findOneAndDelete({ _id: convertToObjectId(orderId) });
  }

  static async confirmPayment({ orderId }) {
    const orderFound = await findOrderById(orderId);
    if (!orderFound) throw new ErrorResponse("Order not found", 404);

    if (orderFound.order_status !== "pending")
      throw new ErrorResponse("Order is not pending", 400);

    const itemsOfOrder = await orderItem.find({ order_id: orderId });

    for (let item of itemsOfOrder) {
      await updateQuantityItem(item.item_name, -item.quantity);
    }

    return await updateOrder(
      { _id: convertToObjectId(orderId) },
      {
        order_status: "processing",
      }
    );
  }
  static async completeOrder({ orderId }) {
    const orderFound = await findOrderById(orderId);
    if (!orderFound) throw new ErrorResponse("Order not found", 404);

    if (orderFound.order_status !== "processing")
      throw new ErrorResponse("Order is not processing", 400);

    const itemsOfOrder = await orderItem.find({ order_id: orderId });

    return await updateOrder(
      { _id: convertToObjectId(orderId) },
      {
        order_status: "completed",
      }
    );
  }
}

export default OrderService;
