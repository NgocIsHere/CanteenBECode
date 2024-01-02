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
        inventory_list: [{
            item_id: {
              type: Schema.Types.ObjectId,
              ref: "inventoryItem",
            },
            init: {
              type: Number, // lấy số lượng inventoryItem đầu ngày
            },
            leave:{
              type: Number, // số lượng xuất kho (qua item)
            },
            come:{
              type: Number, // số lượng nhập
            },
            quantity: {
              type: Number
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