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

export default router;
