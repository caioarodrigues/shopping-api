import ProductController from "../controllers/product.controller";
import Validations from "../middlewares/validations.middleware";
import { Router } from "express";

const productRouter = Router();
const validations = Validations.getInstance();
const productController = ProductController.getInstance();

productRouter.get("/products", productController.listAllProducts);
productRouter.get("/products/:type", productController.listProductByType);
productRouter.post(
  "/product/add",
  validations.validateAdmin,
  productController.addProduct
);
productRouter.put(
  "/product/edit",
  validations.validateAdmin,
  productController.editProduct
);
productRouter.delete(
  "/product/remove",
  validations.validateAdmin,
  productController.removeProduct
);

export default productRouter;
