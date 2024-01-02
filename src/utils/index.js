import bcrypt from "bcryptjs";
import _ from "lodash";
import { Types } from "mongoose";

export const hashPassWord = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassWord = await bcrypt.hash(password, salt);

  return hashPassWord;
};

export const comparePassWord = async (password, hashPassWord) => {
  const isPassWord = await bcrypt.compare(password, hashPassWord);

  return isPassWord;
};

export const getFieldObject = (obj, fields = []) => {
  return _.pick(obj, fields);
};

export const convertToObjectId = (id) => {
  return new Types.ObjectId(id);
};
