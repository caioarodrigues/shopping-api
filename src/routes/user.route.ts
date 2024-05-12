import { UserController } from "../controllers/user.controller";
import { Router } from "express";

const userRouter = Router();
const userController = UserController.getInstance();

userRouter.post("/user/create", userController.createUser);
userRouter.post("/user/login", userController.login);

export default userRouter;