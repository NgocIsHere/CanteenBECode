import SuccessResponse from "../core/success.response.js";
import AccessService from "../services/access.service.js";

class AccessController {
  static async signUp(req, res) {
    const role = req.user?.role === "admin" ? "staff" : "user";
    const data = await AccessService.signUp(req.body, role);

    new SuccessResponse({
      message: "Sign up successfully!",
      status: 201,
      data,
    }).send(res);
  }

  static async login(req, res) {
    const data = await AccessService.login(req.body);

    new SuccessResponse({
      message: "Login successfully!",
      status: 200,
      data,
    }).send(res);
  }

  static async loginSuccess(req, res) {
    const data = await AccessService.loginSuccess(req.user);

    new SuccessResponse({
      message: "User already login!",
      status: 200,
      data,
    }).send(res);
  }

  static async logout(req, res) {
    const { _id } = req.user;

    await AccessService.logout(_id);

    new SuccessResponse({
      message: "Logout successfully!",
      status: 200,
      data: {},
    }).send(res);
  }
}

export default AccessController;
