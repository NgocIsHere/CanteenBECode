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
        creator: {
            type: String,
        },
        leave_list: [{
            inventoryItem:{
                type: String,
                ref: "inventoryItem",
            },
            inventoryName: {
                type: String,
                required: true,
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
