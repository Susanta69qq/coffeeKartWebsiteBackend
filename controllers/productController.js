import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const addProduct = async (req, res) => {
  const { name, description, price, category, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ msg: "Failed to add product" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.image = image || product.image;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: "Failed to update product details" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).jsaon({ msg: "Product not found" });

    await product.remove();
    res.json({ msg: "Product deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Failed to delete product" });
  }
};
