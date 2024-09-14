import express from "express";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { auth, admin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllProducts);

router.post("/", auth, admin, addProduct);

router.put("/:id", auth, admin, updateProduct);

router.delete("/id", auth, admin, deleteProduct);

export default router;
