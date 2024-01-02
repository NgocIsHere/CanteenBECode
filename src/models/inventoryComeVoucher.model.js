import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "inventoryComeVoucher";
const COLLECTION_NAME = "inventoryComeVouchers";

const inventoryComeVoucherSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        come_list: [
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
            }
        ],
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const inventoryComeVoucher = model(DOCUMENT_NAME, inventoryComeVoucherSchema);

export default inventoryComeVoucher;
