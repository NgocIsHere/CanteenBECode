import dInventoryReport from "../inventoryDReport.model.js";
import dIncomeReport from "../incomeDReport.model.js"
import mIncomeReport from "../incomeMReport.model.js";
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
const findDIncReportByTime = async(Time) => {
    return dIncomeReport.findOne({
        createdAt: Time
    });
};
const findDIncReportByUser = async(userId) => {
    return dIncomeReport.findOne({
        user_id: userId
    });
};
const findMIncReportByTime = async(Time) => {
    return mIncomeReport.findOne({
        createdAt: Time
    });
};
const findMIncReportByUser = async(userId) => {
    return mIncomeReport.findOne({
        user_id: userId
    });
};
export {findInvReportByTime, findInvReportByUser, findDIncReportByTime, findDIncReportByUser, findMIncReportByTime, findMIncReportByUser }