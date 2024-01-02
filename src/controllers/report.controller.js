import SuccessResponse from "../core/success.response.js";
import ReportService from "../services/report.service.js";

class ReportController {
    //createDInvReport, getAllDInvReport, getDInvReport
    static async createDInvReport(req, res) {
        const data = await ReportService.createDInvReport(req.body.userId);

        new SuccessResponse({
            message: "Created Today Inventory Report !",
            data,
        }).send(res);
    }
    static async getAllDInvReport(req, res) {
        const data = await ReportService.getAllDInvReport();

        new SuccessResponse({
            message: "Got All Inventory Report !",
            data,
        }).send(res);
    }
    static async getDInvReport(req, res) {
        const data = await ReportService.getDInvReport(req.Time);

        new SuccessResponse({
            message: "Detail Inventory Report !",
            data,
        }).send(res);
    }
    static async createDIncReport(req, res) {
        const data = await ReportService.createDIncReport(req.body.userId);

        new SuccessResponse({
            message: "Created Today Income Report !",
            data,
        }).send(res);
    }
    static async getAllDIncReport(req, res) {
        const data = await ReportService.getAllDIncReport();

        new SuccessResponse({
            message: "Got All Inventory Report !",
            data,
        }).send(res);
    }
    static async getDIncReport(req, res) {
        const data = await ReportService.getDInvReport(req.Time);

        new SuccessResponse({
            message: "Detail Inventory Report !",
            data,
        }).send(res);
    }
}
export default ReportController;
