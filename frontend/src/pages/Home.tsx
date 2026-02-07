import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../services/api'
import { useAuth } from '../context/AuthContext'

interface Item {
  id: number
  title: string
  description: string
  price: number
  imageUrl?: string
}

const Home = () => {
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState('')

  const { isAuthenticated, logout, user } = useAuth()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Updated endpoint to match backend
        const data = await apiRequest('/items')
        setItems(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load items')
      }
    }

    fetchItems()
  }, [])

  return (
    <div>
      <header>
        <h1>The Messy Brush 🎨</h1>

        <nav>
          {!isAuthenticated ? (
            <>
              <Link to="/login">Login</Link> |{' '}
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span>Welcome, {user?.username}</span>
              <button onClick={logout}>Logout</button>
              <Link to="/leavefeedback">Leave Feedback</Link>
            </>
          )}
        </nav>
      </header>

      <hr />

      <h2>Art for Sale</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {items.length === 0 && <p>No art items available.</p>}

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{ maxWidth: '200px', marginBottom: '0.5rem' }}
              />
            )}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>

            {isAuthenticated ? (
              // Link to purchase page for this item
              <Link to={`/purchase/${item.id}`}>Purchase</Link>
            ) : (
              <Link to="/login">Login to Purchase</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
