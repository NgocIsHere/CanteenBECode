import { Router } from "express";
import { asyncHandler } from "../../helpers/asyncHandler.js";
import AccessController from "../../controllers/access.controller.js";
import { authentication } from "../../auth/authUtils.js";
import { checkRole } from "../../middlewares/checkRole.middleware.js";
import AccessValidator from "../../validators/access/index.js";

const authRoute = Router();

authRoute.post(
  "/signup",
  AccessValidator.signUp(),
  asyncHandler(AccessController.signUp)
);
authRoute.post(
  "/login",
  AccessValidator.login(),
  asyncHandler(AccessController.login)
);

// Authentciation
authRoute.use(authentication);
////////////////////////////////
authRoute.post(
  "/signup/employee",
  checkRole(["admin"]),
  AccessValidator.signUpEmployee(),
  asyncHandler(AccessController.signUp)
);

authRoute.post("/logout", asyncHandler(AccessController.logout));

authRoute.post("/login-success", asyncHandler(AccessController.loginSuccess));

export default authRoute;
