import { Types } from "mongoose";
import SuccessResponse from "../core/success.response.js";
import UserService from "../services/user.service.js";

class UserController {
  static async updateInfo(req, res) {
    const userUpdate = await UserService.updateUser({
      ...req.body,
      userId: req.user._id,
    });

    new SuccessResponse({
      message: "User info updated successfully",
      data: userUpdate,
    }).send(res);
  }
  static async updateInfoStaff(req, res) {
    const userUpdate = await UserService.updateUser({
      ...req.body,
    });

    new SuccessResponse({
      message: "Staff info updated successfully",
      data: userUpdate,
    }).send(res);
  }
  static async getUserInfor(req,res){
    const { id } = req.params;
    const userinfor = await UserService.findUserById(id);
    new SuccessResponse({
      message: "User Information",
      data: userinfor,
    }).send(res);
  }
  static async getListStaffs(req, res) {
    const listStaffs = await UserService.getListStaffs();

    new SuccessResponse({
      message: "List staffs",
      data: listStaffs,
    }).send(res);
  }

  static async searchStaffs(req, res) {
    const { text } = req.query;

    const staffs = await UserService.searchStaffs(text);

    new SuccessResponse({
      message: "List staffs",
      data: staffs,
    }).send(res);
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    const userDeleted = await UserService.deleteUser(id);

    new SuccessResponse({
      message: "User deleted",
      data: userDeleted,
    }).send(res);
  }
}

export default UserController;
