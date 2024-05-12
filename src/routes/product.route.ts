import ProductController from "../controllers/product.controller";
import { Router } from "express";

const productRouter = Router();
const productController = ProductController.getInstance();

productRouter.get("/products", productController.listAllProducts);
productRouter.get("/products/:type", productController.listProductByType);

export default productRouter;