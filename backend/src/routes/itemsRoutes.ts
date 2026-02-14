import { Router } from 'express'
import {Item} from '../models'
import { authenticateToken } from '../middleware/auth';

const router = Router()

router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll({})
        res.json(items)
    } catch (error) {
        res.status(500).json({ error: "There are no items to add." })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ error: "Item not found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error while retrieving item" });
    }
});
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    // 1️⃣ Find item by primary key
    const item = await Item.findByPk(req.params.id);

    // 2️⃣ Check if item exists
    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    // 3️⃣ Update item with request body data
    await item.update(req.body);

    // 4️⃣ Send single response
    res.json({
      message: "Item updated successfully",
      item,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error while updating item" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, artistName, medium, price, imageUrl, artworkDate } =
      req.body;

    // 1️⃣ Validate required fields
    if (!title || !artistName || !price || !imageUrl) {
      return res.status(400).json({
        message: "Title, artistName, price, and imageUrl are required.",
      });
    }

    // 2️⃣ Create the item
    const newItem = await Item.create({
      title,
      artistName,
      medium,
      price,
      imageUrl,
      artworkDate,
      status: "available", // default status
    });

    // 3️⃣ Send success response
    res.status(201).json({
      message: "Item created successfully",
      item: newItem,
    });
  } catch (error: any) {
    //console.error("Create item error:", error);
    res.status(500).json({ message: "Server error while creating item" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        // Find item by primary key
        const item = await Item.findByPk(req.params.id);
        // Check if item exists
        if (!item) {
            return res.status(404).json({ message: "Item not found." });
        }
        // delete the item from the database
        await item.destroy();
        // Send success response
        res.json({ message: "Item deleted successfully" });
    } catch (error: any) {
        //console.error("Delete item error:", error);
        res.status(500).json({ message: "Server error while deleting item" });
    }
    });

export default router;
