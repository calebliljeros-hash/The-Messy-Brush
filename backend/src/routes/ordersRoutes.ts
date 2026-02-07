import { Router } from "express";
import { Order, } from "../models";

const router = Router();
router.get("/", async (req, res) => {
    console.log("Getting all orders");
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
router.post("/", async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
 
});

export default router;
