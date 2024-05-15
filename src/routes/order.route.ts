import { Router } from "express";
import OrderController from "../controllers/order.controller";
import Validations from "../middlewares/validations.middleware";

const orderRoute = Router();
const orderController = OrderController.getInstance();
const validations = Validations.getInstance();

orderRoute.use(validations.validateToken);

orderRoute.post("/order/create", orderController.createOrder);
orderRoute.get(
  "/order/:order-id",
  validations.verifySameUser,
  orderController.getOrder
);
orderRoute.get(
  "/order/list",
  validations.validateAdmin,
  orderController.getOrders
);
orderRoute.get(
  "/order/list/:userId",
  validations.verifySameUser,
  orderController.getOrders
);
orderRoute.get(
  "/order/admin/list/:order-id",
  validations.validateAdmin,
  orderController.getOrder
);
orderRoute.get(
  "/order/admin/list/user/:userId",
  validations.validateAdmin,
  orderController.getOrders
);
orderRoute.put(
  "/order/admin/:orderId",
  validations.validateAdmin,
  orderController.updateOrder
);
orderRoute.put("/order/:orderId/cancel", orderController.cancelOrder);

export default orderRoute;
