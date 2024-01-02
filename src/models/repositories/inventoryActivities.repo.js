import { query } from "express";
import inventoryComeVoucher from "../inventoryComeVoucher.model.js"
import inventoryDeleteVoucher from "../inventoryDeleteVoucher.model.js"
import inventoryLeaveVoucher from "../inventoryLeaveVoucher.model.js"


const findinventoryComeVoucherByTime = async (Time) => {
    var start = new Date(Time);
    start.setHours(0, 0, 0, 0);

    var end = new Date(Time);
    end.setHours(23, 59, 59, 999);


    return await inventoryComeVoucher.find({
        createdAt: {
            $gte: start,
            $lt: end
        }
    }).lean();
};

const findinventoryDeleteVoucherTime = async (Time) => {
    var start = new Date(Time);
    start.setHours(0, 0, 0, 0);

    var end = new Date(Time);
    end.setHours(23, 59, 59, 999);
    return await inventoryDeleteVoucher.find({
        createdAt: {
            $gte: start,
            $lt: end
        }
    }).lean();
};

const findinventoryLeaveVoucherTime = async (Time) => {
    var start = new Date(Time);
    start.setHours(0, 0, 0, 0);

    var end = new Date(Time);
    end.setHours(23, 59, 59, 999);
    return await inventoryLeaveVoucher.find({
        createdAt: {
            $gte: start,
            $lt: end
        }
    }).lean();
};

export { findinventoryComeVoucherByTime, findinventoryDeleteVoucherTime, findinventoryLeaveVoucherTime }