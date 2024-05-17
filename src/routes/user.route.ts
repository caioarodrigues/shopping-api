import { UserController } from "../controllers/user.controller";
import Validations from "../middlewares/validations.middleware";
import { Router } from "express";

const userRoutes = Router();
const userController = UserController.getInstance();
const validations = Validations.getInstance();

userRoutes.get(
  "/user",
  validations.validateToken,
  validations.validateAdmin,
  userController.listAllUsers
);
userRoutes.post(
  "/user/create",
  validations.existingUser,
  userController.createUser
);
userRoutes.post(
  "/user/login",
  validations.validateUser,
  validations.generateToken
);
userRoutes.put(
  "/user/:userId",
  validations.validateToken,
  validations.verifySameUser,
  validations.verifyEmptyData,
  userController.updateUser
);
userRoutes.delete(
  "/user/:userId",
  validations.validateToken,
  userController.removeUser
);

export default userRoutes;
