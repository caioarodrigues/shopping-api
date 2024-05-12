import userRouter from "./user.route";
import productRouter from "./product.route";
import { Router } from "express";

const routes = Router();

routes.use(userRouter);
routes.use(productRouter);

export default routes;