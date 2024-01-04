import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "dInventoryReport";
const COLLECTION_NAME = "dInventoryReports";

const dinventoryReportSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        creator: {
          type: String,
        },
        inventory_list: [{
            item_id: {
              type: Schema.Types.ObjectId,
              ref: "inventoryItem",
              required: true,
            },
            inventoryName: {
              type: String,
              required: true,
          },
            init: {
              type: Number, // lấy số lượng inventoryItem đầu ngày
              required: true,
            },
            leave:{
              type: Number, // số lượng xuất kho (qua item)
              required: true,
            },
            come:{
              type: Number, // số lượng nhập
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            }
          }],
        deleted_item:[{
            type:Schema.Types.ObjectId,
            ref:"inventoryDeleteVoucher"
        }]
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const dInventoryReport = model(DOCUMENT_NAME, dinventoryReportSchema);

export default dInventoryReport;