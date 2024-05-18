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

  public async buyProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const idProducts = req.body.order.products;

      const products = await Promise.all(
        idProducts.map(
          async (
            product: { productId: string; quantity: number },
            index: number
          ) => {
            const thisProduct = await ProductModel.findById(product.productId);
            if (!thisProduct) return res.status(404).send("Product not found");

            if (idProducts[index].quantity > thisProduct.amount)
              return res.status(400).send("Not enough stock");

            thisProduct.amount -= idProducts[index].quantity;
            await thisProduct.save();

            return {
              name: thisProduct.name,
              productId: product.productId,
              quantity: product.quantity,
            };
          }
        )
      );

      req.body.products_bought = products;
      console.log('1' + JSON.stringify(req.body.products_bought))

      return next();
    } catch (error) {
      return res.status(500);
    }
  }
}
