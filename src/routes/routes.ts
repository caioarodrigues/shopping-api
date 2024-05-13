import userRouter from "./user.route";
import productRouter from "./product.route";
import { Router } from "express";
import orderRoute from "./order.route";

const routes = Router();

routes.use(userRouter);
routes.use(productRouter);
routes.use(orderRoute);

export default routes;