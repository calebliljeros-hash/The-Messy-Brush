import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../services/api'
import { useAuth } from '../context/AuthContext'

interface Order {
  id: number
  orderDate: string
  status: string
  shippingAddress: string
  feedback?: string
}

const LeaveFeedback = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [feedbackInputs, setFeedbackInputs] = useState<Record<number, string>>({})
  const [error, setError] = useState('')
  const [successId, setSuccessId] = useState<number | null>(null)

  const { token, isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await apiRequest('/orders', { token })
        setOrders(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load orders')
      }
    }

    if (token) {
      fetchOrders()
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent, orderId: number) => {
    e.preventDefault()
    setError('')
    setSuccessId(null)

    const feedback = feedbackInputs[orderId]
    if (!feedback) {
      setError('Feedback cannot be empty.')
      return
    }

    try {
      const data = await apiRequest(`/orders/${orderId}/feedback`, {
        method: 'PUT',
        token,
        body: JSON.stringify({ feedback }),
      })

      // Update the order in local state with the new feedback
      setOrders((prev) =>
          prev.map((order) =>
              order.id === orderId ? { ...order, feedback: data.order.feedback } : order
          )
      )
      setFeedbackInputs((prev) => ({ ...prev, [orderId]: '' }))
      setSuccessId(orderId)
    } catch (err: any) {
      setError(err.message || 'Failed to submit feedback')
    }
  }

  if (!isAuthenticated) {
    return (
        <div>
          <h2>Must be logged in to leave feedback</h2>
          <p>Please <Link to="/login">log in</Link> or <Link to="/register">register</Link> to continue.</p>
        </div>
    )
  }

  return (
      <div>
        <h2>Leave Feedback</h2>
        <Link to="/">← Back to Home</Link>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {orders.length === 0 && <p>You have no orders.</p>}

        <ul>
          {orders.map((order) => (
              <li key={order.id} style={{ marginBottom: '1.5rem' }}>
                <p>
                  <strong>Order #{order.id}</strong> — {order.status} —{' '}
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p>Shipping: {order.shippingAddress}</p>

                {order.feedback && (
                    <p>
                      <em>Current feedback: {order.feedback}</em>
                    </p>
                )}

                <form onSubmit={(e) => handleSubmit(e, order.id)}>
                  <div>
                    <input
                        type="text"
                        placeholder="Enter your feedback"
                        value={feedbackInputs[order.id] || ''}
                        onChange={(e) =>
                            setFeedbackInputs((prev) => ({
                              ...prev,
                              [order.id]: e.target.value,
                            }))
                        }
                        required
                    />
                  </div>
                  <button type="submit">Submit Feedback</button>
                  {successId === order.id && (
                      <span style={{ color: 'green', marginLeft: '0.5rem' }}>
                  Feedback submitted!
                </span>
                  )}
                </form>
              </li>
          ))}
        </ul>
      </div>
  )
}

export default LeaveFeedback