import express from "express";
import Cart from "../models/cart.model";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate(
      "items.product"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart" });
  }
});

router.post('/add', auth, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
      let cart = await Cart.findOne({ user: req.userId });
      if (!cart) {
        cart = new Cart({ user: req.userId, items: [] });
      }
  
      const existingItem = cart.items.find(item => item.product.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
  
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error updating cart' });
    }
  });

  router.delete('/remove/:productId', auth, async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error removing item from cart' });
    }
  });

  export default router;