import mongoose from 'mongoose';
import  { config, connectString } from "../configs/config.mongodb.js";
import { countConnect } from "../helpers/check.connect.js";

const env = process.env.NODE_ENV || "dev";
class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
    .connect(connectString[env])
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
