import express from "express";
import {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController.js";
import { authenticate } from "../middleware/authenticate.js";

const productRouter = express.Router();

// Public routes (non-admin allowed)
productRouter.get("/", getProductsController);
productRouter.get("/:id", getProductByIdController);

// Admin routes
productRouter.post("/", authenticate, createProductController);
productRouter.put("/:id", authenticate, updateProductController);
productRouter.delete("/:id", authenticate, deleteProductController);

export default productRouter;
