import { Router } from "express";
import { authentication } from "../../auth/authUtils.js";
import { checkRole } from "../../middlewares/checkRole.middleware.js";
import UserController from "../../controllers/user.controller.js";
import { asyncHandler } from "../../helpers/asyncHandler.js";

const userRoute = Router();

userRoute.use(authentication);

userRoute.patch("/user", asyncHandler(UserController.updateInfo));

userRoute.get(
  "/staffs",
  checkRole(["admin"]),
  asyncHandler(UserController.getListStaffs)
);

userRoute.get(
  "/search/staffs",
  checkRole(["admin", "staff"]),
  asyncHandler(UserController.searchStaffs)
);

userRoute.delete(
  "/staff/:id",
  checkRole(["admin"]),
  asyncHandler(UserController.deleteUser)
);

export default userRoute;
