import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import { defaultConfig } from "../config";
import UserModel from "../models/User.model";

export default class Validations {
  private static instance: Validations;
  private constructor() {}

  public static getInstance() {
    if (!Validations.instance) {
      Validations.instance = new Validations();
    }
    return Validations.instance;
  }

  public async validateUser(req: Request, res: Response, next: NextFunction) {
    const user = await UserModel.findOne({ email: req.body.email, password: req.body.password });
    if (!user) return res.status(404).send("User not found");

    req.body.user = user;
    return next();
  }
  public async generateToken(req: Request, res: Response, next: NextFunction) {
    const token = jsonwebtoken.sign(req.body, defaultConfig.secret, {
      expiresIn: 60 * 60,
    });

    console.log(token)
    req.body.token = token;
    //req.cookies.user_token = token;
    return res.status(200).send({ token });
  }
  public async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send("Token not provided");

    jsonwebtoken.verify(token, defaultConfig.secret, (error, decoded) => {
      if (error) return res.status(401).send("Invalid token");

      console.log(token, decoded)
      req.body.token = decoded;
      //req.cookies.user_token = decoded;
      return next();
    });
  }
}