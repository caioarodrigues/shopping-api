import { Router } from "express";
import PaymentController from "../controllers/payment.controller";

const paymentRoutes = Router();
const paymentController = PaymentController.getInstance();

paymentRoutes.post("/register", paymentController.register);
paymentRoutes.put("/update/:id", paymentController.update);
paymentRoutes.get("/search/:id", paymentController.search);
paymentRoutes.get("/list", paymentController.list);

export default paymentRoutes;