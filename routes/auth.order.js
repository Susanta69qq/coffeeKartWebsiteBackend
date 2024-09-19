import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/neworder", auth, createOrder);

router.get("/getorders", auth, getUserOrders);

export default router;
