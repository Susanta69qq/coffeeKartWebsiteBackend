import express from "express";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { auth, admin } from "../middlewares/auth.middleware.js";
import Product from "../models/product.model.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/", async (req, res) => {
  const category = req.query.category;
  try {
    let products;
    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching products" });
  }
});

router.post("/", auth, admin, addProduct);

router.put("/:id", auth, admin, updateProduct);

router.delete("/id", auth, admin, deleteProduct);

export default router;
