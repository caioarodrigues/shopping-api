import { Request, Response } from "express";
import ProductModel from "../models/Product.model";

export default class ProductController {
  private static instance: ProductController;
  private constructor() {}

  public static getInstance() {
    if (!ProductController.instance) {
      ProductController.instance = new ProductController();
    }
    return ProductController.instance;
  }

  public async listAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductModel.find();
      return res.json(products);
    } catch (error) {
      return res.status(500);
    }
  }
  public async listProductByType(req: Request, res: Response) {
    try {
      const products = await ProductModel.find({ type: req.params.type });
      return res.json(products);
    } catch (error) {
      return res.status(500);
    }
  }
  public async addProduct(req: Request, res: Response) {
    try {
      const product = await ProductModel.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500);
    }
  }
  public async editProduct(req: Request, res: Response) {
    try {
      const product = await ProductModel.findByIdAndUpdate(
        req.body.id,
        req.body.product,
        { new: true }
      );
      return res.json(product);
    } catch (error) {
      return res.status(500);
    }
  }
  public async removeProduct(req: Request, res: Response) {
    try {
      const product = await ProductModel.findByIdAndDelete(req.body.id);
      return res.json(product);
    } catch (error) {
      return res.status(500);
    }
  }
}
