import jwt from "jsonwebtoken";
import ErrorResponse from "../core/error.response.js";
import KeyStoreService from "../services/keyStore.service.js";
import { asyncHandler } from "../helpers/asyncHandler.js";

const HEADER = {
  AUTHORIZATION: "authorization",
  CLIENT_ID: "x-client-id",
};

export const generateToken = (payload, secretKey) => {
  const token = jwt.sign(payload, secretKey);

  return token;
};

export const verifyToken = (token, secretKey) => {
  const decoded = jwt.verify(token, secretKey);

  return decoded;
};

export const authentication = asyncHandler(async (req, res, next) => {
  // Check userId existed
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new ErrorResponse("Invalid request", 401);

  // Check login or not
  const keyStore = await KeyStoreService.findByUserId(userId);
  if (!keyStore) throw new ErrorResponse("Please login or register", 401);

  // Check token existed
  const [_, token] = req.headers[HEADER.AUTHORIZATION].split(" ");
  if (!token) throw new ErrorResponse("Missing token", 401);

  //Check token valid
  const decodedUser = verifyToken(token, keyStore.secretKey);
  if (userId !== decodedUser._id) throw new ErrorResponse("Invalid token", 401);
  req.user = decodedUser;

  next();
});
