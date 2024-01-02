import { Router } from "express";
import authRoute from "./access/index.js";
import userRoute from "./account/index.js";
import itemsRoute from "./items/index.js";
import orderRoute from "./order/order.js";
import inventoryItemsRoute from "./inventory/index.js";
import inventoryActRoute from "./inventory/index01.js"
import reportRoute from "./report/index.js"
const rootRoute = Router();

rootRoute.use("/auth", authRoute);
rootRoute.use("/", userRoute);
rootRoute.use("/items", itemsRoute);
rootRoute.use("/order", orderRoute);
rootRoute.use("/inventoryItems", inventoryItemsRoute);
rootRoute.use("/inventoryAct", inventoryActRoute);
rootRoute.use("/report", reportRoute);
export default rootRoute;
