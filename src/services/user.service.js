import User from "../models/user.model.js";
import { convertToObjectId, hashPassWord } from "../utils/index.js";

class UserService {
  static async findUserByEmail(email) {
    const user = await User.findOne({ email }).lean();
    return user;
  }

  static async findUserById(id) {
    const user = await User.findOne({ _id: convertToObjectId(id) }).lean();
    return user;
  }

  static async createUser({ name, email, password, role, attributes }) {
    const user = await User.create({ name, email, password, role, attributes });
    return user;
  }

  static async updateUser({ userId, name, password, attributes }) {
    const userUpdate = await User.findOneAndUpdate(
      { _id: userId },
      {
        name,
        password: await hashPassWord(password),
        attributes,
      },
      { new: true, upsert: true }
    )
      .select("-password")
      .lean();

    return userUpdate;
  }

  static async getListStaffs() {
    return await User.find({ role: "staff" }).select("-password").lean();
  }

  static async searchStaffs(keySearch) {
    const staffs = await User.find(
      {
        role: "staff",
        $text: { $search: keySearch },
      },
      { score: { $meta: "textScore" } }
    )
      .select("-password")
      .lean();
    return staffs;
  }

  static async deleteUser(userId) {
    return await User.findByIdAndDelete({ _id: userId })
      .lean()
      .select("-password");
  }
}

export default UserService;
