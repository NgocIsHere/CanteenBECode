import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "invReportItem";
const COLLECTION_NAME = "invReportItems";

const invReportItemSchema = new Schema(
    {
        item_id: {
            type: String,
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
        leave: {
            type: Number, // số lượng xuất kho (qua item)
            required: true,
        },
        come: {
            type: Number, // số lượng nhập
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const invReportItem = model(DOCUMENT_NAME, invReportItemSchema);

export default invReportItem;
