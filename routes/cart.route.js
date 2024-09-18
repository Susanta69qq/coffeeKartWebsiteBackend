import express from "express";
import { addToCart, removeFromCart, getUserCart } from "../controllers/cart.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", auth, getUserCart);
router.post("/add", auth, addToCart);
router.post("/remove", auth, removeFromCart);

export default router;
