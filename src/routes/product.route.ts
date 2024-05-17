import ProductController from "../controllers/product.controller";
import Validations from "../middlewares/validations.middleware";
import ProductValidations from "../middlewares/productValidations.middleware";
import { Router } from "express";

const productRoutes = Router();
const validations = Validations.getInstance();
const productController = ProductController.getInstance();
const productValidations = ProductValidations.getInstance();

productRoutes.get("/products", productController.listAllProducts);
productRoutes.get("/products/:type", productController.listProductByType);
productRoutes.post(
  "/product/add",
  validations.validateAdmin,
  productController.addProduct
);
productRoutes.post(
  "/product/buy",
  validations.validateToken,
  productValidations.verifyStock,
  productController.buyProduct
);
productRoutes.put(
  "/product/edit",
  validations.validateAdmin,
  productController.editProduct
);
productRoutes.delete(
  "/product/remove",
  validations.validateAdmin,
  productController.removeProduct
);

export default productRoutes;
