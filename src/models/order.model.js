import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "order";
const COLLECTION_NAME = "orders";

const orderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    order_total_price: {
      type: Number,
      required: true,
    },
    order_status: {
      type: String,
      enum: ["pending", "completed", "cancelled", "processing"],
      default: "pending",
    },
    list_items: [
      {
        type: Schema.Types.ObjectId,
        ref: "orderItem",
      },
    ],

    time_receive: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "order_time",
      updatedAt: "modified_on",
    },
    collection: COLLECTION_NAME,
  }
);

orderSchema.index({ order_status: "text" });

const order = model(DOCUMENT_NAME, orderSchema);

export default order;
