import mongoose from 'mongoose';
import config from "../configs/config.mongodb.js";
import { countConnect } from "../helpers/check.connect.js";
const env = process.env.NODE_ENV || "dev";
const { host, port, name } = config
const connects= `mongodb+srv://${host}:${port}@canteenmanagement.qbhpovo.mongodb.net/${name}?retryWrites=true&w=majority~`
||`mongodb://${host}:${port}/${name}`
const connectString = connects;
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
