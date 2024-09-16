import express from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/productController.js";
import { auth, admin } from "../middlewares/auth.middleware.js";
import Product from "../models/product.model.js";

const router = express.Router();

// Consolidated GET route for fetching all products or filtering by category (case-insensitive)
router.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    let products;
    if (category) {
      // Case-insensitive search for the category using $regex
      products = await Product.find({
        category: { $regex: new RegExp(category, "i") },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:id", getProductById);

router.post("/", auth, admin, addProduct);
router.put("/:id", auth, admin, updateProduct);
router.delete("/:id", auth, admin, deleteProduct);

export default router;
