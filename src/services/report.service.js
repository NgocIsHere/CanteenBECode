import ErrorResponse from "../core/error.response.js";
import dInventoryReport from "../models/inventoryDReport.model.js";
import dIncomeReport from "../models/incomeDReport.model.js";
import mIncomeReport from "../models/incomeMReport.model.js";
import invReportItem from "../models/invReportItem.model.js";
import User from "../models/user.model.js";
import { findInvReportByTime, findInvReportByUser, findDIncReportByTime, findDIncReportByUser, findMIncReportByTime, findMIncReportByUser }
    from "../models/repositories/report.repo.js"
import { findinventoryComeVoucherByTime, findinventoryDeleteVoucherTime, findinventoryLeaveVoucherTime }
    from "../models/repositories/inventoryActivities.repo.js"
import inventoryItemService from "../services/inventoryItem.service.js"
import { convertToObjectId } from "../utils/index.js";
import order from "../models/order.model.js";
import item from "../models/item.model.js";
import inventoryDeleteVoucher from "../models/inventoryDeleteVoucher.model.js";
class ReportService {
    static async createDInvReport(userId) {
        var datetime = new Date();
        console.log('userId:', userId);
        var list = await inventoryItemService.getAllinventoryItem();
        var listC = await findinventoryComeVoucherByTime(datetime);
        var listL = await findinventoryLeaveVoucherTime(datetime);
        const user = await User.findById(userId)
        const DInvReport = await dInventoryReport.create({
            user_id: convertToObjectId(userId),
            creator: user.name,
        });

        for (const item of list) {
            let item_idN = item._id;
            let quantityN = item.inventoryItem_quantity;
            let leaveN = 0;
            let comeN = 0;
            for (const ob of listC) {
                for (const itemC of ob.come_list) {
                    if (item.inventoryItem_name == itemC.inventoryItem_name && item.inventoryItem_exp == itemC.inventoryItem_exp) {
                        comeN += itemC.inventoryItem_quantity;
                    }
                }
            };
            for (const ob of listL) {
                for (const itemC of ob.leave_list) {
                    if (item._id == itemC.inventoryItem) {
                        leaveN += itemC.quantity;
                    }
                }
            };

            let initN = quantityN + leaveN - comeN;
            const newInvRItem = await invReportItem.create({
                init: initN,
                quantity: quantityN,
                item_id: item_idN.toString(),
                inventoryName: item.inventoryItem_name,
                leave: leaveN,
                come: comeN
            })
            DInvReport.inventory_list.push(newInvRItem._id);
        }
        const listD = await findinventoryDeleteVoucherTime(datetime);
        for (const ob of listD) {
            DInvReport.deleted_item.push(ob._id);
        }
        await DInvReport.save(); // Wait for the save operation to complete

        return DInvReport;
    }
    static async getAllDInvReport() {
        return dInventoryReport.find({});
    }
    static async getDInvReport(Time) {
        return await findInvReportByTime(Time);
    }
    static async getDInvReportDetail({ reportId }) {
        const invR = await dInventoryReport.findOne({ _id: reportId });

        if (!invR) {
            throw new Error("Inventory report not found");
        }

        const idlist = invR.inventory_list;
        const result = await invReportItem.find({ "_id": { $in: idlist } }).lean();
        return result;
    }
    static async createDIncReport(userId) {
        //user_id,sale_quantity,loss_quantity,profit,loss_money,
        var sales = 0;
        const lossItems = await item.find({ item_type: "main" });
        const day = new Date();
        const startDay = (new Date()).setHours(0, 0, 0, 0);
        const deleteItems = await inventoryDeleteVoucher.find({
            "createdAt": {
                "$gte": startDay,
                "$lt": day
            }
        })
        var numLoss = 0;
        var lossM = 0;
        for (const itemL of lossItems) {
            numLoss += itemL.item_quantity;
            if (!isNaN(itemL.item_cost) && !isNaN(itemL.item_quantity)) {
                lossM += itemL.item_cost * itemL.item_quantity;
            }
        }
        for (const itemD of deleteItems) {
            for (const exp of itemD.delete_list) {
                if (!isNaN(exp.quantity) && !isNaN(exp.cost)) {
                    lossM += exp.quantity * exp.cost;
                }
            }
        }
        const listOrder = await order.find({ order_status: "completed" })
        var money = 0;
        for (const ob of listOrder) {
            money += ob.order_total_price;
            sales += 1
        }
        var prof = 0;
        prof = money - lossM;
        const user = await User.findById(userId)
        const DInvReport = await dIncomeReport.create({
            user_id: convertToObjectId(userId),
            creator: user.name,
            sale_quantity: sales,
            loss_quantity: numLoss,
            income: money,
            profit: prof,
            loss_money: lossM
        });
        return DInvReport;
    }

    static async getAllDIncReport() {
        return dIncomeReport.find({});
    }
    static async getDInCReport(Time) {
        return await findDIncReportByTime(Time)
    }

    static async createMIncReport(userId) {
        //user_id,sale_quantity,loss_quantity,profit,loss_money
        const day = new Date();
        const month = day.getMonth() + 1;
        const year = day.getUTCFullYear();
        var startOfMonth = new Date(year, month, 1, 0, 0, 0, 0);
        const dailyList = await dIncomeReport.find({
            "createdAt": {
                "$gte": startOfMonth,
                "$lt": day
            }
        });
        var sale = 0;
        var lossQ = 0;
        var inC = 0;
        var prof = 0;
        var lossM = 0;
        for (const ob of dailyList) {
            sale += ob.sale_quantity;
            lossQ += ob.loss_quantity;
            inC += ob.income;
            prof += ob.profit;
            lossM += ob.loss_money;
        }
        const user = await User.findById(userId)
        const DInvReport = await mIncomeReport.create({
            user_id: convertToObjectId(userId),
            creator: user.name,
            sale_quantity: sale,
            loss_quantity: lossQ,
            income: inC,
            profit: prof,
            loss_money: lossM
        });
        return DInvReport
    }
    static async getAllMIncReport() {
        return await mIncomeReport.find({});
    }
    static async getMIncReport(Time) {
        return await findMIncReportByTime(Time)
    }
}
export default ReportService;
