import KeyStore from "../models/keyStore.model.js";

class KeyStoreService {
  static async createKeyStore({ secretKey, token, userId }) {
    const keyStore = await KeyStore.create({ secretKey, token, userId });

    return keyStore;
  }

  static async findByUserId(userId) {
    const key = await KeyStore.findOne({ userId }).lean();
    return key;
  }

  static async deleteByUserId(userId) {
    const keyDelete = await KeyStore.deleteOne({ userId }).lean();

    return keyDelete;
  }
}

export default KeyStoreService;
