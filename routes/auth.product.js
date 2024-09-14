import express from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { auth, admin } from "../middlewares/auth.middleware.js";
import Product from "../models/product.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    let products;
    if (category) {
      products = await Product.find({ category: category });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", auth, admin, addProduct);
router.put("/:id", auth, admin, updateProduct);
router.delete("/:id", auth, admin, deleteProduct);

export default router;
