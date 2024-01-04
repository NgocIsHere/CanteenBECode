import mongoose from 'mongoose';
import { countConnect } from "../helpers/check.connect.js";
import config from '../configs/config.mongodb.js';
const env = process.env.NODE_ENV || "dev";
const { host, port, name } = config[env].db;
const connects= {
  dev: `mongodb://${host}:${port}/${name}`,
  pro: `mongodb+srv://${host}:${port}@canteenmanagement.qbhpovo.mongodb.net/${name}?retryWrites=true&w=majority`,
};
const connectString = connects[env];

console.log(connectString);
class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
    .connect(connectString)
      .then(() => {
        // Assuming countConnect is defined
        countConnect();
        console.log("Connected to MongoDB");
      })
      .catch((error) => console.error("Failed to connect to MongoDB:", error));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

export default instanceMongodb;
