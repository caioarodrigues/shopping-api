import { Request, Response } from "express";
import UserModel from "../models/User.model";

export class UserController {
  private static instance: UserController;
  private constructor() { }

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
}
