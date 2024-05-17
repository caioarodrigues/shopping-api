import userRoutes from "./user.route";
import productRoutes from "./product.route";
import { Router } from "express";
import orderRoutes from "./order.route";

const routes = Router();

routes.use(userRoutes);
routes.use(productRoutes);
routes.use(orderRoutes);

export default routes;