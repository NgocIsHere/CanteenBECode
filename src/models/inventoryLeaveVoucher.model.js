import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "inventoryLeaveVoucher";
const COLLECTION_NAME = "inventoryLeaveVouchers";

const inventoryLeaveVoucherSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        leave_list: [{
            inventoryItem:{
                type: Schema.Types.ObjectId,
                ref: "inventoryItem",
            },
            quantity: {
                type: Number,
            },
            cost:{
                type: Number,
            },
            price: {
                type: Number,
            }
        }]
        
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

const inventoryLeaveVoucher = model(DOCUMENT_NAME, inventoryLeaveVoucherSchema);

export default inventoryLeaveVoucher;
