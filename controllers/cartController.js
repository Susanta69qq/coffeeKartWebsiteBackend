// cart.controller.js
import Cart from "../models/Cart.js"; // Your Cart model
import Product from "../models/Product.js"; // Your Product model

// Get user's cart
export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate(
      "items.product"
    );
    if (!cart) return res.json({ items: [] });
    return res.json(cart);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// Add to cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.userId });

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    if (!cart) {
      // Create new cart for user if doesn't exist
      cart = new Cart({
        userId: req.userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      // Check if product is already in the cart
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        // Update quantity
        existingItem.quantity += quantity;
      } else {
        // Add new product to cart
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    return res.json(cart);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    return res.json(cart);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
