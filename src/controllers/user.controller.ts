import { Request, Response } from "express";
import UserModel from "../models/User.model";

export class UserController {
  private static instance: UserController;
  private constructor() {}

  public static getInstance() {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  public async createUser(req: Request, res: Response) {
    try {
      const user = await UserModel.create(req.body);
      const { email, name, createdAt } = user;
      return res.status(201).send({ email, name, createdAt });
    } catch (error) {
      return res.status(500);
    }
  }

  public async removeUser(req: Request, res: Response) {
    try {
      if (req.body.token.user._id !== req.params.userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const user = await UserModel.findByIdAndDelete(req.params.userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "User deleted" });
    } catch (error) {
      return res.status(500);
    }
  }
  public async updateUser(req: Request, res: Response) {
    try {
      const user = await UserModel.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500);
    }
  }
  public async listAllUsers (req: Request, res: Response) {
    try {
      const users = await UserModel.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500);
    }
  }
}
