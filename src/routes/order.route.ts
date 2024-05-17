import { Router } from "express";
import ProductController from "../controllers/product.controller";
import OrderController from "../controllers/order.controller";
import Validations from "../middlewares/validations.middleware";
import ProductValidations from "../middlewares/productValidations.middleware";

const orderRoutes = Router();
const orderController = OrderController.getInstance();
const validations = Validations.getInstance();
const productValidations = ProductValidations.getInstance();
const productController = ProductController.getInstance();

orderRoutes.use(validations.validateToken);

orderRoutes.post(
  "/order/create",
  productValidations.verifyStock,
  productController.buyProduct,
  orderController.createOrder
);
orderRoutes.get(
  "/order/:order-id",
  validations.verifySameUser,
  orderController.getOrder
);
orderRoutes.get(
  "/order/list",
  validations.validateAdmin,
  orderController.getOrders
);
orderRoutes.get(
  "/order/list/:userId",
  validations.verifySameUser,
  orderController.getOrders
);
orderRoutes.get(
  "/order/admin/list/:order-id",
  validations.validateAdmin,
  orderController.getOrder
);
orderRoutes.get(
  "/order/admin/list/user/:userId",
  validations.validateAdmin,
  orderController.getOrders
);
orderRoutes.put(
  "/order/admin/:orderId",
  validations.validateAdmin,
  orderController.updateOrder
);
orderRoutes.put("/order/:orderId/cancel", orderController.cancelOrder);

export default orderRoutes;
