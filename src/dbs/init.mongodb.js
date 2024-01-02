import mongoose from 'mongoose';
import config from "../configs/config.mongodb.js";
import { countConnect } from "../helpers/check.connect.js";

// const {
//   db: { host, port, name },
// } = config;
// const connectString = `mongodb://${host}:${port}/${name}`;

// const {
//   db: { user, password, dbname },
// } = config;
const connectString = `mongodb+srv://${borua1611}:${ngoc123}@canteenmanagement.qbhpovo.mongodb.net/${canteenmanagement}?retryWrites=true&w=majority`

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
