import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || "dev";

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 8080,
  },
  db: {
    host: process.env.MONGO_DEV_HOST || "127.0.0.1",
    port: process.env.MONGO_DEV_PORT || 27017,
    name: process.env.MONGO_DEV_DB_NAME || "canteenDEV",
  },
};
const pro = {
  app: {
    port: process.env.PRO_APP_PORT || 8080,
  },
  db: {
    host: process.env.PRO_DB_HOST || "127.0.0.1",
    port: process.env.PRO_DB_PASSWORD || 27017,
    name: process.env.PRO_DB_NAME || "canteenPRO",
  },
};
const config = {dev, pro}
const { db: { host, port, name } } = config[env];

const connectString = {
  dev: `mongodb://${host}:${port}/${name}`,
  pro: `mongodb+srv://${host}:${port}@canteenmanagement.qbhpovo.mongodb.net/${name}?retryWrites=true&w=majority`,
};
export { config, connectString };
