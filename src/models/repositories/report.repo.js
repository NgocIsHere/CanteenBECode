import dInventoryReport from "../inventoryDReport.model.js";
import dIncomeReport from "../incomeDReport.model.js"
const findInvReportByTime = async(Time) => {
    return dInventoryReport.findOne({
        createdAt: Time
    });
};
const findInvReportByUser = async(userId) => {
    return dInventoryReport.findOne({
        user_id: userId
    });
};
const findIncReportByTime = async(Time) => {
    return dIncomeReport.findOne({
        createdAt: Time
    });
};
const findIncReportByUser = async(userId) => {
    return dIncomeReport.findOne({
        user_id: userId
    });
};
export {findInvReportByTime, findInvReportByUser, findIncReportByTime, findIncReportByUser }