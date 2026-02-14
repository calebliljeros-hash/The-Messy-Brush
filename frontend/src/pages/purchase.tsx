import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiRequest } from '../services/api'
import { useAuth } from '../context/AuthContext'

interface Item {
  id: number
  title: string                            
  description: string
  price: number
  imageUrl?: string
}

const Purchase = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { token, isAuthenticated } = useAuth()

  const [item, setItem] = useState<Item | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // NEW STATES
  const [showCheckout, setShowCheckout] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return

      try {
        const data = await apiRequest(`/items/${id}`)
        setItem(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load item.')
      }
    }

    fetchItem()
  }, [id])

  const handlePurchase = async () => {
    if (!token) {
      setError('Please log in to purchase this item.')
      return
    }

    if (!paymentMethod) {
      setError('Please select a payment method.')
      return
    }

    if (!shippingAddress.trim()) {
      setError('Please enter a shipping address.')
      return
    }

    setLoading(true)
    setError('')

    try {
      await apiRequest(`/orders/${item?.id}`, {
        method: 'POST',
        token,
        body: JSON.stringify({
        paymentMethod,
        shippingAddress,
    }),
      })

      alert('Purchase successful!')
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Purchase failed.')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h2>Must be logged in to purchase</h2>
        <p>Please log in or register to continue.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Purchase Item</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {item ? (
        <div>
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{ maxWidth: '200px' }}
            />
          )}

          <h3>{item.title}</h3>
          <p>${item.price.toFixed(2)}</p>

          {!showCheckout ? (
            <button onClick={() => setShowCheckout(true)}>
              Buy Now
            </button>
          ) : (
            <div style={{ marginTop: '20px' }}>
              {/* Payment Method */}
              <div>
                <label>Payment Method:</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="">Select payment method</option>
                  <option value="credit card">Credit Card</option>
                  <option value="debit card">Debit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              {/* Shipping Address */}
              <div style={{ marginTop: '10px' }}>
                <label>Shipping Address:</label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your shipping address"
                  rows={3}
                />
              </div>

              <button
                onClick={handlePurchase}
                disabled={loading}
                style={{ marginTop: '15px' }}
              >
                {loading ? 'Processing...' : 'Confirm Purchase'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading item...</p>
      )}
    </div>
  )
}

export default Purchase
