import { Router } from "express";
import { addProduct } from "../controllers/productController.js";
import { authMiddleware } from "../middleWares/auth.middleWare.js";

const router = Router();

router.post("/product", authMiddleware, addProduct);
export default router;
