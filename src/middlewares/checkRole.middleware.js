import ErrorResponse from "../core/error.response.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

export const checkRole = (roleList) => {
  return asyncHandler(async (req, res, next) => {
    const { role } = req.user;

    if (!roleList.includes(role))
      throw new ErrorResponse(
        "You do not have permission to access this route",
        403
      );

    next();
  });
};
