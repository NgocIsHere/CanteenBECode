import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "inventoryItem";
const COLLECTION_NAME = "inventoryItems";

const inventoryItemSchema = new Schema(
    {
        inventoryItem_name: {
            type: String,
            required: true,
        },
        inventoryItem_quantity: {
            type: Number,
            required: true,
        },
        inventoryItem_exp: {
            type: Date,
            required: true,
        },
        cost: {
            type: Number,
            require: true,
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const inventoryItem = model(DOCUMENT_NAME, inventoryItemSchema);

export default inventoryItem;
