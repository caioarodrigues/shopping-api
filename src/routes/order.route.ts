import { Router } from "express";
import OrderController from "../controllers/order.controller";
import Validations from "../middlewares/validations.middleware";

const orderRoute = Router();
const orderController = OrderController.getInstance();
const validations = Validations.getInstance();

orderRoute.use(validations.validateToken);

orderRoute.post("/order/create", orderController.createOrder);
orderRoute.get("/order/:userId", orderController.getOrders);
orderRoute.get("/order/:orderId", orderController.getOrder);
orderRoute.put("/order/:userId/:orderId", orderController.updateOrder);
orderRoute.put("/order/:userId/:orderId/cancel", orderController.cancelOrder);

export default orderRoute;