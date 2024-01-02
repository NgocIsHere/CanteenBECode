import crypto from "crypto";
import ErrorResponse from "../core/error.response.js";
import UserService from "./user.service.js";
import {
  comparePassWord,
  getFieldObject,
  hashPassWord,
} from "../utils/index.js";
import { generateToken } from "../auth/authUtils.js";
import KeyStoreService from "./keyStore.service.js";

class AccessService {
  static async signUp({ name, email, password, attributes }, role) {
    // Check user existed!
    const user = await UserService.findUserByEmail(email);
    if (user) throw new ErrorResponse("User already exists", 401);

    // Create new user
    const hashPass = await hashPassWord(password);
    const newUser = await UserService.createUser({
      name,
      email,
      password: hashPass,
      role,
      attributes,
    });

    if (newUser) {
      // Create secretkey
      const secretKey = crypto.randomBytes(64).toString("hex");

      // Create token and store to keyStore
      const encodeUser = getFieldObject(newUser, [
        "name",
        "email",
        "role",
        "_id",
      ]);
      const token = generateToken(encodeUser, secretKey);

      const keyStore = await KeyStoreService.createKeyStore({
        secretKey,
        token,
        userId: newUser._id,
      });

      if (!keyStore) throw new ErrorResponse("Create keyStore failed", 500);

      const properties = ["name", "email", "role", "_id", "attributes"];

      return {
        user: getFieldObject(newUser, properties),
        token,
      };
    }
  }

  static async login({ email, password }) {
    // Check user exist
    const user = await UserService.findUserByEmail(email);
    if (!user) throw new ErrorResponse("Credentials are invalid", 401);

    // Check password
    const isMatched = await comparePassWord(password, user.password);
    if (!isMatched) throw new ErrorResponse("Credentials are invalid", 401);

    // Check user already login
    const key = await KeyStoreService.findByUserId(user._id);

    const properties = ["name", "email", "role", "_id", "attributes"];

    if (key) {
      return {
        user: getFieldObject(user, properties),
        token: key.token,
      };
    } else {
      // Create secretKey and token
      const secretKey = crypto.randomBytes(64).toString("hex");
      const encodeUser = getFieldObject(user, ["name", "email", "role", "_id"]);
      const token = generateToken(encodeUser, secretKey);

      // Store to keyStore
      const keyStore = await KeyStoreService.createKeyStore({
        secretKey,
        token,
        userId: user._id,
      });
      if (!keyStore) throw new ErrorResponse("Create keyStore failed", 500);

      return {
        user: getFieldObject(user, properties),
        token,
      };
    }
  }

  static async loginSuccess({ _id }) {
    const user = await UserService.findUserById(_id);

    const properties = ["name", "email", "role", "_id", "attributes"];

    return {
      user: getFieldObject(user, properties),
    };
  }

  static async logout(userId) {
    const keyDeleted = await KeyStoreService.deleteByUserId(userId);

    return {
      keyDeleted,
    };
  }
}

export default AccessService;
