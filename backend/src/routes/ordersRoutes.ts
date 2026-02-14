import { Router } from "express";
import { Order, Item, OrderItem } from "../models";
import { authenticateToken } from "../middleware/auth";

const router = Router();

//get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll({});
    res.json(orders);
  } catch (error) {
    res.status(500).json("There are no orders.");
  }
});
  //get all orders for the authenticated user
 router.get("/my-orders", authenticateToken, async (req, res) => {
    try {
      const orders = await Order.findAll({
        where: { userId: req.user!.userId },
      });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json("There are no orders.");
    }
  }); 
    
  //Input the feedback
  router.put("/:id/feedback", authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { feedback } = req.body;
      const userId = req.user?.userId;

      if (!feedback) {
        return res.status(400).json({ error: "Feedback is required" });
      }

      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Ensure the order belongs to the authenticated user
      if (order.userId !== userId) {
        return res
          .status(403)
          .json({ error: "You can only leave feedback on your own orders" });
      }

      order.feedback = feedback;
      await order.save();

      res.json({ message: "Feedback submitted successfully", order });
    } catch (error: any) {
      console.error("Feedback error:", error.message);
      res.status(500).json({ error: "Failed to submit feedback" });
    }
  });
  /*router.post("/orders/:id", async (req, res) => {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });*/

   router.post("/:itemId", authenticateToken, async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const userId = Number(req.user?.userId); // From authenticate middleware
    const { quantity = 1, shippingAddress, paymentMethod } = req.body;

    try {
      // 1️⃣ Fetch the item
      const item = await Item.findByPk(itemId);
      if (!item) return res.status(404).json({ message: "Item not found" });
      if (item.status !== "available")
        return res.status(400).json({ message: "Item is not available" });

      // 2️⃣ Start a transaction
      const order = await Item.sequelize!.transaction(async (t) => {
        // 3️⃣ Create the order
        const newOrder = await Order.create(
          {
            userId,
            status: "pending",
            paymentMethod: paymentMethod || "Not provided",
            shippingAddress: shippingAddress || "Not provided",
          },
          { transaction: t },
        );

        // 4️⃣ Add the item to OrderItem
        await OrderItem.create(
          {
            orderId: newOrder.id,
            itemId: item.id,
            quantity,
          },
          { transaction: t },
        );

        // 5️⃣ Update item status to sold
        item.status = "sold";
        await item.save({ transaction: t });

        return newOrder;
      });

      // 6️⃣ Return JSON response
      res.json({ success: true, order });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to complete purchase" });
    }
  });

 export default router;
