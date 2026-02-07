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

    setLoading(true)
    setError('')

    try {
      await apiRequest(`/orders/${id}`, {
        method: 'POST',
        token,
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
          <p>{item.description}</p>
          <p>${item.price.toFixed(2)}</p>

          <button onClick={handlePurchase} disabled={loading}>
            {loading ? 'Processing...' : 'Buy Now'}
          </button>
        </div>
      ) : (
        <p>Loading item...</p>
      )}
    </div>
  )
}

export default Purchase
