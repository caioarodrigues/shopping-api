import { Request, Response, NextFunction } from "express";
import ProductModel from "../models/Product.model";

export default class PaymentsMiddleware {
  private static instance: PaymentsMiddleware;

  private constructor() {}
  public static getInstance() {
    if (!PaymentsMiddleware.instance) {
      PaymentsMiddleware.instance = new PaymentsMiddleware();
    }
    return PaymentsMiddleware.instance;
  }

  public async validatePayment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { payment } = req.body.order;

      if (payment.method !== "cash") {
        return res.status(400).json({ message: "Invalid payment method" });
      }

      if (payment.cash.amount < payment.total) {
        return res.status(400).json({ message: "Insufficient cash" });
      }

      return next();
    } catch (error) {
      //console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  public async calculateTotal(req: Request, res: Response, next: NextFunction) {
    try {
      const { products } = req.body.order;
      const allProducts = await Promise.all(
        products.map(
          async (product: { productId: string; quantity: number }, index: number) => {
            const thisProduct = await ProductModel.findById(product.productId);

            if (thisProduct) {
              const { name, price } = thisProduct;
              const amount = products[index].quantity;
              const total_price = price * product.quantity;

              return { name, amount, total_price };
            }
          }
        )
      );

      const sumPrices = allProducts.reduce(
        (acc: number, product: { total_price: number }) =>
          acc + product.total_price,
        0
      );

      req.body.cart = { all_products: allProducts, total: sumPrices };
      //console.log(req.body.cart);
      return next();
    } catch (error) {
      //console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  public async calculateChange(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { payment } = req.body.order;
      const { total } = req.body.cart;

      if (total > payment.cash.amount) {
        return res.status(400).json({ message: "Insufficient cash" });
      }

      const change = payment.cash.amount - total;
      req.body.order.payment.change = change;

      return next();
    } catch (error) {
      //console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  public async getResume(req: Request, res: Response, next: NextFunction) {
    try {
      const { all_products, total } = req.body.cart;
      const { change } = req.body.order.payment;
      
      req.body.resume = { all_products, total, change };
      //console.log(req.body.resume)
      return next();
    } catch (error) {
      //console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  public async validateCard(req: Request, res: Response, next: NextFunction) {}
  public async validatePix(req: Request, res: Response, next: NextFunction) {}
  public async validateCash(req: Request, res: Response, next: NextFunction) {}
}
