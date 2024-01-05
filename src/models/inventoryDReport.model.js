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
          type:Schema.Types.ObjectId,
          ref:"invReportItem"
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