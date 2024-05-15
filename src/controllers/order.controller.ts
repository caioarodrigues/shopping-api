import OrderModel from "../models/Order.model";
import { Request, Response } from "express";

export default class OrderController {
  private static instance: OrderController;

  private constructor() {}
  public static getInstance() {
    if (!OrderController.instance) {
      OrderController.instance = new OrderController();
    }
    return OrderController.instance;
  }

  public async createOrder(req: Request, res: Response) {
    try {
      const { userId, products } = req.body.order;
      //console.log(req.body.order);
      const order = await OrderModel.create({ userId, products });
      return res.status(201).send(order);
    } catch (error) {
      return res.status(500);
    }
  }

  public async getOrders(req: Request, res: Response) {
    try {
      const orders = await OrderModel.find({ userId: req.params.userId });
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500);
    }
  }

  public async getOrder(req: Request, res: Response) {
    try {
      const order = await OrderModel.findById(req.params.orderId);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500);
    }
  }

  public async updateOrder(req: Request, res: Response) {
    try {
      const thisOrder = await OrderModel.findById(req.params.orderId);

      if (!thisOrder?.status) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (thisOrder.status === "cancelled") {
        return res.status(400).json({
          message: "Order can't be updated because it is cancelled",
        });
      }

      const order = await OrderModel.findOneAndUpdate(
        { _id: req.params.orderId, userId: req.params.userId },
        { status: req.body.status },
        { new: false }
      );
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500);
    }
  }

  public async cancelOrder(req: Request, res: Response) {
    try {
      const thisOrder = await OrderModel.findById(req.params.orderId);

      if (!thisOrder?.status) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (thisOrder.status !== "pending") {
        return res.status(400).json({
          message: "Order can only be cancelled if it is pending",
        });
      }

      const order = await OrderModel.findOneAndUpdate(
        { _id: req.params.orderId, userId: req.params.userId },
        { status: "cancelled" },
        { new: false }
      );
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500);
    }
  }
}
