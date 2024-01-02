import { convertToObjectId } from "../../utils/index.js";
import order from "../order.model.js";

const searchOrderByRole = async ({ role, orderId, userId, status = "" }) => {
  const results =
    role === "user"
      ? await order
          .find(
            {
              $and: [
                {
                  $or: [
                    {
                      _id: convertToObjectId(orderId),
                    },
                    {
                      $text: { $search: status },
                    },
                  ],
                },
                { user_id: convertToObjectId(userId) },
              ],
            },
            { score: { $meta: "textScore" } }
          )
          .sort({ order_time: "asc" })
      : await order
          .find(
            {
              $or: [
                {
                  _id: convertToObjectId(orderId),
                },
                {
                  $text: { $search: status },
                },
              ],
            },
            { score: { $meta: "textScore" } }
          )
          .sort({ order_time: "asc" });

  return results;
};

const findOrderById = async (id) => {
  return await order.findOne({ _id: convertToObjectId(id) });
};

const updateOrder = async (filter, update) => {
  return order.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  });
};

export { searchOrderByRole, findOrderById, updateOrder };
