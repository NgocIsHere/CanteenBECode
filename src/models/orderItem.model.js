import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "orderItem";
const COLLECTION_NAME = "orderItems";

const orderItemSchema = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
    item_image:{
      type: String,
    },
    item_id: {
      type: Schema.Types.ObjectId,
      ref: "item",
    },
    quantity: {
      type: Number,
      required: true,
    },
    item_price: {
      type: Number,
      required: true,
    },
    item_name: {
      type: String,
    },
    item_note: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const orderItem = model(DOCUMENT_NAME, orderItemSchema);

export default orderItem;
