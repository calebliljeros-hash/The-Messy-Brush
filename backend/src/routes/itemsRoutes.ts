import { Router } from 'express'
import {Item} from '../models'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll({})
        res.json(items)
    } catch (error) {
        res.status(500).json({ error: "There are no items to add." })
    }
});

router.put("/:id", async (req, res) => {
  //get the data from the request body
  const { orderId } = req.body;
  console.log(orderId);
  try {
    //find the item by its id
    const item = await Item.findByPk(req.params.id);
    //check to see if the item exists
    if (item){
        const items = await item.update({orderId: orderId});
    res.json(items);
    } else {
        res.status(404).json({ error: "Item not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "There are no items to add." });
  }

});
export default router;
