import ErrorResponse from "../core/error.response.js";
import dInventoryReport from "../models/inventoryDReport.model.js";
import dIncomeReport from "../models/incomeDReport.model.js";
import mIncomeReport from "../models/incomeMReport.model.js";
import {findInvReportByTime, findInvReportByUser, findDIncReportByTime, findDIncReportByUser, findMIncReportByTime, findMIncReportByUser }
    from "../models/repositories/report.repo.js"
import { findinventoryComeVoucherByTime, findinventoryDeleteVoucherTime, findinventoryLeaveVoucherTime }
    from "../models/repositories/inventoryActivities.repo.js"
import inventoryItemService from "../services/inventoryItem.service.js"
import { convertToObjectId } from "../utils/index.js";


class ReportService {
    static async createDInvReport(userId) {
        var datetime = new Date();
        console.log('userId:', userId);
        var list = await inventoryItemService.getAllinventoryItem();
        var listC = await findinventoryComeVoucherByTime(datetime);
        var listL = await findinventoryLeaveVoucherTime(datetime);
        const DInvReport = await dInventoryReport.create({
            user_id: convertToObjectId(userId)
        });
    
        for (const item of list) {
            let item_idN = item._id;
            let quantityN = item.inventoryItem_quantity;
            let leaveN = 0;
            let comeN = 0;
            for(const ob of listC){
                for (const itemC of ob.come_list) {
                    if (item.inventoryItem_name == itemC.inventoryItem_name) {
                        comeN += itemC.inventoryItem_quantity;
                    }
                }
            }
            for(const ob of listL){
                for (const itemC of ob.leave_list) {
                    if (item._id == itemC.inventoryItem) {
                        leaveN += itemC.quantity;
                    }
                }
            }
    
            let initN = quantityN + leaveN - comeN;
    
            DInvReport.inventory_list.push({
                init: initN,
                quantity: quantityN,
                item_id: convertToObjectId(item_idN),
                leave: leaveN,
                come: comeN
            });
        }
        const listD = await findinventoryDeleteVoucherTime(datetime);
        for(const ob of listD){
            DInvReport.deleted_item.push(ob._id);
        }
        await DInvReport.save(); // Wait for the save operation to complete
        
        return DInvReport;
    }
    static async getAllDInvReport() {
        return await dInventoryReport.find();
    }
    static async getDInvReport(Time) {
        return await findInvReportByTime(Time)
    }
    static async getDInvReportDetail(Id) {
        return await dInventoryReport.find({_id: Id})
    }
    static async createDIncReport(userId) {
        //user_id,sale_quantity,loss_quantity,profit,loss_money,
        const DInvReport = await dIncomeReport.create({
            user_id: convertToObjectId(userId),
            sale_quantity: 0,
            loss_quantity:0,
            income: 0,
            profit: 0,
            loss_money: 0
        });
    }
    static async getAllDIncReport() {
        return await dIncomeReport.find();
    }
    static async getDInCReport(Time) {
        return await findDIncReportByTime(Time)
    }

    static async createMIncReport(userId) {
        //user_id,sale_quantity,loss_quantity,profit,loss_money,
        const DInvReport = await mIncomeReport.create({
            user_id: convertToObjectId(userId),
            sale_quantity: 0,
            loss_quantity:0,
            income: 0,
            profit: 0,
            loss_money: 0
        });
    }
    static async getAllMIncReport() {
        return await mIncomeReport.find();
    }
    static async getMIncReport(Time) {
        return await findMIncReportByTime(Time)
    }
}
export default ReportService;
