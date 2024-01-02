import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "keyStore";
const COLLECTION_NAME = "keyStores";

const keyStoreSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    secretKey: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const KeyStore = model(DOCUMENT_NAME, keyStoreSchema);

export default KeyStore;
