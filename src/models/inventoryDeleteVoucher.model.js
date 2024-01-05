import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "inventoryDeleteVoucher";
const COLLECTION_NAME = "inventoryDeleteVouchers";

const inventoryDeleteVoucherSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        creator: {
            type: String,
        },
        delete_list: [
            {
                inventoryItem: {
                    type: String,
                    required: true,
                },
                inventoryName: {
                    type: String,
                },
                quantity: {
                    type: Number,
                }
            }
        ]

    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const inventoryDeleteVoucher = model(DOCUMENT_NAME, inventoryDeleteVoucherSchema);

export default inventoryDeleteVoucher;
