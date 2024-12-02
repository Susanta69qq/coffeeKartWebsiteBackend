import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/auth.product.js";
import orderRoutes from "./routes/auth.order.js";
import cors from "cors";

dotenv.config();
connectDB();

//setup
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

//route for ping service and health checkup of backend service
app.get("/health", (req, res) => {
  res.status(200).send("Ok working");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
