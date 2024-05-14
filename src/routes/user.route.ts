import { UserController } from "../controllers/user.controller";
import Validations from "../middlewares/validations.middleware";
import { Router } from "express";

const userRouter = Router();
const userController = UserController.getInstance();
const validations = Validations.getInstance();

userRouter.post(
  "/user/create",
  validations.existingUser,
  userController.createUser
);
userRouter.post(
  "/user/login",
  validations.validateUser,
  validations.generateToken
);
userRouter.put(
  "/user/:userId",
  validations.validateToken,
  validations.verifySameUser,
  validations.verifyEmptyData,
  userController.updateUser
);
userRouter.delete(
  "/user/:userId",
  validations.validateToken,
  userController.removeUser
);

export default userRouter;
