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
            message: "Inventory Reports At Time !",
            data,
        }).send(res);
    }
    static async getDInvReportDetail(req, res) {
        const data = await ReportService.getDInvReportDetail(req.Id);

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
            message: "Got All Day Income Report !",
            data,
        }).send(res);
    }
    static async getDIncReport(req, res) {
        const data = await ReportService.getDInvReport(req.Time);

        new SuccessResponse({
            message: "Detail Daily Income Report !",
            data,
        }).send(res);
    }
    static async createMIncReport(req, res) {
        const data = await ReportService.createMIncReport(req.body.userId);

        new SuccessResponse({
            message: "Created This Month Income Report !",
            data,
        }).send(res);
    }
    static async getAllMIncReport(req, res) {
        const data = await ReportService.getAllMIncReport();

        new SuccessResponse({
            message: "Got All Monthly Income Report !",
            data,
        }).send(res);
    }
    static async getMIncReport(req, res) {
        const data = await ReportService.getMIncReport(req.Time);

        new SuccessResponse({
            message: "Detail Monthly Income Report !",
            data,
        }).send(res);
    }
}
export default ReportController;
