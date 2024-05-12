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
      const user = new UserModel(req.body);
      await user.save();
      return res.status(201).send(user);
    } catch (error) {
      return res.status(500);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const user = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      if (user) return res.status(200).send(user);
      
      return res.status(404).send("User not found");
    } catch (error) {
      return res.status(500);
    }
  }
}
