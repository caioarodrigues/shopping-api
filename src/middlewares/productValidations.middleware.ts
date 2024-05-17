import { Request, Response, NextFunction } from "express";
import ProductModel from "../models/Product.model";

export default class ProductValidations {
  private static instance: ProductValidations;

  private constructor() {}
  public static getInstance() {
    if (!ProductValidations.instance) {
      ProductValidations.instance = new ProductValidations();
    }
    return ProductValidations.instance;
  }

  //public async existingProduct(req: Request, res: Response, next: NextFunction) {}

  public async verifyStock(req: Request, res: Response, next: NextFunction) {
    const {
      order: { products },
    } = req.body;

    const getStock = async (productId: string, quantity: number) => {
      const product = await ProductModel.findById(productId).select("amount");

      if (!product) return { productId, quantity, avaliable: false };

      return { productId, quantity, avaliable: product.amount >= quantity };
    };

    const stock = await Promise.all(
      products.map(async (product: { productId: string; quantity: number }) => {
        return await getStock(product.productId, product.quantity);
      })
    );

    const outOfStock = stock.filter((product) => !product.avaliable);

    if (outOfStock.length) {
      return res
        .status(400)
        .json({ message: "One or more products are out of stock", outOfStock });
    }

    return next();
  }
}
