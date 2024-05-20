import { Request, Response } from "express";
import PaymentModel from "../models/Payment.model";

export default class PaymentController {
  private static instance: PaymentController;

  private constructor() {}

  public static getInstance() {
    if (!PaymentController.instance) {
      PaymentController.instance = new PaymentController();
    }
    return PaymentController.instance;
  }

  public async register(req: Request, res: Response) {
    try {
      const {
        token: { user },
        order,
        amount,
        currency,
      } = req.body;
      const payment = await PaymentModel.create({
        user,
        order,
        status: "pending",
        amount,
        currency,
      });
      return res.status(201).json(payment);
    } catch (error) {
      //console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const payment = await PaymentModel.findByIdAndUpdate( id, { status }, { new: true });
      return res.status(200).json(payment);
    } catch (error) {
      //console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  public async search(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payment = await PaymentModel.findById(id);
      return res.status(200).json(payment);
    } catch (error) {
      //console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  public async list(req: Request, res: Response) {
    try {
      const { user } = req.body.token;
      const payments = await PaymentModel.find({ user });
      return res.status(200).json(payments);
    } catch (error) {
      //console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
