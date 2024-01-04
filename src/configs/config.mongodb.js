const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 8080,
  },
  db: {
    host: process.env.DEV_DB_HOST || "127.0.0.1",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "canteenDEV",
    user: process.env.MONGO_USER || "borua1611",
    password: process.env.MONGO_PASSWORD || "ngoc123",
    dbname: process.env.MONGO_DB_NAME || "canteenmanagement"
  },
};

const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 8080,
  },
  db: {
    host: process.env.PRO_DB_HOST || "127.0.0.1",
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || "canteenPRO",
  },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || "dev";
const {
  db: { host, port, name },
} = config[env];

const connectString = {
  dev: `mongodb://${host}:${port}/${name}`,
  pro: `mongodb+srv://${host}:${port}@canteenmanagement.qbhpovo.mongodb.net/${name}?retryWrites=true&w=majority`,
};
export default connectString[env];
