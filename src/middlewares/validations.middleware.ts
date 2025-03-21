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
    const user = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!user) return res.status(404).send("User not found");

    req.body.user = user;
    return next();
  }
  public async existingUser(req: Request, res: Response, next: NextFunction) {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) return res.status(409).send("User already exists");

    return next();
  }
  public async generateToken(req: Request, res: Response, next: NextFunction) {
    const token = jsonwebtoken.sign(req.body, defaultConfig.secret, {
      expiresIn: 60 * 60,
    });

    req.body.token = token;
    //req.cookies.user_token = token;
    return res.status(200).send({ token });
  }
  public async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send("Token not provided");

    jsonwebtoken.verify(token, defaultConfig.secret, (error, decoded) => {
      if (error) return res.status(401).send("Invalid token");

      req.body.token = decoded;

      return next();
    });
  }
  public async verifyEmptyData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { token, iat, exp, ...params } = req.body;
    const keys = Object.keys(params).length;

    if (!keys) {
      return res.status(400).json({ message: "No data provided" });
    }

    return next();
  }
  public async verifySameUser(req: Request, res: Response, next: NextFunction) {
    if (req.body.token.user._id !== req.params.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    return next();
  }
  public async validateAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send("Token not provided");

    jsonwebtoken.verify(token, defaultConfig.secret, (error, decoded: any) => {
      if (error) return res.status(401).send("Invalid token");

      if (decoded.user.role !== "admin")
        return res.status(403).send("User is not an admin");

      req.body.token = decoded;
      //req.cookies.user_token = decoded;
      return next();
    });
  }
}
