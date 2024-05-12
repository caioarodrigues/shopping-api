import { UserController } from "../controllers/user.controller";
import Validations from "../middlewares/validations.middleware";
import { Router } from "express";

const userRouter = Router();
const userController = UserController.getInstance();
const validations = Validations.getInstance();

userRouter.post("/user/create", userController.createUser);
userRouter.post("/user/login", validations.validateUser, validations.generateToken);

export default userRouter;