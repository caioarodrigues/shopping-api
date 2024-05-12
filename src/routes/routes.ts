import userRouter from "./user.route";
import { Router } from "express";

const routes = Router();

routes.use(userRouter);

export default routes;