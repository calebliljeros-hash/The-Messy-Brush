import { Router } from 'express'
import { Order } from '../models'
import { authenticateToken } from '../middleware/auth'

const router = Router()

// GET /api/orders - Get all orders for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user?.userId

        const orders = await Order.findAll({
            where: { userId },
        })

        res.json(orders)
    } catch (error: any) {
        console.error('Fetch orders error:', error.message)
        res.status(500).json({ error: 'Failed to fetch orders' })
    }
})

// PUT /api/orders/:id/feedback - Update feedback on an order
router.put('/:id/feedback', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params
        const { feedback } = req.body
        const userId = req.user?.userId

        if (!feedback) {
            return res.status(400).json({ error: 'Feedback is required' })
        }

        const order = await Order.findByPk(id)

        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }

        // Ensure the order belongs to the authenticated user
        if (order.userId !== userId) {
            return res.status(403).json({ error: 'You can only leave feedback on your own orders' })
        }

        order.feedback = feedback
        await order.save()

        res.json({ message: 'Feedback submitted successfully', order })
    } catch (error: any) {
        console.error('Feedback error:', error.message)
        res.status(500).json({ error: 'Failed to submit feedback' })
    }
})

export default router