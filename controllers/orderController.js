import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  const { products, totalPrice } = req.body;

  try {
    const newOrder = new Order({
      user: req.user._id,
      products,
      totalPrice,
    });

    await newOrder.save();
    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "products.product"
    );
    res.json(orders); 
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
